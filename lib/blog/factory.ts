import { code, faq, figure, h2, h3, list, p, steps, tip } from "@/lib/tutorials/builder";
import { deriveHeadings, enrichTopic } from "./enrich";
import type { BlogPost, BlogTopic } from "./types";

function estimateReadTime(topic: BlogTopic): string {
    const words = [
        topic.hook,
        topic.intro,
        topic.whyItMatters,
        topic.deepDive,
        topic.practice,
        topic.takeaway,
        ...(topic.concepts ?? []),
        ...(topic.steps ?? []),
        ...(topic.mistakes ?? []),
        ...(topic.faq ?? []).flatMap((f) => [f.question, f.answer]),
        ...(topic.chapters ?? []).flatMap((c) => [c.title, ...c.paragraphs, ...(c.list ?? []), c.tip ?? ""]),
    ]
        .filter(Boolean)
        .join(" ")
        .split(/\s+/).length;

    const minutes = Math.max(8, Math.min(28, Math.round(words / 200)));
    return `${minutes} min read`;
}

export function buildBlogPost(topic: BlogTopic, relatedSlugs: string[]): BlogPost {
    const enriched = enrichTopic(topic);
    const headings = deriveHeadings(enriched);
    const hasChapters = Boolean(enriched.chapters?.length);

    const sections = [
        ...(enriched.coverImage
            ? [
                  figure(
                      enriched.coverImage,
                      enriched.coverAlt ?? enriched.title,
                      enriched.focusKeyword ? `Illustration: ${enriched.focusKeyword}` : undefined
                  ),
              ]
            : []),
        h2(headings.intro),
        ...(enriched.hook ? [p(enriched.hook)] : []),
        p(enriched.intro),
        ...(enriched.whyItMatters
            ? [h2(`Why ${enriched.focusKeyword} Matters`), p(enriched.whyItMatters)]
            : []),
        ...(enriched.deepDive && !hasChapters ? [p(enriched.deepDive)] : []),
        ...(hasChapters
            ? [
                  h2(headings.story ?? "The Story — Step by Step"),
                  ...enriched.chapters!.flatMap((chapter) => [
                      h3(chapter.title),
                      ...chapter.paragraphs.map((para) => p(para)),
                      ...(chapter.figure
                          ? [figure(chapter.figure.src, chapter.figure.alt, chapter.figure.caption)]
                          : []),
                      ...(chapter.list?.length ? [list(chapter.list)] : []),
                      ...(chapter.tip ? [tip(chapter.tip)] : []),
                  ]),
              ]
            : []),
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
        ...(enriched.takeaway
            ? [h2(headings.takeaway ?? "What to Remember"), p(enriched.takeaway)]
            : []),
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
        readTime: hasChapters ? estimateReadTime(enriched) : enriched.readTime,
        publishedAt: enriched.publishedAt,
        updatedAt: enriched.publishedAt,
        tutorialPath: enriched.tutorialPath,
        canonicalPath: `/blog/${enriched.slug}`,
        relatedSlugs,
        sections,
        coverImage: enriched.coverImage,
        coverAlt: enriched.coverAlt,
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
