"use client";

import { CheckCircle2 } from "lucide-react";
import SectionShell from "./SectionShell";

const LearningExperience = () => (
    <SectionShell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
                <span className="inline-flex mb-6 px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-md">
                    The Stwedy Experience
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Learn With Purpose
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-6">
                    Every program is designed as a progression — from foundational mastery to executive-level application.
                </p>
                <ul className="space-y-4 mt-8">
                    {[
                        "Guided cohorts with faculty access",
                        "Case-driven, real-world application",
                        "Peer collaboration & mentorship",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600 font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:col-span-7 relative">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] aspect-square bg-amber-100/30 rounded-full blur-[2px] pointer-events-none hidden lg:block" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100/50">
                    <span className="px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs inline-block mb-6">Outcome</span>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                        Strategic thinkers prepared to lead globally
                    </p>
                    <p className="text-gray-500 font-medium text-sm mt-4 leading-relaxed">
                        Graduate with the confidence and skills to drive impact in any industry.
                    </p>
                </div>
            </div>
        </div>
    </SectionShell>
);

export default LearningExperience;
