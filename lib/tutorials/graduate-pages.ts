import { code, faq, h2, h3, list, page, p, steps, tip, note } from "./builder";
import type { TutorialPage, TutorialSection } from "./types";

/**
 * Graduate / PhD-standard modules appended to every language track.
 * Open to anyone — no account required. Videos attached via videos/advanced.ts.
 */
export function graduateSection(langId: string, langName: string, ext: string): TutorialSection {
    const pages: TutorialPage[] = [
        page(`${langId}_complexity`, `${langName} Complexity & Algorithms`, [
            h2("Asymptotic Analysis (CS / PhD standard)"),
            p(
                `${langName} programs are judged not only by correctness but by growth rates. Big-O, Θ, and Ω describe how time and memory scale as n → ∞. This is the same vocabulary used in algorithms qualifying exams and systems papers.`
            ),
            h3("What you must be able to prove"),
            list([
                "Worst-case vs expected-case vs amortized bounds",
                "Master theorem for divide-and-conquer recurrences",
                "Lower bounds (comparison sorting is Ω(n log n))",
                "Space–time tradeoffs and cache-aware complexity",
                "NP-completeness intuition: reductions, not just names",
            ]),
            p(`Work a recurrence on paper before you optimize ${langName} code. If T(n) = 2T(n/2) + Θ(n), you already know mergesort-class algorithms are Θ(n log n) — no profiler required for the asymptotic claim.`),
            code(
                ext,
                complexitySnippet(langId),
                "Count work, then classify"
            ),
            steps([
                "Write the loop nest and identify the input size n",
                "Sum work per iteration (ignore constant factors)",
                "State O / Θ / Ω with a one-line justification",
                "Check edge cases: empty input, already-sorted, adversarial",
            ]),
            tip(
                "Watch the embedded lecture, then re-derive one recurrence yourself. Passive video without a proof sketch does not stick at graduate level."
            ),
            faq([
                {
                    question: "Is Big-O enough for research work?",
                    answer:
                        `It is the baseline. Papers often need tighter Θ bounds, high-probability bounds, or I/O complexity (external memory). Still start with Big-O on every ${langName} hot path.`,
                },
                {
                    question: "Where should I go next?",
                    answer:
                        `CLRS (Introduction to Algorithms), Kleinberg–Tardos, and a recorded algorithms course (MIT 6.006 / 6.046 style). Then implement the algorithm in ${langName} and measure.`,
                },
            ]),
        ]),
        page(`${langId}_semantics`, `${langName} Types, Semantics & Correctness`, [
            h2("Meaning of programs — not just syntax"),
            p(`Graduate CS treats a language as a formal system: syntax, static semantics (types), and dynamic semantics (how terms reduce). Even in dynamically typed ${langName}, you can reason with invariants, contracts, and models of evaluation.`),
            h3("Core ideas from programming-language theory"),
            list([
                "Operational semantics: small-step vs big-step evaluation",
                "Type soundness: progress + preservation (Wright–Felleisen)",
                "Substitution, binders, and capture-avoiding replacement",
                "Effects: mutation, I/O, exceptions, concurrency",
                "Specifications: pre/postconditions, loop invariants",
            ]),
            p(`You do not need Coq on day one. You do need to say what a ${langName} function is allowed to do, what it must return, and which states are impossible. That is the same discipline as a PhD qualifier in PL.`),
            code(ext, semanticsSnippet(langId), "Specify before you implement"),
            note(`Recommended reading: Types and Programming Languages (Pierce), Software Foundations (online), and TAPL exercises on simply-typed lambda calculus — then map those ideas onto ${langName}.`),
            faq([
                {
                    question: `Does this apply if ${langName} is dynamically typed?`,
                    answer:
                        "Yes. Types can live in comments, tests, or gradual typing. The point is a precise model of values and reductions, not a particular type checker.",
                },
            ]),
        ]),
        page(`${langId}_systems`, `${langName} Systems, Concurrency & Reliability`, [
            h2("From sequential scripts to systems"),
            p(`PhD-level systems work asks: what happens under failure, load, and partial information? ${langName} is often the glue — APIs, workers, data pipelines. Reliability is a design problem, not an afterthought.`),
            list([
                "Happens-before and data races (memory models)",
                "Idempotency, retries, and at-least-once delivery",
                "Backpressure, timeouts, and cancellation",
                "CAP-style tradeoffs: latency vs consistency",
                "Observability: structured logs, traces, metrics",
            ]),
            code(ext, systemsSnippet(langId), "Timeouts and retries are part of the spec"),
            steps([
                "Name the failure modes (timeout, 5xx, poison message)",
                "Choose retry policy (bounded, jittered backoff)",
                "Make handlers idempotent where the broker may redeliver",
                `Add a trace id through every ${langName} hop`,
            ]),
            tip(`Pair this lesson with the embedded distributed-systems lecture. Pause and map each slide to a ${langName} service you could actually ship.`),
            faq([
                {
                    question: "What papers should I know?",
                    answer:
                        `Start with Google's MapReduce, Dynamo, Raft, and the Google SRE workbook chapters on error budgets. Then implement a tiny replicated log or worker queue in ${langName}.`,
                },
            ]),
        ]),
        page(`${langId}_ml`, `${langName} for ML, RAG & Research Practice`, [
            h2("From tutorials to research-grade ML literacy"),
            p(`Modern AI stacks still need ${langName}: data loaders, evaluation loops, retrieval, and glue code around models. Graduate standard means you can state a loss, a dataset split, a metric, and a threat to validity — not only call an API.`),
            h3("Minimum research checklist"),
            list([
                "Train / validation / test splits with no leakage",
                "A baseline that is embarrassingly simple",
                "Error analysis on a labeled slice, not vibes",
                "For RAG: retrieval recall@k before generation quality",
                "Report compute, seeds, and prompt versions",
            ]),
            p(
                "Retrieval-augmented generation (RAG) is a systems paper in disguise: chunking, indexing, ranking, then constrained generation. If you searched for a beginner guide to retrieval augmented generation, this is the formal version — measure retrieval first."
            ),
            code(ext, mlSnippet(langId), "Evaluate retrieval before generation"),
            note(
                "Lectures: 3Blue1Brown neural nets, Stanford CS229/CS224N recordings, Andrej Karpathy’s Neural Networks: Zero to Hero. Papers: Attention Is All You Need; Dense Passage Retrieval; RAG (Lewis et al., 2020)."
            ),
            faq([
                {
                    question: "Do I need a PhD to work on RAG?",
                    answer:
                        `No. You do need the experimental habits of one: baselines, ablations, and honest failure cases. Implement chunk → retrieve → generate in ${langName}, then beat your own baseline.`,
                },
            ]),
        ]),
        page(`${langId}_research`, `${langName} Further Reading & Lecture Videos`, [
            h2("A graduate reading list you can actually finish"),
            p(`Each ${langName} track on Sturdee is free and public — no login. This page is the bridge from interactive lessons to university-standard sources. Watch the embedded video, then pick one book chapter and one paper.`),
            h3("Books (CS graduate core)"),
            list([
                "CLRS — Introduction to Algorithms",
                "Sipser — Introduction to the Theory of Computation",
                "Pierce — Types and Programming Languages",
                "Hennessy & Patterson — Computer Architecture",
                "Goodfellow, Bengio, Courville — Deep Learning (selected chapters)",
            ]),
            h3("Open lecture series (with videos on this lesson)"),
            list([
                "MIT 6.006 / 6.046 — Algorithms",
                "Stanford CS229 — Machine Learning",
                "MIT 6.824 — Distributed Systems",
                "Berkeley CS 61C / 162 — architecture & OS",
                "Karpathy — Neural Nets Zero to Hero (implementation-first)",
            ]),
            steps([
                `Finish the beginner ${langName} lessons on Sturdee (no account needed)`,
                "Watch one lecture from the embed below and take notes by hand",
                "Implement one algorithm or evaluation script in the Try-it editor or locally",
                "Write a one-page error analysis (what failed, why, next experiment)",
            ]),
            faq([
                {
                    question: "Are these tutorials really free for anyone?",
                    answer:
                        `Yes. You can read and run ${langName} lessons in the browser without creating an account. Sign-in is only for live cohorts, classroom hosting, and Sturdee Pro AI Tutor.`,
                },
                {
                    question: "How is this different from a MOOC?",
                    answer:
                        `Sturdee keeps the editor in the page. The graduate module points you at the same papers and lectures a PhD program uses, then sends you back to practice in ${langName}.`,
                },
            ]),
        ]),
    ];

    return { title: `${langName} Graduate & Research`, pages };
}

