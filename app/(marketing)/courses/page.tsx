import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { COURSES, COURSE_CATEGORIES, formatStudents } from "@/lib/courses";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
    title: `Available Courses | ${SITE_NAME}`,
    description:
        "Browse web development, programming, and cryptocurrency courses. Live cohorts, certificates, and industry-led instruction.",
};

const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100/60 text-emerald-700",
    Intermediate: "bg-amber-100/60 text-amber-700",
    Advanced: "bg-violet-100/60 text-violet-700",
};

export default function CoursesPage() {
    const featured = COURSES.find((c) => c.id === "cry-505")!;

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Course Catalog"
                title="Explore Our Courses"
                subtitle="Web development, programming, and cryptocurrency — structured programs built with hiring partners and updated every term."
            />

            <section className="sticky top-[72px] z-40 bg-page/90 backdrop-blur-md border-b border-gray-200/70">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-4 overflow-x-auto">
                    {["All Subjects", ...COURSE_CATEGORIES].map((f, i) => (
                        <button
                            key={f}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${i === 0
                                    ? "bg-[#FFE55E] text-black shadow-md"
                                    : "bg-white border border-gray-100 text-gray-600 hover:border-gray-200"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            <SectionShell>
                <div className="grid md:grid-cols-3 gap-6">
                    {COURSES.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${levelColors[course.level]}`}>
                                    {course.level}
                                </span>
                                <span className="text-[11px] font-bold text-gray-400">{course.code}</span>
                            </div>
                            <span className="inline-flex px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold mb-4">
                                {course.category} · {course.duration}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">
                                {course.description}
                            </p>
                            <p className="text-xs text-gray-500 font-medium mb-6">
                                {course.instructor} · {course.format} · {course.hours}h · Updated {course.updatedAt}
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-lg font-bold text-gray-900">${course.price.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400 font-medium">
                                        {course.rating} ★ · {formatStudents(course.students)} enrolled
                                    </p>
                                </div>
                                <span className="text-emerald-600 font-semibold text-sm">Enroll →</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <SectionShell>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 aspect-[4/3]">
                        <Image
                            src={featured.image}
                            alt={featured.title}
                            width={800}
                            height={600}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute top-4 right-4 px-4 py-2 bg-[#FFE55E] rounded-full font-bold text-black text-xs">
                            New Arrival
                        </span>
                    </div>
                    <div>
                        <span className="inline-flex mb-4 px-5 py-2.5 bg-emerald-100/60 text-emerald-700 rounded-full text-xs font-bold">
                            {featured.code} · Featured
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{featured.title}</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-4">{featured.description}</p>
                        <p className="text-sm text-gray-400 font-medium mb-6">
                            {featured.instructor} · {featured.duration} · {featured.reviews} reviews
                        </p>
                        <button className="px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all">
                            Download Syllabus
                        </button>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Tuition Options</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { plan: "Single Course", price: "$899–$2,799" },
                        { plan: "Professional Certificate", price: "$4,200" },
                        { plan: "Career Track Bundle", price: "$8,900" },
                    ].map((item, i) => (
                        <div
                            key={item.plan}
                            className={`rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:translate-y-[-2px] ${i === 1
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white border-gray-100/50"
                                }`}
                        >
                            <h3 className="text-lg font-bold mb-2">{item.plan}</h3>
                            <div className={`text-4xl font-bold mb-6 ${i === 1 ? "text-[#FFE55E]" : "text-gray-900"}`}>
                                {item.price}
                            </div>
                            <ul className={`space-y-3 text-sm font-medium mb-8 ${i === 1 ? "text-white/80" : "text-gray-500"}`}>
                                <li>✓ Full platform access</li>
                                <li>✓ Verified certificate</li>
                                <li>✓ Instructor office hours</li>
                            </ul>
                            <button
                                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all ${i === 1
                                        ? "bg-[#10B981] hover:bg-[#0F9F72] text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                    }`}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <SectionShell compact>
                <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions?</h2>
                    <p className="text-gray-500 font-medium mb-6">Our admissions team is here to help.</p>
                    <button className="px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all">
                        Visit Help Center
                    </button>
                </div>
            </SectionShell>
        </div>
    );
}
