import type { Metadata } from "next";
import Link from "next/link";
import { assertFeatureEnabled } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = pageMetadata({
    title: "Free Programming Guides & Study Roadmaps",
    description:
        "In-depth free guides: how to learn programming, web developer roadmap 2026, Shopify theme development, Python for beginners, and SQL for data analytics.",
    path: "/guides",
    keywords: ["programming guides", "learn to code guide", "web developer roadmap", "study guides"],
});

export default function GuidesIndexPage() {
    assertFeatureEnabled("guides");

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Programming Guides</h1>
                <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed">
                    Long-form study guides and roadmaps — designed to rank in search and help you learn faster.
                </p>
                <div className="space-y-4">
                    {GUIDES.map((guide) => (
                        <Link
                            key={guide.slug}
                            href={`/guides/${guide.slug}`}
                            className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover:border-emerald-200 hover:shadow-xl transition-all"
                        >
                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700">{guide.title}</h2>
                            <p className="text-gray-500 font-medium mt-2 text-sm leading-relaxed">{guide.description}</p>
                            <p className="text-xs text-gray-400 font-medium mt-3">{guide.readTime}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
