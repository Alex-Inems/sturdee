import type { OssTool, TestResult, ValidationResult } from "./types";

function hasMarker(files: Record<string, string>, slug: string): TestResult {
    const raw = files["sturdee.integrations.json"] ?? "";
    let pass = false;
    try {
        const json = JSON.parse(raw);
        pass = json.sturdee_integration === slug;
    } catch {
        pass = false;
    }
    return {
        id: "marker",
        label: "sturdee.integrations.json marker",
        pass,
        detail: `File must contain { "sturdee_integration": "${slug}" }`,
    };
}

const VALIDATORS: Record<string, (files: Record<string, string>, tool: OssTool) => TestResult[]> = {
    react: (files) => [
        hasMarker(files, "react"),
        {
            id: "component",
            label: "Greeting component exports",
            pass: /export\s+default\s+function\s+Greeting/.test(files["Greeting.jsx"] ?? ""),
            detail: "Export default function Greeting({ name })",
        },
        {
            id: "jsx",
            label: "Returns JSX with name",
            pass: /return\s+[\s\S]*name/.test(files["Greeting.jsx"] ?? ""),
            detail: "Return JSX that uses the name prop",
        },
    ],
    tailwindcss: (files) => [
        hasMarker(files, "tailwindcss"),
        {
            id: "config",
            label: "Tailwind config exists",
            pass: /content\s*:/.test(files["tailwind.config.js"] ?? ""),
            detail: "Configure content paths in tailwind.config.js",
        },
        {
            id: "utilities",
            label: "Uses Tailwind utilities",
            pass: /class="[^"]*(flex|grid|p-|m-|bg-|text-)/.test(files["index.html"] ?? ""),
            detail: "Add Tailwind utility classes to HTML elements",
        },
    ],
    express: (files) => [
        hasMarker(files, "express"),
        {
            id: "health",
            label: "GET /health route",
            pass: /['"]\/health['"]/.test(files["server.js"] ?? "") && /get\s*\(/i.test(files["server.js"] ?? ""),
            detail: "Add app.get('/health', ...) returning JSON",
        },
    ],
    lodash: (files) => [
        hasMarker(files, "lodash"),
        {
            id: "import",
            label: "Imports lodash chunk",
            pass: /from\s+['"]lodash\/chunk/.test(files["utils.js"] ?? ""),
            detail: "import chunk from 'lodash/chunk.js'",
        },
        {
            id: "usage",
            label: "Uses chunk in function",
            pass: /chunk\s*\(/.test(files["utils.js"] ?? ""),
            detail: "Call chunk() inside processPlaylist",
        },
    ],
    axios: (files) => [
        hasMarker(files, "axios"),
        {
            id: "create",
            label: "axios.create configured",
            pass: /axios\.create/.test(files["api.js"] ?? ""),
            detail: "Use axios.create({ baseURL: ... })",
        },
        {
            id: "interceptor",
            label: "Response interceptor",
            pass: /interceptors\.response/.test(files["api.js"] ?? ""),
            detail: "Add client.interceptors.response.use(...)",
        },
    ],
    docker: (files) => [
        hasMarker(files, "docker"),
        {
            id: "from",
            label: "Base image defined",
            pass: /^FROM\s+/m.test(files["Dockerfile"] ?? ""),
            detail: "Start Dockerfile with FROM node:22-alpine",
        },
        {
            id: "cmd",
            label: "Container command",
            pass: /CMD\s+/i.test(files["Dockerfile"] ?? ""),
            detail: "Add CMD to run the application",
        },
    ],
    vitest: (files) => [
        hasMarker(files, "vitest"),
        {
            id: "test",
            label: "Vitest describe/it",
            pass: /describe\s*\(/.test(files["sum.test.js"] ?? "") && /expect\s*\(/.test(files["sum.test.js"] ?? ""),
            detail: "Write describe/it blocks with expect assertions",
        },
    ],
};

function genericValidator(files: Record<string, string>, tool: OssTool): TestResult[] {
    const tests: TestResult[] = [hasMarker(files, tool.slug)];
    const mainFile = Object.keys(files).find((f) => f !== "sturdee.integrations.json" && !f.startsWith(".github"));
    const content = mainFile ? files[mainFile] : "";
    tests.push({
        id: "integration",
        label: "Integration file has meaningful content",
        pass: content.length > 80 && !/^\s*\/\/[^\n]*\n\s*$/m.test(content),
        detail: "Complete the starter file with real integration code",
    });
    tests.push({
        id: "commit-ready",
        label: "Ready for GitHub push",
        pass: Object.keys(files).length >= 2,
        detail: "Keep sturdee.integrations.json and your integration files",
    });
    return tests;
}

export function validateIntegration(tool: OssTool, files: Record<string, string>): ValidationResult {
    const runner = VALIDATORS[tool.slug] ?? genericValidator;
    const tests = runner(files, tool);
    const pass = tests.every((t) => t.pass);
    return {
        pass,
        tests,
        summary: pass
            ? "Integration complete — ready to push to GitHub."
            : `${tests.filter((t) => !t.pass).length} checks remaining.`,
    };
}
