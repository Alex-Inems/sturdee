import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { breadcrumbJsonLd, tutorialLanguageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getAllTutorialPages, getTutorialTrack } from "@/lib/tutorials";

interface Props {
    params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("tutorials", () => [
        { lang: "html" },
        { lang: "css" },
        { lang: "javascript" },
        { lang: "typescript" },
        { lang: "python" },
        { lang: "sql" },
        { lang: "java" },
        { lang: "cpp" },
        { lang: "c" },
        { lang: "csharp" },
        { lang: "php" },
        { lang: "ruby" },
        { lang: "go" },
        { lang: "rust" },
        { lang: "swift" },
        { lang: "kotlin" },
        { lang: "r" },
        { lang: "bash" },
        { lang: "json" },
        { lang: "xml" },
        { lang: "nodejs" },
        { lang: "liquid" },
    ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const track = getTutorialTrack(lang);
    if (!track) return {};
    return tutorialLanguageMetadata(track);
}

export default async function TutorialLanguagePage({ params }: Props) {
    assertFeatureEnabled("tutorials");
    const { lang } = await params;
    const track = getTutorialTrack(lang);
    if (!track) notFound();

    const pages = getAllTutorialPages(lang);
    const breadcrumbs = [
        { name: "Tutorials", path: "/tutorials" },
        { name: track.language.name, path: `/tutorials/${lang}` },
    ];

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd(breadcrumbs),
                    {
                        "@context": "https://schema.org",
                        "@type": "Course",
                        name: `${track.language.name} Tutorial`,
                        description: track.language.tagline,
                        url: `${SITE_URL}/tutorials/${lang}`,
                        provider: { "@type": "Organization", name: "Sturdee" },
                        hasCourseInstance: {
                            "@type": "CourseInstance",
                            courseMode: "online",
                            courseWorkload: `P${pages.length}L`,
                        },
                    },
                ]}
            />
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Tutorials", href: "/tutorials" },
                        { label: track.language.name },
                    ]}
                />
                <div className="rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10">
                    <div className="flex items-start gap-4 mb-8">
                        <span className={`text-3xl w-14 h-14 flex items-center justify-center rounded-2xl shrink-0 ${track.language.color}`}>
                            {track.language.icon}
                        </span>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                {track.language.name} Tutorial
                            </h1>
                            <p className="text-gray-500 font-medium mt-3 leading-relaxed">{track.language.tagline}</p>
                            <p className="text-sm text-gray-400 font-medium mt-2">{pages.length} free lessons</p>
                        </div>
                    </div>

                    {track.sections.map((section) => (
                        <section key={section.title} className="mb-10 last:mb-0">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h2>
                            <ol className="space-y-2">
                                {section.pages.map((page, index) => (
                                    <li key={page.slug}>
                                        <Link
                                            href={`/tutorials/${lang}/${page.slug}`}
                                            className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 transition-colors"
                                        >
                                            <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">
                                                {index + 1}
                                            </span>
                                            {page.title}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
