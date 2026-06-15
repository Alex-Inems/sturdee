import { execSync } from "child_process";
import fs from "fs";
import sharp from "sharp";

const src = "public/student-original.png";
const out = "public/student.png";

try {
    const buf = execSync("git show 75b9e64:public/student.png", {
        encoding: null,
        maxBuffer: 20 * 1024 * 1024,
    });
    fs.writeFileSync(src, buf);
} catch {
    fs.copyFileSync(out, src);
}

function isBg(r, g, b, a) {
    if (a === 0) return false;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    const light = (r + g + b) / 3;
    if (r > 218 && g > 218 && b > 218) return true;
    if (sat < 32 && light > 168) return true;
    return false;
}

function isHalo(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    const light = (r + g + b) / 3;
    const neutral = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return sat < 34 && light > 172 && neutral < 16;
}

function isCornerHalo(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    const light = (r + g + b) / 3;
    const neutral = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return sat < 36 && light > 166 && neutral < 20;
}

function inCorner(x, y, w, h) {
    const rx = w * 0.24;
    const ry = h * 0.24;
    return (x < rx || x > w - rx) && (y < ry || y > h - ry);
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const bg = new Uint8Array(width * height);
const queue = [];

const pushBg = (x, y) => {
    const idx = y * width + x;
    if (bg[idx]) return;
    const i = idx * channels;
    if (!isBg(data[i], data[i + 1], data[i + 2], data[i + 3])) return;
    bg[idx] = 1;
    queue.push(idx);
};

for (let x = 0; x < width; x++) {
    pushBg(x, 0);
    pushBg(x, height - 1);
}
for (let y = 0; y < height; y++) {
    pushBg(0, y);
    pushBg(width - 1, y);
}

while (queue.length) {
    const idx = queue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) pushBg(x - 1, y);
    if (x < width - 1) pushBg(x + 1, y);
    if (y > 0) pushBg(x, y - 1);
    if (y < height - 1) pushBg(x, y + 1);
}

for (let idx = 0; idx < width * height; idx++) {
    if (bg[idx]) data[idx * channels + 3] = 0;
}

const halo = new Uint8Array(width * height);
const haloQueue = [];

const pushHalo = (x, y) => {
    const idx = y * width + x;
    if (halo[idx]) return;
    const i = idx * channels;
    if (data[i + 3] === 0) return;
    if (!isHalo(data[i], data[i + 1], data[i + 2])) return;
    halo[idx] = 1;
    haloQueue.push(idx);
};

for (let idx = 0; idx < width * height; idx++) {
    if (data[idx * channels + 3] !== 0) continue;
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) pushHalo(x - 1, y);
    if (x < width - 1) pushHalo(x + 1, y);
    if (y > 0) pushHalo(x, y - 1);
    if (y < height - 1) pushHalo(x, y + 1);
}

while (haloQueue.length) {
    const idx = haloQueue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) pushHalo(x - 1, y);
    if (x < width - 1) pushHalo(x + 1, y);
    if (y > 0) pushHalo(x, y - 1);
    if (y < height - 1) pushHalo(x, y + 1);
}

for (let idx = 0; idx < width * height; idx++) {
    if (halo[idx]) data[idx * channels + 3] = 0;
}

const cornerHalo = new Uint8Array(width * height);
const cornerQueue = [];

const pushCornerHalo = (x, y) => {
    const idx = y * width + x;
    if (cornerHalo[idx]) return;
    if (!inCorner(x, y, width, height)) return;
    const i = idx * channels;
    if (data[i + 3] === 0) return;
    if (!isCornerHalo(data[i], data[i + 1], data[i + 2])) return;
    cornerHalo[idx] = 1;
    cornerQueue.push(idx);
};

for (let idx = 0; idx < width * height; idx++) {
    if (data[idx * channels + 3] !== 0) continue;
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) pushCornerHalo(x - 1, y);
    if (x < width - 1) pushCornerHalo(x + 1, y);
    if (y > 0) pushCornerHalo(x, y - 1);
    if (y < height - 1) pushCornerHalo(x, y + 1);
}

while (cornerQueue.length) {
    const idx = cornerQueue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) pushCornerHalo(x - 1, y);
    if (x < width - 1) pushCornerHalo(x + 1, y);
    if (y > 0) pushCornerHalo(x, y - 1);
    if (y < height - 1) pushCornerHalo(x, y + 1);
}

for (let idx = 0; idx < width * height; idx++) {
    if (cornerHalo[idx]) data[idx * channels + 3] = 0;
}

const processed = await sharp(data, { raw: { width, height, channels } }).png().toBuffer();
const trimmed = await sharp(processed).trim({ threshold: 10 }).png().toBuffer();
await sharp(trimmed).toFile(out);

try {
    fs.unlinkSync(src);
} catch {
    // temp file may be locked on Windows
}

const meta = await sharp(out).metadata();
console.log(`Saved ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}`);
