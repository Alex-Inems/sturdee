import { buildBlogPost, categorySlug, scoreRelatedPosts } from "./factory";
import { validateBlogPosts } from "./validate";
import { HTML_TOPICS, CSS_TOPICS } from "./topics/html-css";
import { JAVASCRIPT_TOPICS } from "./topics/javascript";
import { PYTHON_TOPICS, SHOPIFY_TOPICS } from "./topics/python-shopify";
import { CAREER_TOPICS, BACKEND_TOPICS, TOOLS_TOPICS } from "./topics/career-backend-tools";
import type { BlogCategory, BlogPost, BlogTopic } from "./types";

export type { BlogCategory, BlogPost };

const ALL_TOPICS: BlogTopic[] = [
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

const ALL_TOPICS_ENRICHED = ALL_TOPICS;

export const BLOG_POSTS: BlogPost[] = ALL_TOPICS_ENRICHED.map((topic) =>
    buildBlogPost(topic, relatedSlugs(topic, ALL_TOPICS_ENRICHED))
);

validateBlogPosts(BLOG_POSTS);

export const BLOG_CATEGORIES: BlogCategory[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Shopify",
    "Backend",
    "Career",
    "Tools",
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
    return BLOG_POSTS.filter((p) => p.category === category);
}

export function getCategorySlug(category: BlogCategory): string {
    return categorySlug(category);
}

export function getAllCategorySlugs(): { category: string }[] {
    const cats = [...new Set(BLOG_POSTS.map((p) => p.category))];
    return cats.map((c) => ({ category: categorySlug(c) }));
}

export const BLOG_POST_COUNT = BLOG_POSTS.length;
