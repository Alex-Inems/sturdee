import type { Locale } from "@/i18n/routing";
import type { LearnHub } from "@/lib/seo-keywords";
import { LEARN_HUBS as EN_HUBS, PRIMARY_KEYWORDS as EN_PRIMARY } from "@/lib/seo-keywords";

/** Locale-specific primary SEO keywords (search phrases natives actually use). */
export const LOCALE_PRIMARY_KEYWORDS: Record<Locale, string[]> = {
    en: [...EN_PRIMARY],
    fr: [
        "apprendre l'intelligence artificielle gratuitement",
        "apprendre à coder gratuitement",
        "tutoriels de programmation gratuits",
        "prompt engineering gratuit",
        "cours d'IA gratuits",
        "apprendre le développement web gratuitement",
        "tutoriel JavaScript débutant",
        "ingénierie de prompts",
    ],
    es: [
        "aprender inteligencia artificial gratis",
        "aprender a programar gratis",
        "tutoriales de programación gratis",
        "ingeniería de prompts gratis",
        "cursos de IA gratis",
        "aprender desarrollo web gratis",
        "tutorial JavaScript para principiantes",
        "prompt engineering curso gratis",
    ],
    zh: [
        "免费学人工智能",
        "免费学编程",
        "编程教程免费",
        "提示词工程",
        "免费AI课程",
        "免费学网页开发",
        "JavaScript入门教程",
        "用AI学编程",
        "人工智能教程",
    ],
};

