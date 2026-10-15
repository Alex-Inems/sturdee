import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import AiTutorChat from "@/components/ai/AiTutorChat";
import type { Locale } from "@/i18n/routing";
import { assertFeatureEnabled } from "@/lib/features";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { getLocaleSeoKeywords } from "@/lib/i18n/seo-locale";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const loc = locale as Locale;
    const meta = await getLocalizedHubMeta(loc, "ai");
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/ai",
        locale: loc,
        keywords: getLocaleSeoKeywords(loc),
    });
}

export default async function AiHubPage({ params }: Props) {
    assertFeatureEnabled("ai");
    const { locale } = await params;

    const copy =
        locale === "fr"
            ? {
                  highlight: "Tuteur IA",
                  title: "Apprendre l'IA. Apprendre avec l'IA.",
                  subtitle:
                      "Posez des questions, obtenez des explications et pratiquez — puis inscrivez-vous à une cohorte avec un tuteur humain.",
                  what: "Ce que vous pouvez faire",
                  items: [
                      "Poser des questions sur prompts, agents et automatisation",
                      "Obtenir de l'aide en lisant tutoriels et parcours",
                      "Pratiquer avec le coach IA sur les leçons",
                      "S'inscrire via /book pour un matching intelligent",
                  ],
                  skills: "Voir les compétences IA",
                  book: "S'inscrire à une cohorte",
              }
            : locale === "es"
              ? {
                    highlight: "Tutor IA",
                    title: "Aprende IA. Aprende con IA.",
                    subtitle:
                        "Haz preguntas, recibe explicaciones y practica — luego regístrate en una cohorte con un tutor humano.",
                    what: "Qué puedes hacer",
                    items: [
                        "Preguntar sobre prompts, agentes y automatización",
                        "Obtener ayuda al leer tutoriales y rutas",
                        "Practicar con el coach IA en las lecciones",
                        "Registrarte en /book para matching inteligente",
                    ],
                    skills: "Ver habilidades de IA",
                    book: "Registrarse en una cohorte",
                }
              : locale === "zh"
                ? {
                      highlight: "AI 导师",
                      title: "学 AI，也用 AI 学",
                      subtitle: "随时提问、获得讲解与练习 — 再报名加入真人导师直播小班。",
                      what: "你可以做什么",
                      items: [
                          "询问提示词、智能体与自动化流程",
                          "在阅读教程与技能页时获得帮助",
                          "在课程页使用 AI 练习教练",
                          "在 /book 报名并获得智能技能匹配",
                      ],
                      skills: "浏览 AI 技能",
                      book: "报名小班",
                  }
                : {
                      highlight: "AI Tutor",
                      title: "Learn AI. Learn with AI.",
                      subtitle:
                          "Ask questions, get explanations, and practice — then register for a live cohort with a human tutor.",
                      what: "What you can do",
                      items: [
                          "Ask about prompts, agents, and automation workflows",
                          "Get help while reading tutorials and skill pages",
                          "Practice with the AI coach on lesson pages",
                          "Register at /book for smart skill matching + a cohort",
                      ],
                      skills: "Browse AI skills",
                      book: "Register for a cohort",
                  };

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero highlight={copy.highlight} title={copy.title} subtitle={copy.subtitle} />
            <SectionShell compact>
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{copy.what}</h2>
                            <ul className="mt-4 space-y-3 text-sm font-medium text-gray-600">
                                {copy.items.map((item) => (
                                    <li key={item}>· {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/skills"
                                className="rounded-full bg-[#10B981] hover:bg-[#0F9F72] px-5 py-2.5 text-sm font-semibold text-white"
                            >
                                {copy.skills}
                            </Link>
                            <Link
                                href="/book"
                                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-300"
                            >
                                {copy.book}
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <AiTutorChat
                            embedded
                            defaultOpen
                            context={{ pageTitle: "Sturdee AI Tutor hub" }}
                        />
                    </div>
                </div>
            </SectionShell>
        </div>
    );
}
