import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { IMAGES } from "@/lib/images";
import { COURSES, INSTRUCTORS } from "@/lib/courses";
import { SITE_NAME } from "@/lib/site";

const facultyImages = [IMAGES.facultyA, IMAGES.facultyB, IMAGES.facultyC] as const;

const extendedFaculty = [
    ...INSTRUCTORS,
    {
        name: "Jordan Blake",
        title: "Frontend Architecture",
        credentials: "Principal Engineer, Stripe",
        image: IMAGES.facultyA,
        courses: ["WEB-302"],
    },
    {
        name: "Dr. Yuki Nakamura",
        title: "Systems Programming",
        credentials: "Systems Engineer, Cloudflare",
        image: IMAGES.facultyB,
        courses: ["PROG-350"],
    },
    {
        name: "Alexandre Dubois",
        title: "Digital Asset Markets",
        credentials: "Former Head of Digital Assets, Citadel",
        image: IMAGES.facultyC,
        courses: ["CRY-220"],
    },
    {
        name: "Mia Torres",
        title: "Web Foundations",
        credentials: "Curriculum Lead, freeCodeCamp",
        image: facultyImages[0],
        courses: ["WEB-210"],
    },
    {
        name: "James Whitfield",
        title: "Enterprise Java",
        credentials: "Principal Engineer, JPMorgan Chase",
        image: facultyImages[1],
        courses: ["PROG-205"],
    },
];

export default function InstructorsPage() {
    const deanCourses = COURSES.filter((c) => c.instructor === "Dr. Priya Sharma").slice(0, 2);

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Faculty"
                title="World-Class Faculty"
                subtitle="Engineers, researchers, and practitioners who teach what they ship in production."
            />

            <SectionShell>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 aspect-[4/5]">
                        <Image
                            src={IMAGES.instructorsDean}
                            alt="Dr. Priya Sharma"
                            width={640}
                            height={800}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="inline-flex mb-4 px-5 py-2.5 bg-amber-100/60 text-amber-700 rounded-full text-xs font-bold">
                            Dean of Technology
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Dr. Priya Sharma</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-4">
                            Dr. Sharma leads {SITE_NAME}&apos;s technology programs after a decade at the Stanford Blockchain
                            Lab. Her work on smart contract security has been cited in over 2,400 peer-reviewed papers.
                        </p>
                        <p className="text-gray-600 font-medium italic leading-relaxed mb-8">
                            &quot;The best engineers learn by building systems that real users depend on.&quot;
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {deanCourses.map((course) => (
                                <span
                                    key={course.code}
                                    className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                                >
                                    {course.code}: {course.title.split(" ").slice(0, 3).join(" ")}…
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {extendedFaculty.map((instructor) => (
                        <div
                            key={instructor.name}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 text-center hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-amber-100/60 mb-4 relative">
                                <Image
                                    src={instructor.image}
                                    alt={instructor.name}
                                    width={96}
                                    height={96}
                                    sizes="96px"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{instructor.name}</h3>
                            <p className="text-xs font-semibold text-emerald-600 mb-2">{instructor.title}</p>
                            <p className="text-gray-500 text-xs font-medium mb-2">{instructor.credentials}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{instructor.courses.join(" · ")}</p>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <SectionShell>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Research & Impact</h2>
                    <p className="text-gray-500 font-medium leading-relaxed text-lg">
                        Our faculty publish on smart contract security, distributed systems, and developer tooling.
                        78% maintain active open-source contributions alongside their teaching.
                    </p>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100/50">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Publications</h2>
                    <div className="space-y-4">
                        {[
                            { title: "Formal Verification Patterns for Solidity Smart Contracts", journal: "IEEE Security & Privacy, 2025" },
                            { title: "Latency Budgets in Edge-Deployed Next.js Applications", journal: "ACM Web Conference, 2025" },
                            { title: "Rust Memory Safety in High-Throughput Network Services", journal: "USENIX ATC, 2024" },
                        ].map((pub) => (
                            <div
                                key={pub.title}
                                className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div>
                                    <h4 className="font-bold text-gray-900">{pub.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium">{pub.journal}</p>
                                </div>
                                <button className="px-5 py-2.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:border-gray-300 transition-colors shrink-0">
                                    Read Abstract
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionShell>

            <SectionShell compact>
                <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Faculty</h2>
                    <p className="text-gray-500 font-medium mb-6">
                        We are hiring instructors in web development, systems programming, and blockchain engineering.
                    </p>
                    <button className="px-10 py-4 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full transition-all">
                        View Openings
                    </button>
                </div>
            </SectionShell>
        </div>
    );
}
