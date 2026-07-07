import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} — Learn to Code`,
        short_name: SITE_NAME,
        description: "Free interactive programming tutorials and courses.",
        start_url: "/",
        display: "standalone",
        background_color: "#e8ebf0",
        theme_color: "#10B981",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
