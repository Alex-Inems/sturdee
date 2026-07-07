import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { pageMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { COURSES, EXTENDED_INSTRUCTORS } from "@/lib/courses";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
    title: "Expert Instructors & Faculty",
    description:
        "Learn from engineers and researchers at Google, Stripe, Cloudflare, Stanford, and top firms. Sturdee faculty teach what they ship in production.",
    path: "/instructors",
    keywords: ["coding instructors", "programming teachers", "web development faculty", "tech educators"],
});

export default function InstructorsPage() {
    const dean = EXTENDED_INSTRUCTORS.find((i) => i.slug === "priya-sharma")!;
    const deanCourses = COURSES.filter((c) => dean.courses.includes(c.code)).slice(0, 2);

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Faculty"
                title="World-Class Faculty"
                subtitle="Engineers, researchers, and practitioners who teach what they ship in production."
            />

            <SectionShell>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Link href={`/instructors/${dean.slug}`} className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 aspect-[4/5] block">
                        <Image
                            src={IMAGES.instructorsDean}
                            alt="Dr. Priya Sharma"
                            width={640}
                            height={800}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                    <div>
                        <span className="inline-flex mb-4 px-5 py-2.5 bg-amber-100/60 text-amber-700 rounded-full text-xs font-bold">
                            Dean of Technology
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            <Link href={`/instructors/${dean.slug}`} className="hover:text-emerald-700 transition-colors">
                                {dean.name}
                            </Link>
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-4">{dean.bio}</p>
                        <p className="text-gray-600 font-medium italic leading-relaxed mb-8">
                            &quot;The best engineers learn by building systems that real users depend on.&quot;
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {deanCourses.map((course) => (
                                <Link
                                    key={course.code}
                                    href={`/courses/${course.slug}`}
                                    className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-semibold text-gray-700 shadow-sm hover:border-emerald-200 transition-colors"
                                >
                                    {course.code}: {course.title.split(" ").slice(0, 3).join(" ")}…
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {EXTENDED_INSTRUCTORS.map((instructor) => (
                        <Link
                            key={instructor.slug}
                            href={`/instructors/${instructor.slug}`}
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
                        </Link>
                    ))}
                </div>
            </SectionShell>

            <SectionShell>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Research & Impact</h2>
                    <p className="text-gray-500 font-medium leading-relaxed text-lg">
                        Our faculty publish on smart contract security, distributed systems, and developer tooling.
                        78% maintain active open-source contributions alongside their teaching at {SITE_NAME}.
                    </p>
                </div>
            </SectionShell>

            <SectionShell compact>
                <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Faculty</h2>
                    <p className="text-gray-500 font-medium mb-6">
                        We are hiring instructors in web development, systems programming, and blockchain engineering.
                    </p>
                    <Link
                        href="/resources"
                        className="inline-block px-10 py-4 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full transition-all"
                    >
                        View Openings
                    </Link>
                </div>
            </SectionShell>
        </div>
    );
}
