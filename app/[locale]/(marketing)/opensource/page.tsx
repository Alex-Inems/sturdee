import type { Metadata } from "next";
import { Link as LocaleLink } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import OssToolCard from "@/components/opensource/OssToolCard";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { getAllCategories, MAX_OSS_POINTS, OSS_TOOL_COUNT, OSS_TOOLS } from "@/lib/opensource";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const meta = await getLocalizedHubMeta(locale as Locale, "openSource");
    return pageMetadata({
        title: meta.title,
        description: meta.description.replace("20+", `${OSS_TOOL_COUNT}`),
        path: "/opensource",
        locale: locale as Locale,
        keywords: ["open source tools", "ai tools", "github integration", "free developer tools", "ollama", "langchain"],
    });
}

export default async function OpenSourceHubPage({ params }: Props) {
    const { locale } = await params;
    const categories = getAllCategories();
    const aiCount = OSS_TOOLS.filter((t) => t.category === "AI Tools" || t.category === "AI/ML").length;

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: "Sturdee Open Source Integration Hub",
                    description: "Frameworks, AI tools, DevOps, databases, and utilities — practice integration and push to GitHub.",
                }}
            />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs mb-4">
                    {OSS_TOOL_COUNT} Tools · {aiCount} AI · {MAX_OSS_POINTS} Max Points
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Open Source & AI Tools Hub
                </h1>
                <p className="text-lg text-gray-500 font-medium mb-8 max-w-3xl leading-relaxed">
                    Frameworks, AI runtimes, databases, DevOps, and developer utilities — all free, open-source, and on
                    GitHub. Practice real integration in a live workspace, push your code, and earn{" "}
                    <strong className="text-gray-800">integration points</strong>.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-12">
                    {[
                        { step: "1", title: "Pick a tool", desc: `React, Ollama, Docker, LangChain, FFmpeg — ${OSS_TOOL_COUNT}+ tools` },
                        { step: "2", title: "Integrate live", desc: "Edit configs and code, run tests, commit in the workspace" },
                        { step: "3", title: "Push to GitHub", desc: "OAuth auto-push or verify your manual push" },
                    ].map((item) => (
                        <div key={item.step} className="rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
                            <span className="text-2xl font-bold text-emerald-600">{item.step}</span>
                            <h2 className="font-bold text-gray-900 mt-2 mb-1">{item.title}</h2>
                            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {categories.map((category) => (
                    <section key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {OSS_TOOLS.filter((t) => t.category === category).map((tool) => (
                                <OssToolCard key={tool.slug} tool={tool} />
                            ))}
                        </div>
                    </section>
                ))}

                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl">
                    <p className="text-gray-600 font-medium mb-4">
                        Sign in with GitHub to auto-push integrations, or use email and verify repos manually.
                    </p>
                    <LocaleLink
                        href="/?auth=login"
                        className="inline-flex px-8 py-3.5 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                    >
                        Sign In & Start Integrating →
                    </LocaleLink>
                </div>
            </div>
        </div>
    );
}
