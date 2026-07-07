import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TUTORIAL_TRACKS } from "@/lib/tutorials";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/tutorials`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
        { url: `${SITE_URL}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
        { url: `${SITE_URL}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
        { url: `${SITE_URL}/instructors`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    ];

    const tutorialRoutes: MetadataRoute.Sitemap = TUTORIAL_TRACKS.flatMap((track) => {
        const langHub = {
            url: `${SITE_URL}/tutorials/${track.language.id}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        };

        const lessons = track.sections.flatMap((section) =>
            section.pages.map((page) => ({
                url: `${SITE_URL}/tutorials/${track.language.id}/${page.slug}`,
                lastModified: now,
                changeFrequency: "monthly" as const,
                priority: 0.8,
            }))
        );

        return [langHub, ...lessons];
    });

    return [...staticRoutes, ...tutorialRoutes];
}
