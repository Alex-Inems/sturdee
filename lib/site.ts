import type { Locale } from "@/i18n/routing";
import { defaultLocale, locales } from "@/i18n/routing";
import { SITE_URL } from "./site-core";

export { SITE_NAME, SITE_URL, POLICY_URLS } from "./site-core";

/** Build a locale-aware path. English uses no prefix (`as-needed`). */
export function localePath(locale: Locale, path: string): string {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (locale === defaultLocale) return normalized === "/" ? "/" : normalized;
    return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function localizedUrl(locale: Locale, path: string): string {
    return `${SITE_URL}${localePath(locale, path)}`;
}

export function hreflangAlternates(path: string): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
        languages[locale] = localizedUrl(locale, path);
    }
    languages["x-default"] = localizedUrl(defaultLocale, path);
    return languages;
}

export const LOCALES = locales;
export const DEFAULT_LOCALE = defaultLocale;
