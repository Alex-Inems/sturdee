"use client";

import { Sparkles } from "lucide-react";
import SectionShell from "./SectionShell";

const Philosophy = () => (
    <SectionShell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] aspect-square bg-amber-100/30 rounded-full blur-[2px] pointer-events-none" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100/50 max-w-lg w-full">
                    <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center mb-6">
                        <Sparkles className="w-5 h-5 text-amber-600 stroke-[2.2]" />
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed text-sm sm:text-base">
                        We believe education is an art form. Our carefully curated curriculum combines world-class instruction with personalized mentorship.
                    </p>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm mt-4">
                        From industry leaders to academic pioneers, our instructors bring decades of expertise to every lesson.
                    </p>
                </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Education Refined
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-6">
                    Transformative learning experiences designed for curious minds ready to explore.
                </p>
                <div className="flex flex-wrap gap-2 mt-8">
                    <span className="px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs shadow-md">Curated</span>
                    <span className="px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-md">Mentorship</span>
                    <span className="px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-md">Excellence</span>
                </div>
            </div>
        </div>
    </SectionShell>
);

export default Philosophy;
