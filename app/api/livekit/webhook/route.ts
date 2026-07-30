import { NextResponse } from "next/server";
import { getWebhookReceiver, isLiveKitConfigured } from "@/lib/livekit";
import { recordParticipantJoin, recordParticipantLeft } from "@/lib/attendance";

/**
 * LiveKit server calls this on room/participant lifecycle events. We trust it
 * only after verifying the signed Authorization header, then write attendance.
 *
 * Configure in LiveKit: webhook URL = {SITE}/api/livekit/webhook
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    if (!isLiveKitConfigured()) {
        return NextResponse.json({ error: "LiveKit not configured" }, { status: 503 });
    }

    const authHeader = request.headers.get("Authorization") ?? undefined;
    const body = await request.text();

    let event;
    try {
        event = await getWebhookReceiver().receive(body, authHeader);
    } catch {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    try {
        const room = event.room?.name;
        const participant = event.participant;

        if (room && participant) {
            if (event.event === "participant_joined") {
                const joinedAt = participant.joinedAt
                    ? new Date(Number(participant.joinedAt) * 1000)
                    : new Date();
                await recordParticipantJoin({
                    roomName: room,
                    identity: participant.identity,
                    displayName: participant.name || participant.identity,
                    participantSid: participant.sid,
                    joinedAt,
                });
            } else if (event.event === "participant_left") {
                await recordParticipantLeft({
                    roomName: room,
                    participantSid: participant.sid,
                    leftAt: new Date(),
                });
            }
        }
    } catch (err) {
        // Never fail the webhook hard — LiveKit retries and we don't want loops.
        console.error("[livekit webhook]", err);
    }

    return NextResponse.json({ received: true });
}
