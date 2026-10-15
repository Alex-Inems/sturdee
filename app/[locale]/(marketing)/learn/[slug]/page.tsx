import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { learnHubJsonLd, pageMetadata } from "@/lib/seo";
import { getLearnHub, LEARN_HUBS } from "@/lib/seo-keywords";
import { routing } from "@/i18n/routing";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        LEARN_HUBS.map((hub) => ({ locale, slug: hub.slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const hub = getLearnHub(slug);
    if (!hub) return { title: "Not found" };
    return pageMetadata({
        title: hub.title,
        description: hub.description,
        path: `/learn/${hub.slug}`,
        keywords: hub.keywords,
    });
}

export default async function LearnHubPage({ params }: Props) {
    const { slug } = await params;
    const hub = getLearnHub(slug);
    if (!hub) notFound();

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
            <PageHero highlight="Learn free" title={hub.h1} subtitle={hub.description} />
            <SectionShell compact>
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-7 space-y-10">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900">What you&apos;ll get</h2>
                            <ul className="mt-4 space-y-3">
                                {hub.bullets.map((bullet) => (
                                    <li key={bullet} className="text-sm font-medium text-gray-600 leading-relaxed">
                                        · {bullet}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
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
                                Start here
                            </p>
                            <div className="mt-5 flex flex-col gap-3">
                                <Link
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- hub CTAs are curated path strings
                                    href={hub.ctaPrimary.href as any}
                                    className="rounded-full bg-[#10B981] hover:bg-[#0F9F72] px-5 py-2.5 text-center text-sm font-semibold text-white"
                                >
                                    {hub.ctaPrimary.label}
                                </Link>
                                <Link
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- hub CTAs are curated path strings
                                    href={hub.ctaSecondary.href as any}
                                    className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-semibold text-gray-800 hover:border-gray-300"
                                >
                                    {hub.ctaSecondary.label}
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-center text-sm font-semibold text-gray-500 hover:text-gray-900"
                                >
                                    Sturdee Pro — AI Tutor $20/mo
                                </Link>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-gray-400 leading-relaxed px-1">
                            Related searches: {hub.keywords.slice(0, 4).join(" · ")}
                        </p>
                    </aside>
                </div>
            </SectionShell>
        </div>
    );
}
