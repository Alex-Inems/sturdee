import { NextResponse } from "next/server";
import { DEMO_ROOM_NAME, isClassroomGuestAllowed } from "@/lib/classroom-guest";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import { createRoomToken, isLiveKitConfigured, livekitPublicUrl } from "@/lib/livekit";

/** Guest join token for the shared demo room — no auth required when guest mode is on. */
export async function POST(request: Request) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    if (!isClassroomGuestAllowed()) {
        return NextResponse.json(
            { error: "Guest classroom is disabled. Sign in, or set ALLOW_CLASSROOM_GUEST=true." },
            { status: 403 }
        );
    }

    if (!isLiveKitConfigured()) {
        return NextResponse.json(
            { error: "Live video is not configured. Set LIVEKIT_* env vars." },
            { status: 503 }
        );
    }

    const body = (await request.json().catch(() => ({}))) as { name?: string; asHost?: boolean };
    const displayName = (body.name?.trim() || `Guest ${Math.floor(Math.random() * 900) + 100}`).slice(0, 40);
    const asHost = Boolean(body.asHost);
    const identity = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}::${asHost ? "host" : "student"}`;

    const token = await createRoomToken({
        room: DEMO_ROOM_NAME,
        identity,
        name: displayName,
        isHost: asHost,
    });

    return NextResponse.json({
        token,
        url: livekitPublicUrl(),
        room: DEMO_ROOM_NAME,
        isHost: asHost,
        title: "Demo classroom",
    });
}
