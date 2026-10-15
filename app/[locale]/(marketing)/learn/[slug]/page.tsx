import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { learnHubJsonLd, pageMetadata } from "@/lib/seo";
import { LEARN_HUBS } from "@/lib/seo-keywords";
import { getLocalizedLearnHub } from "@/lib/i18n/seo-locale";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        LEARN_HUBS.map((hub) => ({ locale, slug: hub.slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const hub = getLocalizedLearnHub(locale as Locale, slug);
    if (!hub) return { title: "Not found" };
    return pageMetadata({
        title: hub.title,
        description: hub.description,
        path: `/learn/${hub.slug}`,
        locale: locale as Locale,
        keywords: hub.keywords,
    });
}

export default async function LearnHubPage({ params }: Props) {
    const { locale, slug } = await params;
    const hub = getLocalizedLearnHub(locale as Locale, slug);
    if (!hub) notFound();

    const highlight =
        locale === "fr" ? "Gratuit" : locale === "es" ? "Gratis" : locale === "zh" ? "免费" : "Learn free";
    const whatLabel =
        locale === "fr"
            ? "Ce que vous obtiendrez"
            : locale === "es"
              ? "Qué obtendrás"
              : locale === "zh"
                ? "你将获得"
                : "What you'll get";
    const faqLabel =
        locale === "fr"
            ? "Questions fréquentes"
            : locale === "es"
              ? "Preguntas frecuentes"
              : locale === "zh"
                ? "常见问题"
                : "Frequently asked questions";
    const startLabel =
        locale === "fr" ? "Commencer ici" : locale === "es" ? "Empieza aquí" : locale === "zh" ? "从这里开始" : "Start here";
    const proLabel =
        locale === "fr"
            ? "Sturdee Pro — Tuteur IA 20 $/mois"
            : locale === "es"
              ? "Sturdee Pro — Tutor IA 20 $/mes"
              : locale === "zh"
                ? "Sturdee Pro — AI 导师 $20/月"
                : "Sturdee Pro — AI Tutor $20/mo";
    const relatedLabel =
        locale === "fr"
            ? "Recherches associées"
            : locale === "es"
              ? "Búsquedas relacionadas"
              : locale === "zh"
                ? "相关搜索"
                : "Related searches";

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd
                data={learnHubJsonLd({
                    title: hub.title,
                    description: hub.description,
                    path: `/learn/${hub.slug}`,
                    faqs: hub.faqs,
                })}
            />
            <PageHero highlight={highlight} title={hub.h1} subtitle={hub.description} />
            <SectionShell compact>
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-7 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900">{whatLabel}</h2>
                            <ul className="mt-4 space-y-3">
                                {hub.bullets.map((bullet) => (
                                    <li key={bullet} className="text-sm font-medium text-gray-600 leading-relaxed">
                                        · {bullet}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900">{faqLabel}</h2>
                            <dl className="mt-6 space-y-6">
                                {hub.faqs.map((faq) => (
                                    <div key={faq.question}>
                                        <dt className="text-base font-bold text-gray-900">{faq.question}</dt>
                                        <dd className="mt-2 text-sm font-medium text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    </div>

                    <aside className="lg:col-span-5 space-y-4">
                        <div className="rounded-2xl border border-gray-200/80 bg-white p-6">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700/80">
                                {startLabel}
                            </p>
                            <div className="mt-5 flex flex-col gap-3">
                                <Link
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    href={hub.ctaPrimary.href as any}
                                    className="rounded-full bg-[#10B981] hover:bg-[#0F9F72] px-5 py-2.5 text-center text-sm font-semibold text-white"
                                >
                                    {hub.ctaPrimary.label}
                                </Link>
                                <Link
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    href={hub.ctaSecondary.href as any}
                                    className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-semibold text-gray-800 hover:border-gray-300"
                                >
                                    {hub.ctaSecondary.label}
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-center text-sm font-semibold text-gray-500 hover:text-gray-900"
                                >
                                    {proLabel}
                                </Link>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-gray-400 leading-relaxed px-1">
                            {relatedLabel}: {hub.keywords.slice(0, 4).join(" · ")}
                        </p>
                    </aside>
                </div>
            </SectionShell>
        </div>
    );
}
