export type IntentId =
    | "what"
    | "tutorial"
    | "beginners"
    | "free"
    | "how"
    | "explained"
    | "examples"
    | "course"
    | "interview"
    | "practice"
    | "year"
    | "interactive"
    | "best"
    | "simply";

export type MatrixIntent = {
    id: IntentId;
    slugSuffix: string;
    title: (name: string) => string;
    seoTitle: (name: string) => string;
    angle: string;
};

export const MATRIX_INTENTS: MatrixIntent[] = [
    {
        id: "what",
        slugSuffix: "what-is",
        title: (n) => `What Is ${n}? Simple Definition & Examples`,
        seoTitle: (n) => `What Is ${n}? Beginner Definition (Free)`,
        angle: "definition-first for search and chat answers",
    },
    {
        id: "tutorial",
        slugSuffix: "tutorial",
        title: (n) => `${n} Tutorial — Step by Step`,
        seoTitle: (n) => `${n} Tutorial — Free Interactive Path`,
        angle: "ordered lessons with practice",
    },
    {
        id: "beginners",
        slugSuffix: "for-beginners",
        title: (n) => `${n} for Beginners — Start Here`,
        seoTitle: (n) => `${n} for Beginners — Free Guide`,
        angle: "zero-assumption onboarding",
    },
    {
        id: "free",
        slugSuffix: "learn-free",
        title: (n) => `Learn ${n} Free — No Paid Course Required`,
        seoTitle: (n) => `Learn ${n} Free Online`,
        angle: "cost-zero path",
    },
    {
        id: "how",
        slugSuffix: "how-to-learn",
        title: (n) => `How to Learn ${n} (A Practical Plan)`,
        seoTitle: (n) => `How to Learn ${n} — Weekly Plan`,
        angle: "study plan and sequencing",
    },
    {
        id: "explained",
        slugSuffix: "explained",
        title: (n) => `${n} Explained in Plain Language`,
        seoTitle: (n) => `${n} Explained — Beginner Friendly`,
        angle: "intuition before jargon",
    },
    {
        id: "examples",
        slugSuffix: "examples",
        title: (n) => `${n} Examples You Can Run Today`,
        seoTitle: (n) => `${n} Examples — Copy, Run, Break`,
        angle: "worked examples",
    },
    {
        id: "course",
        slugSuffix: "free-course",
        title: (n) => `Free ${n} Course-Style Path`,
        seoTitle: (n) => `${n} Course Free — Self-Paced`,
        angle: "module list like a course without tuition",
    },
    {
        id: "interview",
        slugSuffix: "interview-questions",
        title: (n) => `${n} Interview Questions (With How to Answer)`,
        seoTitle: (n) => `${n} Interview Questions — Free Prep`,
        angle: "hiring-bar questions",
    },
    {
        id: "practice",
        slugSuffix: "practice",
        title: (n) => `Practice ${n} — Exercises That Stick`,
        seoTitle: (n) => `${n} Practice — Interactive Drills`,
        angle: "deliberate practice loop",
    },
    {
        id: "year",
        slugSuffix: "2026-guide",
        title: (n) => `${n} in 2026 — What Actually Changed`,
        seoTitle: (n) => `${n} Guide 2026 — Updated`,
        angle: "current-year framing",
    },
    {
        id: "interactive",
        slugSuffix: "interactive-tutorial",
        title: (n) => `Interactive ${n} Tutorial (Run Code in the Browser)`,
        seoTitle: (n) => `Interactive ${n} Tutorial — Free`,
        angle: "in-page editor vs video",
    },
    {
        id: "best",
        slugSuffix: "best-way-to-learn",
        title: (n) => `Best Way to Learn ${n} (Evidence-Based)`,
        seoTitle: (n) => `Best Way to Learn ${n} Free`,
        angle: "method comparison for ChatGPT-style queries",
    },
    {
        id: "simply",
        slugSuffix: "explained-simply",
        title: (n) => `Explain ${n} Simply — A Clear Walkthrough`,
        seoTitle: (n) => `${n} Simply Explained`,
        angle: "ELI5 / chat-style explanation",
    },
];
