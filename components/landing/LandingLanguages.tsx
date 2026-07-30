import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";
import { SKILLS } from "@/lib/skills";

export default function LandingLanguages() {
    return (
        <section className="relative overflow-hidden font-jakarta">
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_55%),linear-gradient(180deg,#f8faf9_0%,#eef5f1_100%)]"
                aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.035] dot-pattern" aria-hidden />

            <SectionShell className="relative z-10">
                <div className="max-w-2xl landing-fade-up">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700/80">
                        Skills
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight leading-[1.1]">
                        Pick a skill. Register to learn.
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
                        Five practical paths with detailed topics — explore a skill, then register and get
                        assigned to a cohort.
                    </p>
                </div>

                <ul className="mt-12 sm:mt-14 divide-y divide-gray-200/80 border-y border-gray-200/80">
                    {SKILLS.map((skill, index) => (
                        <li key={skill.id} className="landing-stagger">
                            <Link
                                href={`/skills/${skill.id}`}
                                className="group relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-6 sm:py-7 px-1 sm:px-2 -mx-1 sm:mx-0 rounded-xl transition-colors duration-200 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                            >
                                <div
                                    className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r ${skill.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    aria-hidden
                                />
                                <div className="relative flex items-start gap-4 sm:gap-6 min-w-0">
                                    <span className="shrink-0 pt-0.5 text-sm font-bold tabular-nums text-emerald-700/70 group-hover:text-emerald-700 transition-colors">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                                            {skill.title}
                                        </h3>
                                        <p className="mt-1.5 text-sm sm:text-[15px] text-gray-500 font-medium leading-relaxed max-w-xl">
                                            {skill.blurb}
                                        </p>
                                        <p className="mt-2 text-xs font-semibold text-gray-400">
                                            {skill.topics.length} topics · Bookable sessions
                                        </p>
                                    </div>
                                </div>
                                <span className="relative ml-10 sm:ml-0 shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-emerald-700 transition-colors">
                                    View topics
                                    <span
                                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                                        aria-hidden
                                    >
                                        →
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionShell>
        </section>
    );
}
