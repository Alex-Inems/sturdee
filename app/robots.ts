import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Everything except tutorials and legal pages is disabled — see lib/feature-flags.ts
                disallow: [
                    "/admin/",
                    "/dashboard",
                    "/book",
                    "/auth/",
                    "/api/",
                    "/tutorials",
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
                    "/verify",
                    "/integrate",
                    "/my-credentials",
                    "/workspace",
                    "/classroom/host",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
