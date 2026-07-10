import type { Locale } from "@/i18n/routing";
import { htmlLang, ogLocales } from "@/i18n/routing";

type TranslateFn = (key: string, values?: Record<string, string | number>) => string;

/** Auto-translate user-facing strings for metadata and headings. */
export function autoTranslate(text: string, locale: Locale, t: TranslateFn): string {
    if (locale === "en") return text;
    const key = `auto.${hashKey(text)}`;
    try {
        const translated = t(key);
        if (translated && translated !== key) return translated;
    } catch {
        /* fall through */
    }
    return t("auto.fallback", { text });
}

function hashKey(text: string): string {
    let h = 0;
    for (let i = 0; i < text.length; i++) {
        h = (h << 5) - h + text.charCodeAt(i);
        h |= 0;
    }
    return `k${Math.abs(h)}`;
}

export function schemaLanguage(locale: Locale): string {
    return htmlLang[locale] === "en" ? "en-US" : htmlLang[locale] === "fr" ? "fr-FR" : "es-ES";
}

export function openGraphLocale(locale: Locale): string {
    return ogLocales[locale];
}

export { htmlLang, ogLocales };
