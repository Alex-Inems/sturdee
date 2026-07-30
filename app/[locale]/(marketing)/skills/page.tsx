import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";
import { pageMetadata } from "@/lib/seo";
import { SKILLS } from "@/lib/skills";

export const metadata: Metadata = pageMetadata({
    title: "Skills — Web, AI, Project, Product & VA",
    description:
        "Explore Sturdee skill paths with detailed topics. Book a 1:1 session to learn web development, AI automation, project management, product management, or virtual assistant skills.",
    path: "/skills",
    keywords: [
        "learn skills online",
        "book tutoring session",
        "web development coaching",
        "AI automation training",
        "project management course",
        "product management mentorship",
        "virtual assistant training",
    ],
});

export default function SkillsHubPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <SectionShell compact className="!pt-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700/80">Skills</p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-2xl">
                    Skills you can learn — and book
                </h1>
                <p className="mt-4 text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                    Each path includes detailed topics. Open a skill to see what you’ll cover, then book a 1:1
                    session as a student.
                </p>

                <ul className="mt-12 space-y-4">
                    {SKILLS.map((skill) => (
                        <li key={skill.id}>
                            <Link
                                href={`/skills/${skill.id}`}
                                className="group block rounded-2xl border border-gray-200 bg-white px-6 py-6 sm:px-8 hover:border-emerald-300 transition-colors"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="min-w-0 max-w-2xl">
                                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                                            {skill.title}
                                        </h2>
                                        <p className="mt-2 text-sm sm:text-[15px] text-gray-500 font-medium leading-relaxed">
                                            {skill.summary}
                                        </p>
                                        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            {skill.topics.length} topics
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-sm font-semibold text-emerald-700">
                                        View & book →
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionShell>
        </div>
    );
}
