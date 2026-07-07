import { IMAGES } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

export interface MediaAsset {
    slug: string;
    title: string;
    alt: string;
    description: string;
    path: string;
    category: "courses" | "programs" | "instructors" | "featured" | "paths";
    width: number;
    height: number;
    usedOn: string[];
}

export const MEDIA_ASSETS: MediaAsset[] = [
    {
        slug: "featured-leadership",
        title: "Leadership in Technology Education",
        alt: "Students collaborating on leadership and technology projects at Sturdee",
        description:
            "Featured imagery representing leadership-focused technology education programs and executive learning paths at Sturdee.",
        path: IMAGES.featuredLeadership,
        category: "featured",
        width: 1200,
        height: 800,
        usedOn: ["/", "/programs"],
    },
    {
        slug: "featured-innovation",
        title: "Innovation & Emerging Technology",
        alt: "Innovation lab with developers building blockchain and web applications",
        description:
            "Visual representing innovation tracks in blockchain, DeFi, and cutting-edge web development courses.",
        path: IMAGES.featuredInnovation,
        category: "featured",
        width: 1200,
        height: 800,
        usedOn: ["/", "/courses"],
    },
    {
        slug: "featured-digital",
        title: "Digital Product Engineering",
        alt: "Full-stack developer building a React and Node.js application",
        description:
            "Course hero image for full-stack web development with React, Next.js, and Node.js production engineering.",
        path: IMAGES.featuredDigital,
        category: "courses",
        width: 1200,
        height: 800,
        usedOn: ["/courses/full-stack-react-node"],
    },
    {
        slug: "path-business",
        title: "Web Development Learning Path",
        alt: "Students learning HTML, CSS, and JavaScript fundamentals",
        description:
            "Learning path imagery for full-stack web development from HTML fundamentals to deployed applications.",
        path: IMAGES.pathBusiness,
        category: "paths",
        width: 1200,
        height: 1600,
        usedOn: ["/programs/full-stack-web-development", "/courses/html-javascript-fundamentals"],
    },
    {
        slug: "path-leadership",
        title: "Professional Programming Path",
        alt: "Software engineers pair programming in Python and TypeScript",
        description:
            "Visual for the professional programming learning path covering Python, TypeScript, and systems design.",
        path: IMAGES.pathLeadership,
        category: "paths",
        width: 1200,
        height: 1600,
        usedOn: ["/programs/professional-programming"],
    },
    {
        slug: "path-innovation",
        title: "Blockchain & Cryptocurrency Path",
        alt: "Blockchain developer reviewing smart contract code on screen",
        description:
            "Learning path image for blockchain, smart contracts, DeFi protocol design, and cryptocurrency markets.",
        path: IMAGES.pathInnovation,
        category: "paths",
        width: 1200,
        height: 1600,
        usedOn: ["/programs/blockchain-cryptocurrency"],
    },
    {
        slug: "instructor-james",
        title: "Dr. Elena Vasquez — Full-Stack Instructor",
        alt: "Dr. Elena Vasquez, full-stack web development instructor at Sturdee",
        description:
            "Faculty portrait of Dr. Elena Vasquez, Staff Engineer and instructor for React, Next.js, and production web engineering courses.",
        path: IMAGES.instructorJames,
        category: "instructors",
        width: 400,
        height: 400,
        usedOn: ["/instructors/elena-vasquez"],
    },
    {
        slug: "instructor-sarah",
        title: "Prof. Marcus Okonkwo — Programming Instructor",
        alt: "Prof. Marcus Okonkwo, programming and algorithms instructor at Sturdee",
        description:
            "Faculty portrait of Prof. Marcus Okonkwo teaching Python, algorithms, and professional software engineering.",
        path: IMAGES.instructorSarah,
        category: "instructors",
        width: 400,
        height: 400,
        usedOn: ["/instructors/marcus-okonkwo"],
    },
    {
        slug: "instructor-michael",
        title: "Dr. Priya Sharma — Blockchain Instructor",
        alt: "Dr. Priya Sharma, blockchain and cryptocurrency instructor at Sturdee",
        description:
            "Faculty portrait of Dr. Priya Sharma, Dean of Technology and instructor for Solidity, DeFi, and smart contract security.",
        path: IMAGES.instructorMichael,
        category: "instructors",
        width: 400,
        height: 400,
        usedOn: ["/instructors/priya-sharma"],
    },
    {
        slug: "courses-ethics",
        title: "Technology Ethics & Secure Engineering",
        alt: "Engineers discussing secure coding and ethical technology practices",
        description:
            "Course imagery for advanced topics including Next.js production engineering, Solidity security auditing, and secure systems.",
        path: IMAGES.coursesEthics,
        category: "courses",
        width: 1200,
        height: 800,
        usedOn: ["/courses/nextjs-production-engineering", "/courses/solidity-security-auditing"],
    },
    {
        slug: "programs-students",
        title: "Sturdee Students in Academic Programs",
        alt: "Diverse group of Sturdee students in a graduate technology program",
        description:
            "Campus imagery for structured academic programs, MBA tracks, and professional certificate pathways.",
        path: IMAGES.programsStudents,
        category: "programs",
        width: 1200,
        height: 1500,
        usedOn: ["/programs"],
    },
    {
        slug: "instructors-dean",
        title: "Dr. Priya Sharma — Dean of Technology",
        alt: "Dr. Priya Sharma, Dean of Technology at Sturdee",
        description:
            "Dean spotlight portrait for Dr. Priya Sharma leading blockchain, cryptocurrency, and technology programs.",
        path: IMAGES.instructorsDean,
        category: "instructors",
        width: 1200,
        height: 1500,
        usedOn: ["/instructors", "/instructors/priya-sharma"],
    },
    {
        slug: "faculty-a",
        title: "Frontend & Digital Assets Faculty",
        alt: "Sturdee faculty member teaching frontend architecture and digital asset markets",
        description:
            "Faculty imagery used for CSS layout courses, cryptocurrency trading, and web foundations instruction.",
        path: IMAGES.facultyA,
        category: "instructors",
        width: 400,
        height: 400,
        usedOn: ["/instructors/jordan-blake", "/instructors/alexandre-dubois"],
    },
    {
        slug: "faculty-b",
        title: "Systems & Enterprise Engineering Faculty",
        alt: "Sturdee faculty member teaching systems programming and enterprise Java",
        description:
            "Faculty portrait for Rust systems programming and enterprise Java application development courses.",
        path: IMAGES.facultyB,
        category: "instructors",
        width: 400,
        height: 400,
        usedOn: ["/instructors/yuki-nakamura", "/instructors/james-whitfield"],
    },
    {
        slug: "faculty-c",
        title: "DeFi & Protocol Design Faculty",
        alt: "Sturdee faculty member teaching DeFi protocol design and tokenomics",
        description:
            "Faculty imagery for DeFi protocol design, tokenomics, and advanced cryptocurrency engineering programs.",
        path: IMAGES.facultyC,
        category: "instructors",
        width: 400,
        height: 400,
        usedOn: ["/courses/defi-protocol-design"],
    },
    {
        slug: "hero-student",
        title: "Learn to Code on Sturdee",
        alt: "Student learning to code with interactive tutorials on Sturdee",
        description:
            "Homepage hero image showing a student engaging with free interactive programming tutorials and courses.",
        path: "/images/hero-student.webp",
        category: "featured",
        width: 1200,
        height: 900,
        usedOn: ["/"],
    },
];

export function getMediaAsset(slug: string): MediaAsset | undefined {
    return MEDIA_ASSETS.find((asset) => asset.slug === slug);
}

export function mediaAbsoluteUrl(path: string): string {
    return `${SITE_URL}${path}`;
}
