import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import JsonLd from "@/components/seo/JsonLd";
import { MEDIA_ASSETS } from "@/lib/media";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Media Library — Education Images & Visual Assets",
    description:
        "Browse optimized WebP images from Sturdee courses, programs, instructors, and learning paths. Each asset has a dedicated indexable page for SEO.",
    path: "/media",
    keywords: ["education images", "course visuals", "programming education media"],
});

const categories = ["featured", "courses", "programs", "instructors", "paths"] as const;

export default function MediaIndexPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Media", path: "/media" },
                ])}
            />
            <PageHero
                highlight="Media Library"
                title="Visual Assets"
                subtitle="Every image on Sturdee has a dedicated, indexable page with alt text, descriptions, and structured data."
            />
            {categories.map((category) => {
                const assets = MEDIA_ASSETS.filter((a) => a.category === category);
                if (assets.length === 0) return null;
                return (
                    <SectionShell key={category}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{category}</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assets.map((asset) => (
                                <Link
                                    key={asset.slug}
                                    href={`/media/${asset.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={asset.path}
                                            alt={asset.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 text-sm">{asset.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{asset.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </SectionShell>
                );
            })}
        </div>
    );
}
