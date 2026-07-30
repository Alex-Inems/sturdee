import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";
import { pageMetadata } from "@/lib/seo";
import { getSkill, SKILLS } from "@/lib/skills";
import { routing } from "@/i18n/routing";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        SKILLS.map((skill) => ({ locale, slug: skill.id }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const skill = getSkill(slug);
    if (!skill) return { title: "Skill not found" };
    return pageMetadata({
        title: `${skill.title} — Topics & Register`,
        description: skill.summary,
        path: `/skills/${skill.id}`,
        keywords: [skill.title, ...skill.topics.map((t) => t.title), "register skill cohort"],
    });
}

export default async function SkillDetailPage({ params }: Props) {
    const { slug } = await params;
    const skill = getSkill(slug);
    if (!skill) notFound();

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <SectionShell compact className="!pt-0">
                <Link href="/skills" className="text-sm font-semibold text-gray-500 hover:text-gray-900">
                    ← All skills
                </Link>

                <div className="mt-8 grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700/80">
                            Skill path
                        </p>
                        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                            {skill.title}
                        </h1>
                        <p className="mt-5 text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                            {skill.summary}
                        </p>

                        <h2 className="mt-12 text-xl font-bold text-gray-900 tracking-tight">
                            Topics you&apos;ll cover
                        </h2>
                        <ol className="mt-6 space-y-5">
                            {skill.topics.map((topic, i) => (
                                <li key={topic.title} className="flex gap-4">
                                    <span className="shrink-0 text-sm font-bold tabular-nums text-emerald-700/80 pt-0.5">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                            {topic.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 font-medium leading-relaxed">
                                            {topic.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <aside className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">Book this skill</h2>
                            <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">
                                Register for {skill.title} and we&apos;ll place you in an available cohort with a
                                tutor — no need to pick a date or time.
                            </p>
                            <ul className="mt-5 space-y-2 text-sm font-medium text-gray-600">
                                <li>· {skill.topics.length} structured topics</li>
                                <li>· Live cohort with a tutor</li>
                                <li>· Bring your own goals or project</li>
                            </ul>
                            <Link
                                href={`/book?skill=${skill.id}`}
                                className="mt-8 flex w-full items-center justify-center rounded-full bg-[#10B981] hover:bg-[#0F9F72] px-6 py-3.5 text-sm font-semibold text-white transition-colors"
                            >
                                Register to learn
                            </Link>
                            <Link
                                href="/?auth=login"
                                className="mt-3 flex w-full items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gray-300 transition-colors"
                            >
                                Sign in as student first
                            </Link>
                        </div>
                    </aside>
                </div>
            </SectionShell>
        </div>
    );
}
