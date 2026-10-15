import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import PricingCards from "@/components/billing/PricingCards";
import { PRO_PRICE_LABEL } from "@/lib/billing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: `Pricing — Sturdee Pro ${PRO_PRICE_LABEL}`,
    description:
        "Free tutorials and cohorts for everyone. Sturdee Pro unlocks AI Tutor, Practice Coach, and smart skill matching for $20/month.",
    path: "/pricing",
    keywords: [
        "Sturdee Pro",
        "AI tutor pricing",
        "AI learning subscription",
        "AI tutor monthly",
        "prompt engineering practice",
        "learn AI with tutor",
    ],
});

export default function PricingPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Pricing"
                title="Free to learn. Pro for AI."
                subtitle={`Tutorials, skills, and classrooms stay free. Unlock AI Tutor and Practice Coach with Sturdee Pro — ${PRO_PRICE_LABEL}.`}
            />
            <SectionShell compact>
                <Suspense fallback={<SectionPlaceholder />}>
                    <PricingCards />
                </Suspense>
            </SectionShell>
        </div>
    );
}
