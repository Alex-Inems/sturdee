export interface TutorialLanguage {
    id: string;
    name: string;
    tagline: string;
    color: string;
    icon: string;
}

export type TutorialBlock =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "code"; language: string; code: string; title?: string }
    | { type: "tryit"; language: string; code: string; title?: string }
    | { type: "note"; text: string }
    | { type: "list"; items: string[] };

export interface TutorialPage {
    slug: string;
    title: string;
    sections: TutorialBlock[];
}

export interface TutorialSection {
    title: string;
    pages: TutorialPage[];
}

export interface TutorialTrack {
    language: TutorialLanguage;
    sections: TutorialSection[];
}
