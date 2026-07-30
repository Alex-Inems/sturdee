import { NextResponse } from "next/server";
import { getAttendanceSummary } from "@/lib/attendance";
import { requireClassroomActor } from "@/lib/classroom-actor";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface Props {
    params: Promise<{ id: string }>;
}

/** Host/admin attendance rollup for a class. */
export async function GET(_request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

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
        .select("id, host_user_id")
        .eq("id", id)
        .single();

    if (!cls) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    const isHost = cls.host_user_id === ctx.actor.id || ctx.actor.role === "admin";
    if (!isHost) {
        return NextResponse.json({ error: "Only the host can view attendance" }, { status: 403 });
    }

    try {
        // Guest hosts: summary view is RLS-bound; use admin for guest.
        if (ctx.bypassRls) {
            const admin = createAdminClient();
            const { data, error } = await admin
                .from("live_class_attendance_summary")
                .select("*")
                .eq("class_id", id)
                .order("first_joined_at", { ascending: true });
            if (error) throw new Error(error.message);
            return NextResponse.json({ attendance: data ?? [] });
        }
        const attendance = await getAttendanceSummary(id);
        return NextResponse.json({ attendance });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to load attendance" },
            { status: 500 }
        );
    }
}
