"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link as LocaleLink, usePathname, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import NavMoreMenu from "./NavMoreMenu";
import { useAuth } from "./AuthContext";

const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

const PRIMARY_LINKS = [
    { key: "tutorials", href: "/tutorials" },
    { key: "practice", href: "/practice" },
    { key: "courses", href: "/courses" },
    { key: "blog", href: "/blog" },
] as const;

function NavigationInner() {
    const t = useTranslations("Nav");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const { user, logout, ensureAuth } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const authParam = searchParams.get("auth");
    const authFromUrl = authParam === "login" || authParam === "error";
    const authError = authParam === "error" ? "Sign in failed. Please try again." : undefined;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeAuth = () => {
        setAuthOpen(false);
        if (authFromUrl) router.replace(pathname);
    };

    const openAuth = () => {
        ensureAuth();
        setAuthOpen(true);
    };

    useEffect(() => {
        if (authFromUrl) {
            ensureAuth();
            setAuthOpen(true);
        }
    }, [authFromUrl, ensureAuth]);

    const linkClass = (href: string) =>
        `text-[14px] font-medium tracking-wide transition-colors ${
            pathname === href || pathname.startsWith(`${href}/`)
                ? "text-black font-semibold"
                : "text-gray-500 hover:text-black"
        }`;

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 font-jakarta bg-page/85 backdrop-blur-md ${
                    scrolled ? "py-2.5 border-b border-gray-200/70 shadow-xs" : "py-3.5 border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-3">
                    <LocaleLink href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-85 shrink-0">
                        Sturdee
                    </LocaleLink>

                    <div className="hidden lg:flex items-center gap-4">
                        {PRIMARY_LINKS.map((link) => (
                            <LocaleLink key={link.href} href={link.href} className={linkClass(link.href)}>
                                {t(link.key)}
                            </LocaleLink>
                        ))}
                        <NavMoreMenu />
                        {user?.role === "admin" && (
                            <Link href="/admin" className="text-[14px] font-medium text-gray-500 hover:text-emerald-600">
                                {t("admin")}
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-2 shrink-0">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-[13px] font-semibold text-gray-600 hover:text-gray-900">
                                    {t("dashboard")}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-xs font-semibold text-gray-400 hover:text-red-500 px-2"
                                >
                                    {t("logout")}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={openAuth}
                                className="px-5 py-2 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-[13px] rounded-full transition-colors"
                            >
                                {t("login")}
                            </button>
                        )}
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <LanguageSwitcher compact />
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="p-2 rounded-full hover:bg-gray-50"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {mobileMenu && (
                    <div className="md:hidden border-t border-gray-200/70 bg-page/95 backdrop-blur-md px-6 py-4 space-y-1">
                        {PRIMARY_LINKS.map((link) => (
                            <LocaleLink
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenu(false)}
                                className="block text-sm font-semibold text-gray-800 py-2.5"
                            >
                                {t(link.key)}
                            </LocaleLink>
                        ))}
                        <p className="text-[10px] font-bold uppercase text-gray-400 pt-3 pb-1">{t("more")}</p>
                        {[
                            { key: "openSource", href: "/opensource" },
                            { key: "guides", href: "/guides" },
                            { key: "cheatsheets", href: "/cheatsheets" },
                            { key: "credentials", href: "/credentials" },
                            { key: "programs", href: "/programs" },
                            { key: "instructors", href: "/instructors" },
                            { key: "tutors", href: "/tutors" },
                        ].map((link) => (
                            <LocaleLink
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenu(false)}
                                className="block text-sm text-gray-600 py-2 pl-2"
                            >
                                {t(link.key)}
                            </LocaleLink>
                        ))}
                        <hr className="border-gray-100 my-3" />
                        {user ? (
                            <Link href="/dashboard" onClick={() => setMobileMenu(false)} className="block text-center py-2.5 bg-gray-50 rounded-xl font-semibold text-sm">
                                {t("dashboard")}
                            </Link>
                        ) : (
                            <button onClick={() => { openAuth(); setMobileMenu(false); }} className="w-full py-2.5 bg-[#10B981] text-white rounded-xl font-semibold text-sm">
                                {t("login")}
                            </button>
                        )}
                    </div>
                )}
            </nav>
            <AuthModal isOpen={authOpen || authFromUrl} onClose={closeAuth} initialError={authError} />
        </>
    );
}

export default function Navigation() {
    return (
        <Suspense fallback={null}>
            <NavigationInner />
        </Suspense>
    );
}
