import type { TutorialBlock } from "@/lib/tutorials/types";

export type BlogCategory =
    | "JavaScript"
    | "Python"
    | "CSS"
    | "HTML"
    | "Shopify"
    | "Career"
    | "Backend"
    | "Tools";

export interface BlogPost {
    slug: string;
    title: string;
    seoTitle: string;
    description: string;
    focusKeyword: string;
    keywords: string[];
    category: BlogCategory;
    readTime: string;
    publishedAt: string;
    updatedAt: string;
    tutorialPath?: string;
    canonicalPath: string;
    relatedSlugs: string[];
    sections: TutorialBlock[];
}

export interface BlogTopic {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    category: BlogCategory;
    readTime: string;
    publishedAt: string;
    tutorialPath?: string;
    focusKeyword?: string;
    seoTitle?: string;
    headings?: {
        intro?: string;
        concepts?: string;
        steps?: string;
        code?: string;
        mistakes?: string;
        practice?: string;
        faq?: string;
    };
    intro: string;
    concepts?: string[];
    steps?: string[];
    code?: { lang: string; body: string; title?: string };
    mistakes?: string[];
    practice: string;
    faq: { question: string; answer: string }[];
    /** Optional extra paragraphs — unique per article */
    deepDive?: string;
    whyItMatters?: string;
}
