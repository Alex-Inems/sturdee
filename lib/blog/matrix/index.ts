import type { Locale } from "@/i18n/routing";
import { buildBlogPost } from "../factory";
import type { BlogCategory, BlogPost, BlogTopic } from "../types";
import { listMatrixSeeds, buildMatrixTopic, matrixListItem, type MatrixSeed } from "./generate";

const MAX_CACHE = 48;

export type BlogListItem = {
    slug: string;
    title: string;
    seoTitle: string;
    description: string;
    category: BlogCategory;
    publishedAt: string;
    updatedAt: string;
    readTime: string;
    coverImage?: string;
    coverAlt?: string;
    keywords: string[];
    tutorialPath?: string;
    relatedSlugs: string[];
};

let seeds: MatrixSeed[] | null = null;
const seedBySlug = new Map<string, MatrixSeed>();
const postCache = new Map<string, BlogPost>();

export function initMatrixSeeds(reservedSlugs: Set<string>): MatrixSeed[] {
    if (seeds) return seeds;
    seeds = listMatrixSeeds(reservedSlugs);
    for (const s of seeds) seedBySlug.set(s.slug, s);
    return seeds;
}

function siblings(seed: MatrixSeed): string[] {
    if (!seeds) return [];
    return seeds
        .filter((s) => s.entityId === seed.entityId && s.slug !== seed.slug)
        .slice(0, 4)
        .map((s) => s.slug);
}

export function getMatrixSeed(slug: string): MatrixSeed | undefined {
    return seedBySlug.get(slug);
}

export function listMatrixSlugs(): string[] {
    return seeds?.map((s) => s.slug) ?? [];
}

function titleForLocale(topic: BlogTopic, locale: Locale): BlogTopic {
    if (locale === "en") return topic;
    const prefix =
        locale === "fr" ? "Guide" : locale === "es" ? "Guía" : locale === "zh" ? "指南" : "";
    if (!prefix) return topic;
    return {
        ...topic,
        title: `${prefix}: ${topic.title}`,
        seoTitle: `${prefix}: ${topic.seoTitle}`,
    };
}

export function getMatrixPost(slug: string, locale: Locale = "en"): BlogPost | undefined {
    const seed = seedBySlug.get(slug);
    if (!seed) return undefined;
    const cacheKey = `${locale}:${slug}`;
    const cached = postCache.get(cacheKey);
    if (cached) return cached;
    const topic = titleForLocale(buildMatrixTopic(seed, siblings(seed)), locale);
    const post = buildBlogPost(topic, siblings(seed));
    if (postCache.size >= MAX_CACHE) {
        const first = postCache.keys().next().value;
        if (first) postCache.delete(first);
    }
    postCache.set(cacheKey, post);
    return post;
}

export function listMatrixItems(): BlogListItem[] {
    if (!seeds) return [];
    return seeds.map((seed) => {
        const item = matrixListItem(seed);
        return {
            ...item,
            updatedAt: item.publishedAt,
            relatedSlugs: siblings(seed),
        };
    });
}
