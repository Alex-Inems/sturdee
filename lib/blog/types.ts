import type { TutorialBlock } from "@/lib/tutorials/types";

export type BlogCategory =
    | "AI"
    | "JavaScript"
    | "Python"
    | "CSS"
    | "HTML"
    | "Shopify"
    | "Career"
    | "Backend"
    | "Tools";

export interface BlogChapter {
    title: string;
    paragraphs: string[];
    figure?: { src: string; alt: string; caption?: string };
    list?: string[];
    tip?: string;
}

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
    coverImage?: string;
    coverAlt?: string;
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
    /** Hero illustration under the title */
    coverImage?: string;
    coverAlt?: string;
    headings?: {
        intro?: string;
        concepts?: string;
        steps?: string;
        code?: string;
        mistakes?: string;
        practice?: string;
        faq?: string;
        story?: string;
        takeaway?: string;
    };
    /** Opening hook — first narrative beat */
    hook?: string;
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
    /** Long-form storyline chapters (preferred for pillar posts) */
    chapters?: BlogChapter[];
    /** Closing takeaway / next step narrative */
    takeaway?: string;
}
