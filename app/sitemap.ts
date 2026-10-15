import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/routing";
import { BLOG_POSTS, getCategorySlug, BLOG_CATEGORIES } from "@/lib/blog";
import { LOCALES, localizedUrl } from "@/lib/site";
import { SITE_URL } from "@/lib/site-core";
import { SKILLS } from "@/lib/skills";
import { TUTORIAL_LANGUAGES } from "@/lib/tutorials";
import { LEARN_HUBS } from "@/lib/seo-keywords";
import { FEATURES } from "@/lib/feature-flags";

/**
 * Live sections only — see lib/feature-flags.ts. Disabled sections stay out of
 * the sitemap so search engines don't index not-found pages.
 */

type Sitemap = MetadataRoute.Sitemap;

function localeEntries(
    path: string,
    priority: number,
    changeFrequency: Sitemap[number]["changeFrequency"] = "weekly",
    images?: string[],
    lastModified?: string
): Sitemap {
    return LOCALES.map((locale) => ({
        url: localizedUrl(locale as Locale, path),
        lastModified: lastModified ? new Date(lastModified) : new Date(),
        changeFrequency,
        priority,
        ...(images && images.length > 0 && { images: images.map((img) => `${SITE_URL}${img}`) }),
    }));
}

export default async function sitemap(): Promise<Sitemap> {
    const skillRoutes = localeEntries("/skills", 0.95, "weekly").concat(
        ...SKILLS.map((skill) => localeEntries(`/skills/${skill.id}`, 0.9, "weekly"))
    );

    const tutorialRoutes = localeEntries("/tutorials", 0.98, "weekly").concat(
        ...TUTORIAL_LANGUAGES.map((lang) => localeEntries(`/tutorials/${lang.id}`, 0.9, "weekly"))
    );

    const learnRoutes = localeEntries("/learn", 0.97, "weekly").concat(
        ...LEARN_HUBS.map((hub) => localeEntries(`/learn/${hub.slug}`, 0.95, "weekly"))
    );

    const blogRoutes = FEATURES.blog
        ? localeEntries("/blog", 0.96, "daily").concat(
              ...BLOG_CATEGORIES.map((cat) =>
                  localeEntries(`/blog/category/${getCategorySlug(cat)}`, 0.85, "weekly")
              ),
              ...BLOG_POSTS.map((post) =>
                  localeEntries(`/blog/${post.slug}`, 0.88, "monthly", undefined, post.updatedAt)
              )
          )
        : [];

    return localeEntries("/", 1, "weekly").concat(
        learnRoutes,
        tutorialRoutes,
        blogRoutes,
        skillRoutes,
        localeEntries("/ai", 0.9, "weekly"),
        localeEntries("/pricing", 0.9, "weekly"),
        localeEntries("/classroom", 0.85, "daily"),
        localeEntries("/book", 0.8, "weekly"),
        localeEntries("/privacy", 0.3, "yearly"),
        localeEntries("/terms", 0.3, "yearly"),
        localeEntries("/legal", 0.3, "yearly")
    );
}