function complexitySnippet(id: string): string {
    const map: Record<string, string> = {
        javascript:
            "// Binary search: Θ(log n) comparisons on a sorted array\nfunction binarySearch(xs, target) {\n  let lo = 0, hi = xs.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (xs[mid] === target) return mid;\n    if (xs[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}",
        python:
            "# Merge step is Θ(n); tree height Θ(log n) → Θ(n log n)\ndef merge(left, right):\n    out, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            out.append(left[i]); i += 1\n        else:\n            out.append(right[j]); j += 1\n    return out + left[i:] + right[j:]",
        java: "static int binarySearch(int[] xs, int t) {\n  int lo = 0, hi = xs.length - 1;\n  while (lo <= hi) {\n    int mid = (lo + hi) >>> 1;\n    if (xs[mid] == t) return mid;\n    if (xs[mid] < t) lo = mid + 1; else hi = mid - 1;\n  }\n  return -1;\n}",
        sql: "-- Index lookup is closer to O(log n) pages than a sequential scan O(n)\nEXPLAIN ANALYZE SELECT * FROM events WHERE id = 42;",
    };
    return map[id] ?? `// Sketch the recurrence for your hottest ${id} loop, then classify it.`;
}

function semanticsSnippet(id: string): string {
    const map: Record<string, string> = {
        javascript:
            "/** @pure @returns {number} finite, non-NaN */\nfunction clamp01(x) {\n  if (typeof x !== 'number' || Number.isNaN(x)) throw new TypeError('x');\n  return Math.min(1, Math.max(0, x));\n}",
        python:
            "from typing import TypeGuard\n\ndef is_unit_interval(x: object) -> TypeGuard[float]:\n    return isinstance(x, float) and 0.0 <= x <= 1.0",
        typescript:
            "type NonEmpty<T> = [T, ...T[]];\nfunction head<T>(xs: NonEmpty<T>): T {\n  return xs[0];\n}",
    };
    return map[id] ?? `// Write a contract: inputs, outputs, and forbidden states for one ${id} function.`;
}

