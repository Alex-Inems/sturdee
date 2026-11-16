import NextLink from "next/link";
import type { Locale } from "@/i18n/routing";

const COPY: Record<
    Locale,
    { eyebrow: string; title: string; body: string; cta: string; alt: string }
> = {
    en: {
        eyebrow: "Stuck on a tutorial?",
        title: "If you need a live consultation, book a free class now",
        body: "Tutorials stay free. If this article still leaves you confused, book a live class with me — I’ll place you in a session.",
        cta: "Book a free class",
        alt: "Student looking confused at her phone",
    },
    fr: {
        eyebrow: "Bloqué sur un tutoriel ?",
        title: "Besoin d'une consultation en direct ? Réservez un cours gratuit",
        body: "Les tutoriels restent ouverts. Si cet article vous laisse perdu, réservez un cours en direct avec moi.",
        cta: "Réserver un cours gratuit",
        alt: "Étudiante confuse devant son téléphone",
    },
    es: {
        eyebrow: "¿Atascado en un tutorial?",
        title: "Si necesitas una consulta en vivo, reserva una clase gratis",
        body: "Los tutoriales siguen siendo gratis. Si este artículo no basta, reserva una clase en vivo conmigo.",
        cta: "Reservar clase gratis",
        alt: "Estudiante confundida mirando el teléfono",
    },
    zh: {
        eyebrow: "教程卡住了？",
        title: "需要直播答疑？现在预约免费课",
        body: "教程仍然免费。如果这篇文章看完还是糊涂，就预约我的直播课。",
        cta: "预约免费课",
        alt: "女生看着手机一脸困惑",
    },
};

export default function BlogConsultCta({ locale = "en" }: { locale?: Locale }) {
    const t = COPY[locale] ?? COPY.en;
    return (
        <aside className="mt-12 overflow-hidden rounded-2xl bg-gray-950 text-white">
            <div className="grid sm:grid-cols-[minmax(0,180px)_1fr] gap-0 items-stretch">
                <div className="relative min-h-[160px] bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/student-confused.jpg"
                        alt={t.alt}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                </div>
                <div className="p-6 md:p-8">
                    <span className="inline-flex mb-3 px-3 py-1 bg-[#FFE55E] rounded-full font-bold text-black text-[11px] tracking-wide">
                        {t.eyebrow}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold leading-tight">{t.title}</h2>
                    <p className="mt-2 text-sm text-gray-400 font-medium leading-relaxed">{t.body}</p>
                    <NextLink
                        href="/book?consult=1"
                        className="mt-5 inline-flex items-center justify-center px-6 py-2.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-sm rounded-full transition-colors"
                    >
                        {t.cta}
                    </NextLink>
                </div>
            </div>
        </aside>
    );
}
