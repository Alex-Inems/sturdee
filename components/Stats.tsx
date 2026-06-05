"use client";

import { Users, Award, TrendingUp, BookOpen } from "lucide-react";
import SectionShell from "./SectionShell";

const Stats = () => {
    const stats = [
        { icon: Users, value: "50,000+", label: "Global Students", color: "bg-amber-100/60 text-amber-600" },
        { icon: Award, value: "500+", label: "Expert Instructors", color: "bg-emerald-100/60 text-emerald-600" },
        { icon: TrendingUp, value: "95%", label: "Success Rate", color: "bg-sky-100/60 text-sky-600" },
        { icon: BookOpen, value: "1,200+", label: "Premium Courses", color: "bg-violet-100/60 text-violet-600" },
    ];

    return (
        <SectionShell compact>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 text-center hover:translate-y-[-2px] transition-all duration-300"
                    >
                        <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                            <stat.icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
};

export default Stats;