function systemsSnippet(id: string): string {
    const map: Record<string, string> = {
        javascript:
            "async function fetchWithTimeout(url, ms = 3000) {\n  const ctrl = new AbortController();\n  const t = setTimeout(() => ctrl.abort(), ms);\n  try {\n    const res = await fetch(url, { signal: ctrl.signal });\n    if (!res.ok) throw new Error(String(res.status));\n    return await res.json();\n  } finally {\n    clearTimeout(t);\n  }\n}",
        python:
            "import urllib.request\n\ndef fetch(url: str, timeout: float = 3.0) -> bytes:\n    with urllib.request.urlopen(url, timeout=timeout) as r:\n        return r.read()",
    };
    return map[id] ?? `// Add timeout, bounded retries, and an idempotency key to one ${id} I/O path.`;
}

function mlSnippet(id: string): string {
    const map: Record<string, string> = {
        python:
            "def recall_at_k(relevant: set[str], ranked: list[str], k: int) -> float:\n    if not relevant:\n        return 0.0\n    hit = relevant.intersection(ranked[:k])\n    return len(hit) / len(relevant)\n\n# RAG: measure retrieval before you judge the generated answer.",
        javascript:
            "function recallAtK(relevant, ranked, k) {\n  if (!relevant.size) return 0;\n  const top = new Set(ranked.slice(0, k));\n  let hit = 0;\n  for (const id of relevant) if (top.has(id)) hit++;\n  return hit / relevant.size;\n}",
    };
    return map[id] ?? `// Log retrieval ids and a recall@k before scoring ${id} generated text.`;
}
