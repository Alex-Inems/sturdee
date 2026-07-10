import { code, faq, h2, list, p, steps, tip } from "@/lib/tutorials/builder";
import { deriveHeadings, enrichTopic } from "./enrich";
import type { BlogPost, BlogTopic } from "./types";

export function buildBlogPost(topic: BlogTopic, relatedSlugs: string[]): BlogPost {
    const enriched = enrichTopic(topic);
    const headings = deriveHeadings(enriched);

    const sections = [
        h2(headings.intro),
        p(enriched.intro),
        ...(enriched.whyItMatters
            ? [h2(`Why ${enriched.focusKeyword} Matters`), p(enriched.whyItMatters)]
            : []),
        ...(enriched.deepDive ? [p(enriched.deepDive)] : []),
        ...(enriched.concepts?.length
            ? [h2(headings.concepts), list(enriched.concepts)]
            : []),
        ...(enriched.steps?.length
            ? [h2(headings.steps), steps(enriched.steps)]
            : []),
        ...(enriched.code
            ? [
                  h2(headings.code),
                  code(enriched.code.lang, enriched.code.body, enriched.code.title),
              ]
            : []),
        ...(enriched.mistakes?.length
            ? [h2(headings.mistakes), list(enriched.mistakes)]
            : []),
        h2(headings.practice),
        p(enriched.practice),
        ...(enriched.tutorialPath
            ? [
                  tip(
                      `Free interactive lesson: ${enriched.tutorialPath} — practice ${enriched.focusKeyword} with runnable code on Sturdee.`
                  ),
              ]
            : []),
        h2(headings.faq),
        faq(enriched.faq),
    ];

    return {
        slug: enriched.slug,
        title: enriched.title,
        seoTitle: enriched.seoTitle!,
        description: enriched.description,
        focusKeyword: enriched.focusKeyword!,
        keywords: enriched.keywords,
        category: enriched.category,
        readTime: enriched.readTime,
        publishedAt: enriched.publishedAt,
        updatedAt: enriched.publishedAt,
        tutorialPath: enriched.tutorialPath,
        canonicalPath: `/blog/${enriched.slug}`,
        relatedSlugs,
        sections,
    };
}

export function categorySlug(category: string): string {
    return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Score related posts by keyword overlap for more relevant internal links. */
export function scoreRelatedPosts(topic: BlogTopic, candidates: BlogTopic[]): string[] {
    const topicKeys = new Set(topic.keywords.map((k) => k.toLowerCase()));

    return candidates
        .filter((c) => c.slug !== topic.slug)
        .map((c) => ({
            slug: c.slug,
            score:
                (c.category === topic.category ? 3 : 0) +
                c.keywords.filter((k) => topicKeys.has(k.toLowerCase())).length * 2 +
                (c.tutorialPath === topic.tutorialPath ? 1 : 0),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((r) => r.slug);
}
