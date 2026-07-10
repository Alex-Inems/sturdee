import type { PracticeProblem, PracticeRunSummary, PracticeTestResult } from "./types";

function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a === null || b === null) return a === b;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((v, i) => deepEqual(v, b[i]));
    }
    if (typeof a === "object" && typeof b === "object") {
        const ak = Object.keys(a as object);
        const bk = Object.keys(b as object);
        if (ak.length !== bk.length) return false;
        return ak.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
    }
    return false;
}

function cloneForRun<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function formatValue(v: unknown): string {
    try {
        return JSON.stringify(v);
    } catch {
        return String(v);
    }
}

function extractUserFunction(code: string, functionName: string): (...args: unknown[]) => unknown {
    const wrapped = `${code}\n;return (typeof ${functionName} !== 'undefined' ? ${functionName} : null);`;
    const fn = new Function(wrapped)();
    if (typeof fn !== "function") {
        throw new Error(`Define a function named "${functionName}" in your code.`);
    }
    return fn as (...args: unknown[]) => unknown;
}

export function runPracticeTests(
    code: string,
    problem: PracticeProblem,
    options: { hiddenOnly?: boolean; sampleOnly?: boolean } = {}
): PracticeRunSummary {
    const start = performance.now();
    const userFn = extractUserFunction(code, problem.functionName);
    const results: PracticeTestResult[] = [];

    const cases = problem.testCases.map((tc, index) => ({
        ...tc,
        index,
        hidden: index >= problem.examples.length,
    }));

    const filtered = cases.filter((tc) => {
        if (options.hiddenOnly) return tc.hidden;
        if (options.sampleOnly) return !tc.hidden;
        return true;
    });

    for (const tc of filtered) {
        try {
            const args = tc.input.map((arg) => cloneForRun(arg));
            const actual = userFn(...args);
            const pass = deepEqual(actual, tc.expected);
            results.push({
                index: tc.index,
                pass,
                input: tc.input.map(formatValue).join(", "),
                expected: formatValue(tc.expected),
                actual: formatValue(actual),
                hidden: tc.hidden,
            });
        } catch (err) {
            results.push({
                index: tc.index,
                pass: false,
                input: tc.input.map(formatValue).join(", "),
                expected: formatValue(tc.expected),
                actual: "—",
                error: err instanceof Error ? err.message : "Runtime error",
                hidden: tc.hidden,
            });
        }
    }

    const passed = results.filter((r) => r.pass).length;
    return {
        passed,
        total: results.length,
        results,
        runtimeMs: Math.round(performance.now() - start),
        allPassed: passed === results.length && results.length > 0,
    };
}

export function savePracticeProgress(slug: string, status: "attempted" | "solved") {
    if (typeof window === "undefined") return;
    try {
        const key = "sturdee-practice-progress";
        const raw = localStorage.getItem(key);
        const data: Record<string, string> = raw ? JSON.parse(raw) : {};
        const prev = data[slug];
        if (prev === "solved") return;
        data[slug] = status;
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        /* ignore */
    }
}

export function loadPracticeProgress(): Record<string, "attempted" | "solved"> {
    if (typeof window === "undefined") return {};
    try {
        const raw = localStorage.getItem("sturdee-practice-progress");
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}
