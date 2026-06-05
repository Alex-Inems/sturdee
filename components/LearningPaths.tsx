"use client";

import { ArrowRight } from "lucide-react";
import SectionShell from "./SectionShell";

const LearningPaths = () => {
    const paths = [
        {
            title: "Business Mastery",
            courses: "24 Courses",
            duration: "6 Months",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
            tag: "Popular",
        },
        {
            title: "Leadership Excellence",
            courses: "18 Courses",
            duration: "4 Months",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
            tag: "New",
        },
        {
            title: "Innovation & Strategy",
            courses: "20 Courses",
            duration: "5 Months",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            tag: "Featured",
        },
    ];

    return (
        <SectionShell id="programs">
            <div className="mb-12 lg:mb-16">
                <span className="inline-flex mb-6 px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-md">
                    Learning Paths
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Structured Excellence
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium mt-4">
                    Curated journeys from fundamentals to mastery
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {paths.map((path, i) => (
                    <div
                        key={i}
                        className="group relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
                    >
                        <div className="aspect-[3/4] overflow-hidden">
                            <img
                                src={path.image}
                                alt={path.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                        </div>
                        <span className="absolute top-4 left-4 px-4 py-2 bg-[#FFE55E] rounded-full font-bold text-black text-xs z-10">
                            {path.tag}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                            <div className="flex gap-4 text-sm font-medium text-white/80 mb-4">
                                <span>{path.courses}</span>
                                <span>•</span>
                                <span>{path.duration}</span>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all">
                                View Path <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
};

export default LearningPaths;
