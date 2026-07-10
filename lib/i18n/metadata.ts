import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const DIFFICULTY_FR: Record<string, string> = {
    Easy: "Facile",
    Medium: "Moyen",
    Hard: "Difficile",
};

const DIFFICULTY_ES: Record<string, string> = {
    Easy: "Fácil",
    Medium: "Medio",
    Hard: "Difícil",
};

export async function getLocalizedPracticeMeta(
    locale: Locale,
    problem: {
        title: string;
        number: number;
        difficulty: string;
        topic: string;
        description: string;
    }
) {
    const t = await getTranslations({ locale, namespace: "Auto" });
    const difficulty =
        locale === "fr"
            ? DIFFICULTY_FR[problem.difficulty] ?? problem.difficulty
            : locale === "es"
              ? DIFFICULTY_ES[problem.difficulty] ?? problem.difficulty
              : problem.difficulty;

    if (locale === "en") {
        return {
            title: `${problem.title} — ${problem.difficulty} Coding Problem #${problem.number}`,
            description: `${problem.description.replace(/\*\*/g, "")} Practice in our LeetCode-style IDE with JavaScript and Python solutions. Topic: ${problem.topic}.`,
        };
    }

    return {
        title: t("practiceTitle", {
            title: problem.title,
            difficulty,
            number: problem.number,
        }),
        description: t("practiceDescription", {
            title: problem.title,
            topic: problem.topic,
        }),
    };
}

export async function getLocalizedHomeMeta(locale: Locale) {
    const t = await getTranslations({ locale, namespace: "Home" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        breadcrumb: t("breadcrumb"),
    };
}

export async function getLocalizedHubMeta(
    locale: Locale,
    key: "tutorials" | "blog" | "courses" | "practice" | "openSource"
) {
    const t = await getTranslations({ locale, namespace: "Meta" });
    return {
        title: t(`${key}Title`),
        description: t(`${key}Description`),
    };
}
