import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { LEARN_HUBS, PRIMARY_KEYWORDS } from "@/lib/seo-keywords";

export const metadata: Metadata = pageMetadata({
    title: "Learn AI & Code Free — Guides & Paths",
    description:
        "Free learning hubs for artificial intelligence, prompt engineering, coding tutorials, and web development. Start free on Sturdee — upgrade to Pro for AI Tutor.",
    path: "/learn",
    keywords: [...PRIMARY_KEYWORDS, "free online courses", "learn programming online free"],
});

export default function LearnIndexPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Learn", path: "/learn" },
                ])}
            />
            <PageHero
                highlight="Learn free"
                title="Learn AI and code — free to start"
                subtitle="Topic hubs built for the searches students actually use: learn AI free, prompt engineering, learn to code for free, and web development."
            />
            <SectionShell compact>
                <ul className="grid sm:grid-cols-2 gap-6">
                    {LEARN_HUBS.map((hub) => (
                        <li key={hub.slug}>
                            <Link
                                href={`/learn/${hub.slug}`}
                                className="block h-full rounded-2xl border border-gray-200/80 bg-white p-6 hover:border-emerald-300 hover:shadow-sm transition-all"
                            >
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{hub.h1}</h2>
                                <p className="mt-3 text-sm font-medium text-gray-500 leading-relaxed">
                                    {hub.description}
                                </p>
                                <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                                    Open hub →
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionShell>
        </div>
    );
}
