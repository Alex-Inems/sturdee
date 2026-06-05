"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthContext";

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: "Programs", href: "/programs" },
        { label: "Instructors", href: "/instructors" }
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 font-jakarta bg-white/80 backdrop-blur-md ${scrolled ? "py-4 border-b border-gray-100/80 shadow-xs" : "py-6 border-b border-transparent"
                }`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Refined Brand Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-85 transition-opacity">
                        Sturdee
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-9">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-[14px] font-medium tracking-wide transition-colors ${isActive
                                            ? "text-black font-semibold border-b border-black pb-0.5"
                                            : "text-gray-500 hover:text-black"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Status & Refined CTA Button */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-[13px] font-semibold bg-gray-50 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200">
                                    🎓 {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-xs uppercase tracking-wider font-bold text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
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

                    {/* Mobile Menu Button */}
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

                {/* Mobile Menu Overlay */}
                {mobileMenu && (
                    <div className="md:hidden absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-6 space-y-3 animate-in fade-in-50 duration-200">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenu(false)}
                                className="block text-base font-semibold text-gray-800 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr className="border-gray-100 my-2" />
                        <div className="flex flex-col gap-2 pt-2">
                            {user ? (
                                <>
                                    <div className="text-center font-semibold bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                        🎓 {user.name}
                                    </div>
                                    <button
                                        onClick={() => { logout(); setMobileMenu(false); }}
                                        className="w-full text-center py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { setAuthOpen(true); setMobileMenu(false); }}
                                        className="w-full text-center py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        onClick={() => { setAuthOpen(true); setMobileMenu(false); }}
                                        className="w-full text-center py-2.5 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#0F9F72] transition-colors"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
};

export default Navigation;
