"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = { en: "EN", fr: "FR", es: "ES" };

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div
            className={`inline-flex items-center rounded-full border border-gray-200 bg-white/80 p-0.5 ${
                compact ? "scale-90" : ""
            }`}
            role="group"
            aria-label="Language"
        >
            {locales.map((l) => (
                <button
                    key={l}
                    type="button"
                    onClick={() => router.replace(pathname, { locale: l })}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        locale === l ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"
                    }`}
                    aria-current={locale === l ? "true" : undefined}
                >
                    {LABELS[l]}
                </button>
            ))}
        </div>
    );
}
