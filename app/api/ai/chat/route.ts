import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { isFeatureEnabled } from "@/lib/features";
import { TUTOR_SYSTEM, getAiModel, isAiConfigured } from "@/lib/ai/client";
import { buildContextBlock, type AiPageContext } from "@/lib/ai/context";
import { checkAiRateLimit, clientKeyFromRequest } from "@/lib/ai/rate-limit";

export const maxDuration = 60;

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

    const limited = checkAiRateLimit(`chat:${clientKeyFromRequest(request)}`);
    if (!limited.ok) {
        return NextResponse.json(
            { error: "Too many requests. Try again shortly." },
            { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
        );
    }

    try {
        const body = await request.json();
        const messages = (body.messages ?? []) as UIMessage[];
        const context = (body.context ?? body.body?.context) as AiPageContext | undefined;

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "messages required" }, { status: 400 });
        }

        const result = streamText({
            model: getAiModel(),
            system: TUTOR_SYSTEM + buildContextBlock(context),
            messages: await convertToModelMessages(messages),
            maxOutputTokens: 1024,
        });

        return result.toUIMessageStreamResponse();
    } catch (err) {
        const message = err instanceof Error ? err.message : "Chat failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
