export function serializeValue(value: unknown): string {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (typeof value === "function") return "ƒ()";
    if (typeof value === "string") return JSON.stringify(value);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

export function valueType(value: unknown): string {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (typeof value === "function") return "function";
    return typeof value;
}

export function buildHeapSnapshot(env: Map<string, unknown>): import("./types").MemoryCell[] {
    return [...env.entries()]
        .filter(([, v]) => typeof v !== "function")
        .map(([name, value]) => ({
            name,
            type: valueType(value),
            value: serializeValue(value),
        }));
}

/** Strip common TypeScript syntax so acorn can parse tutorial snippets. */
export function stripTypeScript(code: string): string {
    return code
        .replace(/:\s*[A-Za-z_$][\w$<>[\]|&.,\s]*(?=[=;,)\]}])/g, "")
        .replace(/\bas\s+[A-Za-z_$][\w$<>[\]|&.,\s]*/g, "")
        .replace(/<[^>]+>/g, (m) => (m.includes("(") ? m : ""));
}
