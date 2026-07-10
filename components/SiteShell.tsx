"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

function LocaleHtmlLang({ lang }: { lang?: string }) {
    useEffect(() => {
        if (lang) document.documentElement.lang = lang;
    }, [lang]);
    return null;
}

export default function SiteShell({ children, lang }: { children: React.ReactNode; lang?: string }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <LocaleHtmlLang lang={lang} />
            <Navigation />
            {children}
            <Footer />
        </>
    );
}
