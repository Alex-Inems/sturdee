import { SPECIALIZED_BY_SLUG } from "./specialized";
import type { BlogPost, BlogTopic } from "./types";

/** Normalize and enrich each topic with SEO-specific fields before build. */
export function enrichTopic(topic: BlogTopic): BlogTopic {
    const specialized = SPECIALIZED_BY_SLUG[topic.slug] ?? {};
    const merged = { ...topic, ...specialized };
    const focusKeyword = merged.focusKeyword ?? merged.keywords[0] ?? slugToFocus(merged.slug);
    const seoTitle = merged.seoTitle ?? buildSeoTitle(merged.title, focusKeyword);
    const description = normalizeMetaDescription(merged.description, focusKeyword);

    return {
        ...merged,
        focusKeyword,
        seoTitle,
        description,
        keywords: dedupeKeywords([focusKeyword, ...merged.keywords]),
        headings: { ...merged.headings, ...specialized.headings },
    };
}

function slugToFocus(slug: string): string {
    return slug.replace(/-/g, " ").replace(/\bguide\b|\btutorial\b|\bexplained\b/gi, "").trim();
}

function buildSeoTitle(title: string, focusKeyword: string): string {
    if (title.toLowerCase().includes(focusKeyword.toLowerCase())) return title;
    const phrase =
        focusKeyword.length > 45 ? focusKeyword.split(" ").slice(0, 4).join(" ") : focusKeyword;
    return `${title} — ${phrase}`;
}

function normalizeMetaDescription(description: string, focusKeyword: string): string {
    let text = description.trim();
    if (!text.toLowerCase().includes(focusKeyword.toLowerCase().split(" ")[0])) {
        text = `${focusKeyword}: ${text}`;
    }
    if (text.length > 160) {
        text = `${text.slice(0, 157).trim()}…`;
    }
    return text;
}

function dedupeKeywords(keywords: string[]): string[] {
    const seen = new Set<string>();
    return keywords.filter((k) => {
        const key = k.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export function deriveHeadings(topic: BlogTopic): Record<string, string> {
    const short = topic.title.split("—")[0].split("|")[0].trim();
    const focus = topic.focusKeyword ?? topic.keywords[0];

    return {
        intro: topic.headings?.intro ?? `What Is ${short}?`,
        concepts: topic.headings?.concepts ?? `${focus} — Key Ideas You Must Know`,
        steps: topic.headings?.steps ?? `How to Use ${focus} Step by Step`,
        code: topic.headings?.code ?? `${focus} Code Example`,
        mistakes: topic.headings?.mistakes ?? `Common ${focus} Mistakes`,
        practice: topic.headings?.practice ?? `Practice ${focus} with Free Lessons`,
        faq: topic.headings?.faq ?? `${short} — FAQ`,
    };
}

export function enrichPost(post: BlogPost): BlogPost {
    return {
        ...post,
        canonicalPath: `/blog/${post.slug}`,
    };
}
