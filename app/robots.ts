import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Allow public marketing content to be crawled.
 * Disallow only auth, dashboards, APIs, and disabled feature areas.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/dashboard",
                    "/auth/",
                    "/api/",
                    "/verify",
                    "/integrate",
                    "/my-credentials",
                    "/workspace",
                    "/classroom/host",
                    "/classroom/demo",
                    // Flagged-off sections (see lib/feature-flags.ts)
                    "/blog",
                    "/guides",
                    "/cheatsheets",
                    "/courses",
                    "/practice",
                    "/opensource",
                    "/credentials",
                    "/programs",
                    "/instructors",
                    "/tutors",
                    "/media",
                    "/resources",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
