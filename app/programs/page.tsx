import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export default function ProgramsPage() {
    return (
        <div className="font-jakarta bg-white min-h-screen">
            <PageHero
                highlight="Academic Programs"
                title="Structured Learning Paths"
                subtitle="Career-transforming programs from undergraduate foundations to executive mastery."
            />

            <SectionShell>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Undergraduate", icon: "🎓", desc: "A rigorous foundation in the liberal arts and sciences." },
                        { title: "Graduate", icon: "📜", desc: "Advanced specialization for career acceleration." },
                        { title: "Executive", icon: "👔", desc: "Leadership programs for senior professionals." },
                    ].map((lvl) => (
                        <div
                            key={lvl.title}
                            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/50 text-center hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <div className="text-5xl mb-4">{lvl.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{lvl.title}</h3>
                            <p className="text-gray-500 text-sm font-medium mb-6">{lvl.desc}</p>
                            <button className="text-emerald-600 text-sm font-semibold">View Degrees →</button>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <SectionShell>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs shadow-md">
                            MBA Program
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The MBA Program</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-8">
                            Consistently ranked top 10 globally, our MBA focuses on ethical leadership and global outcomes.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100/50">
                                <div className="text-3xl font-bold text-gray-900">14</div>
                                <div className="text-xs text-gray-500 font-medium mt-1">Months</div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100/50">
                                <div className="text-3xl font-bold text-gray-900">$150k</div>
                                <div className="text-xs text-gray-500 font-medium mt-1">Avg Salary</div>
                            </div>
                        </div>
                        <button className="px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all">
                            Download Brochure
                        </button>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 aspect-[4/5]">
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                            alt="Students"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Program Structure</h2>
                <div className="space-y-4 max-w-3xl mx-auto">
                    {["Core Fundamentals", "Elective Specialization", "Global Immersion", "Capstone Project"].map(
                        (step, i) => (
                            <div
                                key={step}
                                className="flex gap-6 items-center bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:translate-y-[-1px] transition-all"
                            >
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100/60 text-amber-700 font-bold text-sm shrink-0">
                                    0{i + 1}
                                </span>
                                <div>
                                    <h4 className="font-bold text-gray-900">{step}</h4>
                                    <p className="text-gray-500 text-sm font-medium">Mandatory for all enrolled students.</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </SectionShell>

            <SectionShell compact>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Our Graduates Work At</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {["Google", "McKinsey", "Goldman Sachs", "Meta", "UN"].map((org) => (
                        <span
                            key={org}
                            className="px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-600 text-sm shadow-sm"
                        >
                            {org}
                        </span>
                    ))}
                </div>
            </SectionShell>

            <SectionShell compact>
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                        Accepting Applications for Fall 2026
                    </h2>
                    <button className="px-10 py-4 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full transition-all">
                        Apply Now
                    </button>
                </div>
            </SectionShell>
        </div>
    );
}
