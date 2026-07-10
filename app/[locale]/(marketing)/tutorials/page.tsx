import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import { TUTORIAL_LANGUAGES, TUTORIAL_TRACKS } from "@/lib/tutorials";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const meta = await getLocalizedHubMeta(locale as Locale, "tutorials");
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/tutorials",
        locale: locale as Locale,
        keywords: [
            "free coding tutorials",
            "learn programming online",
            "interactive coding lessons",
            "programming tutorial hub",
        ],
    });
}

export default function TutorialsPage() {
    const popular = ["html", "css", "javascript", "liquid", "python", "sql", "java", "typescript"];

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Tutorials", path: "/tutorials" },
                ])}
            />
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                        Free Tutorials
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                        Learn to Code
                    </h1>
                    <p className="text-lg text-gray-500 font-medium mt-4 leading-relaxed">
                        Example-driven tutorials for every major programming language. Read, edit, and run code —
                        the {SITE_NAME} way.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">Popular Tutorials</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {popular.map((id) => {
                            const lang = TUTORIAL_LANGUAGES.find((l) => l.id === id)!;
                            return (
                                <Link
                                    key={id}
                                    href={`/tutorials/${id}`}
                                    className="rounded-2xl p-5 bg-white border border-gray-100 shadow-xl hover:translate-y-[-2px] transition-all text-center"
                                >
                                    <span className="text-3xl">{lang.icon}</span>
                                    <p className="font-bold text-gray-900 mt-2">{lang.name}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">All Tutorials</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {TUTORIAL_LANGUAGES.map((lang) => {
                        const track = TUTORIAL_TRACKS.find((t) => t.language.id === lang.id)!;
                        const pageCount = track.sections.reduce((n, s) => n + s.pages.length, 0);
                        return (
                            <Link
                                key={lang.id}
                                href={`/tutorials/${lang.id}`}
                                className="group rounded-2xl p-5 bg-white border border-gray-100/50 shadow-xl hover:translate-y-[-2px] transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl ${lang.color}`}>
                                        {lang.icon}
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                            {lang.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-2">{lang.tagline}</p>
                                        <p className="text-[11px] text-gray-400 font-medium mt-2">{pageCount} lessons</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
