import { getSkill, SKILLS } from "@/lib/skills";

export type AiPageContext = {
    skillSlug?: string;
    tutorialPath?: string;
    pageTitle?: string;
    topicTitle?: string;
    extra?: string;
};

export function buildContextBlock(ctx?: AiPageContext | null): string {
    if (!ctx) return "";

    const parts: string[] = [];
    if (ctx.pageTitle) parts.push(`Page: ${ctx.pageTitle}`);
    if (ctx.tutorialPath) parts.push(`Tutorial path: ${ctx.tutorialPath}`);
    if (ctx.topicTitle) parts.push(`Topic: ${ctx.topicTitle}`);
    if (ctx.extra) parts.push(ctx.extra.slice(0, 2000));

    if (ctx.skillSlug) {
        const skill = getSkill(ctx.skillSlug);
        if (skill) {
            parts.push(`Skill: ${skill.title}`);
            parts.push(`Summary: ${skill.summary}`);
            parts.push(
                `Topics: ${skill.topics.map((t) => `${t.title} — ${t.description}`).join("; ")}`
            );
        }
    }

    if (parts.length === 0) return "";
    return `\n\n## Current page context\n${parts.join("\n")}`;
}

export function skillCatalogForPrompt(): string {
    return SKILLS.map(
        (s) => `- id: ${s.id} | ${s.title}: ${s.blurb}`
    ).join("\n");
}
