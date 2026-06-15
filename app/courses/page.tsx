import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
    title: "Available Courses | Stwedy",
    description:
        "Browse our comprehensive catalog of courses in economics, arts, and sciences. Enroll today to start your journey.",
};

export default function CoursesPage() {
    return (
        <div className="font-jakarta bg-white min-h-screen">
            <PageHero
                highlight="Course Catalog"
                title="Explore Our Courses"
                subtitle="Browse our comprehensive curriculum designed for future leaders and curious minds."
            />

            <section className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-4 overflow-x-auto">
                    {["All Subjects", "Business", "Arts", "Science", "Technology"].map((f, i) => (
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
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <span className="inline-flex px-4 py-1.5 bg-amber-100/60 text-amber-700 rounded-full text-xs font-bold mb-4">
                                Business • 4 Weeks
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Leadership</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                                Master the art of decision making in high-stakes environments.
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
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
                        <img
                            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                            alt="AI Ethics course"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute top-4 right-4 px-4 py-2 bg-[#FFE55E] rounded-full font-bold text-black text-xs">
                            New Arrival
                        </span>
                    </div>
                    <div>
                        <span className="inline-flex mb-4 px-5 py-2.5 bg-emerald-100/60 text-emerald-700 rounded-full text-xs font-bold">
                            Featured
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">AI Ethics & Policy</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-6">
                            Navigate the complex landscape of artificial intelligence governance. Designed for executives and policymakers.
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
                    {["Single Course", "Professional Certificate", "Master Track"].map((plan, i) => (
                        <div
                            key={plan}
                            className={`rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:translate-y-[-2px] ${i === 1
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white border-gray-100/50"
                                }`}
                        >
                            <h3 className="text-lg font-bold mb-2">{plan}</h3>
                            <div className={`text-4xl font-bold mb-6 ${i === 1 ? "text-[#FFE55E]" : "text-gray-900"}`}>
                                $2,400
                            </div>
                            <ul className={`space-y-3 text-sm font-medium mb-8 ${i === 1 ? "text-white/80" : "text-gray-500"}`}>
                                <li>✓ Full Access</li>
                                <li>✓ Certificate</li>
                                <li>✓ Alumni Network</li>
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
