import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "es", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    fr: "Français",
    es: "Español",
    zh: "中文",
};

export const ogLocales: Record<Locale, string> = {
    en: "en_US",
    fr: "fr_FR",
    es: "es_ES",
    zh: "zh_CN",
};

export const htmlLang: Record<Locale, string> = {
    en: "en",
    fr: "fr",
    es: "es",
    zh: "zh-CN",
};

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
});