const FR_HUBS: LearnHub[] = [
    {
        slug: "ai",
        title: "Apprendre l'intelligence artificielle gratuitement — Tutoriels & cohortes",
        h1: "Apprendre l'intelligence artificielle gratuitement",
        description:
            "Commencez l'IA gratuitement : tutoriels interactifs, ingénierie de prompts et cohortes en direct. Pratiquez avec le tuteur IA Sturdee (Pro).",
        keywords: [
            "apprendre l'intelligence artificielle",
            "cours d'intelligence artificielle",
            "tutoriels IA",
            "cours d'IA générative gratuits",
            "apprendre l'IA gratuitement",
        ],
        bullets: [
            "Parcours IA gratuits : automatisation, prompts et agents",
            "Tutoriels de code interactifs liés aux flux IA",
            "Cohortes en direct avec un tuteur humain",
            "Tuteur IA & Coach pratique en Sturdee Pro (20 $/mois)",
        ],
        faqs: [
            {
                question: "Puis-je apprendre l'IA gratuitement sur Sturdee ?",
                answer:
                    "Oui. Parcourez les tutoriels et parcours IA sans payer. Sturdee Pro (20 $/mois) débloque le chat tuteur IA et le Coach pratique.",
            },
            {
                question: "Quels sujets d'IA puis-je étudier ?",
                answer:
                    "Ingénierie de prompts, automatisation IA, agents IA, et compétences enrichies par l'IA comme le développement web.",
            },
            {
                question: "Proposez-vous des cours d'IA en direct ?",
                answer:
                    "Oui. Inscrivez-vous à une cohorte et rejoignez des sessions Google Meet avec un tuteur.",
            },
        ],
        ctaPrimary: { href: "/skills", label: "Voir les compétences IA" },
        ctaSecondary: { href: "/blog/category/ai", label: "Lire le blog IA" },
    },
    {
        slug: "prompt-engineering",
        title: "Cours de prompt engineering gratuit — Apprendre le prompting",
        h1: "Cours de prompt engineering — gratuit pour commencer",
        description:
            "Apprenez le prompt engineering gratuitement : instructions claires, few-shot, sorties structurées et évaluation. Puis pratiquez avec le tuteur IA.",
        keywords: [
            "prompt engineering",
            "cours prompt engineering",
            "prompt engineering gratuit",
            "tutoriel prompt engineering",
            "ingénierie de prompts",
        ],
        bullets: [
            "Anatomie d'un prompt : rôles, contraintes, formats, exemples",
            "Few-shot et chain-of-thought pour plus de précision",
            "Sorties structurées pour outils et équipes",
            "Exercices avec le Coach IA Sturdee Pro",
        ],
        faqs: [
            {
                question: "Ce cours de prompt engineering est-il gratuit ?",
                answer:
                    "Le parcours et les tutoriels liés sont gratuits. La pratique assistée par IA nécessite Sturdee Pro à 20 $/mois.",
            },
            {
                question: "Pour qui est le prompt engineering ?",
                answer:
                    "Toute personne qui utilise ChatGPT, Claude ou d'autres modèles — marketeurs, développeurs, PM, étudiants.",
            },
            {
                question: "Comment m'entraîner concrètement ?",
                answer:
                    "Ouvrez le parcours Prompt Engineering, essayez le Coach pratique (Pro), ou rejoignez une cohorte.",
            },
        ],
        ctaPrimary: { href: "/skills/prompt-engineering", label: "Ouvrir le parcours prompts" },
        ctaSecondary: {
            href: "/blog/prompt-engineering-course-free-complete-tutorial",
            label: "Tutoriel prompt engineering gratuit",
        },
    },
    {
        slug: "coding-free",
        title: "Apprendre à coder gratuitement — Tutoriels interactifs",
        h1: "Apprendre à coder gratuitement",
        description:
            "Tutoriels de programmation gratuits : HTML, CSS, JavaScript, Python, SQL, Shopify Liquid et plus. Lisez, pratiquez, puis rejoignez une cohorte.",
        keywords: [
            "apprendre à coder gratuitement",
            "tutoriels de programmation gratuits",
            "apprendre la programmation en ligne gratuit",
            "coder pour débutants",
            "cours de développement web gratuits",
        ],
        bullets: [
            "Plus de 20 langages avec éditeurs interactifs",
            "Parcours débutants HTML, CSS, JavaScript et Python",
            "Tutoriels Shopify Liquid pour l'e-commerce",
            "Classe en direct optionnelle avec un tuteur",
        ],
        faqs: [
            {
                question: "Les tutoriels Sturdee sont-ils vraiment gratuits ?",
                answer:
                    "Oui. Les leçons sont gratuites à lire et à pratiquer dans le navigateur. Aucun compte n'est requis pour commencer.",
            },
            {
                question: "Quels langages puis-je apprendre ?",
                answer:
                    "HTML, CSS, JavaScript, TypeScript, Python, SQL, Java, Shopify Liquid et bien d'autres.",
            },
            {
                question: "Puis-je apprendre à coder avec l'IA ?",
                answer:
                    "Oui. Combinez tutoriels gratuits et parcours IA, ou passez en Pro pour le tuteur IA.",
            },
        ],
        ctaPrimary: { href: "/tutorials", label: "Commencer les tutoriels gratuits" },
        ctaSecondary: { href: "/learn/ai", label: "Apprendre l'IA gratuitement" },
    },
    {
        slug: "web-development",
        title: "Apprendre le développement web gratuitement — HTML, CSS & JavaScript",
        h1: "Apprendre le développement web gratuitement",
        description:
            "Tutoriels web gratuits : HTML, CSS, JavaScript et frameworks modernes. Construisez des projets, puis rejoignez une cohorte Web Dev + IA.",
        keywords: [
            "apprendre le développement web",
            "apprendre le développement web gratuitement",
            "tutoriel développement web",
            "cours HTML CSS JavaScript gratuit",
            "tutoriel JavaScript débutant",
        ],
        bullets: [
            "Fondations HTML, CSS et JavaScript",
            "Layouts responsives et frontend moderne",
            "Flux de travail assistés par l'IA",
            "Cohorte en direct pour l'accompagnement",
        ],
        faqs: [
            {
                question: "Par où commencer en tant que débutant ?",
                answer:
                    "HTML et CSS, puis JavaScript. Ensuite ouvrez le parcours Web Dev avec IA.",
            },
            {
                question: "Enseignez-vous React ou Next.js ?",
                answer:
                    "Oui — dans les tutoriels et le parcours Web Dev avec IA.",
            },
            {
                question: "Y a-t-il un cours de développement web gratuit ?",
                answer:
                    "Nos pistes de tutoriels fonctionnent comme un cours gratuit. Inscrivez-vous à une cohorte pour un tutorat en direct.",
            },
        ],
        ctaPrimary: { href: "/tutorials/html", label: "Commencer HTML" },
        ctaSecondary: { href: "/skills/web-development", label: "Parcours Web Dev + IA" },
    },
];

