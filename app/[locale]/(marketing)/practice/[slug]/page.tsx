import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CodingEnvironment from "@/components/practice/CodingEnvironment";
import DifficultyBadge from "@/components/practice/DifficultyBadge";
import { routing } from "@/i18n/routing";
import { getLocalizedPracticeMeta } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import {
    getAdjacentProblems,
    getPracticeCatalog,
    getPracticeProblem,
    topicSlug,
} from "@/lib/practice";
import { practiceProblemJsonLd, practiceProblemMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        getPracticeCatalog().map((p) => ({ locale, slug: p.slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const problem = getPracticeProblem(slug);
    if (!problem) return {};
    const localized = await getLocalizedPracticeMeta(locale as Locale, problem);
    return practiceProblemMetadata(problem, locale as Locale, localized);
}

export default async function PracticeProblemPage({ params }: Props) {
    const { locale, slug } = await params;
    const problem = getPracticeProblem(slug);
    if (!problem) notFound();

    const { prev, next } = getAdjacentProblems(slug);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-24 pb-16">
            <JsonLd data={practiceProblemJsonLd(problem, locale as Locale)} />
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Practice", href: "/practice" },
                        { label: problem.topic, href: `/practice/topic/${topicSlug(problem.topic)}` },
                        { label: problem.title },
                    ]}
                />

                <div className="flex flex-wrap items-center gap-3 mt-4 mb-6">
                    <DifficultyBadge difficulty={problem.difficulty} />
                    <Link
                        href={`/practice/topic/${topicSlug(problem.topic)}`}
                        className="text-xs font-semibold text-emerald-600 hover:underline"
                    >
                        {problem.topic}
                    </Link>
                    <span className="text-xs text-gray-400">· {problem.acceptanceRate}% acceptance</span>
                </div>

                <CodingEnvironment problem={problem} />

                <nav className="flex justify-between mt-8 text-sm font-semibold">
                    {prev ? (
                        <Link href={`/practice/${prev.slug}`} className="text-emerald-600 hover:underline">
                            ← #{prev.number} {prev.title}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {next ? (
                        <Link href={`/practice/${next.slug}`} className="text-emerald-600 hover:underline">
                            #{next.number} {next.title} →
                        </Link>
                    ) : (
                        <span />
                    )}
                </nav>

                <p className="text-center mt-6">
                    <Link href="/practice" className="text-sm text-gray-400 hover:text-emerald-600 font-semibold">
                        ← All practice problems
                    </Link>
                </p>
            </div>
        </div>
    );
}
