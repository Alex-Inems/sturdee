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

export type { BlogCategory, BlogPost };

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

function relatedSlugs(topic: BlogTopic, all: BlogTopic[]): string[] {
    return scoreRelatedPosts(topic, all);
}

/** English posts (sitemap, static params, validation). */
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

const localeCache = new Map<string, BlogPost[]>();

export function getBlogPosts(locale: Locale = "en"): BlogPost[] {
    if (locale === "en") return BLOG_POSTS;
    const cached = localeCache.get(locale);
    if (cached) return cached;
    const posts = ALL_BLOG_TOPICS.map((topic) => localizeBlogTopic(topic, locale, ALL_BLOG_TOPICS));
    localeCache.set(locale, posts);
    return posts;
}

export function getBlogPost(slug: string, locale: Locale = "en"): BlogPost | undefined {
    return getBlogPosts(locale).find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory, locale: Locale = "en"): BlogPost[] {
    return getBlogPosts(locale).filter((p) => p.category === category);
}

export function getCategorySlug(category: BlogCategory): string {
    return categorySlug(category);
}

export function getAllCategorySlugs(): { category: string }[] {
    const cats = [...new Set(BLOG_POSTS.map((p) => p.category))];
    return cats.map((c) => ({ category: categorySlug(c) }));
}

export const BLOG_POST_COUNT = BLOG_POSTS.length;
