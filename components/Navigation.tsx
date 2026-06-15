"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthContext";

function NavigationInner() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const { user, logout } = useAuth();
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
        if (authFromUrl) {
            router.replace(pathname);
        }
    };

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: "Programs", href: "/programs" },
        { label: "Instructors", href: "/instructors" },
        { label: "Book", href: "/book" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 font-jakarta bg-white/80 backdrop-blur-md ${
                    scrolled ? "py-4 border-b border-gray-100/80 shadow-xs" : "py-6 border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-85 transition-opacity">
                        Stwedy
                    </Link>

                    <div className="hidden lg:flex items-center gap-7">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-[14px] font-medium tracking-wide transition-colors ${
                                        isActive
                                            ? "text-black font-semibold border-b border-black pb-0.5"
                                            : "text-gray-500 hover:text-black"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        {user?.role === "admin" && (
                            <Link
                                href="/admin"
                                className={`text-[14px] font-medium tracking-wide transition-colors ${
                                    pathname.startsWith("/admin")
                                        ? "text-emerald-600 font-semibold"
                                        : "text-gray-500 hover:text-emerald-600"
                                }`}
                            >
                                Admin
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-[13px] font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <span className="text-[13px] font-semibold bg-gray-50 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200">
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-xs uppercase tracking-wider font-bold text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setAuthOpen(true)}
                                    className="text-[14px] font-semibold text-gray-600 hover:text-black transition-colors"
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={() => setAuthOpen(true)}
                                    className="px-6 py-2 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-[14px] rounded-full shadow-xs hover:shadow-sm transition-all duration-200"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden p-2 rounded-full hover:bg-gray-50 transition-colors"
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

                {mobileMenu && (
                    <div className="md:hidden absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-6 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenu(false)}
                                className="block text-base font-semibold text-gray-800 p-2.5 rounded-xl hover:bg-gray-50"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.role === "admin" && (
                            <Link href="/admin" onClick={() => setMobileMenu(false)} className="block text-base font-semibold text-emerald-600 p-2.5">
                                Admin
                            </Link>
                        )}
                        <hr className="border-gray-100 my-2" />
                        {user ? (
                            <>
                                <Link href="/dashboard" onClick={() => setMobileMenu(false)} className="block text-center py-2.5 bg-gray-50 rounded-xl font-semibold">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { logout(); setMobileMenu(false); }}
                                    className="w-full text-center py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => { setAuthOpen(true); setMobileMenu(false); }} className="w-full py-2.5 border border-gray-200 rounded-xl font-semibold">
                                    Sign Up
                                </button>
                                <button onClick={() => { setAuthOpen(true); setMobileMenu(false); }} className="w-full py-2.5 bg-[#10B981] text-white rounded-xl font-semibold">
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                )}
            </nav>
            <AuthModal
                isOpen={authOpen || authFromUrl}
                onClose={closeAuth}
                initialError={authError}
            />
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
