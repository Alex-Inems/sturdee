/**
 * SEO keyword strategy for Sturdee (research-backed, Oct 2026).
 *
 * Strategy: do NOT chase head terms like "online courses" alone.
 * Rank on free + AI + subject long-tails, then expand to mid-tier hubs.
 */

/**
 * Keyword research notes (education platforms, 2025–2026):
 * Head terms (very hard): "e learning", "online courses", "free online courses",
 *   "learn to code", "online learning platforms" — dominated by Coursera/Udemy/FCC.
 * Winnable long-tails we target: free + subject + intent ("learn X free",
 *   "X tutorial for beginners", "prompt engineering course free").
 * Competitor title patterns: freeCodeCamp "Learn to Code — For Free";
 *   Codecademy "Learn to Code - for Free"; Coursera prompt-engineering course titles.
 */
export const PRIMARY_KEYWORDS = [
    "learn artificial intelligence",
    "learn to code for free",
    "free coding tutorials",
    "prompt engineering",
    "AI tutorials",
    "free generative AI courses",
    "learn to code with AI",
    "free online courses",
] as const;

export const SECONDARY_KEYWORDS = [
    "prompt engineering course free",
    "interactive coding lessons",
    "JavaScript tutorial for beginners",
    "Python tutorial free",
    "HTML CSS JavaScript free course",
    "Shopify Liquid tutorial",
    "SQL tutorial for beginners free",
    "live AI cohort",
    "AI bootcamp online",
    "learn web development free",
    "free AI courses online",
    "learn programming online free",
    "coding for beginners",
    "best free coding tutorials",
] as const;

export type LearnHub = {
    slug: string;
    title: string;
    h1: string;
    description: string;
    keywords: string[];
    bullets: string[];
    faqs: { question: string; answer: string }[];
    ctaPrimary: { href: string; label: string };
    ctaSecondary: { href: string; label: string };
};

