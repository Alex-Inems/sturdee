import { NextResponse } from "next/server";
import { requireClassroomActor } from "@/lib/classroom-actor";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import {
    endRoom,
    isLiveKitConfigured,
    muteParticipant,
    removeParticipant,
    roomNameForClass,
} from "@/lib/livekit";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface Props {
    params: Promise<{ id: string }>;
}

type ModerateAction = "mute" | "remove" | "end";

/** Host-only moderation: mute/remove a participant, or end the session. */
export async function POST(request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();
    if (!isLiveKitConfigured()) {
        return NextResponse.json({ error: "Live video not configured" }, { status: 503 });
    }

    let ctx;
    try {
        ctx = await requireClassroomActor();
    } catch {
        return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = ctx.bypassRls ? createAdminClient() : await createClient();
    const { data: cls } = await supabase
        .from("live_classes")
        .select("id, host_user_id, room_name")
        .eq("id", id)
        .single();

    if (!cls) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    const isHost = cls.host_user_id === ctx.actor.id || ctx.actor.role === "admin";
    if (!isHost) {
        return NextResponse.json({ error: "Only the host can moderate" }, { status: 403 });
    }

    const body = (await request.json().catch(() => ({}))) as {
        action?: ModerateAction;
        identity?: string;
    };
    const action = body.action;
    const room = cls.room_name || roomNameForClass(cls.id);

    try {
        if (action === "end") {
            await endRoom(room);
            await supabase.from("live_classes").update({ status: "ended" }).eq("id", id);
            return NextResponse.json({ ok: true });
        }

        if (!body.identity) {
            return NextResponse.json({ error: "identity is required" }, { status: 400 });
        }

        if (action === "mute") {
            await muteParticipant(room, body.identity);
        } else if (action === "remove") {
            await removeParticipant(room, body.identity);
        } else {
            return NextResponse.json({ error: "Unknown action" }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Moderation failed" },
            { status: 500 }
        );
    }
}
