import type { SandboxId, TutorialBlock, TutorialPage, TutorialSection } from "./types";

export function page(slug: string, title: string, sections: TutorialBlock[]): TutorialPage {
    return { slug, title, sections };
}

export function section(title: string, pages: TutorialPage[]): TutorialSection {
    return { title, pages };
}

export function h2(text: string): TutorialBlock {
    return { type: "h2", text };
}

export function h3(text: string): TutorialBlock {
    return { type: "h3", text };
}

export function p(text: string): TutorialBlock {
    return { type: "p", text };
}

export function note(text: string): TutorialBlock {
    return { type: "note", text };
}

export function list(items: string[]): TutorialBlock {
    return { type: "list", items };
}

export function steps(items: string[]): TutorialBlock {
    return { type: "steps", items };
}

export function tip(text: string): TutorialBlock {
    return { type: "tip", text };
}

export function faq(items: { question: string; answer: string }[]): TutorialBlock {
    return { type: "faq", items };
}

export function code(language: string, code: string, title?: string): TutorialBlock {
    return { type: "code", language, code, title };
}

export function tryit(language: string, code: string, title = "Try it Yourself", sandbox?: SandboxId): TutorialBlock {
    return { type: "tryit", language, code, title, ...(sandbox && { sandbox }) };
}

/** Real-world API sandbox — Spotify playlist or OpenWeatherMap with failure simulation. */
export function sandboxTryit(
    sandbox: SandboxId,
    code: string,
    title = "Try it Yourself — Real API Trace"
): TutorialBlock {
    return { type: "tryit", language: "javascript", code, title, sandbox };
}
