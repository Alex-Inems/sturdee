import type { Locale } from "@/i18n/routing";
import type { BlogTopic } from "./types";
import { buildBlogPost, scoreRelatedPosts } from "./factory";
import type { BlogPost } from "./types";
import { applyLocaleToTopic } from "./locales";

function localizeReadTime(readTime: string, locale: Locale): string {
    const match = readTime.match(/(\d+)/);
    const n = match?.[1] ?? "";
    if (locale === "fr") return `${n} min de lecture`;
    if (locale === "es") return `${n} min de lectura`;
    if (locale === "zh") return `${n} 分钟阅读`;
    return readTime;
}

/** Merge EN topic with locale patch (full article body when patch exists). */
export function localizeBlogTopic(topic: BlogTopic, locale: Locale, allTopics: BlogTopic[]): BlogPost {
    if (locale === "en") {
        return buildBlogPost(topic, scoreRelatedPosts(topic, allTopics));
    }

    const localized =
        locale === "fr" || locale === "es" || locale === "zh"
            ? applyLocaleToTopic(topic, locale)
            : topic;

    const post = buildBlogPost(localized, scoreRelatedPosts(localized, allTopics));
    return {
        ...post,
        readTime: localized.readTime?.match(/^\d/)
            ? localized.readTime
            : localizeReadTime(post.readTime, locale),
    };
}
