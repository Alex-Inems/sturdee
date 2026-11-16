"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AiTutorFab from "@/components/ai/AiTutorFab";
import LandingConsult from "@/components/landing/LandingConsult";
import { FEATURES } from "@/lib/feature-flags";

function LocaleHtmlLang({ lang }: { lang?: string }) {
    useEffect(() => {
        if (lang) document.documentElement.lang = lang;
    }, [lang]);
    return null;
}

export default function SiteShell({ children, lang }: { children: React.ReactNode; lang?: string }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");
    const hideFab = isAdmin || pathname === "/ai" || pathname.endsWith("/ai");
    const isHome = pathname === "/" || /^\/(fr|es|zh)\/?$/.test(pathname);
    const showStuck = FEATURES.booking && !isAdmin && !isHome;

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <LocaleHtmlLang lang={lang} />
            <Navigation />
            {children}
            {showStuck ? <LandingConsult /> : null}
            <Footer />
            {!hideFab && <AiTutorFab />}
        </>
    );
}
