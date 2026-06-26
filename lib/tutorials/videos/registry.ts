import type { TutorialVideo } from "../types";
import { HTML_VIDEOS } from "./html";
import { CSS_VIDEOS } from "./css";
import { JAVASCRIPT_VIDEOS } from "./javascript";
import { PYTHON_VIDEOS } from "./python";
import { LANGUAGE_VIDEOS } from "./languages";
import { MISC_VIDEOS } from "./misc";
import { LIQUID_VIDEOS } from "./liquid";

export const TUTORIAL_VIDEOS: Record<string, TutorialVideo> = {
    ...HTML_VIDEOS,
    ...CSS_VIDEOS,
    ...JAVASCRIPT_VIDEOS,
    ...PYTHON_VIDEOS,
    ...LANGUAGE_VIDEOS,
    ...MISC_VIDEOS,
    ...LIQUID_VIDEOS,
};

export function getTutorialVideo(langId: string, slug: string): TutorialVideo | undefined {
    return TUTORIAL_VIDEOS[`${langId}/${slug}`];
}

export function attachVideoToPage<T extends { slug: string; video?: TutorialVideo }>(
    langId: string,
    page: T
): T {
    const video = page.video ?? getTutorialVideo(langId, page.slug);
    return video ? { ...page, video } : page;
}
