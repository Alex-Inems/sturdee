import type { TutorialBlock, TutorialPage, TutorialSection } from "./types";

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

export function code(language: string, code: string, title?: string): TutorialBlock {
    return { type: "code", language, code, title };
}

export function tryit(language: string, code: string, title = "Try it Yourself"): TutorialBlock {
    return { type: "tryit", language, code, title };
}
