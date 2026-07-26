import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isEnrolled, markJoined } from "@/lib/classrooms-db";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";

interface Props {
    params: Promise<{ id: string }>;
}

/** Returns the Meet URL for an enrolled student or the host, and records join time. */
export async function POST(_request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in to enter class" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createClient();
    const { data: cls, error } = await supabase
        .from("live_classes")
        .select("id, host_user_id, meet_url, status, title")
        .eq("id", id)
        .single();

    if (error || !cls) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    const isHost = cls.host_user_id === session.id;
    if (!isHost) {
        const enrolled = await isEnrolled(id, session.id);
        if (!enrolled) {
            return NextResponse.json({ error: "Enroll in this class first" }, { status: 403 });
        }
    }

    if (!cls.meet_url) {
        return NextResponse.json({ error: "This class has no Google Meet link yet" }, { status: 400 });
    }

    if (!isHost && !["scheduled", "live"].includes(cls.status)) {
        return NextResponse.json({ error: "This class is not in session" }, { status: 400 });
    }

    if (!isHost) {
        await markJoined(id, session.id).catch(() => undefined);
    }

    return NextResponse.json({
        meetUrl: cls.meet_url,
        title: cls.title,
        status: cls.status,
    });
}
