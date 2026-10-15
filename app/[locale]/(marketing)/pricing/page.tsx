import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import PricingCards from "@/components/billing/PricingCards";
import type { Locale } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { getLocaleSeoKeywords } from "@/lib/i18n/seo-locale";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const loc = locale as Locale;
    const meta = await getLocalizedHubMeta(loc, "pricing");
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/pricing",
        locale: loc,
        keywords: [...getLocaleSeoKeywords(loc), "Sturdee Pro"],
    });
}

export default async function PricingPage({ params }: Props) {
    const { locale } = await params;
    const copy =
        locale === "fr"
            ? {
                  highlight: "Tarifs",
                  title: "Apprendre gratuitement. Pro pour l'IA.",
                  subtitle:
                      "Tutoriels, compétences et classes restent gratuits. Débloquez le tuteur IA et le Coach pratique avec Sturdee Pro — 20 $/mois.",
              }
            : locale === "es"
              ? {
                    highlight: "Precios",
                    title: "Aprende gratis. Pro para la IA.",
                    subtitle:
                        "Tutoriales, habilidades y aulas siguen gratis. Desbloquea el tutor IA y el Coach de práctica con Sturdee Pro — 20 $/mes.",
                }
              : locale === "zh"
                ? {
                      highlight: "价格",
                      title: "免费学习，Pro 解锁 AI",
                      subtitle:
                          "教程、技能与课堂保持免费。Sturdee Pro（$20/月）解锁 AI 导师与练习教练。",
                  }
                : {
                      highlight: "Pricing",
                      title: "Free to learn. Pro for AI.",
                      subtitle:
                          "Tutorials, skills, and classrooms stay free. Unlock AI Tutor and Practice Coach with Sturdee Pro — $20/month.",
                  };

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero highlight={copy.highlight} title={copy.title} subtitle={copy.subtitle} />
            <SectionShell compact>
                <Suspense fallback={<SectionPlaceholder />}>
                    <PricingCards />
                </Suspense>
            </SectionShell>
        </div>
    );
}
