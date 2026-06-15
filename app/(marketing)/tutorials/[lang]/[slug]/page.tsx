import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialLayout from "@/components/tutorials/TutorialLayout";
import { SITE_NAME } from "@/lib/site";
import {
    TUTORIAL_TRACKS,
    getAdjacentPages,
    getAllTutorialPages,
    getTutorialPage,
    getTutorialTrack,
} from "@/lib/tutorials";

interface Props {
    params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
    return TUTORIAL_TRACKS.flatMap((track) =>
        track.sections.flatMap((section) =>
            section.pages.map((page) => ({
                lang: track.language.id,
                slug: page.slug,
            }))
        )
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const track = getTutorialTrack(lang);
    const page = getTutorialPage(lang, slug);
    if (!track || !page) return { title: `Tutorials | ${SITE_NAME}` };

    return {
        title: `${page.title} | ${track.language.name} Tutorial | ${SITE_NAME}`,
        description: `Learn ${track.language.name}: ${page.title}. Free interactive tutorial on ${SITE_NAME}.`,
    };
}

export default async function TutorialLessonPage({ params }: Props) {
    const { lang, slug } = await params;
    const track = getTutorialTrack(lang);
    const page = getTutorialPage(lang, slug);

    if (!track || !page) notFound();

    const { prev, next } = getAdjacentPages(lang, slug);

    return <TutorialLayout track={track} page={page} prev={prev} next={next} />;
}
