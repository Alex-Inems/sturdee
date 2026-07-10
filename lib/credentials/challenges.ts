import type { ChallengeMeta } from "./types";

export const CHALLENGES: ChallengeMeta[] = [
    {
        id: "git-first-commit",
        slug: "git-first-commit",
        title: "Your First Git Commit",
        moduleTitle: "Foundations",
        lessonSlug: "environment-setup",
        category: "Web Development",
        skill: "Git Workflow",
        description: "Initialize a repo README and make your first commit — the foundation of every Sturdee micro-credential.",
        instructions: [
            "Edit README.md with your project name and learning goals.",
            "Stage the file with git add README.md.",
            "Commit with a descriptive message (e.g. 'Add project README').",
            "Push when all tests pass to earn your credential.",
        ],
        starterFiles: {
            "README.md": "# My Sturdee Project\n\n## Goals\n- \n",
        },
        requiredCommitMessage: /add|init|readme|project/i,
        minCommits: 1,
    },
    {
        id: "html-semantics",
        slug: "html-semantics",
        title: "Semantic HTML Page",
        moduleTitle: "Foundations",
        lessonSlug: "html-semantics",
        category: "Web Development",
        skill: "Semantic HTML",
        description: "Build an accessible page structure with semantic landmarks — verified by automated HTML checks, not multiple-choice quizzes.",
        instructions: [
            "Complete index.html with <nav>, <main>, <article>, and <footer>.",
            "Commit your working markup.",
            "Push to issue your Semantic HTML micro-certificate.",
        ],
        starterFiles: {
            "index.html": `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Page</title>\n</head>\n<body>\n  <!-- Add semantic landmarks here -->\n</body>\n</html>\n`,
        },
        minCommits: 1,
    },
    {
        id: "css-flexbox-nav",
        slug: "css-flexbox-nav",
        title: "Flexbox Navigation Bar",
        moduleTitle: "Foundations",
        lessonSlug: "css-layout-basics",
        category: "Web Development",
        skill: "CSS Flexbox",
        description: "Style a responsive navbar with Flexbox — your commit must pass layout tests before credentials are issued.",
        instructions: [
            "Style .navbar in style.css using display: flex.",
            "Center items and space navigation links.",
            "Commit and push your bug-free layout.",
        ],
        starterFiles: {
            "index.html": `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <header class="navbar">\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n    <a href="/contact">Contact</a>\n  </header>\n</body>\n</html>\n`,
            "style.css": "/* Build a flexbox navbar */\n.navbar {\n  \n}\n",
        },
        minCommits: 1,
    },
    {
        id: "javascript-greeting",
        slug: "javascript-greeting",
        title: "JavaScript Greeting Module",
        moduleTitle: "Frontend Engineering",
        lessonSlug: "react-components",
        category: "Web Development",
        skill: "JavaScript Functions",
        description: "Ship a working greet() function — Sturdee verifies your code, not your ability to guess quiz answers.",
        instructions: [
            "Implement greet(name) in greet.js.",
            "Return a personalized greeting string.",
            "Commit and push when tests pass.",
        ],
        starterFiles: {
            "greet.js": "// Export a greet(name) function\n",
        },
        minCommits: 1,
    },
    {
        id: "forms-validation",
        slug: "forms-validation",
        title: "Accessible Form with Validation",
        moduleTitle: "Frontend Engineering",
        lessonSlug: "forms-validation",
        category: "Web Development",
        skill: "HTML Forms",
        description: "Build an accessible signup form with labels, required fields, and email validation markup.",
        instructions: [
            "Add labeled inputs in form.html.",
            "Mark required fields and use type='email'.",
            "Commit and push your accessible form.",
        ],
        starterFiles: {
            "form.html": `<!DOCTYPE html>\n<html lang="en">\n<body>\n  <form>\n    <!-- Build an accessible signup form -->\n  </form>\n</body>\n</html>\n`,
        },
        minCommits: 1,
    },
    {
        id: "rest-api-design",
        slug: "rest-api-design",
        title: "REST API User Endpoint",
        moduleTitle: "Backend & Deployment",
        lessonSlug: "rest-api-design",
        category: "Web Development",
        skill: "REST API Design",
        description: "Implement a getUsers handler that returns JSON — verified by code analysis on your pushed commit.",
        instructions: [
            "Create getUsers in api.js returning an array of user objects.",
            "Return a proper success response shape.",
            "Commit and push to earn your API micro-certificate.",
        ],
        starterFiles: {
            "api.js": "// Implement getUsers(req, res) or export function getUsers()\n",
        },
        minCommits: 1,
    },
    {
        id: "python-fizzbuzz",
        slug: "python-fizzbuzz",
        title: "Python FizzBuzz Implementation",
        moduleTitle: "Language Mastery",
        lessonSlug: "syntax-fundamentals",
        category: "Programming",
        skill: "Python Logic",
        description: "Classic FizzBuzz — prove you can write working Python, not just pass a timed quiz.",
        instructions: [
            "Implement fizzbuzz(n) in fizzbuzz.py.",
            "Handle multiples of 3, 5, and both.",
            "Commit and push when all tests pass.",
        ],
        starterFiles: {
            "fizzbuzz.py": "def fizzbuzz(n):\n    pass\n",
        },
        minCommits: 1,
    },
    {
        id: "portfolio-launch",
        slug: "portfolio-launch",
        title: "Portfolio Capstone Launch",
        moduleTitle: "Capstone",
        lessonSlug: "portfolio-launch",
        category: "Web Development",
        skill: "Full-Stack Capstone",
        description: "Ship a multi-file portfolio project — the capstone micro-credential aggregating real commit history.",
        instructions: [
            "Build index.html with project title and linked stylesheet.",
            "Style the layout in style.css.",
            "Document the project in README.md.",
            "Make at least 2 commits, then push.",
        ],
        starterFiles: {
            "index.html": `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <!-- Your portfolio landing page -->\n</body>\n</html>\n`,
            "style.css": "/* Portfolio styles */\nbody { font-family: system-ui, sans-serif; }\n",
            "README.md": "# Portfolio Project\n\n## About\n\n",
        },
        minCommits: 2,
    },
];

export function getChallenge(id: string): ChallengeMeta | undefined {
    return CHALLENGES.find((c) => c.id === id || c.slug === id);
}

export function getChallengeForLesson(lessonSlug: string): ChallengeMeta | undefined {
    return CHALLENGES.find((c) => c.lessonSlug === lessonSlug);
}

export function getChallengesByCategory(category: string): ChallengeMeta[] {
    return CHALLENGES.filter((c) => c.category === category);
}
