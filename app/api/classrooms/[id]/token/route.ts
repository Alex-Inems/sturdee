import { NextResponse } from "next/server";
import { isEnrolled, markJoined } from "@/lib/classrooms-db";
import { requireClassroomActor } from "@/lib/classroom-actor";
import { encodeIdentity } from "@/lib/classroom-identity";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import {
    createRoomToken,
    isLiveKitConfigured,
    livekitPublicUrl,
    roomNameForClass,
} from "@/lib/livekit";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface Props {
    params: Promise<{ id: string }>;
}

/** Issues a LiveKit join token for the host or an enrolled student. */
export async function POST(_request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    if (!isLiveKitConfigured()) {
        return NextResponse.json(
            { error: "Live video is not configured yet. Set LIVEKIT_* env vars." },
            { status: 503 }
        );
    }

    let ctx;
    try {
        ctx = await requireClassroomActor();
    } catch {
        return NextResponse.json({ error: "Please sign in to join the class" }, { status: 401 });
    }

    const { actor, bypassRls } = ctx;
    const { id } = await params;
    const supabase = bypassRls ? createAdminClient() : await createClient();
    const { data: cls, error } = await supabase
        .from("live_classes")
        .select("id, host_user_id, provider, room_name, status, title")
        .eq("id", id)
        .single();

    if (error || !cls) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    if (cls.provider !== "livekit") {
        return NextResponse.json(
            { error: "This class does not use the Sturdee classroom" },
            { status: 400 }
        );
    }

    const isHost = cls.host_user_id === actor.id || actor.role === "admin";

    if (!isHost) {
        const enrolled = await isEnrolled(id, actor.id, { bypassRls });
        if (!enrolled) {
            return NextResponse.json({ error: "Enroll in this class first" }, { status: 403 });
        }
        if (!["scheduled", "live"].includes(cls.status)) {
            return NextResponse.json({ error: "This class is not in session" }, { status: 400 });
        }
    }

    const room = cls.room_name || roomNameForClass(cls.id);
    const role = isHost ? (actor.role === "admin" ? "admin" : "host") : "student";

    const token = await createRoomToken({
        room,
        identity: encodeIdentity(actor.id, role),
        name: actor.name || actor.email,
        isHost,
    });

    if (!isHost) {
        await markJoined(id, actor.id, { bypassRls }).catch(() => undefined);
    }

    return NextResponse.json({
        token,
        url: livekitPublicUrl(),
        room,
        isHost,
        title: cls.title,
    });
}
