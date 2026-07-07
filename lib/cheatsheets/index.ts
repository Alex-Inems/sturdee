import { code, h2, list, p } from "@/lib/tutorials/builder";
import type { TutorialBlock } from "@/lib/tutorials/types";

export interface Cheatsheet {
    slug: string;
    title: string;
    description: string;
    language: string;
    sections: TutorialBlock[];
}

export const CHEATSHEETS: Cheatsheet[] = [
    {
        slug: "html-cheatsheet",
        title: "HTML Cheat Sheet — Complete Reference (2026)",
        description: "Free HTML cheat sheet with all essential tags, attributes, semantic elements, forms, and accessibility.",
        language: "html",
        sections: [
            h2("Document Structure"),
            code("html", `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Page Title</title>\n</head>\n<body></body>\n</html>`),
            h2("Semantic Tags"),
            list(["<header>", "<nav>", "<main>", "<article>", "<section>", "<aside>", "<footer>"]),
            h2("Forms"),
            code("html", `<form action="/submit" method="post">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" required>\n  <button type="submit">Submit</button>\n</form>`),
        ],
    },
    {
        slug: "css-cheatsheet",
        title: "CSS Cheat Sheet — Flexbox, Grid & Selectors",
        description: "Complete CSS reference: selectors, box model, Flexbox, Grid, and responsive design.",
        language: "css",
        sections: [
            h2("Flexbox"),
            code("css", `.flex {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}`),
            h2("Grid"),
            code("css", `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n}`),
            h2("Responsive"),
            code("css", `@media (min-width: 768px) {\n  .container { max-width: 1200px; margin: 0 auto; }\n}`),
        ],
    },
    {
        slug: "javascript-cheatsheet",
        title: "JavaScript Cheat Sheet — ES2026 Quick Reference",
        description: "JavaScript cheat sheet: variables, functions, arrays, async/await, and DOM.",
        language: "javascript",
        sections: [
            h2("Arrays"),
            code("javascript", `nums.map(n => n * 2);\nnums.filter(n => n > 1);\nnums.reduce((a, b) => a + b, 0);`),
            h2("Async"),
            code("javascript", `async function load() {\n  const res = await fetch(url);\n  return res.json();\n}`),
            h2("DOM"),
            code("javascript", `document.querySelector(".btn");\nel.addEventListener("click", handler);`),
        ],
    },
    {
        slug: "python-cheatsheet",
        title: "Python Cheat Sheet — Syntax & Data Structures",
        description: "Python quick reference: variables, lists, dicts, loops, functions, and classes.",
        language: "python",
        sections: [
            h2("Data Structures"),
            code("python", `lst = [1, 2, 3]\nd = {"key": "value"}\ns = {1, 2, 3}`),
            h2("Control Flow"),
            code("python", `for i in range(5):\n    print(i)\n\nwhile n > 0:\n    n -= 1`),
        ],
    },
    {
        slug: "git-cheatsheet",
        title: "Git Cheat Sheet — Essential Commands",
        description: "Git cheat sheet: init, commit, branch, merge, remote, and undo.",
        language: "bash",
        sections: [
            h2("Daily Workflow"),
            code("bash", `git status\ngit add .\ngit commit -m "message"\ngit push origin main`),
            h2("Branches"),
            code("bash", `git switch -c feature-x\ngit merge feature-x\ngit branch -d feature-x`),
        ],
    },
    {
        slug: "shopify-liquid-cheatsheet",
        title: "Shopify Liquid Cheat Sheet",
        description: "Liquid tags, filters, objects, and forms for Shopify theme development.",
        language: "liquid",
        sections: [
            h2("Syntax"),
            code("liquid", `{{ product.title }}\n{% if product.available %}\n  In stock\n{% endif %}`),
            h2("Filters"),
            code("liquid", `{{ product.price | money }}\n{{ product.title | upcase }}`),
            list(["shop", "product", "collection", "cart", "customer", "routes"]),
        ],
    },
    {
        slug: "sql-cheatsheet",
        title: "SQL Cheat Sheet — Queries & JOINs",
        description: "SQL reference: SELECT, JOINs, GROUP BY, and aggregates.",
        language: "sql",
        sections: [
            h2("Queries"),
            code("sql", `SELECT * FROM users WHERE age >= 18 ORDER BY name LIMIT 50;`),
            h2("JOINs"),
            code("sql", `SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;`),
            h2("Aggregates"),
            code("sql", `SELECT category, COUNT(*) FROM products GROUP BY category;`),
        ],
    },
];

export function getCheatsheet(slug: string) {
    return CHEATSHEETS.find((c) => c.slug === slug);
}
