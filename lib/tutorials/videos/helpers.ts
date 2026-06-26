import type { TutorialVideo } from "../types";

export function v(id: string, start?: number, channel?: string): TutorialVideo {
    return start ? { id, start, channel } : { id, channel };
}

/** Map `{topic}` → video under `{lang}/{lang}_{topic}` keys */
export function topicVideos(
    lang: string,
    chapters: Record<string, TutorialVideo>
): Record<string, TutorialVideo> {
    return Object.fromEntries(
        Object.entries(chapters).map(([topic, video]) => [`${lang}/${lang}_${topic}`, video])
    );
}

/** Bro Code full-course chapters with approximate start times (seconds) */
export function broCodeCourse(
    lang: string,
    courseId: string,
    offsets: Partial<Record<string, number>> = {}
): Record<string, TutorialVideo> {
    const defaults: Record<string, number> = {
        intro: 0,
        syntax: 90,
        variables: 350,
        datatypes: 700,
        operators: 1100,
        conditions: 1500,
        loops: 2000,
        functions: 2800,
        classes: 3600,
    };
    const topics = ["intro", "syntax", "variables", "datatypes", "operators", "conditions", "loops", "functions", "classes"];
    const chapters: Record<string, TutorialVideo> = {};
    for (const topic of topics) {
        const start = offsets[topic] ?? defaults[topic];
        chapters[topic] = v(courseId, start, "Bro Code");
    }
    return topicVideos(lang, chapters);
}
