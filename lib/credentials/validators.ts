import type { ChallengeMeta, TestResult, ValidationResult } from "./types";

function hasPattern(text: string, patterns: RegExp[]): boolean {
    return patterns.some((p) => p.test(text));
}

function testHtmlSemantics(files: Record<string, string>): TestResult[] {
    const html = files["index.html"] ?? "";
    return [
        {
            id: "semantic-main",
            label: "Uses <main> landmark",
            pass: /<main[\s>]/i.test(html),
            detail: "Add a <main> element for primary content.",
        },
        {
            id: "semantic-nav",
            label: "Uses <nav> for navigation",
            pass: /<nav[\s>]/i.test(html),
            detail: "Wrap navigation links in <nav>.",
        },
        {
            id: "semantic-article",
            label: "Uses <article> for content",
            pass: /<article[\s>]/i.test(html),
            detail: "Wrap editorial content in <article>.",
        },
        {
            id: "semantic-footer",
            label: "Uses <footer>",
            pass: /<footer[\s>]/i.test(html),
            detail: "Add a <footer> with copyright or links.",
        },
    ];
}

function testCssFlexbox(files: Record<string, string>): TestResult[] {
    const css = files["style.css"] ?? "";
    return [
        {
            id: "flex-display",
            label: "Navbar uses Flexbox",
            pass: /display\s*:\s*flex/i.test(css),
            detail: "Set display: flex on the navbar container.",
        },
        {
            id: "flex-align",
            label: "Aligns items vertically",
            pass: /align-items\s*:/i.test(css),
            detail: "Use align-items to vertically center nav links.",
        },
        {
            id: "flex-gap",
            label: "Spaces nav items",
            pass: /(gap\s*:|justify-content\s*:)/i.test(css),
            detail: "Use gap or justify-content to space navigation items.",
        },
    ];
}

function testJavascriptGreeting(files: Record<string, string>): TestResult[] {
    const js = files["greet.js"] ?? "";
    return [
        {
            id: "fn-greet",
            label: "Exports greet function",
            pass: /function\s+greet|const\s+greet\s*=|export\s+function\s+greet/i.test(js),
            detail: "Define a greet(name) function.",
        },
        {
            id: "fn-return",
            label: "Returns personalized greeting",
            pass: /return\s+[`'"].*\$\{|return\s+[`'"].*\+/i.test(js),
            detail: 'Return a string like `Hello, ${name}!`.',
        },
        {
            id: "fn-param",
            label: "Accepts name parameter",
            pass: /greet\s*\(\s*\w+/i.test(js),
            detail: "greet should accept a name argument.",
        },
    ];
}

function testFormsValidation(files: Record<string, string>): TestResult[] {
    const html = files["form.html"] ?? "";
    return [
        {
            id: "form-label",
            label: "Inputs have associated labels",
            pass: /<label[\s>]/i.test(html) && /for\s*=/i.test(html),
            detail: "Use <label for='id'> linked to each input.",
        },
        {
            id: "form-required",
            label: "Required fields marked",
            pass: /required/i.test(html),
            detail: "Add the required attribute to mandatory fields.",
        },
        {
            id: "form-email",
            label: "Email input type",
            pass: /type\s*=\s*["']email["']/i.test(html),
            detail: 'Use type="email" for the email field.',
        },
    ];
}

function testRestApi(files: Record<string, string>): TestResult[] {
    const js = files["api.js"] ?? "";
    return [
        {
            id: "api-getusers",
            label: "Defines getUsers handler",
            pass: /function\s+getUsers|const\s+getUsers|getUsers\s*=/i.test(js),
            detail: "Create a getUsers function that returns user data.",
        },
        {
            id: "api-array",
            label: "Returns array of users",
            pass: /return\s+\[|users\s*=\s*\[/i.test(js),
            detail: "Return an array of user objects.",
        },
        {
            id: "api-status",
            label: "Handles success response",
            pass: /status\s*:\s*200|res\.json|return\s+\{/i.test(js),
            detail: "Return a 200 response with JSON user data.",
        },
    ];
}

function testPortfolioCapstone(files: Record<string, string>): TestResult[] {
    const html = files["index.html"] ?? "";
    const css = files["style.css"] ?? "";
    const readme = files["README.md"] ?? "";
    return [
        {
            id: "cap-title",
            label: "Project has a title",
            pass: /<h1[\s>]/i.test(html),
            detail: "Add an <h1> with your project name.",
        },
        {
            id: "cap-stylesheet",
            label: "Links external stylesheet",
            pass: /<link[^>]+href\s*=\s*["']style\.css["']/i.test(html),
            detail: 'Link style.css with <link rel="stylesheet" href="style.css">.',
        },
        {
            id: "cap-css",
            label: "Styles the layout",
            pass: css.length > 80 && /(margin|padding|display|color)/i.test(css),
            detail: "Add meaningful CSS beyond the starter template.",
        },
        {
            id: "cap-readme",
            label: "README documents the project",
            pass: readme.length > 100 && /#|##/i.test(readme),
            detail: "Write a README with heading and project description.",
        },
    ];
}

function testPythonFizzbuzz(files: Record<string, string>): TestResult[] {
    const py = files["fizzbuzz.py"] ?? "";
    return [
        {
            id: "fb-fn",
            label: "Defines fizzbuzz function",
            pass: /def\s+fizzbuzz/i.test(py),
            detail: "Create def fizzbuzz(n): that returns the correct value.",
        },
        {
            id: "fb-mod3",
            label: "Handles multiples of 3",
            pass: /% 3|mod 3/i.test(py) && /Fizz/i.test(py),
            detail: 'Return "Fizz" when n is divisible by 3.',
        },
        {
            id: "fb-mod5",
            label: "Handles multiples of 5",
            pass: /% 5|mod 5/i.test(py) && /Buzz/i.test(py),
            detail: 'Return "Buzz" when n is divisible by 5.',
        },
    ];
}

function testGitFirstCommit(files: Record<string, string>): TestResult[] {
    const readme = files["README.md"] ?? "";
    return [
        {
            id: "git-readme",
            label: "README has project name",
            pass: /# .+/i.test(readme),
            detail: "Add a # heading with your project or learner name.",
        },
        {
            id: "git-goals",
            label: "Documents learning goals",
            pass: /goal|learn|objective|sturdee/i.test(readme),
            detail: "List at least one learning goal in the README.",
        },
    ];
}

const VALIDATORS: Record<string, (files: Record<string, string>) => TestResult[]> = {
    "html-semantics": testHtmlSemantics,
    "css-flexbox-nav": testCssFlexbox,
    "javascript-greeting": testJavascriptGreeting,
    "forms-validation": testFormsValidation,
    "rest-api-design": testRestApi,
    "portfolio-launch": testPortfolioCapstone,
    "python-fizzbuzz": testPythonFizzbuzz,
    "git-first-commit": testGitFirstCommit,
};

export function runChallengeTests(
    challenge: ChallengeMeta,
    files: Record<string, string>
): ValidationResult {
    const runner = VALIDATORS[challenge.id];
    if (!runner) {
        return { pass: false, tests: [], summary: "Unknown challenge validator." };
    }

    const tests = runner(files);
    const pass = tests.every((t) => t.pass);
    const failed = tests.filter((t) => !t.pass).length;

    return {
        pass,
        tests,
        summary: pass
            ? "All tests passed — ready to push."
            : `${failed} of ${tests.length} tests failing. Fix bugs before pushing.`,
    };
}
