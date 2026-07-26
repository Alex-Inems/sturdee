#!/usr/bin/env node
/**
 * Site health monitor for inkamototours.com
 * Checks HTTPS availability and logs status. Safe for scheduling ≥20×/day.
 *
 * Usage:
 *   node scripts/monitor-inkamototours.mjs
 *   node scripts/monitor-inkamototours.mjs --url https://inkamototours.com
 *
 * Schedule (Windows, ~every 72 min ≈ 20×/day):
 *   powershell -File scripts/schedule-inkamototours-monitor.ps1
 */

import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_URL = "https://inkamototours.com";
const TIMEOUT_MS = 15_000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_DIR = join(__dirname, "..", "logs");
const LOG_FILE = join(LOG_DIR, "inkamototours-monitor.jsonl");

function parseArgs(argv) {
  let url = DEFAULT_URL;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--url" && argv[i + 1]) {
      url = argv[++i];
    }
  }
  return { url };
}

function stamp() {
  return new Date().toISOString();
}

async function checkSite(url) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "SturdeeSiteMonitor/1.0 (+health-check)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const ms = Date.now() - started;
    const text = await res.text();
    const hasTitle = /<title[^>]*>[\s\S]*?<\/title>/i.test(text);

    return {
      ok: res.ok,
      status: res.status,
      ms,
      finalUrl: res.url,
      hasTitle,
      bytes: text.length,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      ms: Date.now() - started,
      finalUrl: url,
      hasTitle: false,
      bytes: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timer);
  }
}

function writeLog(entry) {
  mkdirSync(LOG_DIR, { recursive: true });
  appendFileSync(LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");
}

async function main() {
  const { url } = parseArgs(process.argv.slice(2));
  const result = await checkSite(url);
  const entry = { at: stamp(), url, ...result };

  writeLog(entry);

  const line = result.ok
    ? `[${entry.at}] OK ${result.status} ${result.ms}ms ${result.finalUrl}`
    : `[${entry.at}] FAIL ${result.status || "ERR"} ${result.ms}ms ${result.error ?? ""}`;

  console.log(line);
  process.exit(result.ok ? 0 : 1);
}

main();
