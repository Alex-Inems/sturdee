import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { isFeatureEnabled } from "@/lib/features";
import { MATCH_SYSTEM, getAiModel, isAiConfigured } from "@/lib/ai/client";
import { skillCatalogForPrompt } from "@/lib/ai/context";
import { checkAiRateLimit, clientKeyFromRequest } from "@/lib/ai/rate-limit";
import { getSkill, skillIds } from "@/lib/skills";

export const maxDuration = 30;

export async function POST(request: Request) {
    if (!isFeatureEnabled("ai")) {
        return NextResponse.json({ error: "AI is disabled" }, { status: 404 });
    }

    if (!isAiConfigured()) {
        return NextResponse.json(
            { error: "AI is not configured. Set OPENAI_API_KEY." },
            { status: 503 }
        );
    }

    const limited = checkAiRateLimit(`match:${clientKeyFromRequest(request)}`);
    if (!limited.ok) {
        return NextResponse.json(
            { error: "Too many requests. Try again shortly." },
            { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
        );
    }

    try {
        const body = await request.json();
        const goals = typeof body.goals === "string" ? body.goals.trim() : "";
        const experienceLevel =
            typeof body.experienceLevel === "string" ? body.experienceLevel.trim() : "";
        const preferredSkill =
            typeof body.preferredSkill === "string" ? body.preferredSkill.trim() : "";

        if (!goals && !preferredSkill) {
            return NextResponse.json(
                { error: "Share your goals or a preferred skill" },
                { status: 400 }
            );
        }

        const ids = skillIds();
        const matchSchema = z.object({
            skillSlug: z.enum(ids as [string, ...string[]]),
            reason: z.string(),
            confidence: z.number().min(0).max(1),
        });

        const { object } = await generateObject({
            model: getAiModel(),
            system: MATCH_SYSTEM,
            prompt: `Allowed skills:\n${skillCatalogForPrompt()}\n\nLearner goals: ${goals || "(none)"}\nExperience: ${experienceLevel || "(unspecified)"}\nPreferred skill id (optional): ${preferredSkill || "(none)"}\n\nRecommend the best skillSlug and a short reason (1–2 sentences).`,
            schema: matchSchema,
        });

        if (!getSkill(object.skillSlug)) {
            return NextResponse.json({ error: "Invalid match result" }, { status: 500 });
        }

        return NextResponse.json({
            skillSlug: object.skillSlug,
            reason: object.reason,
            confidence: object.confidence,
            skillTitle: getSkill(object.skillSlug)?.title,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Match failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
