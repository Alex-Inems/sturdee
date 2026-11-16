"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";

export default function LandingConsult() {
    const t = useTranslations("Landing");

    return (
        <section className="relative overflow-hidden bg-gray-950">
            <h2 className="sr-only">{t("consultTitle")}</h2>
            <NextLink
                href="/book?consult=1"
                aria-label={t("consultCta")}
                className="block"
            >
                <video
                    src="/videos/stuck-tutorial.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                    className="block w-full h-auto"
                />
            </NextLink>
        </section>
    );
}
