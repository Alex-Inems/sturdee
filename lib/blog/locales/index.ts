import type { BlogTopic } from "../types";
import { AI_TOPIC_PATCHES_ES } from "./ai-es";
import { AI_TOPIC_PATCHES_FR } from "./ai-fr";
import { AI_TOPIC_PATCHES_ZH } from "./ai-zh";
import { CORE_TOPIC_PATCHES_ES } from "./core-es";
import { CORE_TOPIC_PATCHES_FR } from "./core-fr";
import { CORE_TOPIC_PATCHES_ZH } from "./core-zh";
import type { BlogTopicPatch } from "./types";

export type { BlogTopicPatch } from "./types";

const PATCHES_BY_LOCALE: Record<"fr" | "es" | "zh", Record<string, BlogTopicPatch>> = {
    fr: { ...CORE_TOPIC_PATCHES_FR, ...AI_TOPIC_PATCHES_FR },
    es: { ...CORE_TOPIC_PATCHES_ES, ...AI_TOPIC_PATCHES_ES },
    zh: { ...CORE_TOPIC_PATCHES_ZH, ...AI_TOPIC_PATCHES_ZH },
};

export function getTopicPatch(slug: string, locale: "fr" | "es" | "zh"): BlogTopicPatch | undefined {
    return PATCHES_BY_LOCALE[locale][slug];
}

/** Merge a base English topic with a locale patch (headings, faq, and code title shallow-merge). */
export function mergeTopicWithPatch(topic: BlogTopic, patch: BlogTopicPatch | undefined): BlogTopic {
    if (!patch) return topic;

    const { headings: patchHeadings, faq: patchFaq, code: patchCode, ...rest } = patch;

    return {
        ...topic,
        ...rest,
        headings: patchHeadings ? { ...topic.headings, ...patchHeadings } : topic.headings,
        faq: patchFaq ?? topic.faq,
        code:
            patchCode && topic.code
                ? { ...topic.code, ...patchCode }
                : topic.code,
    };
}

export function applyLocaleToTopic(topic: BlogTopic, locale: "fr" | "es" | "zh"): BlogTopic {
    return mergeTopicWithPatch(topic, getTopicPatch(topic.slug, locale));
}
