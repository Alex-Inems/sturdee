import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import type { Locale } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { getLocaleSeoKeywords, getLocalizedLearnHubs } from "@/lib/i18n/seo-locale";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const loc = locale as Locale;
    const meta = await getLocalizedHubMeta(loc, "learn");
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/learn",
        locale: loc,
        keywords: getLocaleSeoKeywords(loc),
    });
}

export default async function LearnIndexPage({ params }: Props) {
    const { locale } = await params;
    const loc = locale as Locale;
    const hubs = getLocalizedLearnHubs(loc);
    const homeLabel = loc === "fr" ? "Accueil" : loc === "es" ? "Inicio" : loc === "zh" ? "首页" : "Home";
    const learnLabel = loc === "fr" ? "Apprendre" : loc === "es" ? "Aprender" : loc === "zh" ? "学习" : "Learn";
    const highlight =
        loc === "fr" ? "Gratuit" : loc === "es" ? "Gratis" : loc === "zh" ? "免费学习" : "Learn free";
    const title =
        loc === "fr"
            ? "Apprendre l'IA et coder — gratuit pour commencer"
            : loc === "es"
              ? "Aprende IA y a programar — gratis para empezar"
              : loc === "zh"
                ? "免费学人工智能与编程"
                : "Learn AI and code — free to start";
    const subtitle =
        loc === "fr"
            ? "Hubs thématiques pour les recherches des étudiants : apprendre l'IA gratuitement, prompt engineering, apprendre à coder gratuitement."
            : loc === "es"
              ? "Hubs temáticos para lo que buscan los estudiantes: aprender IA gratis, ingeniería de prompts, aprender a programar gratis."
              : loc === "zh"
                ? "面向真实搜索意图的主题中心：免费学人工智能、提示词工程、免费学编程、网页开发。"
                : "Topic hubs built for the searches students actually use: learn AI free, prompt engineering, learn to code for free, and web development.";
    const openLabel =
        loc === "fr" ? "Ouvrir →" : loc === "es" ? "Abrir →" : loc === "zh" ? "打开 →" : "Open hub →";

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: homeLabel, path: "/" },
                    { name: learnLabel, path: "/learn" },
                ])}
            />
            <PageHero highlight={highlight} title={title} subtitle={subtitle} />
            <SectionShell compact>
                <ul className="grid sm:grid-cols-2 gap-6">
                    {hubs.map((hub) => (
                        <li key={hub.slug}>
                            <Link
                                href={`/learn/${hub.slug}`}
                                className="block h-full rounded-2xl border border-gray-200/80 bg-white p-6 hover:border-emerald-300 hover:shadow-sm transition-all"
                            >
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{hub.h1}</h2>
                                <p className="mt-3 text-sm font-medium text-gray-500 leading-relaxed">
                                    {hub.description}
                                </p>
                                <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                                    {openLabel}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionShell>
        </div>
    );
}
