import { createClient } from "@/lib/supabase/server";
import {
    extractMeetCode,
    isValidMeetUrl,
    MAX_CLASS_CAPACITY,
    normalizeMeetUrl,
} from "@/lib/google-meet";

export type LiveClassStatus = "draft" | "scheduled" | "live" | "ended" | "cancelled";

export interface LiveClassRow {
    id: string;
    host_user_id: string;
    host_name: string;
    host_email: string;
    title: string;
    slug: string;
    description: string;
    topic: string;
    meet_url: string;
    meet_space_name: string;
    meet_code: string;
    starts_at: string;
    ends_at: string | null;
    capacity: number;
    status: LiveClassStatus;
    created_at: string;
    updated_at: string;
}

export interface LiveClassListing {
    id: string;
    host_user_id: string;
    host_name: string;
    title: string;
    slug: string;
    description: string;
    topic: string;
    starts_at: string;
    ends_at: string | null;
    capacity: number;
    status: LiveClassStatus;
    created_at: string;
    enrolled_count: number;
}

export interface LiveClassInput {
    title: string;
    description?: string;
    topic?: string;
    meetUrl?: string;
    meetSpaceName?: string;
    meetCode?: string;
    startsAt: string;
    endsAt?: string | null;
    capacity?: number;
    status?: LiveClassStatus;
}

function slugify(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60);
}

async function uniqueSlug(base: string): Promise<string> {
    const supabase = await createClient();
    let slug = base || "class";
    let n = 0;
    while (true) {
        const candidate = n === 0 ? slug : `${slug}-${n}`;
        const { data } = await supabase.from("live_classes").select("id").eq("slug", candidate).maybeSingle();
        if (!data) return candidate;
        n += 1;
    }
}

export async function listOpenClasses(): Promise<LiveClassListing[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_class_listings")
        .select("*")
        .in("status", ["scheduled", "live"])
        .order("starts_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as LiveClassListing[];
}

export async function getClassBySlug(slug: string): Promise<(LiveClassRow & { enrolled_count: number }) | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("live_classes").select("*").eq("slug", slug).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;

    const row = data as LiveClassRow;
    const { count } = await supabase
        .from("live_class_enrollments")
        .select("id", { count: "exact", head: true })
        .eq("class_id", row.id);

    return { ...row, enrolled_count: count ?? 0 };
}

export async function getClassesByHost(userId: string): Promise<(LiveClassRow & { enrolled_count: number })[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .eq("host_user_id", userId)
        .order("starts_at", { ascending: false });

    if (error) throw new Error(error.message);
    const rows = (data ?? []) as LiveClassRow[];

    const withCounts = await Promise.all(
        rows.map(async (row) => {
            const { count } = await supabase
                .from("live_class_enrollments")
                .select("id", { count: "exact", head: true })
                .eq("class_id", row.id);
            return { ...row, enrolled_count: count ?? 0 };
        })
    );

    return withCounts;
}

