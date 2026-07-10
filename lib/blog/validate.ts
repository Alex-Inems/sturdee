import type { BlogPost } from "./types";

export function validateBlogPosts(posts: BlogPost[]): void {
    const errors: string[] = [];
    const slugs = new Set<string>();
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const post of posts) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
            errors.push(`Invalid slug format: ${post.slug}`);
        }
        if (post.slug.length < 12) {
            errors.push(`Slug too short (needs specificity): ${post.slug}`);
        }
        if (slugs.has(post.slug)) errors.push(`Duplicate slug: ${post.slug}`);
        slugs.add(post.slug);

        const titleKey = post.title.toLowerCase();
        if (titles.has(titleKey)) errors.push(`Duplicate title: ${post.title}`);
        titles.add(titleKey);

        const descKey = post.description.toLowerCase();
        if (descriptions.has(descKey)) errors.push(`Duplicate description: ${post.slug}`);
        descriptions.add(descKey);

        if (post.description.length < 80) {
            errors.push(`Description too short for ${post.slug}`);
        }
        if (post.description.length > 165) {
            errors.push(`Description too long for ${post.slug} (${post.description.length} chars)`);
        }
        if (!post.focusKeyword) {
            errors.push(`Missing focusKeyword: ${post.slug}`);
        }
        if (post.keywords.length < 3) {
            errors.push(`Need at least 3 keywords: ${post.slug}`);
        }
    }

    if (errors.length > 0) {
        throw new Error(`Blog SEO validation failed:\n${errors.join("\n")}`);
    }
}
