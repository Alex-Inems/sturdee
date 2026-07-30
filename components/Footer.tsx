"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site-core";

const Footer = () => {
    const t = useTranslations("Footer");
    const nav = useTranslations("Nav");

    // Sections live when their flag is on in lib/feature-flags.ts.
    const resourceLinks = [
        // { label: nav("tutorials"), href: "/tutorials" as const },
        { label: nav("skills"), href: "/skills" as const },
        { label: nav("classroom"), href: "/classroom" as const },
        { label: nav("book"), href: "/book" as const },
        // { label: nav("guides"), href: "/guides" as const },
        // { label: nav("blog"), href: "/blog" as const },
        // { label: nav("cheatsheets"), href: "/cheatsheets" as const },
        // { label: nav("media"), href: "/media" as const },
        // { label: nav("openSource"), href: "/opensource" as const },
        // { label: nav("practice"), href: "/practice" as const },
        // { label: nav("credentials"), href: "/credentials" as const },
        // { label: t("resourceHub"), href: "/resources" as const },
        // { label: nav("tutors"), href: "/tutors" as const },
        // { label: t("bookSession"), href: "/book" as const },
        // { label: t("courseCatalog"), href: "/courses" as const },
        // { label: t("learningPaths"), href: "/programs" as const },
    ];

    return (
        <footer className="relative bg-page-deep font-jakarta border-t border-gray-200/70 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none dot-pattern" aria-hidden />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
                            Sturdee
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium mt-4">{t("tagline")}</p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-5">{t("resources")}</h3>
                        <ul className="space-y-3 text-sm">
                            {resourceLinks.map((item) => (
                                <li key={item.href + item.label}>
                                    <Link href={item.href} className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-5">{t("company")}</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                    Sturdee
                                </Link>
                            </li>
                            {/* Instructors/tutors section is disabled */}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm font-medium">© 2026 {SITE_NAME}. All rights reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-900 font-medium transition-colors">
                            {t("privacy")}
                        </Link>
                        <Link href="/terms" className="text-gray-400 hover:text-gray-900 font-medium transition-colors">
                            {t("terms")}
                        </Link>
                        <Link href="/legal" className="text-gray-400 hover:text-gray-900 font-medium transition-colors">
                            {t("legal")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