export async function createLiveClass(
    host: { id: string; name: string; email: string },
    input: LiveClassInput
): Promise<LiveClassRow> {
    const title = input.title.trim();
    if (!title) throw new Error("Title is required");
    if (!input.startsAt) throw new Error("Start time is required");

    const capacity = Math.min(MAX_CLASS_CAPACITY, Math.max(1, input.capacity ?? MAX_CLASS_CAPACITY));
    let meetUrl = "";
    let meetCode = "";
    let meetSpaceName = "";

    if (input.meetUrl) {
        if (!isValidMeetUrl(input.meetUrl)) {
            throw new Error("Enter a valid Google Meet URL (meet.google.com/xxx-xxxx-xxx)");
        }
        meetUrl = normalizeMeetUrl(input.meetUrl);
        meetCode = input.meetCode || extractMeetCode(meetUrl);
        meetSpaceName = input.meetSpaceName || "";
    }

    const slug = await uniqueSlug(slugify(title));
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("live_classes")
        .insert({
            host_user_id: host.id,
            host_name: host.name,
            host_email: host.email,
            title,
            slug,
            description: (input.description ?? "").trim(),
            topic: (input.topic ?? "").trim(),
            meet_url: meetUrl,
            meet_space_name: meetSpaceName,
            meet_code: meetCode,
            starts_at: input.startsAt,
            ends_at: input.endsAt ?? null,
            capacity,
            status: input.status ?? (meetUrl ? "scheduled" : "draft"),
            updated_at: new Date().toISOString(),
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as LiveClassRow;
}

export async function updateLiveClass(
    classId: string,
    hostUserId: string,
    patch: Partial<LiveClassInput> & { status?: LiveClassStatus }
): Promise<LiveClassRow> {
    const supabase = await createClient();
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (patch.title !== undefined) updates.title = patch.title.trim();
    if (patch.description !== undefined) updates.description = patch.description.trim();
    if (patch.topic !== undefined) updates.topic = patch.topic.trim();
    if (patch.startsAt !== undefined) updates.starts_at = patch.startsAt;
    if (patch.endsAt !== undefined) updates.ends_at = patch.endsAt;
    if (patch.capacity !== undefined) {
        updates.capacity = Math.min(MAX_CLASS_CAPACITY, Math.max(1, patch.capacity));
    }
    if (patch.status !== undefined) updates.status = patch.status;

    if (patch.meetUrl !== undefined) {
        if (patch.meetUrl && !isValidMeetUrl(patch.meetUrl)) {
            throw new Error("Enter a valid Google Meet URL (meet.google.com/xxx-xxxx-xxx)");
        }
        const url = patch.meetUrl ? normalizeMeetUrl(patch.meetUrl) : "";
        updates.meet_url = url;
        updates.meet_code = patch.meetCode || (url ? extractMeetCode(url) : "");
        if (patch.meetSpaceName !== undefined) updates.meet_space_name = patch.meetSpaceName;
    }

    const { data, error } = await supabase
        .from("live_classes")
        .update(updates)
        .eq("id", classId)
        .eq("host_user_id", hostUserId)
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as LiveClassRow;
}

export async function enrollInClass(
    classId: string,
    user: { id: string; name: string; email: string }
): Promise<void> {
    const supabase = await createClient();
    const { data: cls, error: classError } = await supabase
        .from("live_classes")
        .select("id, status, capacity, host_user_id")
        .eq("id", classId)
        .single();

    if (classError || !cls) throw new Error("Class not found");
    if (cls.host_user_id === user.id) throw new Error("Hosts are already in the class");
    if (!["scheduled", "live"].includes(cls.status)) {
        throw new Error("This class is not open for enrollment");
    }

    const { error } = await supabase.from("live_class_enrollments").insert({
        class_id: classId,
        user_id: user.id,
        user_email: user.email,
        user_name: user.name,
    });

    if (error) {
        if (error.message.includes("duplicate") || error.code === "23505") {
            return; // already enrolled
        }
        if (error.message.includes("full") || error.message.includes("max")) {
            throw new Error(`This class is full (max ${cls.capacity} students)`);
        }
        throw new Error(error.message);
    }
}

export async function isEnrolled(classId: string, userId: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("live_class_enrollments")
        .select("id")
        .eq("class_id", classId)
        .eq("user_id", userId)
        .maybeSingle();
    return !!data;
}

export async function markJoined(classId: string, userId: string): Promise<void> {
    const supabase = await createClient();
    await supabase
        .from("live_class_enrollments")
        .update({ joined_at: new Date().toISOString() })
        .eq("class_id", classId)
        .eq("user_id", userId);
}

export async function listEnrollments(classId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_class_enrollments")
        .select("id, user_id, user_name, user_email, joined_at, created_at")
        .eq("class_id", classId)
        .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
}
