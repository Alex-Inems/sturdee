import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/routing";
import { LOCALES, localizedUrl } from "@/lib/site";
import { SITE_URL } from "@/lib/site-core";
import { TUTORIAL_TRACKS } from "@/lib/tutorials";

/**
 * Only the tutorials section (plus the home and legal pages) is live — see
 * lib/feature-flags.ts. Disabled sections must stay out of the sitemap so
 * search engines don't index not-found pages. The original entries are kept
 * commented below so they can be restored with their feature flag.
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
    const staticRoutes = localeEntries("/", 1, "weekly").concat(
        localeEntries("/tutorials", 0.95, "daily"),
        localeEntries("/classroom", 0.9, "daily"),
        localeEntries("/privacy", 0.3, "yearly"),
        localeEntries("/terms", 0.3, "yearly"),
        localeEntries("/legal", 0.3, "yearly")
        // Disabled sections: /guides, /blog, /cheatsheets, /resources, /courses,
        // /opensource, /practice, /credentials, /programs, /tutors, /media
    );

    const tutorialRoutes = TUTORIAL_TRACKS.flatMap((track) => {
        const langHub = localeEntries(`/tutorials/${track.language.id}`, 0.9, "weekly");
        const lessons = track.sections.flatMap((section) =>
            section.pages.flatMap((page) =>
                localeEntries(`/tutorials/${track.language.id}/${page.slug}`, 0.8, "monthly")
            )
        );
        return [...langHub, ...lessons];
    });

    return [...staticRoutes, ...tutorialRoutes];
}
