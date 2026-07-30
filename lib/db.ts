import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Booking, BookingStatus, PublicUser } from "./types";

interface BookingRow {
    id: string;
    user_id: string | null;
    user_email: string;
    user_name: string;
    service: string;
    skill_slug: string | null;
    batch_id: string | null;
    tutor_user_id: string | null;
    tutor_name: string | null;
    date: string | null;
    time: string | null;
    status: BookingStatus;
    notes: string;
    created_at: string;
}

interface ProfileRow {
    id: string;
    email: string;
    name: string;
    role: "student" | "tutor" | "admin";
    created_at: string;
}

function mapBooking(row: BookingRow): Booking {
    return {
        id: row.id,
        userId: row.user_id ?? null,
        userEmail: row.user_email,
        userName: row.user_name,
        service: row.service,
        skillSlug: row.skill_slug,
        batchId: row.batch_id,
        tutorUserId: row.tutor_user_id,
        tutorName: row.tutor_name || null,
        date: row.date,
        time: row.time,
        status: row.status,
        notes: row.notes,
        createdAt: row.created_at,
    };
}

function mapProfile(row: ProfileRow): PublicUser {
    return {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        createdAt: row.created_at,
    };
}

export async function getAllUsers(): Promise<PublicUser[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("id, email, name, role, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as ProfileRow[]).map(mapProfile);
}

export async function getAllBookings(): Promise<Booking[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as BookingRow[]).map(mapBooking);
}

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as BookingRow[]).map(mapBooking);
}

export async function createBooking(data: {
    userId?: string | null;
    userEmail: string;
    userName: string;
    service: string;
    skillSlug: string;
    notes: string;
}): Promise<Booking> {
    const email = data.userEmail.trim().toLowerCase();
    const name = data.userName.trim();
    if (!email || !name) {
        throw new Error("Name and email are required");
    }

    // Guest inserts need service role (RLS requires auth.uid() = user_id).
    const supabase = data.userId ? await createClient() : createAdminClient();

    let duplicateQuery = supabase
        .from("bookings")
        .select("id")
        .eq("skill_slug", data.skillSlug)
        .in("status", ["pending", "confirmed"]);

    if (data.userId) {
        duplicateQuery = duplicateQuery.eq("user_id", data.userId);
    } else {
        duplicateQuery = duplicateQuery.ilike("user_email", email);
    }

    const { data: existing } = await duplicateQuery.maybeSingle();
    if (existing) {
        throw new Error("You are already registered for this skill.");
    }

    const { data: row, error } = await supabase
        .from("bookings")
        .insert({
            user_id: data.userId ?? null,
            user_email: email,
            user_name: name,
            service: data.service,
            skill_slug: data.skillSlug,
            notes: data.notes,
            status: "pending",
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    const { data: assigned, error: assignError } = await supabase.rpc(
        "assign_booking_to_batch",
        { p_booking_id: row.id }
    );

    if (assignError) {
        return mapBooking(row as BookingRow);
    }

    return mapBooking((assigned ?? row) as BookingRow);
}

export async function updateBookingStatus(
    id: string,
    status: BookingStatus
): Promise<Booking | null> {
    const supabase = await createClient();
    const { data: row, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id)
        .select("*")
        .single();

    if (error) return null;
    return mapBooking(row as BookingRow);
}

export async function getStats() {
    const supabase = await createClient();

    const [{ count: totalUsers }, { data: bookings }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("status"),
    ]);

    const all = bookings ?? [];
    return {
        totalUsers: totalUsers ?? 0,
        totalBookings: all.length,
        pendingBookings: all.filter((b) => b.status === "pending").length,
        confirmedBookings: all.filter((b) => b.status === "confirmed").length,
    };
}
