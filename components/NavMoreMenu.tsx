"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const MORE_LINKS = [
    { key: "openSource", href: "/opensource" },
    { key: "guides", href: "/guides" },
    { key: "cheatsheets", href: "/cheatsheets" },
    { key: "credentials", href: "/credentials" },
    { key: "programs", href: "/programs" },
    { key: "instructors", href: "/instructors" },
    { key: "tutors", href: "/tutors" },
    { key: "media", href: "/media" },
    { key: "resources", href: "/resources" },
] as const;

export default function NavMoreMenu() {
    const t = useTranslations("Nav");
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const isMoreActive = MORE_LINKS.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors ${
                    isMoreActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
                }`}
                aria-expanded={open}
            >
                {t("more")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-xl py-2 z-50">
                    {MORE_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`block px-4 py-2 text-sm font-medium transition-colors ${
                                pathname === link.href ? "text-emerald-600 bg-emerald-50" : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