const ES_HUBS: LearnHub[] = [
    {
        slug: "ai",
        title: "Aprender inteligencia artificial gratis — Tutoriales y cohortes",
        h1: "Aprender inteligencia artificial gratis",
        description:
            "Empieza a aprender IA gratis con tutoriales interactivos, ingeniería de prompts y cohortes en vivo. Practica con el tutor IA de Sturdee (Pro).",
        keywords: [
            "aprender inteligencia artificial",
            "cursos de inteligencia artificial",
            "tutoriales de IA",
            "cursos de IA generativa gratis",
            "aprender IA gratis",
        ],
        bullets: [
            "Rutas de IA gratis: automatización, prompts y agentes",
            "Tutoriales de código interactivos con flujos de IA",
            "Cohortes en vivo con un tutor humano",
            "Tutor IA y Coach de práctica en Sturdee Pro (20 $/mes)",
        ],
        faqs: [
            {
                question: "¿Puedo aprender IA gratis en Sturdee?",
                answer:
                    "Sí. Explora tutoriales y rutas de IA sin pagar. Sturdee Pro (20 $/mes) desbloquea el chat del tutor IA y el Coach de práctica.",
            },
            {
                question: "¿Qué temas de IA puedo estudiar?",
                answer:
                    "Ingeniería de prompts, automatización con IA, agentes de IA y habilidades profesionales aumentadas con IA.",
            },
            {
                question: "¿Ofrecen clases de IA en vivo?",
                answer:
                    "Sí. Regístrate en una cohorte y únete a sesiones de Google Meet con un tutor.",
            },
        ],
        ctaPrimary: { href: "/skills", label: "Ver habilidades de IA" },
        ctaSecondary: { href: "/blog/category/ai", label: "Leer el blog de IA" },
    },
    {
        slug: "prompt-engineering",
        title: "Curso de ingeniería de prompts gratis — Aprende prompting",
        h1: "Curso de ingeniería de prompts — gratis para empezar",
        description:
            "Aprende ingeniería de prompts gratis: instrucciones claras, few-shot, salidas estructuradas y evaluación. Luego practica con el tutor IA.",
        keywords: [
            "ingeniería de prompts",
            "curso de ingeniería de prompts",
            "prompt engineering curso gratis",
            "tutorial de prompt engineering",
            "aprender prompt engineering",
        ],
        bullets: [
            "Anatomía del prompt: roles, límites, formatos y ejemplos",
            "Few-shot y chain-of-thought para más precisión",
            "Salidas estructuradas para herramientas y equipos",
            "Ejercicios con el Coach IA de Sturdee Pro",
        ],
        faqs: [
            {
                question: "¿Este curso de prompt engineering es gratis?",
                answer:
                    "La ruta y los tutoriales relacionados son gratis. La práctica con IA requiere Sturdee Pro a 20 $/mes.",
            },
            {
                question: "¿Para quién es la ingeniería de prompts?",
                answer:
                    "Cualquiera que use ChatGPT, Claude u otros modelos — marketers, desarrolladores, PMs y estudiantes.",
            },
            {
                question: "¿Cómo practico de forma práctica?",
                answer:
                    "Abre la ruta de Prompt Engineering, prueba el Coach (Pro) o únete a una cohorte.",
            },
        ],
        ctaPrimary: { href: "/skills/prompt-engineering", label: "Abrir ruta de prompts" },
        ctaSecondary: {
            href: "/blog/prompt-engineering-course-free-complete-tutorial",
            label: "Tutorial de prompts gratis",
        },
    },
    {
        slug: "coding-free",
        title: "Aprender a programar gratis — Tutoriales interactivos",
        h1: "Aprender a programar gratis",
        description:
            "Tutoriales de programación gratis: HTML, CSS, JavaScript, Python, SQL, Shopify Liquid y más. Lee, practica y luego únete a una cohorte.",
        keywords: [
            "aprender a programar gratis",
            "tutoriales de programación gratis",
            "aprender programación online gratis",
            "programación para principiantes",
            "cursos de desarrollo web gratis",
        ],
        bullets: [
            "Más de 20 lenguajes con editores interactivos",
            "Rutas para principiantes en HTML, CSS, JavaScript y Python",
            "Tutoriales de Shopify Liquid para ecommerce",
            "Aula en vivo opcional con un tutor",
        ],
        faqs: [
            {
                question: "¿Los tutoriales de Sturdee son realmente gratis?",
                answer:
                    "Sí. Las lecciones son gratis para leer y practicar en el navegador. No necesitas cuenta para empezar.",
            },
            {
                question: "¿Qué lenguajes puedo aprender?",
                answer:
                    "HTML, CSS, JavaScript, TypeScript, Python, SQL, Java, Shopify Liquid y muchos más.",
            },
            {
                question: "¿Puedo aprender a programar con IA?",
                answer:
                    "Sí. Combina tutoriales gratis con rutas de IA, o pasa a Pro para el tutor IA.",
            },
        ],
        ctaPrimary: { href: "/tutorials", label: "Empezar tutoriales gratis" },
        ctaSecondary: { href: "/learn/ai", label: "Aprender IA gratis" },
    },
    {
        slug: "web-development",
        title: "Aprender desarrollo web gratis — HTML, CSS y JavaScript",
        h1: "Aprender desarrollo web gratis",
        description:
            "Tutoriales de desarrollo web gratis: HTML, CSS, JavaScript y frameworks modernos. Construye proyectos y únete a una cohorte Web Dev + IA.",
        keywords: [
            "aprender desarrollo web",
            "aprender desarrollo web gratis",
            "tutorial de desarrollo web",
            "curso HTML CSS JavaScript gratis",
            "tutorial JavaScript para principiantes",
        ],
        bullets: [
            "Fundamentos de HTML, CSS y JavaScript",
            "Layouts responsivos y frontend moderno",
            "Flujos de trabajo asistidos por IA",
            "Cohorte en vivo para acompañamiento",
        ],
        faqs: [
            {
                question: "¿Por dónde empiezan los principiantes?",
                answer:
                    "HTML y CSS, luego JavaScript. Después abre la ruta Web Dev con IA.",
            },
            {
                question: "¿Enseñan React o Next.js?",
                answer:
                    "Sí — en los tutoriales y en la ruta Web Dev con IA.",
            },
            {
                question: "¿Hay un curso de desarrollo web gratis?",
                answer:
                    "Nuestras pistas de tutoriales funcionan como un curso gratis. Regístrate en una cohorte para tutoría en vivo.",
            },
        ],
        ctaPrimary: { href: "/tutorials/html", label: "Empezar HTML" },
        ctaSecondary: { href: "/skills/web-development", label: "Ruta Web Dev + IA" },
    },
];

