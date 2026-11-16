import type { Locale } from "@/i18n/routing";
import { buildBlogPost, categorySlug, scoreRelatedPosts } from "./factory";
import { validateBlogPosts } from "./validate";
import { localizeBlogTopic } from "./localize";
import { AI_TOPICS } from "./topics/ai-learning";
import { HTML_TOPICS, CSS_TOPICS } from "./topics/html-css";
import { JAVASCRIPT_TOPICS } from "./topics/javascript";
import { PYTHON_TOPICS, SHOPIFY_TOPICS } from "./topics/python-shopify";
import { CAREER_TOPICS, BACKEND_TOPICS, TOOLS_TOPICS } from "./topics/career-backend-tools";
import type { BlogCategory, BlogPost, BlogTopic } from "./types";
import {
    getMatrixPost,
    initMatrixSeeds,
    listMatrixItems,
    listMatrixSlugs,
    type BlogListItem,
} from "./matrix";

export type { BlogCategory, BlogPost, BlogListItem };

export const ALL_BLOG_TOPICS: BlogTopic[] = [
    ...AI_TOPICS,
    ...HTML_TOPICS,
    ...CSS_TOPICS,
    ...JAVASCRIPT_TOPICS,
    ...PYTHON_TOPICS,
    ...SHOPIFY_TOPICS,
    ...CAREER_TOPICS,
    ...BACKEND_TOPICS,
    ...TOOLS_TOPICS,
];

initMatrixSeeds(new Set(ALL_BLOG_TOPICS.map((t) => t.slug)));

function relatedSlugs(topic: BlogTopic, all: BlogTopic[]): string[] {
    return scoreRelatedPosts(topic, all);
}

/** Pillar posts only — prerendered. Matrix posts render on demand. */
export const BLOG_POSTS: BlogPost[] = ALL_BLOG_TOPICS.map((topic) =>
    buildBlogPost(topic, relatedSlugs(topic, ALL_BLOG_TOPICS))
);

validateBlogPosts(BLOG_POSTS);

export const BLOG_CATEGORIES: BlogCategory[] = [
    "AI",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Shopify",
    "Backend",
    "Career",
    "Tools",
];

const localePillars = new Map<string, BlogPost[]>();

function pillarPosts(locale: Locale): BlogPost[] {
    if (locale === "en") return BLOG_POSTS;
    const cached = localePillars.get(locale);
    if (cached) return cached;
    const posts = ALL_BLOG_TOPICS.map((topic) => localizeBlogTopic(topic, locale, ALL_BLOG_TOPICS));
    localePillars.set(locale, posts);
    return posts;
}

function itemToListPost(item: BlogListItem): BlogPost {
    return {
        slug: item.slug,
        title: item.title,
        seoTitle: item.seoTitle,
        description: item.description,
        focusKeyword: item.keywords[0] ?? item.title,
        keywords: item.keywords,
        category: item.category,
        readTime: item.readTime,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
        tutorialPath: item.tutorialPath,
        canonicalPath: `/blog/${item.slug}`,
        relatedSlugs: item.relatedSlugs,
        sections: [],
        coverImage: item.coverImage,
        coverAlt: item.coverAlt,
    };
}

/** Lightweight cards for index, categories, sitemap — no article bodies. */
export function getBlogPosts(locale: Locale = "en"): BlogPost[] {
    return [...pillarPosts(locale), ...listMatrixItems().map(itemToListPost)];
}

export function getBlogPost(slug: string, locale: Locale = "en"): BlogPost | undefined {
    const pillar = pillarPosts(locale).find((p) => p.slug === slug);
    if (pillar) return pillar;
    return getMatrixPost(slug, locale);
}

export function getPostsByCategory(category: BlogCategory, locale: Locale = "en"): BlogPost[] {
    return getBlogPosts(locale).filter((p) => p.category === category);
}

export function getCategorySlug(category: BlogCategory): string {
    return categorySlug(category);
}

export function getAllCategorySlugs(): { category: string }[] {
    return BLOG_CATEGORIES.map((c) => ({ category: categorySlug(c) }));
}

export function listAllBlogSlugs(): string[] {
    return [...BLOG_POSTS.map((p) => p.slug), ...listMatrixSlugs()];
}

export const BLOG_POST_COUNT = BLOG_POSTS.length + listMatrixSlugs().length;
export const BLOG_PILLAR_COUNT = BLOG_POSTS.length;
export const BLOG_INDEX_PAGE_SIZE = 24;
