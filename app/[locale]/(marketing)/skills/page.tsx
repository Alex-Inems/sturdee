import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";
import type { Locale } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { getLocaleSeoKeywords } from "@/lib/i18n/seo-locale";
import { pageMetadata } from "@/lib/seo";
import { SKILLS } from "@/lib/skills";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const loc = locale as Locale;
    const meta = await getLocalizedHubMeta(loc, "skills");
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/skills",
        locale: loc,
        keywords: getLocaleSeoKeywords(loc),
    });
}

export default async function SkillsHubPage({ params }: Props) {
    const { locale } = await params;
    const copy =
        locale === "fr"
            ? {
                  eyebrow: "Compétences IA",
                  title: "Parcours IA à apprendre — et à rejoindre",
                  subtitle:
                      "Chaque parcours inclut des sujets détaillés. Ouvrez une compétence, pratiquez avec le tuteur IA, puis inscrivez-vous à une cohorte.",
                  meta: "sujets · Inscription cohorte",
                  cta: "Voir les sujets →",
              }
            : locale === "es"
              ? {
                    eyebrow: "Habilidades de IA",
                    title: "Rutas de IA para aprender — y unirte",
                    subtitle:
                        "Cada ruta incluye temas detallados. Abre una habilidad, practica con el tutor IA y regístrate en una cohorte.",
                    meta: "temas · Registro de cohorte",
                    cta: "Ver temas →",
                }
              : locale === "zh"
                ? {
                      eyebrow: "AI 技能",
                      title: "可学习、可加入的 AI 路径",
                      subtitle: "每条路径含详细主题。打开技能、用 AI 导师练习，再报名直播小班。",
                      meta: "个主题 · 可报名小班",
                      cta: "查看主题 →",
                  }
                : {
                      eyebrow: "AI skills",
                      title: "AI paths you can learn — and join",
                      subtitle:
                          "Each path includes detailed topics. Open a skill, practice with AI Tutor, then register for a live cohort.",
                      meta: "topics · Cohort registration",
                      cta: "View topics →",
                  };

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <SectionShell compact className="!pt-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700/80">{copy.eyebrow}</p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-2xl">
                    {copy.title}
                </h1>
                <p className="mt-4 text-lg text-gray-500 font-medium leading-relaxed max-w-xl">{copy.subtitle}</p>

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
                                            {skill.topics.length} {copy.meta}
                                        </p>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400 group-hover:text-emerald-700">
                                        {copy.cta}
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
