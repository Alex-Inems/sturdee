import Image from "next/image";
import SectionShell from "./SectionShell";
import { INSTRUCTORS } from "@/lib/courses";

const Instructors = () => {
    return (
        <SectionShell id="instructors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
                <div className="lg:col-span-5">
                    <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                        Faculty
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                        World-Class Faculty
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-6">
                        Learn from engineers and researchers who build production systems at leading technology firms.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {INSTRUCTORS.map((instructor) => (
                    <div
                        key={instructor.name}
                        className="group bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 text-center hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
                    >
                        <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-amber-100/60">
                            <Image
                                src={instructor.image}
                                alt={instructor.name}
                                width={112}
                                height={112}
                                sizes="112px"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h3>
                        <p className="text-xs font-semibold text-emerald-600 mb-2">{instructor.title}</p>
                        <p className="text-xs text-gray-500 font-medium mb-3">{instructor.credentials}</p>
                        <p className="text-[11px] text-gray-400 font-medium">
                            {instructor.courses.join(" · ")}
                        </p>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
};

export default Instructors;
