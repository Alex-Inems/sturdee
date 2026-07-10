"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import { Globe2 } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (next: Locale) => {
        router.replace(pathname, { locale: next });
    };

    return (
        <div className="relative group">
            <label className="sr-only" htmlFor="language-select">
                Language
            </label>
            <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-gray-400 hidden sm:block" aria-hidden />
                <select
                    id="language-select"
                    value={locale}
                    onChange={(e) => switchLocale(e.target.value as Locale)}
                    className="text-[13px] font-semibold text-gray-600 bg-transparent border border-gray-200 rounded-full px-3 py-1.5 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    aria-label="Select language"
                >
                    {locales.map((l) => (
                        <option key={l} value={l}>
                            {localeNames[l]}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
