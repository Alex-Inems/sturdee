import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/routing";
import { LOCALES, localizedUrl } from "@/lib/site";
import { SITE_URL } from "@/lib/site-core";
import { SKILLS } from "@/lib/skills";

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

    return localeEntries("/", 1, "weekly").concat(
        skillRoutes,
        localeEntries("/classroom", 0.9, "daily"),
        localeEntries("/privacy", 0.3, "yearly"),
        localeEntries("/terms", 0.3, "yearly"),
        localeEntries("/legal", 0.3, "yearly")
    );
}
