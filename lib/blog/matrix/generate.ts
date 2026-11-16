import type { BlogTopic } from "../types";
import { MATRIX_ENTITIES, VS_PAIRS, type MatrixEntity } from "./entities";
import { MATRIX_INTENTS, type MatrixIntent } from "./intents";
import { MATRIX_MODIFIERS, type MatrixModifier } from "./modifiers";

export type MatrixSeed = {
    slug: string;
    entityId: string;
    intentId: string;
    modifierId: string | null;
    vsEntityId?: string;
    phrase: string;
    h1: string;
};

function slugify(value: string): string {
    const s = value
        .toLowerCase()
        .replace(/\+/g, "plus")
        .replace(/#/g, "sharp")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return s.length >= 12 ? s : `${s}-guide`;
}

function hash(s: string): number {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
}

function publishedAt(slug: string): string {
    const h = hash(slug);
    const month = 1 + (h % 10);
    const day = 1 + (h % 28);
    return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function clipDesc(text: string): string {
    const t = text.replace(/\s+/g, " ").trim();
    if (t.length <= 160) return t.length >= 80 ? t : `${t} Free lessons on Sturdee — no account required.`;
    return `${t.slice(0, 157).trim()}…`;
}

function coverFor(category: string): { coverImage: string; coverAlt: string } {
    const map: Record<string, string> = {
        AI: "/blog/learn-ai-hero.jpg",
        JavaScript: "/blog/code-with-ai.jpg",
        Python: "/blog/code-with-ai.jpg",
        Shopify: "/blog/code-with-ai.jpg",
        HTML: "/blog/code-with-ai.jpg",
        CSS: "/blog/code-with-ai.jpg",
        Career: "/blog/learning-path.jpg",
        Backend: "/blog/code-with-ai.jpg",
        Tools: "/blog/code-with-ai.jpg",
    };
    return { coverImage: map[category] ?? "/blog/learn-ai-hero.jpg", coverAlt: `${category} learning illustration` };
}

function entityById(id: string): MatrixEntity {
    const e = MATRIX_ENTITIES.find((x) => x.id === id);
    if (!e) throw new Error(`Unknown entity ${id}`);
    return e;
}

export function listMatrixSeeds(reservedSlugs: Set<string>): MatrixSeed[] {
    const out: MatrixSeed[] = [];
    const seen = new Set<string>(reservedSlugs);

    const push = (
        slug: string,
        entityId: string,
        intentId: string,
        phrase: string,
        h1: string,
        modifierId: string | null = null,
        vsEntityId?: string
    ) => {
        const s = slugify(slug);
        if (seen.has(s)) return;
        seen.add(s);
        out.push({ slug: s, entityId, intentId, modifierId, vsEntityId, phrase, h1 });
    };

    for (const entity of MATRIX_ENTITIES) {
        for (const intent of MATRIX_INTENTS) {
            const h1 = intent.title(entity.name);
            push(`${intent.slugSuffix}-${entity.id}`, entity.id, intent.id, h1.split("—")[0].trim(), h1, null);
            for (const mod of MATRIX_MODIFIERS) {
                const phrase = `${intent.title(entity.name).split("—")[0].trim()} ${mod.phrase(entity.name)}`;
                const titled = `${h1} — ${mod.tail}`;
                push(
                    `${intent.slugSuffix}-${entity.id}-${mod.id}`,
                    entity.id,
                    intent.id,
                    phrase,
                    titled,
                    mod.id
                );
            }
        }
    }

    for (const [a, b] of VS_PAIRS) {
        const left = entityById(a);
        const right = entityById(b);
        const h1 = `${left.name} vs ${right.name} for Beginners`;
        push(`${a}-vs-${b}-for-beginners`, a, "explained", h1, h1, null, b);
        for (const mod of MATRIX_MODIFIERS) {
            push(
                `${a}-vs-${b}-${mod.id}`,
                a,
                "explained",
                `${h1} ${mod.phrase(left.name)}`,
                `${h1} — ${mod.tail}`,
                mod.id,
                b
            );
        }
    }

    const extras: { phrase: string; entityId: string; intentId: string }[] = [
        { phrase: "beginner guide to retrieval augmented generation", entityId: "rag", intentId: "beginners" },
        { phrase: "what is ai tutor", entityId: "ai-tutor", intentId: "what" },
        { phrase: "tutor ia", entityId: "ai-tutor", intentId: "what" },
        { phrase: "tuteur ia", entityId: "ai-tutor", intentId: "what" },
        { phrase: "aprender ia", entityId: "ai", intentId: "free" },
        { phrase: "aprender inteligencia artificial", entityId: "ai", intentId: "how" },
        { phrase: "javascript tutoriel", entityId: "javascript", intentId: "tutorial" },
        { phrase: "tutoriel javascript", entityId: "javascript", intentId: "tutorial" },
        { phrase: "shopify liquid tutorial", entityId: "liquid", intentId: "tutorial" },
        { phrase: "liquid shopify", entityId: "liquid", intentId: "beginners" },
        { phrase: "ai agents for beginners", entityId: "ai-agents", intentId: "beginners" },
        { phrase: "ai agent for beginners", entityId: "ai-agents", intentId: "beginners" },
        { phrase: "learn about ai agents", entityId: "ai-agents", intentId: "how" },
        { phrase: "apprendre a coder gratuitement", entityId: "learn-to-code", intentId: "free" },
        { phrase: "aprender a programar gratis", entityId: "learn-to-code", intentId: "free" },
        { phrase: "cours ia gratuit", entityId: "ai", intentId: "course" },
        { phrase: "prompt engineering course free", entityId: "prompt-engineering", intentId: "course" },
    ];
    for (const extra of extras) {
        const h1 = extra.phrase.replace(/\b\w/g, (c) => c.toUpperCase());
        push(extra.phrase, extra.entityId, extra.intentId, extra.phrase, h1, null);
    }

    return out;
}

function intentOf(id: string): MatrixIntent {
    return MATRIX_INTENTS.find((i) => i.id === id) ?? MATRIX_INTENTS[0];
}

function modifierOf(id: string | null): MatrixModifier | undefined {
    if (!id) return undefined;
    return MATRIX_MODIFIERS.find((m) => m.id === id);
}

function links(entity: MatrixEntity): string[] {
    return [
        entity.tutorialPath,
        entity.tutorialPath ? `${entity.tutorialPath.split("/").slice(0, 3).join("/")}` : undefined,
        entity.learnPath,
        entity.skillPath,
        "/tutorials",
        "/learn/ai",
        "/book?consult=1",
        "/ai",
    ].filter((x, i, arr): x is string => Boolean(x) && arr.indexOf(x) === i);
}

export function matrixListItem(seed: MatrixSeed): {
    slug: string;
    title: string;
    seoTitle: string;
    description: string;
    category: BlogTopic["category"];
    publishedAt: string;
    readTime: string;
    coverImage?: string;
    coverAlt?: string;
    keywords: string[];
    tutorialPath?: string;
} {
    const entity = entityById(seed.entityId);
    const n = entity.name;
    const cover = coverFor(entity.category);
    const title = seed.h1;
    const seoTitle = seed.h1;
    return {
        slug: seed.slug,
        title,
        seoTitle,
        description: clipDesc(
            `${seed.phrase.toLowerCase()}: ${entity.blurb} Free lessons and a live class if you get stuck.`
        ),
        category: entity.category,
        publishedAt: publishedAt(seed.slug),
        readTime: "16 min read",
        ...cover,
        keywords: [
            seed.phrase.toLowerCase(),
            n.toLowerCase(),
            `${n} tutorial`,
            `learn ${n} free`,
            seed.modifierId ? modifierOf(seed.modifierId)?.phrase(n) ?? "" : "",
        ].filter(Boolean),
        tutorialPath: entity.tutorialPath ?? entity.learnPath ?? "/tutorials",
    };
}

export function buildMatrixTopic(seed: MatrixSeed, siblingSlugs: string[]): BlogTopic {
    const entity = entityById(seed.entityId);
    const intent = intentOf(seed.intentId);
    const n = entity.name;
    const focus = seed.phrase.toLowerCase();
    const hrefs = links(entity);
    const tutorial = entity.tutorialPath ?? "/tutorials";
    const graduate = entity.tutorialPath ? `${entity.tutorialPath} (includes Graduate & Research + lecture videos)` : "/tutorials";
    const cover = coverFor(entity.category);
    const other = seed.vsEntityId ? MATRIX_ENTITIES.find((e) => e.id === seed.vsEntityId) : undefined;
    const mod = modifierOf(seed.modifierId);

    const title = seed.h1;
    const seoTitle = seed.h1.length > 62 ? `${seed.h1.slice(0, 59).trim()}…` : seed.h1;

    const description = clipDesc(
        `${focus}: ${entity.blurb} Free ${n} lessons, video lectures, and a live class if you get stuck. No account required to read.`
    );

    const keywords = [
        focus,
        n.toLowerCase(),
        `${n} tutorial`,
        `learn ${n} free`,
        `${n} for beginners`,
        `${n} explained`,
        `${n} examples`,
        `how to learn ${n}`,
        ...entity.aliases.map((a) => a.toLowerCase()),
        "free coding tutorials",
        "no account required",
    ];

    return {
        slug: seed.slug,
        title,
        seoTitle,
        description,
        focusKeyword: focus,
        keywords,
        category: entity.category,
        readTime: "16 min read",
        publishedAt: publishedAt(seed.slug),
        tutorialPath: entity.tutorialPath ?? entity.learnPath ?? "/tutorials",
        ...cover,
        hook: `People type “${focus}” into Google or ChatGPT because they want a direct answer, then a path they can finish. Here is both — then a link to practice on Sturdee.${mod ? ` This variant is for ${mod.note}.` : ""}`,
        intro: `${entity.blurb} This page is written to rank for “${focus}” and to be quotable by assistants: a definition, a sequence, mistakes, FAQs, and internal links to free interactive tutorials. You can read it without an account.${mod ? ` Constraint: ${mod.tail.toLowerCase()} (${mod.note}).` : ""}`,
        whyItMatters: `Searchers and chat users bounce when the first screen is a paywall or a 40-hour syllabus. ${n} rewards a short loop: read one idea, run one example, break it, fix it. Sturdee’s ${tutorial} track is built for that loop, including graduate / PhD-standard modules and lecture videos.${mod ? ` You asked for the ${mod.tail.toLowerCase()} angle — keep the same loop, just ${mod.note}.` : ""}`,
        headings: {
            intro: `Direct answer: ${focus}`,
            concepts: `${n} — ideas you actually need`,
            steps: `A plan for ${focus}`,
            practice: `Practice ${n} on Sturdee (free)`,
            faq: `${n} — FAQ for “${focus}”`,
            story: `${n} in depth — ${intent.angle}`,
            takeaway: `Do this next for ${n}`,
        },
        chapters: [
            {
                title: `A definition you can paste into notes`,
                paragraphs: [
                    entity.blurb,
                    `When someone asks ChatGPT “${focus}”, a useful answer names the thing, the job it does, and the first skill to practice. ${n} is not a credential. It is a set of behaviors you can demonstrate in an editor.`,
                    `Sturdee keeps that demonstration on the page: ${tutorial}. If the editor feels confusing, that is expected — book a free live class instead of bouncing.`,
                ],
            },
            {
                title: `What to learn first (and what to ignore)`,
                paragraphs: [
                    `Sequence beats volume. For ${n}, start with the concepts below, then one small artifact you can screenshot or commit.`,
                    other
                        ? `${entity.name} vs ${other.name}: pick ${entity.name} if you care about ${entity.blurb.toLowerCase()} Pick ${other.name} if you care about ${other.blurb.toLowerCase()} You can switch later; you cannot skip practice.`
                        : `Ignore tool bingo until you can explain ${n} out loud while looking at a tiny example. Tools change; the mental model stays.`,
                ],
                list: entity.concepts,
            },
            {
                title: `How Sturdee maps to this search`,
                paragraphs: [
                    `Internal links (use them — they are the curriculum, not decoration):`,
                ],
                list: hrefs,
                tip: `Graduate modules live at the end of each language track — algorithms, semantics, systems, ML/RAG, and a lecture list. Still public.`,
            },
            {
                title: `Worked path for “${focus}”`,
                paragraphs: [
                    `Day 1: read this page and the first two lessons at ${tutorial}.`,
                    `Day 2: rebuild one example without looking, then check ${graduate}.`,
                    `Day 3: write a five-line note: what broke, what you changed, what you would ask a tutor.`,
                    `If you stall, open /book?consult=1 — live consultation is the human backup to free tutorials and AI Tutor on Pro.`,
                ],
            },
            {
                title: `Mistakes that keep this query unsolved`,
                paragraphs: [
                    `The query “${focus}” often dies in a tab graveyard. The fix is a smaller loop, not a better playlist.`,
                ],
                list: entity.mistakes.concat([
                    "Never clicking into an interactive lesson",
                    "Skipping video + notes on graduate pages",
                    "Waiting to feel ready before booking a class",
                ]),
            },
        ],
        concepts: entity.concepts,
        steps: [
            `Open ${tutorial} (no account)`,
            `Complete three lessons in order`,
            `Watch the lecture on the page, then pause and re-derive one idea`,
            `Do one graduate prompt (complexity, RAG, or reading list)`,
            `If stuck, book a free live class at /book?consult=1`,
        ],
        ...(entity.code ? { code: entity.code } : {}),
        mistakes: entity.mistakes,
        practice: `Use ${tutorial} for reps. Pair with ${entity.learnPath ?? "/learn/ai"} for orientation, ${entity.skillPath ?? "/skills"} if you want a cohort skill, and /blog for adjacent guides. Stuck? The consult block below this article books a live class with a human.`,
        takeaway: `You searched “${focus}”. The win is not another article — it is one shipped example on ${tutorial} and a live class if the example will not move.`,
        faq: [
            {
                question: `What is ${n} in one sentence?`,
                answer: entity.blurb,
            },
            {
                question: `Can I learn ${n} free on Sturdee?`,
                answer: `Yes. Tutorials are public. Sign-in is for cohorts, classroom hosting, and Pro AI Tutor.`,
            },
            {
                question: `Where should I click first for “${focus}”?`,
                answer: `${tutorial}. Then the Graduate & Research section on that track, then /book?consult=1 if you need a live walkthrough.`,
            },
            {
                question: `Is this the same as a paid ${n} course?`,
                answer: `It is a course-shaped path without a tuition wall on the lessons. Live placement is registration, not a content paywall.`,
            },
            {
                question: `How do I use this with ChatGPT or an AI tutor?`,
                answer: `Ask for a quiz on ${n} after you attempt the Sturdee example. Verify claims against the tutorial. Use /ai on Pro for Sturdee’s tutor; use a live class when you need a human.`,
            },
        ],
    };
    void siblingSlugs;
}
