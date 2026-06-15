import { IMAGES } from "@/lib/images";

export type CourseCategory = "Web Development" | "Programming" | "Cryptocurrency";

export interface Course {
    id: string;
    code: string;
    slug: string;
    title: string;
    category: CourseCategory;
    level: "Beginner" | "Intermediate" | "Advanced";
    instructor: string;
    instructorTitle: string;
    duration: string;
    hours: number;
    students: number;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    image: string;
    format: "Cohort" | "Self-paced" | "Live";
    featured?: boolean;
    updatedAt: string;
}

export interface LearningPath {
    id: string;
    title: string;
    category: CourseCategory;
    courses: number;
    duration: string;
    image: string;
    tag: string;
    description: string;
}

export interface Instructor {
    name: string;
    title: string;
    credentials: string;
    image: string;
    courses: string[];
}

export const COURSE_CATEGORIES: CourseCategory[] = [
    "Web Development",
    "Programming",
    "Cryptocurrency",
];

export const COURSES: Course[] = [
    {
        id: "web-401",
        code: "WEB-401",
        slug: "full-stack-react-node",
        title: "Full-Stack Web Development with React & Node.js",
        category: "Web Development",
        level: "Intermediate",
        instructor: "Dr. Elena Vasquez",
        instructorTitle: "Staff Engineer, ex-Vercel",
        duration: "10 weeks",
        hours: 52,
        students: 3847,
        price: 1899,
        rating: 4.9,
        reviews: 612,
        description:
            "Build production-grade applications with React 19, Next.js App Router, REST APIs, authentication, and deployment pipelines on Vercel and AWS.",
        image: IMAGES.featuredDigital,
        format: "Cohort",
        featured: true,
        updatedAt: "2026-01-14",
    },
    {
        id: "web-302",
        code: "WEB-302",
        slug: "advanced-css-layouts",
        title: "Advanced CSS, Layout Systems & Design Tokens",
        category: "Web Development",
        level: "Intermediate",
        instructor: "Jordan Blake",
        instructorTitle: "Principal Frontend Engineer, Stripe",
        duration: "6 weeks",
        hours: 32,
        students: 2914,
        price: 1299,
        rating: 4.8,
        reviews: 438,
        description:
            "Master modern CSS: Grid, Flexbox, container queries, Tailwind 4, responsive architecture, and component-driven design systems.",
        image: IMAGES.featuredInnovation,
        format: "Self-paced",
        updatedAt: "2026-02-03",
    },
    {
        id: "web-510",
        code: "WEB-510",
        slug: "nextjs-production-engineering",
        title: "Next.js Production Engineering",
        category: "Web Development",
        level: "Advanced",
        instructor: "Dr. Elena Vasquez",
        instructorTitle: "Staff Engineer, ex-Vercel",
        duration: "8 weeks",
        hours: 44,
        students: 1876,
        price: 2199,
        rating: 4.9,
        reviews: 284,
        description:
            "Server Components, streaming SSR, edge middleware, caching strategies, observability, and performance budgets for high-traffic apps.",
        image: IMAGES.coursesEthics,
        format: "Live",
        updatedAt: "2026-01-28",
    },
    {
        id: "web-210",
        code: "WEB-210",
        slug: "html-javascript-fundamentals",
        title: "HTML, JavaScript & DOM Fundamentals",
        category: "Web Development",
        level: "Beginner",
        instructor: "Mia Torres",
        instructorTitle: "Curriculum Lead, freeCodeCamp",
        duration: "8 weeks",
        hours: 40,
        students: 5621,
        price: 899,
        rating: 4.7,
        reviews: 891,
        description:
            "Semantic HTML, ES2024 JavaScript, async/await, fetch API, accessibility, and browser DevTools from first principles.",
        image: IMAGES.pathBusiness,
        format: "Cohort",
        updatedAt: "2025-12-09",
    },
    {
        id: "prog-301",
        code: "PROG-301",
        slug: "python-software-engineering",
        title: "Python for Professional Software Engineering",
        category: "Programming",
        level: "Intermediate",
        instructor: "Prof. Marcus Okonkwo",
        instructorTitle: "Adjunct Faculty, Carnegie Mellon",
        duration: "12 weeks",
        hours: 56,
        students: 4238,
        price: 1799,
        rating: 4.9,
        reviews: 703,
        description:
            "OOP, typing, testing with pytest, packaging, async I/O, FastAPI services, and clean architecture patterns used in industry.",
        image: IMAGES.featuredLeadership,
        format: "Cohort",
        featured: true,
        updatedAt: "2026-01-20",
    },
    {
        id: "prog-420",
        code: "PROG-420",
        slug: "data-structures-typescript",
        title: "Data Structures & Algorithms in TypeScript",
        category: "Programming",
        level: "Advanced",
        instructor: "Prof. Marcus Okonkwo",
        instructorTitle: "Adjunct Faculty, Carnegie Mellon",
        duration: "10 weeks",
        hours: 48,
        students: 3156,
        price: 1999,
        rating: 4.8,
        reviews: 521,
        description:
            "Big-O analysis, graphs, dynamic programming, system design interviews, and LeetCode-style problem solving with rigorous proofs.",
        image: IMAGES.pathLeadership,
        format: "Live",
        updatedAt: "2026-02-01",
    },
    {
        id: "prog-350",
        code: "PROG-350",
        slug: "systems-programming-rust",
        title: "Systems Programming with Rust",
        category: "Programming",
        level: "Advanced",
        instructor: "Dr. Yuki Nakamura",
        instructorTitle: "Systems Engineer, Cloudflare",
        duration: "9 weeks",
        hours: 42,
        students: 1432,
        price: 2299,
        rating: 4.9,
        reviews: 198,
        description:
            "Ownership, borrowing, concurrency, WASM targets, CLI tooling, and building memory-safe network services from scratch.",
        image: IMAGES.pathInnovation,
        format: "Cohort",
        updatedAt: "2026-01-06",
    },
    {
        id: "prog-205",
        code: "PROG-205",
        slug: "java-enterprise-applications",
        title: "Java & Enterprise Application Development",
        category: "Programming",
        level: "Intermediate",
        instructor: "James Whitfield",
        instructorTitle: "Principal Engineer, JPMorgan Chase",
        duration: "11 weeks",
        hours: 50,
        students: 2687,
        price: 1699,
        rating: 4.7,
        reviews: 412,
        description:
            "Spring Boot, JPA, microservices, event-driven messaging with Kafka, and secure API design for regulated industries.",
        image: IMAGES.facultyB,
        format: "Cohort",
        updatedAt: "2025-11-22",
    },
    {
        id: "cry-301",
        code: "CRY-301",
        slug: "blockchain-smart-contracts",
        title: "Blockchain Fundamentals & Smart Contract Development",
        category: "Cryptocurrency",
        level: "Intermediate",
        instructor: "Dr. Priya Sharma",
        instructorTitle: "Research Fellow, Stanford Blockchain Lab",
        duration: "10 weeks",
        hours: 46,
        students: 3521,
        price: 2099,
        rating: 4.9,
        reviews: 567,
        description:
            "Bitcoin and Ethereum architecture, wallets, gas optimization, Solidity, Hardhat, testing, and deploying to mainnet testnets.",
        image: IMAGES.featuredInnovation,
        format: "Cohort",
        featured: true,
        updatedAt: "2026-01-31",
    },
    {
        id: "cry-410",
        code: "CRY-410",
        slug: "defi-protocol-design",
        title: "DeFi Protocol Design & Tokenomics",
        category: "Cryptocurrency",
        level: "Advanced",
        instructor: "Dr. Priya Sharma",
        instructorTitle: "Research Fellow, Stanford Blockchain Lab",
        duration: "8 weeks",
        hours: 38,
        students: 1984,
        price: 2499,
        rating: 4.8,
        reviews: 301,
        description:
            "AMM mechanics, lending pools, governance tokens, audit checklists, MEV risks, and building on Uniswap v4 hooks.",
        image: IMAGES.facultyC,
        format: "Live",
        updatedAt: "2026-02-10",
    },
    {
        id: "cry-220",
        code: "CRY-220",
        slug: "crypto-trading-risk",
        title: "Cryptocurrency Markets, Trading & Risk Management",
        category: "Cryptocurrency",
        level: "Intermediate",
        instructor: "Alexandre Dubois",
        instructorTitle: "Former Head of Digital Assets, Citadel",
        duration: "7 weeks",
        hours: 34,
        students: 2763,
        price: 1599,
        rating: 4.7,
        reviews: 389,
        description:
            "Order books, derivatives, on-chain analytics, portfolio hedging, compliance frameworks, and institutional custody models.",
        image: IMAGES.facultyA,
        format: "Self-paced",
        updatedAt: "2026-01-18",
    },
    {
        id: "cry-505",
        code: "CRY-505",
        slug: "solidity-security-auditing",
        title: "Solidity Security & Smart Contract Auditing",
        category: "Cryptocurrency",
        level: "Advanced",
        instructor: "Dr. Priya Sharma",
        instructorTitle: "Research Fellow, Stanford Blockchain Lab",
        duration: "6 weeks",
        hours: 30,
        students: 1247,
        price: 2799,
        rating: 5.0,
        reviews: 156,
        description:
            "Reentrancy, oracle manipulation, flash-loan attacks, formal verification basics, and reporting findings to Immunefi programs.",
        image: IMAGES.coursesEthics,
        format: "Live",
        updatedAt: "2026-02-14",
    },
];

