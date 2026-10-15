import type { BlogTopic } from "../types";

export type BlogTopicPatch = Partial<Omit<BlogTopic, "slug" | "category" | "publishedAt" | "tutorialPath" | "code">> & {
    code?: { title?: string }; // keep code body in English; only translate title
};
