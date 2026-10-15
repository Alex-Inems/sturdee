import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";
import { pageMetadata } from "@/lib/seo";
import { SKILLS } from "@/lib/skills";

export const metadata: Metadata = pageMetadata({
    title: "AI Skills — Automation, Prompts, Agents & More",
    description:
        "Explore Sturdee AI skill paths: automation, prompt engineering, agents, and AI-augmented careers. Practice with AI Tutor, then join a live cohort.",
    path: "/skills",
    keywords: [
        "learn artificial intelligence",
        "AI skills",
        "prompt engineering course free",
        "AI automation training",
        "AI agents course",
        "learn AI free",
        "free generative AI courses",
        "AI tutor",
    ],
});

export default function SkillsHubPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <SectionShell compact className="!pt-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700/80">AI skills</p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-2xl">
                    AI paths you can learn — and join
                </h1>
                <p className="mt-4 text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                    Each path includes detailed topics. Open a skill, practice with AI Tutor, then register for a
                    live cohort.
                </p>

                <ul className="mt-12 space-y-4">
                    {SKILLS.map((skill) => (
                        <li key={skill.id}>
                            <Link
                                href={`/skills/${skill.id}`}
                                className="group block rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 hover:border-emerald-300 transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                                            {skill.title}
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed max-w-xl">
                                            {skill.blurb}
                                        </p>
                                        <p className="mt-2 text-xs font-semibold text-gray-400">
                                            {skill.topics.length} topics · Cohort registration
                                        </p>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400 group-hover:text-emerald-700">
                                        View topics →
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