export const LEARNING_PATHS: LearningPath[] = [
    {
        id: "path-web",
        title: "Full-Stack Web Development",
        category: "Web Development",
        courses: 18,
        duration: "5 months",
        image: IMAGES.pathBusiness,
        tag: "Popular",
        description: "From HTML fundamentals to deployed Next.js applications with CI/CD.",
    },
    {
        id: "path-prog",
        title: "Professional Programming",
        category: "Programming",
        courses: 22,
        duration: "6 months",
        image: IMAGES.pathLeadership,
        tag: "New",
        description: "Python, TypeScript, systems design, and enterprise patterns for software careers.",
    },
    {
        id: "path-crypto",
        title: "Blockchain & Cryptocurrency",
        category: "Cryptocurrency",
        courses: 16,
        duration: "4 months",
        image: IMAGES.pathInnovation,
        tag: "Featured",
        description: "Smart contracts, DeFi protocols, security auditing, and digital asset markets.",
    },
];

export const INSTRUCTORS: Instructor[] = [
    {
        name: "Dr. Elena Vasquez",
        title: "Full-Stack Web Development",
        credentials: "Staff Engineer, ex-Vercel",
        image: IMAGES.instructorJames,
        courses: ["WEB-401", "WEB-510"],
    },
    {
        name: "Prof. Marcus Okonkwo",
        title: "Programming & Algorithms",
        credentials: "Adjunct Faculty, Carnegie Mellon",
        image: IMAGES.instructorSarah,
        courses: ["PROG-301", "PROG-420"],
    },
    {
        name: "Dr. Priya Sharma",
        title: "Blockchain & Cryptocurrency",
        credentials: "Stanford Blockchain Lab",
        image: IMAGES.instructorMichael,
        courses: ["CRY-301", "CRY-410", "CRY-505"],
    },
];

export const FEATURED_COURSES = COURSES.filter((c) => c.featured);

export function formatStudents(n: number) {
    return n.toLocaleString("en-US");
}

export function formatPrice(n: number) {
    return n.toLocaleString("en-US");
}
