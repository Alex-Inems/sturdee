import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PracticeProblemList from "@/components/practice/PracticeProblemList";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { assertFeatureEnabled } from "@/lib/features";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import {
    getDifficultyCounts,
    getPracticeCatalog,
    PRACTICE_PROBLEM_COUNT,
    PRACTICE_TOPICS,
    topicSlug,
} from "@/lib/practice";
import { pageMetadata, practiceHubJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const meta = await getLocalizedHubMeta(locale as Locale, "practice");
    const description =
        locale === "en"
            ? `Practice ${PRACTICE_PROBLEM_COUNT}+ algorithm and data structure problems in a LeetCode-standard environment. Run code, submit solutions, and study answers for JavaScript and Python.`
            : meta.description;
    return pageMetadata({
        title: meta.title,
        description,
        path: "/practice",
        locale: locale as Locale,
        keywords: [
            "leetcode practice",
            "coding interview problems",
            "algorithm practice",
            "data structures practice",
            "free coding challenges",
            "javascript python solutions",
        ],
    });
}

export default function PracticeHubPage() {
    assertFeatureEnabled("practice");

    const catalog = getPracticeCatalog();
    const counts = getDifficultyCounts();

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd data={practiceHubJsonLd()} />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs mb-4">
                    {PRACTICE_PROBLEM_COUNT}+ Problems · LeetCode-Standard IDE
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Coding Practice Environment
                </h1>
                <p className="text-lg text-gray-500 font-medium mb-8 max-w-3xl leading-relaxed">
                    Solve algorithm and data structure problems in a split-pane coding environment — just like
                    LeetCode. Run sample tests, submit against hidden cases, and reveal reference solutions in
                    JavaScript and Python.
                </p>

                <div className="grid sm:grid-cols-4 gap-4 mb-10">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-lg text-center">
                        <p className="text-3xl font-bold text-gray-900">{PRACTICE_PROBLEM_COUNT}</p>
                        <p className="text-xs text-gray-500 font-semibold mt-1">Total Problems</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                        <p className="text-3xl font-bold text-emerald-700">{counts.Easy}</p>
                        <p className="text-xs text-emerald-600 font-semibold mt-1">Easy</p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
                        <p className="text-3xl font-bold text-amber-700">{counts.Medium}</p>
                        <p className="text-xs text-amber-600 font-semibold mt-1">Medium</p>
                    </div>
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-center">
                        <p className="text-3xl font-bold text-rose-700">{counts.Hard}</p>
                        <p className="text-xs text-rose-600 font-semibold mt-1">Hard</p>
                    </div>
                </div>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Topic</h2>
                    <div className="flex flex-wrap gap-2">
                        {PRACTICE_TOPICS.map((topic) => {
                            const count = catalog.filter((p) => p.topic === topic).length;
                            if (!count) return null;
                            return (
                                <Link
                                    key={topic}
                                    href={`/practice/topic/${topicSlug(topic)}`}
                                    className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors shadow-sm"
                                >
                                    {topic} ({count})
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <PracticeProblemList problems={catalog} />
            </div>
        </div>
    );
}
