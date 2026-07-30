import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialLayout from "@/components/tutorials/TutorialLayout";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import {
    TUTORIAL_TRACKS,
    getAdjacentPages,
    getTutorialPage,
    getTutorialTrack,
} from "@/lib/tutorials";
import { tutorialLessonMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("tutorials", () =>
        TUTORIAL_TRACKS.flatMap((track) =>
            track.sections.flatMap((section) =>
                section.pages.map((page) => ({
                    lang: track.language.id,
                    slug: page.slug,
                }))
            )
        )
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const track = getTutorialTrack(lang);
    const page = getTutorialPage(lang, slug);
    if (!track || !page) return {};
    return tutorialLessonMetadata(track, page, lang, slug);
}

export default async function TutorialLessonPage({ params }: Props) {
    assertFeatureEnabled("tutorials");
    const { lang, slug } = await params;
    const track = getTutorialTrack(lang);
    const page = getTutorialPage(lang, slug);

    if (!track || !page) notFound();

    const { prev, next } = getAdjacentPages(lang, slug);

    return <TutorialLayout track={track} page={page} prev={prev} next={next} />;
}
