import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionShell from "./SectionShell";
import { LEARNING_PATHS } from "@/lib/courses";

const LearningPaths = () => {
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
                {LEARNING_PATHS.map((path) => (
                    <div
                        key={path.id}
                        className="group relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
                    >
                        <div className="aspect-[3/4] overflow-hidden relative">
                            <Image
                                src={path.image}
                                alt={path.title}
                                width={640}
                                height={853}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                        </div>
                        <span className="absolute top-4 left-4 px-4 py-2 bg-[#FFE55E] rounded-full font-bold text-black text-xs z-10">
                            {path.tag}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <p className="text-xs font-semibold text-white/70 mb-2">{path.category}</p>
                            <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                            <p className="text-sm text-white/75 font-medium mb-4 line-clamp-2">{path.description}</p>
                            <div className="flex gap-4 text-sm font-medium text-white/80 mb-4">
                                <span>{path.courses} Courses</span>
                                <span>•</span>
                                <span>{path.duration}</span>
                            </div>
                            <button
                                type="button"
                                className="flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all"
                            >
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
