import { code, faq, h2, h3, list, page, p, steps, tip } from "./builder";
import type { TutorialPage, TutorialSection } from "./types";

export function referenceSection(langId: string, langName: string, ext: string): TutorialSection {
    const pages: TutorialPage[] = [
        page(`${langId}_strings`, `${langName} Strings & Text`, [
            h2("Working with Strings"),
            p(`Strings are sequences of characters used for names, messages, URLs, and user-facing text. In ${langName}, string handling is one of the most common daily tasks.`),
            h3("Common Operations"),
            list([
                "Concatenation — combine strings together",
                "Interpolation — embed variables inside strings",
                "Length — count characters",
                "Search — find substrings or check contains",
                "Transform — uppercase, lowercase, trim whitespace",
            ]),
            code(ext, getStringExample(langId, ext)),
            tip(`Always validate and sanitize user input strings before displaying in HTML to prevent XSS.`),
            faq([
                {
                    question: `How do I check if a string is empty in ${langName}?`,
                    answer: `Compare length to zero or check for empty string after trimming whitespace. Never rely on truthy checks alone across languages.`,
                },
            ]),
        ]),
        page(`${langId}_collections`, `${langName} Collections`, [
            h2("Lists, Arrays & Collections"),
            p(`Collections let you store multiple values in one variable. Loops, filters, and maps operate on collections in every ${langName} program.`),
            list([
                "Ordered lists — arrays, lists, vectors",
                "Key-value maps — objects, dictionaries, hashes",
                "Immutable vs mutable collections",
                "Iteration with for loops and higher-order methods",
            ]),
            code(ext, getCollectionExample(langId, ext)),
            steps([
                "Choose the right structure — array for ordered data, map for lookups",
                "Prefer built-in methods over manual index loops when available",
                "Watch for off-by-one errors in index-based loops",
            ]),
        ]),
        page(`${langId}_errors`, `${langName} Error Handling`, [
            h2("Handling Errors Gracefully"),
            p(`Production code must handle failures: network timeouts, invalid input, missing files, and division by zero. ${langName} provides constructs to catch and recover from errors.`),
            code(ext, getErrorExample(langId, ext)),
            list([
                "Fail fast on programmer errors (bugs)",
                "Catch and log expected failures (I/O, network)",
                "Return meaningful error messages to users",
                "Never swallow errors silently",
            ]),
        ]),
        page(`${langId}_best_practices`, `${langName} Best Practices`, [
            h2("Writing Clean, Maintainable Code"),
            p(`These conventions help you write ${langName} code that teammates and future-you can understand.`),
            list([
                "Use descriptive variable and function names",
                "Keep functions small — one responsibility each",
                "Add comments only for non-obvious business logic",
                "Format consistently (use a linter/formatter)",
                "Write tests for critical paths",
                "Use version control (Git) from day one",
            ]),
            p(`Study the official ${langName} style guide and follow your team's conventions on real projects.`),
        ]),
        page(`${langId}_interview`, `${langName} Interview Prep`, [
            h2("Common Interview Topics"),
            p(`Prepare for ${langName} technical interviews with these high-frequency topics.`),
            list([
                "Language syntax and data types",
                "Time and space complexity (Big O)",
                "Arrays, strings, hash maps",
                "Recursion and dynamic programming basics",
                "OOP concepts — encapsulation, inheritance, polymorphism",
                "System design fundamentals for senior roles",
            ]),
            faq([
                {
                    question: `What ${langName} concepts appear most in interviews?`,
                    answer: `Data structures (arrays, maps), algorithmic complexity, and clear problem decomposition. Practice on Sturdee tutorials then sites like LeetCode.`,
                },
                {
                    question: "How do I prepare for a coding interview?",
                    answer: "Master one language deeply, practice 2–3 problems daily, explain your thinking out loud, and review solutions afterward.",
                },
            ]),
        ]),
    ];

    return { title: `${langName} Reference & Interview Prep`, pages };
}

function getStringExample(id: string, ext: string): string {
    const map: Record<string, string> = {
        javascript: 'const name = "Sturdee";\nconst greeting = `Hello, ${name}!`;\nconsole.log(greeting.length);\nconsole.log(greeting.toUpperCase());',
        python: `name = "Sturdee"\ngreeting = f"Hello, {name}!"\nprint(len(greeting))\nprint(greeting.upper())`,
        java: `String name = "Sturdee";\nString greeting = "Hello, " + name + "!";\nSystem.out.println(greeting.length());`,
        sql: `SELECT UPPER(name), LENGTH(name) FROM users;`,
    };
    return map[id] ?? `// String operations in ${id}`;
}

function getCollectionExample(id: string, ext: string): string {
    const map: Record<string, string> = {
        javascript: `const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);\nconst user = { name: "Alex", score: 95 };`,
        python: `nums = [1, 2, 3, 4, 5]\nevens = [n for n in nums if n % 2 == 0]\nuser = {"name": "Alex", "score": 95}`,
        java: `int[] nums = {1, 2, 3, 4, 5};\nMap<String, Integer> user = Map.of("score", 95);`,
    };
    return map[id] ?? `// Collections in ${id}`;
}

function getErrorExample(id: string, ext: string): string {
    const map: Record<string, string> = {
        javascript: `try {\n  const data = JSON.parse(input);\n} catch (err) {\n  console.error("Invalid JSON:", err.message);\n}`,
        python: `try:\n    x = 1 / 0\nexcept ZeroDivisionError as e:\n    print(f"Error: {e}")`,
        java: `try {\n  int x = 10 / 0;\n} catch (ArithmeticException e) {\n  System.err.println(e.getMessage());\n}`,
    };
    return map[id] ?? `// Error handling in ${id}`;
}
