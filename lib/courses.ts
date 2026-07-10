import type { CourseModule } from "@/lib/course-content";
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
    instructorSlug: string;
    instructorTitle: string;
    instructorImage: string;
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
    modules: CourseModule[];
    tutorProfileId: string;
}

export interface LearningPath {
    id: string;
    slug: string;
    title: string;
    category: CourseCategory;
    duration: string;
    image: string;
    tag: string;
    description: string;
    outcomes: string[];
}

export const COURSE_CATEGORIES: CourseCategory[] = [
    "Web Development",
    "Programming",
    "Cryptocurrency",
];

export const LEARNING_PATHS: LearningPath[] = [
    {
        id: "path-web",
        slug: "full-stack-web-development",
        title: "Full-Stack Web Development",
        category: "Web Development",
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

export function formatStudents(n: number) {
    return n.toLocaleString("en-US");
}

export function formatPrice(n: number) {
    return n.toLocaleString("en-US");
}

export function getLearningPath(slug: string): LearningPath | undefined {
    return LEARNING_PATHS.find((p) => p.slug === slug);
}

export function getCoursesForPath(path: LearningPath, courses: Course[]): Course[] {
    return courses.filter((c) => c.category === path.category);
}

export function countCoursesForPath(path: LearningPath, courses: Course[]): number {
    return getCoursesForPath(path, courses).length;
}
