import { NextResponse } from "next/server";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { isFeatureEnabled } from "@/lib/features";
import { PRACTICE_SYSTEM, getAiModel, isAiConfigured } from "@/lib/ai/client";
import { buildContextBlock, type AiPageContext } from "@/lib/ai/context";
import { checkAiRateLimit, clientKeyFromRequest } from "@/lib/ai/rate-limit";

export const maxDuration = 60;

const exerciseSchema = z.object({
    title: z.string(),
    prompt: z.string(),
    hint: z.string().optional(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

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

    const limited = checkAiRateLimit(`practice:${clientKeyFromRequest(request)}`);
    if (!limited.ok) {
        return NextResponse.json(
            { error: "Too many requests. Try again shortly." },
            { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
        );
    }

    try {
        const body = await request.json();
        const action = body.action === "grade" ? "grade" : "generate";
        const context = body.context as AiPageContext | undefined;

        if (action === "generate") {
            const { object } = await generateObject({
                model: getAiModel(),
                system: PRACTICE_SYSTEM + buildContextBlock(context),
                prompt:
                    "Create one practical exercise for the learner based on the context. Prefer hands-on prompts over trivia.",
                schema: exerciseSchema,
            });
            return NextResponse.json({ exercise: object });
        }

        const exercisePrompt = typeof body.exercisePrompt === "string" ? body.exercisePrompt : "";
        const answer = typeof body.answer === "string" ? body.answer.trim() : "";
        if (!exercisePrompt || !answer) {
            return NextResponse.json(
                { error: "exercisePrompt and answer are required" },
                { status: 400 }
            );
        }

        const { text } = await generateText({
            model: getAiModel(),
            system: PRACTICE_SYSTEM + buildContextBlock(context),
            prompt: `Exercise:\n${exercisePrompt}\n\nLearner answer:\n${answer}\n\nGive brief feedback: what worked, what to improve, and one concrete next step.`,
            maxOutputTokens: 600,
        });

        return NextResponse.json({ feedback: text });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Practice failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