export const LEARN_HUBS: LearnHub[] = [
    {
        slug: "ai",
        title: "Learn Artificial Intelligence Free — Tutorials & Cohorts",
        h1: "Learn artificial intelligence free",
        description:
            "Start learning AI for free with interactive tutorials, prompt engineering guides, and optional live cohorts. Practice with Sturdee AI Tutor on Pro.",
        keywords: [
            "learn artificial intelligence",
            "artificial intelligence courses",
            "AI tutorials",
            "free generative AI courses",
            "learn AI free",
        ],
        bullets: [
            "Free AI skill paths: automation, prompts, and agents",
            "Interactive coding tutorials that pair with AI workflows",
            "Optional live cohorts with a human tutor",
            "AI Tutor & Practice Coach on Sturdee Pro ($20/mo)",
        ],
        faqs: [
            {
                question: "Can I learn AI for free on Sturdee?",
                answer:
                    "Yes. Browse free tutorials and AI skill paths without paying. Sturdee Pro ($20/month) unlocks AI Tutor chat and Practice Coach.",
            },
            {
                question: "What AI topics can I study?",
                answer:
                    "Prompt engineering, AI automation, building with AI agents, and AI-augmented career skills like web development and product management.",
            },
            {
                question: "Do you offer live AI classes?",
                answer:
                    "Yes. Register for a skill cohort and join live Google Meet classroom sessions with a tutor.",
            },
        ],
        ctaPrimary: { href: "/skills", label: "Browse AI skills" },
        ctaSecondary: { href: "/tutorials", label: "Free coding tutorials" },
    },
    {
        slug: "prompt-engineering",
        title: "Prompt Engineering Course Free — Learn Prompting",
        h1: "Prompt engineering course — free to start",
        description:
            "Learn prompt engineering for free: clear instructions, few-shot examples, structured outputs, and evaluation. Then practice with AI Tutor or join a cohort.",
        keywords: [
            "prompt engineering",
            "prompt engineering course",
            "prompt engineering course free",
            "prompt engineering tutorial",
            "learn prompt engineering",
        ],
        bullets: [
            "Prompt anatomy: roles, constraints, formats, and examples",
            "Few-shot and chain-of-thought patterns that improve accuracy",
            "Structured outputs for tools and teams",
            "Practice exercises with Sturdee Pro AI Coach",
        ],
        faqs: [
            {
                question: "Is this prompt engineering course free?",
                answer:
                    "The skill path and related tutorials are free to browse. AI-powered practice and tutoring require Sturdee Pro at $20/month.",
            },
            {
                question: "Who is prompt engineering for?",
                answer:
                    "Anyone who uses ChatGPT, Claude, or other models for work — marketers, developers, PMs, VAs, and students.",
            },
            {
                question: "How do I get hands-on practice?",
                answer:
                    "Open the Prompt Engineering skill page, try Practice Coach (Pro), or register for a live cohort.",
            },
        ],
        ctaPrimary: { href: "/skills/prompt-engineering", label: "Open prompt engineering path" },
        ctaSecondary: { href: "/pricing", label: "See Pro pricing" },
    },
    {
        slug: "coding-free",
        title: "Learn to Code for Free — Interactive Tutorials",
        h1: "Learn to code for free",
        description:
            "Free interactive coding tutorials for HTML, CSS, JavaScript, Python, SQL, Shopify Liquid, and more. Read lessons, try code, then join a live cohort if you want a tutor.",
        keywords: [
            "learn to code for free",
            "free coding tutorials",
            "learn programming online free",
            "coding for beginners",
            "interactive coding lessons",
            "free web development courses",
        ],
        bullets: [
            "20+ language tracks with try-it-yourself editors",
            "Beginner-friendly HTML, CSS, JavaScript, and Python paths",
            "Shopify Liquid tutorials for ecommerce developers",
            "Optional live classroom when you're ready for a tutor",
        ],
        faqs: [
            {
                question: "Are Sturdee coding tutorials really free?",
                answer:
                    "Yes. Tutorial lessons are free to read and practice in the browser. No account is required to start learning.",
            },
            {
                question: "What languages can I learn?",
                answer:
                    "HTML, CSS, JavaScript, TypeScript, Python, SQL, Java, Shopify Liquid, and many more — see the full tutorials hub.",
            },
            {
                question: "Can I learn to code with AI?",
                answer:
                    "Yes. Use free tutorials alongside AI skill paths, or upgrade to Pro for AI Tutor help while you learn.",
            },
        ],
        ctaPrimary: { href: "/tutorials", label: "Start free tutorials" },
        ctaSecondary: { href: "/learn/ai", label: "Learn AI free" },
    },
    {
        slug: "web-development",
        title: "Learn Web Development Free — HTML, CSS & JavaScript",
        h1: "Learn web development free",
        description:
            "Free web development tutorials: HTML, CSS, JavaScript, and modern frameworks. Build real projects, then optionally join a Web Dev with AI cohort.",
        keywords: [
            "learn web development",
            "learn web development free",
            "web development tutorial",
            "HTML CSS JavaScript free course",
            "JavaScript tutorial for beginners",
            "free web development courses",
        ],
        bullets: [
            "HTML, CSS, and JavaScript foundations",
            "Responsive layouts and modern frontend patterns",
            "AI-assisted coding workflows on the Web Dev skill path",
            "Live cohort option for accountability",
        ],
        faqs: [
            {
                question: "Where should beginners start?",
                answer:
                    "Start with the HTML and CSS tutorials, then JavaScript. After basics, open the Web Dev with AI skill path.",
            },
            {
                question: "Do you teach React or Next.js?",
                answer:
                    "Yes — modern frontend topics are covered in tutorials and the Web Dev with AI skill path.",
            },
            {
                question: "Is there a free web development course?",
                answer:
                    "Our interactive tutorial tracks work like a free course. Register for a cohort if you want live tutoring.",
            },
        ],
        ctaPrimary: { href: "/tutorials/html", label: "Start HTML tutorials" },
        ctaSecondary: { href: "/skills/web-development", label: "Web Dev with AI path" },
    },
];

export function getLearnHub(slug: string): LearnHub | undefined {
    return LEARN_HUBS.find((h) => h.slug === slug);
}

export const DEFAULT_SITE_KEYWORDS = [
    ...PRIMARY_KEYWORDS,
    ...SECONDARY_KEYWORDS,
    "Sturdee",
    "Sturdee tutorials",
    "Sturdee Pro",
] as string[];
