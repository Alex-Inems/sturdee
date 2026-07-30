import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { decodeIdentity, type AttendanceRole } from "@/lib/classroom-identity";

/**
 * Attendance is the source of truth for "who was actually in the room and for
 * how long". Writes come only from verified LiveKit webhooks (service role);
 * reads are RLS-guarded so hosts see their class, students see themselves.
 */

export { encodeIdentity, decodeIdentity, type AttendanceRole } from "@/lib/classroom-identity";

/** Resolve the internal class id for a LiveKit room name. */
export async function classIdForRoom(roomName: string): Promise<string | null> {
    const admin = createAdminClient();
    const { data } = await admin
        .from("live_classes")
        .select("id")
        .eq("room_name", roomName)
        .maybeSingle();
    return data?.id ?? null;
}

export async function recordParticipantJoin(params: {
    roomName: string;
    identity: string;
    displayName: string;
    participantSid: string;
    joinedAt: Date;
}): Promise<void> {
    const classId = await classIdForRoom(params.roomName);
    if (!classId) return;

    const { userId, role } = decodeIdentity(params.identity);
    const admin = createAdminClient();

    await admin.from("live_class_attendance").upsert(
        {
            class_id: classId,
            user_id: userId,
            identity: params.identity,
            display_name: params.displayName,
            role,
            joined_at: params.joinedAt.toISOString(),
            participant_sid: params.participantSid,
        },
        { onConflict: "class_id,participant_sid" }
    );

    // First join flips a scheduled class to live automatically.
    await admin
        .from("live_classes")
        .update({ status: "live" })
        .eq("id", classId)
        .eq("status", "scheduled");
}

export async function recordParticipantLeft(params: {
    roomName: string;
    participantSid: string;
    leftAt: Date;
}): Promise<void> {
    const classId = await classIdForRoom(params.roomName);
    if (!classId) return;

    const admin = createAdminClient();
    const { data: row } = await admin
        .from("live_class_attendance")
        .select("id, joined_at")
        .eq("class_id", classId)
        .eq("participant_sid", params.participantSid)
        .maybeSingle();

    if (!row) return;

    const joined = new Date(row.joined_at).getTime();
    const duration = Math.max(0, Math.round((params.leftAt.getTime() - joined) / 1000));

    await admin
        .from("live_class_attendance")
        .update({ left_at: params.leftAt.toISOString(), duration_seconds: duration })
        .eq("id", row.id);
}

export interface AttendanceSummaryRow {
    class_id: string;
    user_id: string | null;
    display_name: string;
    role: AttendanceRole;
    first_joined_at: string;
    last_seen_at: string;
    sessions: number;
    total_seconds: number;
}

/** Host/admin-facing attendance rollup (RLS enforces access). */
export async function getAttendanceSummary(classId: string): Promise<AttendanceSummaryRow[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_class_attendance_summary")
        .select("*")
        .eq("class_id", classId)
        .order("first_joined_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as AttendanceSummaryRow[];
}
