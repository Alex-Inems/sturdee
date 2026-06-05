import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export default function InstructorsPage() {
    return (
        <div className="font-jakarta bg-white min-h-screen">
            <PageHero
                highlight="Faculty"
                title="World-Class Faculty"
                subtitle="Learn from Nobel laureates, industry titans, and thought leaders shaping the future."
            />

            <SectionShell>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 aspect-[4/5]">
                        <img
                            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                            alt="Dean Eleanor Sterling"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="inline-flex mb-4 px-5 py-2.5 bg-amber-100/60 text-amber-700 rounded-full text-xs font-bold">
                            Dean of Economics
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Dr. Eleanor Sterling</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-4">
                            Dr. Sterling joins Sturdee after a distinguished 20-year career at the World Bank. Her research on micro-finance in developing nations has shaped global policy.
                        </p>
                        <p className="text-gray-600 font-medium italic leading-relaxed mb-8">
                            &quot;Education is the most powerful weapon which you can use to change the world.&quot;
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Macroeconomics 101", "Global Trade"].map((course) => (
                                <span
                                    key={course}
                                    className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                                >
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 text-center hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-amber-100/60 mb-4">
                                <img
                                    src={`https://images.unsplash.com/photo-${i === 1
                                            ? "1568602471122-7832951cc4c5"
                                            : i === 2
                                                ? "1573496359142-b8d87734a5a2"
                                                : "1472099645785-5658abf4ff4e"
                                        }?auto=format&fit=crop&w=400&q=80`}
                                    alt="Faculty member"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Professor Name</h3>
                            <p className="text-xs font-semibold text-emerald-600 mb-2">Computer Science</p>
                            <p className="text-gray-500 text-xs font-medium">Ex-Google AI Research Lead</p>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <SectionShell>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Research & Impact</h2>
                    <p className="text-gray-500 font-medium leading-relaxed text-lg">
                        Our faculty don&apos;t just teach from textbooks—they write them. 85% of our staff are actively engaged in groundbreaking research funded by global institutions.
                    </p>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100/50">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Publications</h2>
                    <div className="space-y-4">
                        {["The Future of Quantum Computing", "Sustainable Finance Models", "AI in Education Policy"].map(
                            (title) => (
                                <div
                                    key={title}
                                    className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <div>
                                        <h4 className="font-bold text-gray-900">{title}</h4>
                                        <p className="text-gray-500 text-sm font-medium">Journal of Nature, 2025</p>
                                    </div>
                                    <button className="px-5 py-2.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:border-gray-300 transition-colors shrink-0">
                                        Read Abstract
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </SectionShell>

            <SectionShell compact>
                <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Faculty</h2>
                    <p className="text-gray-500 font-medium mb-6">
                        We are always looking for exceptional minds to join our department.
                    </p>
                    <button className="px-10 py-4 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full transition-all">
                        View Openings
                    </button>
                </div>
            </SectionShell>
        </div>
    );
}
