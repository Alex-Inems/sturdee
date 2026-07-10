import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    fr: "Français",
    es: "Español",
};

export const ogLocales: Record<Locale, string> = {
    en: "en_US",
    fr: "fr_FR",
    es: "es_ES",
};

export const htmlLang: Record<Locale, string> = {
    en: "en",
    fr: "fr",
    es: "es",
};

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
});
