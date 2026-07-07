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
    slug: string;
    title: string;
    category: CourseCategory;
    courses: number;
    duration: string;
    image: string;
    tag: string;
    description: string;
    outcomes: string[];
}

export interface Instructor {
    slug: string;
    name: string;
    title: string;
    credentials: string;
    image: string;
    courses: string[];
    bio: string;
    expertise: string[];
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
        slug: "full-stack-web-development",
        title: "Full-Stack Web Development",
        category: "Web Development",
        courses: 18,
        duration: "5 months",
        image: IMAGES.pathBusiness,
        tag: "Popular",
        description: "From HTML fundamentals to deployed Next.js applications with CI/CD.",
        outcomes: [
            "Build responsive websites with HTML, CSS, and JavaScript",
            "Create React and Next.js applications with server-side rendering",
            "Deploy production apps with authentication and APIs",
            "Qualify for frontend and full-stack developer roles",
        ],
    },
    {
        id: "path-prog",
        slug: "professional-programming",
        title: "Professional Programming",
        category: "Programming",
        courses: 22,
        duration: "6 months",
        image: IMAGES.pathLeadership,
        tag: "New",
        description: "Python, TypeScript, systems design, and enterprise patterns for software careers.",
        outcomes: [
            "Write tested, maintainable code in Python and TypeScript",
            "Master data structures and algorithmic problem solving",
            "Design scalable systems for technical interviews",
            "Contribute to enterprise and open-source codebases",
        ],
    },
    {
        id: "path-crypto",
        slug: "blockchain-cryptocurrency",
        title: "Blockchain & Cryptocurrency",
        category: "Cryptocurrency",
        courses: 16,
        duration: "4 months",
        image: IMAGES.pathInnovation,
        tag: "Featured",
        description: "Smart contracts, DeFi protocols, security auditing, and digital asset markets.",
        outcomes: [
            "Develop and deploy Solidity smart contracts",
            "Understand DeFi protocol mechanics and tokenomics",
            "Audit contracts for common vulnerability patterns",
            "Analyze cryptocurrency markets with risk frameworks",
        ],
    },
];

export const INSTRUCTORS: Instructor[] = [
    {
        slug: "elena-vasquez",
        name: "Dr. Elena Vasquez",
        title: "Full-Stack Web Development",
        credentials: "Staff Engineer, ex-Vercel",
        image: IMAGES.instructorJames,
        courses: ["WEB-401", "WEB-510"],
        bio: "Dr. Vasquez spent six years at Vercel building the App Router and edge middleware stack. She now teaches production Next.js engineering and full-stack architecture to thousands of developers worldwide.",
        expertise: ["React", "Next.js", "Node.js", "Edge Computing", "Performance"],
    },
    {
        slug: "marcus-okonkwo",
        name: "Prof. Marcus Okonkwo",
        title: "Programming & Algorithms",
        credentials: "Adjunct Faculty, Carnegie Mellon",
        image: IMAGES.instructorSarah,
        courses: ["PROG-301", "PROG-420"],
        bio: "Prof. Okonkwo teaches algorithms and software engineering at Carnegie Mellon while consulting for fintech firms. His students consistently place in top-tier engineering roles.",
        expertise: ["Python", "TypeScript", "Algorithms", "System Design", "Testing"],
    },
    {
        slug: "priya-sharma",
        name: "Dr. Priya Sharma",
        title: "Blockchain & Cryptocurrency",
        credentials: "Stanford Blockchain Lab",
        image: IMAGES.instructorMichael,
        courses: ["CRY-301", "CRY-410", "CRY-505"],
        bio: "Dr. Sharma leads Sturdee's technology programs after a decade at the Stanford Blockchain Lab. Her research on smart contract security has been cited in over 2,400 peer-reviewed papers.",
        expertise: ["Solidity", "DeFi", "Smart Contract Security", "Tokenomics", "Formal Verification"],
    },
];

export const EXTENDED_INSTRUCTORS: Instructor[] = [
    ...INSTRUCTORS,
    {
        slug: "jordan-blake",
        name: "Jordan Blake",
        title: "Frontend Architecture",
        credentials: "Principal Engineer, Stripe",
        image: IMAGES.facultyA,
        courses: ["WEB-302"],
        bio: "Jordan architects design systems and payment UI at Stripe. He teaches advanced CSS, layout systems, and component-driven design tokens.",
        expertise: ["CSS", "Design Systems", "Tailwind", "Accessibility", "Component Architecture"],
    },
    {
        slug: "yuki-nakamura",
        name: "Dr. Yuki Nakamura",
        title: "Systems Programming",
        credentials: "Systems Engineer, Cloudflare",
        image: IMAGES.facultyB,
        courses: ["PROG-350"],
        bio: "Dr. Nakamura builds memory-safe network services at Cloudflare using Rust. Her course covers ownership, concurrency, and WASM deployment.",
        expertise: ["Rust", "Systems Programming", "WASM", "Networking", "Concurrency"],
    },
    {
        slug: "alexandre-dubois",
        name: "Alexandre Dubois",
        title: "Digital Asset Markets",
        credentials: "Former Head of Digital Assets, Citadel",
        image: IMAGES.facultyC,
        courses: ["CRY-220"],
        bio: "Alexandre managed digital asset trading desks at Citadel before teaching cryptocurrency markets, derivatives, and institutional risk management.",
        expertise: ["Trading", "Derivatives", "Risk Management", "On-Chain Analytics", "Compliance"],
    },
    {
        slug: "mia-torres",
        name: "Mia Torres",
        title: "Web Foundations",
        credentials: "Curriculum Lead, freeCodeCamp",
        image: IMAGES.facultyA,
        courses: ["WEB-210"],
        bio: "Mia designed freeCodeCamp's responsive web design curriculum. She specializes in teaching HTML, JavaScript, and accessibility to absolute beginners.",
        expertise: ["HTML", "JavaScript", "Accessibility", "Curriculum Design", "Beginner Education"],
    },
    {
        slug: "james-whitfield",
        name: "James Whitfield",
        title: "Enterprise Java",
        credentials: "Principal Engineer, JPMorgan Chase",
        image: IMAGES.facultyB,
        courses: ["PROG-205"],
        bio: "James builds microservices and event-driven systems at JPMorgan Chase. He teaches Spring Boot, Kafka, and secure API design for regulated industries.",
        expertise: ["Java", "Spring Boot", "Kafka", "Microservices", "Enterprise Architecture"],
    },
];

export const FEATURED_COURSES = COURSES.filter((c) => c.featured);

export function formatStudents(n: number) {
    return n.toLocaleString("en-US");
}

export function formatPrice(n: number) {
    return n.toLocaleString("en-US");
}

export function getCourse(slug: string): Course | undefined {
    return COURSES.find((c) => c.slug === slug);
}

export function getLearningPath(slug: string): LearningPath | undefined {
    return LEARNING_PATHS.find((p) => p.slug === slug);
}

export function getInstructor(slug: string): Instructor | undefined {
    return EXTENDED_INSTRUCTORS.find((i) => i.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
    return COURSES.filter((c) => c.category === category);
}

export function getCoursesByInstructor(instructorName: string): Course[] {
    return COURSES.filter((c) => c.instructor === instructorName);
}

export function getCoursesForPath(path: LearningPath): Course[] {
    return COURSES.filter((c) => c.category === path.category);
}
