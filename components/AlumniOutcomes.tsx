"use client";

import SectionShell from "./SectionShell";

const AlumniOutcomes = () => (
    <SectionShell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
                <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                    Alumni Network
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Where Our Alumni Lead
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-6">
                    Graduates join leading organizations worldwide, applying skills from day one.
                </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                {["Google", "McKinsey", "Goldman Sachs", "UN Innovation"].map((org, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300"
                    >
                        <p className="font-bold text-gray-900 text-lg">{org}</p>
                        <p className="text-gray-500 text-xs mt-2 font-medium">Leadership Roles</p>
                    </div>
                ))}
            </div>
        </div>
    </SectionShell>
);

export default AlumniOutcomes;
