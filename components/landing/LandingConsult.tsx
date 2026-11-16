"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";

export default function LandingConsult() {
    const t = useTranslations("Landing");

    return (
        <section className="relative overflow-hidden font-jakarta bg-gray-950 text-white">
            <div
                className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none"
                aria-hidden
            />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[420px]">
                            <div
                                className="absolute -inset-6 rounded-[2rem] bg-emerald-400/10 blur-3xl pointer-events-none"
                                aria-hidden
                            />
                            <img
                                src="/student-confused.jpg"
                                alt={t("consultImageAlt")}
                                className="relative z-10 w-full h-auto rounded-3xl object-cover object-top shadow-2xl ring-1 ring-white/10"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                            {t("consultEyebrow")}
                        </span>
                        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                            {t("consultTitle")}
                        </h2>
                        <p className="mt-5 text-base sm:text-lg text-gray-400 font-medium leading-relaxed max-w-xl">
                            {t("consultBody")}
                        </p>
                        <div className="mt-9">
                            <NextLink
                                href="/book?consult=1"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-[15px] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                {t("consultCta")}
                            </NextLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