const ZH_HUBS: LearnHub[] = [
    {
        slug: "ai",
        title: "免费学人工智能 — 教程与直播课",
        h1: "免费学人工智能",
        description:
            "免费开始学习人工智能：互动教程、提示词工程与直播小班。可用 Sturdee Pro 的 AI 导师练习。",
        keywords: [
            "免费学人工智能",
            "人工智能课程",
            "AI教程",
            "免费生成式AI课程",
            "学习人工智能",
        ],
        bullets: [
            "免费 AI 学习路径：自动化、提示词与智能体",
            "与 AI 工作流结合的互动编程教程",
            "可选真人导师直播小班",
            "Sturdee Pro（$20/月）解锁 AI 导师与练习教练",
        ],
        faqs: [
            {
                question: "在 Sturdee 可以免费学 AI 吗？",
                answer:
                    "可以。免费浏览教程与 AI 技能路径。Sturdee Pro（每月 $20）解锁 AI 导师聊天与练习教练。",
            },
            {
                question: "可以学哪些 AI 主题？",
                answer:
                    "提示词工程、AI 自动化、AI 智能体，以及网页开发等 AI 增强型职业技能。",
            },
            {
                question: "有直播 AI 课程吗？",
                answer:
                    "有。注册技能小班后，可通过 Google Meet 与导师一起上课。",
            },
        ],
        ctaPrimary: { href: "/skills", label: "浏览 AI 技能" },
        ctaSecondary: { href: "/blog/category/ai", label: "阅读 AI 博客" },
    },
    {
        slug: "prompt-engineering",
        title: "免费提示词工程课程 — 学习 Prompting",
        h1: "提示词工程课程 — 免费入门",
        description:
            "免费学习提示词工程：清晰指令、少样本示例、结构化输出与评估。随后可用 AI 导师练习。",
        keywords: [
            "提示词工程",
            "提示词工程课程",
            "免费提示词工程",
            "Prompt Engineering 教程",
            "学习提示词工程",
        ],
        bullets: [
            "提示词结构：角色、约束、格式与示例",
            "少样本与思维链模式提升准确度",
            "面向工具与团队的结构化输出",
            "Sturdee Pro AI 教练练习题",
        ],
        faqs: [
            {
                question: "这门提示词工程课真的免费吗？",
                answer:
                    "技能路径与相关教程可免费阅读。AI 辅助练习需要 Sturdee Pro（$20/月）。",
            },
            {
                question: "提示词工程适合谁？",
                answer:
                    "任何使用 ChatGPT、Claude 等模型的人——运营、开发、产品经理与学生。",
            },
            {
                question: "如何动手练习？",
                answer:
                    "打开提示词工程技能页，使用练习教练（Pro），或加入直播小班。",
            },
        ],
        ctaPrimary: { href: "/skills/prompt-engineering", label: "打开提示词路径" },
        ctaSecondary: {
            href: "/blog/prompt-engineering-course-free-complete-tutorial",
            label: "免费提示词教程",
        },
    },
    {
        slug: "coding-free",
        title: "免费学编程 — 互动教程",
        h1: "免费学编程",
        description:
            "免费互动编程教程：HTML、CSS、JavaScript、Python、SQL、Shopify Liquid 等。先自学，再可选加入小班。",
        keywords: [
            "免费学编程",
            "免费编程教程",
            "在线免费学编程",
            "编程入门",
            "免费网页开发课程",
        ],
        bullets: [
            "20+ 语言轨道，含在线试写编辑器",
            "适合初学者的 HTML、CSS、JavaScript、Python",
            "面向电商的 Shopify Liquid 教程",
            "可选直播课堂与真人导师",
        ],
        faqs: [
            {
                question: "Sturdee 编程教程真的免费吗？",
                answer:
                    "是的。可在浏览器中免费阅读与练习，开始学习无需账号。",
            },
            {
                question: "可以学哪些语言？",
                answer:
                    "HTML、CSS、JavaScript、TypeScript、Python、SQL、Java、Shopify Liquid 等。",
            },
            {
                question: "可以用 AI 学编程吗？",
                answer:
                    "可以。把免费教程与 AI 技能路径结合，或升级 Pro 使用 AI 导师。",
            },
        ],
        ctaPrimary: { href: "/tutorials", label: "开始免费教程" },
        ctaSecondary: { href: "/learn/ai", label: "免费学 AI" },
    },
    {
        slug: "web-development",
        title: "免费学网页开发 — HTML、CSS 与 JavaScript",
        h1: "免费学网页开发",
        description:
            "免费网页开发教程：HTML、CSS、JavaScript 与现代框架。做真实项目，可选加入 Web Dev + AI 小班。",
        keywords: [
            "学网页开发",
            "免费学网页开发",
            "网页开发教程",
            "HTML CSS JavaScript 免费课程",
            "JavaScript 入门教程",
        ],
        bullets: [
            "HTML、CSS、JavaScript 基础",
            "响应式布局与现代前端",
            "AI 辅助编程工作流",
            "可选直播小班保持节奏",
        ],
        faqs: [
            {
                question: "初学者从哪里开始？",
                answer:
                    "先学 HTML 与 CSS，再学 JavaScript，然后打开 Web Dev with AI 技能路径。",
            },
            {
                question: "有教 React 或 Next.js 吗？",
                answer:
                    "有——在教程与 Web Dev with AI 技能路径中覆盖。",
            },
            {
                question: "有免费网页开发课程吗？",
                answer:
                    "我们的互动教程轨道相当于免费课程。若需要真人辅导可注册小班。",
            },
        ],
        ctaPrimary: { href: "/tutorials/html", label: "开始 HTML 教程" },
        ctaSecondary: { href: "/skills/web-development", label: "Web Dev + AI 路径" },
    },
];

export function getLocalizedLearnHubs(locale: Locale): LearnHub[] {
    if (locale === "fr") return FR_HUBS;
    if (locale === "es") return ES_HUBS;
    if (locale === "zh") return ZH_HUBS;
    return EN_HUBS;
}

export function getLocalizedLearnHub(locale: Locale, slug: string): LearnHub | undefined {
    return getLocalizedLearnHubs(locale).find((h) => h.slug === slug);
}

export function getLocaleSeoKeywords(locale: Locale): string[] {
    return LOCALE_PRIMARY_KEYWORDS[locale] ?? LOCALE_PRIMARY_KEYWORDS.en;
}
