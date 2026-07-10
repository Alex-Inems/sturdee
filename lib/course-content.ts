import type { Course, CourseCategory } from "@/lib/courses";

export interface CourseLesson {
    slug: string;
    title: string;
    duration: string;
    description: string;
    tutorialLink?: string;
}

export interface CourseModule {
    title: string;
    lessons: CourseLesson[];
}

const WEB_MODULES: CourseModule[] = [
    {
        title: "Foundations",
        lessons: [
            { slug: "environment-setup", title: "Development Environment Setup", duration: "45 min", description: "Install Node.js, Git, VS Code, and configure your local toolchain for web development.", tutorialLink: "/tutorials/javascript/javascript_intro" },
            { slug: "html-semantics", title: "Semantic HTML & Document Structure", duration: "60 min", description: "Build accessible page structure with semantic tags, meta tags, and SEO-ready markup.", tutorialLink: "/tutorials/html/html_elements" },
            { slug: "css-layout-basics", title: "CSS Layout Fundamentals", duration: "75 min", description: "Master the box model, Flexbox, and responsive breakpoints for modern layouts.", tutorialLink: "/tutorials/css/css_layout" },
        ],
    },
    {
        title: "Frontend Engineering",
        lessons: [
            { slug: "react-components", title: "React Components & State", duration: "90 min", description: "Build reusable UI with props, state, hooks, and component composition patterns.", tutorialLink: "/tutorials/javascript/javascript_functions" },
            { slug: "nextjs-routing", title: "Next.js App Router & SSR", duration: "90 min", description: "File-based routing, server components, layouts, and streaming for production apps.", tutorialLink: "/tutorials/javascript/javascript_async" },
            { slug: "forms-validation", title: "Forms, Validation & UX", duration: "60 min", description: "Client and server validation, error states, and accessible form patterns.", tutorialLink: "/tutorials/html/html_forms" },
        ],
    },
    {
        title: "Backend & Deployment",
        lessons: [
            { slug: "rest-api-design", title: "REST API Design with Node.js", duration: "90 min", description: "Design RESTful endpoints, middleware, error handling, and API versioning.", tutorialLink: "/tutorials/javascript/javascript_fetch" },
            { slug: "auth-sessions", title: "Authentication & Sessions", duration: "75 min", description: "JWT, cookies, OAuth flows, and secure session management.", tutorialLink: "/tutorials/javascript/javascript_objects" },
            { slug: "deploy-ci-cd", title: "Deployment & CI/CD Pipelines", duration: "60 min", description: "Deploy to Vercel, environment variables, preview deployments, and automated testing.", tutorialLink: "/tutorials/javascript/javascript_errors" },
        ],
    },
    {
        title: "Capstone",
        lessons: [
            { slug: "project-planning", title: "Capstone Project Planning", duration: "45 min", description: "Scope features, choose architecture, and define milestones for your portfolio project." },
            { slug: "code-review", title: "Code Review & Refactoring", duration: "60 min", description: "Peer review workflows, refactoring techniques, and production code standards." },
            { slug: "portfolio-launch", title: "Portfolio Launch & Presentation", duration: "45 min", description: "Ship your capstone, write documentation, and present to hiring partners." },
        ],
    },
];

const PROG_MODULES: CourseModule[] = [
    {
        title: "Language Mastery",
        lessons: [
            { slug: "syntax-fundamentals", title: "Syntax & Type Systems", duration: "60 min", description: "Core syntax, static typing, generics, and language idioms for professional code.", tutorialLink: "/tutorials/python/python_syntax" },
            { slug: "oop-patterns", title: "Object-Oriented Design Patterns", duration: "90 min", description: "Classes, interfaces, inheritance, composition, and SOLID principles.", tutorialLink: "/tutorials/java/java_oop" },
            { slug: "functional-programming", title: "Functional Programming Concepts", duration: "75 min", description: "Immutability, higher-order functions, map/filter/reduce, and pure functions.", tutorialLink: "/tutorials/javascript/javascript_functions" },
        ],
    },
    {
        title: "Software Engineering",
        lessons: [
            { slug: "testing-strategies", title: "Unit & Integration Testing", duration: "90 min", description: "Write test suites with pytest/Jest, mocking, TDD, and coverage targets.", tutorialLink: "/tutorials/python/python_errors" },
            { slug: "clean-architecture", title: "Clean Architecture & Modules", duration: "75 min", description: "Layered architecture, dependency injection, and maintainable package structure." },
            { slug: "async-concurrency", title: "Async I/O & Concurrency", duration: "90 min", description: "Event loops, promises, threading models, and safe concurrent patterns.", tutorialLink: "/tutorials/python/python_async" },
        ],
    },
    {
        title: "Algorithms & Systems",
        lessons: [
            { slug: "big-o-analysis", title: "Big-O Complexity Analysis", duration: "60 min", description: "Analyze time and space complexity for arrays, trees, graphs, and sorting.", tutorialLink: "/tutorials/javascript/javascript_arrays" },
            { slug: "data-structures", title: "Core Data Structures", duration: "90 min", description: "Stacks, queues, hash maps, trees, and graphs with implementation practice.", tutorialLink: "/tutorials/typescript/typescript_arrays" },
            { slug: "system-design", title: "System Design Fundamentals", duration: "90 min", description: "Scalability, caching, load balancing, and API design for interviews." },
        ],
    },
];

