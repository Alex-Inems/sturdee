"use client";

import { useTranslations } from "next-intl";
import SectionShell from "@/components/SectionShell";

export default function LandingMethod() {
    const t = useTranslations("Landing");

    const steps = [
        { n: "01", title: t("step1Title"), body: t("step1Body") },
        { n: "02", title: t("step2Title"), body: t("step2Body") },
        { n: "03", title: t("step3Title"), body: t("step3Body") },
    ];

    return (
        <SectionShell className="bg-page-deep/40">
            <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    {t("methodTitle")}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
                    {t("methodSubtitle")}
                </p>
            </div>

            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                {steps.map((step) => (
                    <li key={step.n} className="relative">
                        <p className="text-sm font-bold tracking-widest text-emerald-600/90 mb-4">{step.n}</p>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                        <p className="mt-3 text-sm sm:text-[15px] text-gray-500 font-medium leading-relaxed">
                            {step.body}
                        </p>
                    </li>
                ))}
            </ol>
        </SectionShell>
    );
}
