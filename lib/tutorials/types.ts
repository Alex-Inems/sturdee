export interface TutorialLanguage {
    id: string;
    name: string;
    tagline: string;
    color: string;
    icon: string;
}

export type SandboxId = "spotify" | "weather";

export type TutorialBlock =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "code"; language: string; code: string; title?: string }
    | { type: "tryit"; language: string; code: string; title?: string; sandbox?: SandboxId }
    | { type: "note"; text: string }
    | { type: "tip"; text: string }
    | { type: "list"; items: string[] }
    | { type: "steps"; items: string[] }
    | { type: "faq"; items: { question: string; answer: string }[] };

export interface TutorialVideo {
    id: string;
    start?: number;
    channel?: string;
}

export interface TutorialPage {
    slug: string;
    title: string;
    sections: TutorialBlock[];
    video?: TutorialVideo;
    description?: string;
}

export interface TutorialSection {
    title: string;
    pages: TutorialPage[];
}

export interface TutorialTrack {
    language: TutorialLanguage;
    sections: TutorialSection[];
}
