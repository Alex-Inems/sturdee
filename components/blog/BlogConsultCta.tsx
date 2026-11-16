import NextLink from "next/link";
import type { Locale } from "@/i18n/routing";

const ALT: Record<Locale, string> = {
    en: "Stuck on a tutorial? Book a free class",
    fr: "Bloqué sur un tutoriel ? Réservez un cours gratuit",
    es: "¿Atascado en un tutorial? Reserva una clase gratis",
    zh: "教程卡住了？预约免费课",
};

export default function BlogConsultCta({ locale = "en" }: { locale?: Locale }) {
    const label = ALT[locale] ?? ALT.en;
    return (
        <aside className="mt-12 overflow-hidden rounded-2xl bg-gray-950">
            <NextLink href="/book?consult=1" aria-label={label} className="block">
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
        </aside>
    );
}