const CRYPTO_MODULES: CourseModule[] = [
    {
        title: "Blockchain Foundations",
        lessons: [
            { slug: "bitcoin-architecture", title: "Bitcoin & Ethereum Architecture", duration: "75 min", description: "Consensus, blocks, transactions, wallets, and network topology.", tutorialLink: "/tutorials/solidity/solidity_intro" },
            { slug: "wallets-keys", title: "Wallets, Keys & Addresses", duration: "60 min", description: "Public/private keys, HD wallets, seed phrases, and secure key management." },
            { slug: "gas-economics", title: "Gas, Fees & Transaction Lifecycle", duration: "45 min", description: "Gas limits, EIP-1559, mempool dynamics, and cost optimization." },
        ],
    },
    {
        title: "Smart Contract Development",
        lessons: [
            { slug: "solidity-basics", title: "Solidity Language Fundamentals", duration: "90 min", description: "Types, functions, modifiers, events, and contract structure.", tutorialLink: "/tutorials/solidity/solidity_syntax" },
            { slug: "hardhat-tooling", title: "Hardhat Development Environment", duration: "75 min", description: "Compile, test, deploy, and debug contracts with Hardhat and/ethers.js.", tutorialLink: "/tutorials/solidity/solidity_deploy" },
            { slug: "testing-contracts", title: "Smart Contract Testing", duration: "90 min", description: "Unit tests, fork testing, fuzzing basics, and testnet deployment.", tutorialLink: "/tutorials/solidity/solidity_testing" },
        ],
    },
    {
        title: "Security & DeFi",
        lessons: [
            { slug: "common-vulnerabilities", title: "Common Vulnerability Patterns", duration: "90 min", description: "Reentrancy, overflow, access control flaws, and oracle manipulation.", tutorialLink: "/tutorials/solidity/solidity_security" },
            { slug: "defi-mechanics", title: "DeFi Protocol Mechanics", duration: "75 min", description: "AMMs, lending pools, liquidity mining, and governance tokens." },
            { slug: "audit-reporting", title: "Audit Findings & Reporting", duration: "60 min", description: "Write professional audit reports and participate in bug bounty programs." },
        ],
    },
];

const MODULES_BY_CATEGORY: Record<CourseCategory, CourseModule[]> = {
    "Web Development": WEB_MODULES,
    Programming: PROG_MODULES,
    Cryptocurrency: CRYPTO_MODULES,
};

export function getCourseCurriculum(course: Course): CourseModule[] {
    return MODULES_BY_CATEGORY[course.category];
}

export function getCourseLesson(course: Course, lessonSlug: string): { module: CourseModule; lesson: CourseLesson } | undefined {
    for (const mod of getCourseCurriculum(course)) {
        const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
        if (lesson) return { module: mod, lesson };
    }
    return undefined;
}

export function getAllCourseLessonParams(): { slug: string; lessonSlug: string }[] {
    // imported dynamically in page to avoid circular deps - we'll export a function that takes courses array
    return [];
}

export function courseOutcomes(category: CourseCategory): string[] {
    const map: Record<CourseCategory, string[]> = {
        "Web Development": [
            "Build and deploy full-stack web applications with React and Node.js",
            "Design responsive, accessible interfaces with modern CSS",
            "Implement authentication, APIs, and production deployment pipelines",
            "Pass technical interviews for junior and mid-level frontend roles",
        ],
        Programming: [
            "Write production-quality code with testing and clean architecture",
            "Solve algorithmic problems with optimal time and space complexity",
            "Build CLI tools, APIs, and services in Python, TypeScript, or Rust",
            "Contribute confidently to professional codebases and open source",
        ],
        Cryptocurrency: [
            "Develop, test, and deploy Solidity smart contracts to testnets",
            "Understand DeFi protocol design and tokenomics fundamentals",
            "Identify and mitigate common smart contract vulnerabilities",
            "Analyze cryptocurrency markets with institutional risk frameworks",
        ],
    };
    return map[category];
}

export function coursePrerequisites(course: Course): string[] {
    if (course.level === "Beginner") {
        return ["Basic computer literacy", "No prior programming experience required"];
    }
    if (course.level === "Intermediate") {
        return [`Foundational ${course.category.toLowerCase()} knowledge`, "Comfort with command-line tools", "2–4 hours per week for practice"];
    }
    return [`Strong ${course.category.toLowerCase()} fundamentals`, "Prior coursework or 1+ years experience", "Completed intermediate courses recommended"];
}

export function courseFaqs(course: Course): { question: string; answer: string }[] {
    return [
        {
            question: `How long is ${course.title}?`,
            answer: `This course runs for ${course.duration} (${course.hours} instructional hours) in a ${course.format.toLowerCase()} format with instructor office hours.`,
        },
        {
            question: "Do I get a certificate?",
            answer: "Yes. Each module has a free micro-certificate challenge. Pass by pushing bug-free code to a simulated Git repo — Sturdee issues a cryptographically signed credential with a public verify URL, not a paid multiple-choice quiz.",
        },
        {
            question: "Can I access free tutorials alongside this course?",
            answer: `Yes. Sturdee offers free interactive tutorials in ${course.category.toLowerCase()} that complement every lesson in this course.`,
        },
        {
            question: "What is the refund policy?",
            answer: "Full refund within 14 days of enrollment if you have not completed more than 20% of course content. See our Terms of Service for details.",
        },
    ];
}
