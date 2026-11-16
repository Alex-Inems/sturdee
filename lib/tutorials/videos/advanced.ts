import { v } from "./helpers";
import type { TutorialVideo } from "../types";

/**
 * Open lecture videos for graduate modules (MIT / Stanford / FCC / Karpathy).
 * Keys: {lang}/{lang}_{complexity|semantics|systems|ml|research}
 */
const ALGORITHMS = { id: "8hly31xKli0", channel: "freeCodeCamp.org" }; // Algorithms course
const KARPATHY = { id: "VMj-3S1tku0", channel: "Andrej Karpathy" };
const CS50 = { id: "8mAITcNt710", channel: "CS50" };
const DISTSYS = { id: "cQP8WApzIQQ", channel: "MIT 6.824" };
const RAG_INTRO = { id: "T-D1OfcDW1M", channel: "IBM Technology" }; // RAG explained

const LANGS = [
    "html",
    "css",
    "javascript",
    "typescript",
    "python",
    "sql",
    "java",
    "cpp",
    "c",
    "csharp",
    "php",
    "ruby",
    "go",
    "rust",
    "swift",
    "kotlin",
    "r",
    "bash",
    "json",
    "xml",
    "nodejs",
    "liquid",
] as const;

function pack(lang: string): Record<string, TutorialVideo> {
    return {
        [`${lang}/${lang}_complexity`]: v(ALGORITHMS.id, 0, ALGORITHMS.channel),
        [`${lang}/${lang}_semantics`]: v(CS50.id, 0, CS50.channel),
        [`${lang}/${lang}_systems`]: v(DISTSYS.id, 0, DISTSYS.channel),
        [`${lang}/${lang}_ml`]: v(RAG_INTRO.id, 0, RAG_INTRO.channel),
        [`${lang}/${lang}_research`]: v(KARPATHY.id, 0, KARPATHY.channel),
    };
}

export const ADVANCED_VIDEOS: Record<string, TutorialVideo> = Object.assign(
    {},
    ...LANGS.map((lang) => pack(lang))
);
