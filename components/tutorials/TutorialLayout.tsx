import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TutorialSidebar from "./TutorialSidebar";
import TutorialPageContent from "./TutorialPageContent";
import type { TutorialPage, TutorialTrack } from "@/lib/tutorials";

interface TutorialLayoutProps {
    track: TutorialTrack;
    page: TutorialPage;
    prev: TutorialPage | null;
    next: TutorialPage | null;
}

export default function TutorialLayout({ track, page, prev, next }: TutorialLayoutProps) {
    const base = `/tutorials/${track.language.id}`;

    return (
        <div className="font-jakarta bg-page min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <TutorialSidebar track={track} currentSlug={page.slug} />

                    <main className="flex-1 min-w-0">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                                {track.language.name} Tutorial
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
                            <TutorialPageContent sections={page.sections} />

                            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-gray-100">
                                {prev ? (
                                    <Link
                                        href={`${base}/${prev.slug}`}
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        {prev.title}
                                    </Link>
                                ) : (
                                    <span />
                                )}
                                {next ? (
                                    <Link
                                        href={`${base}/${next.slug}`}
                                        className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors sm:ml-auto"
                                    >
                                        {next.title}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
