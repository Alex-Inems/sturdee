import { code, faq, h2, h3, list, p, steps, tip } from "@/lib/tutorials/builder";
import type { TutorialBlock } from "@/lib/tutorials/types";

export interface Guide {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    readTime: string;
    sections: TutorialBlock[];
}

export const GUIDES: Guide[] = [
    {
        slug: "how-to-learn-programming",
        title: "How to Learn Programming in 2026 — Complete Beginner Roadmap",
        description:
            "Step-by-step roadmap to learn programming from zero: choose a language, build projects, use free tutorials, and land your first developer job. Updated for 2026.",
        keywords: ["how to learn programming", "learn to code", "programming roadmap", "beginner developer"],
        readTime: "18 min read",
        sections: [
            h2("Why Learn Programming in 2026?"),
            p("Software powers every industry — web apps, mobile, AI tools, Shopify stores, fintech, and healthcare. Learning to code is one of the highest-leverage skills you can build."),
            p("The good news: you do not need a computer science degree. Millions of developers are self-taught using free resources like Sturdee tutorials, building projects, and contributing to open source."),
            h2("Step 1 — Pick Your First Language"),
            list([
                "Web development → Start with HTML, then CSS, then JavaScript",
                "Data & automation → Python",
                "Mobile apps → Kotlin (Android) or Swift (iOS)",
                "Shopify themes → Liquid + HTML/CSS",
                "Enterprise backends → Java, C#, or Go",
            ]),
            tip("Do not switch languages every week. Commit to one stack for at least 90 days."),
            h2("Step 2 — Learn by Building"),
            steps([
                "Read one tutorial lesson on Sturdee (15–20 minutes)",
                "Type the code yourself — never copy-paste without typing",
                "Change variables and break things on purpose to see errors",
                "Build a tiny project each week",
                "Push code to GitHub from day one",
            ]),
            faq([
                {
                    question: "How long does it take to learn programming?",
                    answer: "Most beginners can build simple web pages in 2–4 weeks and a full-stack project in 3–6 months of consistent daily practice.",
                },
                {
                    question: "What is the best free way to learn programming?",
                    answer: "Combine interactive tutorials (like Sturdee), official documentation, and project building.",
                },
            ]),
        ],
    },
    {
        slug: "web-developer-roadmap-2026",
        title: "Web Developer Roadmap 2026 — Frontend to Full-Stack",
        description:
            "The complete 2026 web developer roadmap: HTML, CSS, JavaScript, TypeScript, React, Node.js, databases, Git, and deployment.",
        keywords: ["web developer roadmap", "frontend roadmap 2026", "full stack developer"],
        readTime: "22 min read",
        sections: [
            h2("Overview"),
            p("Web development in 2026 centers on JavaScript/TypeScript ecosystems, component-based UIs, API-driven backends, and edge deployment."),
            h3("Phase 1 — Foundations (4–6 weeks)"),
            list(["HTML semantics, forms, accessibility", "CSS Flexbox, Grid, responsive design", "JavaScript variables, functions, DOM, async/await", "Git basics"]),
            h3("Phase 2 — Frontend (6–8 weeks)"),
            list(["TypeScript", "React or Next.js", "Tailwind CSS", "Testing with Vitest"]),
            h3("Phase 3 — Backend (6–8 weeks)"),
            list(["Node.js + Express or Next.js API routes", "SQL (PostgreSQL)", "Authentication", "REST APIs"]),
            code("text", `Sturdee tutorial order:\n1. /tutorials/html\n2. /tutorials/css\n3. /tutorials/javascript\n4. /tutorials/typescript\n5. /tutorials/nodejs\n6. /tutorials/sql`),
            faq([
                {
                    question: "Do I need to learn React in 2026?",
                    answer: "For most frontend jobs, yes. React (often via Next.js) dominates job postings.",
                },
            ]),
        ],
    },
    {
        slug: "html-css-javascript-full-course",
        title: "Free HTML, CSS & JavaScript Course — Complete Study Guide",
        description: "Master the web trinity with this free HTML, CSS, and JavaScript course guide. Structured lessons, cheat sheets, and projects.",
        keywords: ["html css javascript course", "free web development course"],
        readTime: "15 min read",
        sections: [
            h2("The Web Trinity"),
            p("Every website is built with HTML (structure), CSS (design), and JavaScript (behavior)."),
            steps([
                "Week 1 — HTML → /tutorials/html",
                "Week 2 — CSS → /tutorials/css",
                "Week 3 — JavaScript basics → /tutorials/javascript",
                "Week 4 — DOM + async",
                "Week 5 — Capstone landing page",
            ]),
            tip("Use cheat sheets at /cheatsheets while building projects."),
        ],
    },
    {
        slug: "shopify-theme-development-guide",
        title: "Shopify Theme Development Guide — Liquid, CLI & OS 2.0",
        description: "Complete guide to Shopify theme development: Liquid, theme architecture, Shopify CLI, and deploying custom themes.",
        keywords: ["shopify theme development", "learn shopify liquid", "shopify cli"],
        readTime: "20 min read",
        sections: [
            h2("What Shopify Theme Developers Do"),
            p("Customize how merchants' stores look and function using Liquid, JSON templates, sections, and JavaScript."),
            steps([
                "Complete HTML and CSS tutorials",
                "Study the Liquid tutorial track (46 lessons)",
                "Install Node 22, Git, and Shopify CLI",
                "Clone Dawn theme and run shopify theme dev",
                "Build custom sections and run theme check",
            ]),
            faq([
                {
                    question: "Is Shopify theme development worth learning?",
                    answer: "Yes — 4.5M+ Shopify stores need customization. Liquid skills are niche but high-demand.",
                },
            ]),
        ],
    },
    {
        slug: "python-for-beginners-complete-guide",
        title: "Python for Beginners — Complete Free Guide (2026)",
        description: "Learn Python from scratch: syntax, data types, loops, functions, OOP, and real projects.",
        keywords: ["python for beginners", "learn python free"],
        readTime: "16 min read",
        sections: [
            h2("Why Python?"),
            p("Python is the #1 language for beginners. It powers web backends, data science, AI/ML, and automation."),
            p("Follow our interactive Python tutorial at /tutorials/python with 18+ lessons."),
            faq([
                {
                    question: "Is Python easier than JavaScript?",
                    answer: "Python syntax is simpler for beginners. JavaScript is essential for web frontends.",
                },
            ]),
        ],
    },
    {
        slug: "learn-sql-data-analytics",
        title: "Learn SQL for Data Analytics — Free Beginner Guide",
        description: "Master SQL: SELECT, JOINs, GROUP BY, subqueries, and interview questions.",
        keywords: ["learn sql", "sql for beginners", "sql data analytics"],
        readTime: "14 min read",
        sections: [
            h2("SQL in the Real World"),
            p("SQL is how you talk to databases. Every web app and analytics dashboard uses SQL."),
            list(["SELECT, WHERE, ORDER BY", "JOINs", "GROUP BY, HAVING", "Subqueries and CTEs"]),
            p("Practice at /tutorials/sql and use /cheatsheets/sql-cheatsheet."),
        ],
    },
];

export function getGuide(slug: string) {
    return GUIDES.find((g) => g.slug === slug);
}
