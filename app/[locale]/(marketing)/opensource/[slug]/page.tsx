import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Link as LocaleLink } from "@/i18n/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getOssTool, OSS_TOOLS } from "@/lib/opensource";
import { pageMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
    return routing.locales.flatMap((locale) => OSS_TOOLS.map((t) => ({ locale, slug: t.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const tool = getOssTool(slug);
    if (!tool) return {};
    return pageMetadata({
        title: `Integrate ${tool.name} — Open Source Practice`,
        description: `${tool.description} Practice integration, push to GitHub, earn ${tool.points} points.`,
        path: `/opensource/${slug}`,
        locale: locale as Locale,
        keywords: [tool.name.toLowerCase(), "open source", "github integration", ...tool.tags],
    });
}

export default async function OpenSourceToolPage({ params }: Props) {
    const { slug } = await params;
    const tool = getOssTool(slug);
    if (!tool) notFound();

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Open Source", href: "/opensource" },
                        { label: tool.name },
                    ]}
                />
                <span className="inline-flex px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mt-6 mb-3">
                    {tool.category} · +{tool.points} points
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{tool.name}</h1>
                <p className="text-lg text-gray-500 font-medium mb-6">{tool.description}</p>

                <dl className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <dt className="text-gray-400 font-bold text-xs uppercase mb-1">GitHub</dt>
                        <dd>
                            <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">
                                {tool.githubUrl.replace("https://github.com/", "")}
                            </a>
                        </dd>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <dt className="text-gray-400 font-bold text-xs uppercase mb-1">Install</dt>
                        <dd className="font-mono text-xs text-gray-700">{tool.installCommand}</dd>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <dt className="text-gray-400 font-bold text-xs uppercase mb-1">License</dt>
                        <dd className="font-semibold text-gray-900">{tool.license}</dd>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <dt className="text-gray-400 font-bold text-xs uppercase mb-1">Stars</dt>
                        <dd className="font-semibold text-gray-900">★ {tool.stars}</dd>
                    </div>
                </dl>

                <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-xl mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Integration goal</h2>
                    <p className="text-gray-600 font-medium mb-4">{tool.integrationGoal}</p>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 font-medium mb-6">
                        {tool.steps.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ol>
                    <Link
                        href={`/integrate/${tool.slug}`}
                        className="inline-flex px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        Open Integration Workspace →
                    </Link>
                </section>

                <p className="text-sm text-gray-400 text-center">
                    <LocaleLink href="/opensource" className="text-emerald-600 font-semibold hover:underline">
                        ← All open source tools
                    </LocaleLink>
                </p>
            </div>
        </div>
    );
}
