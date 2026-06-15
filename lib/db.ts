import { createClient } from "@/lib/supabase/server";
import type { Booking, BookingStatus, PublicUser } from "./types";

interface BookingRow {
    id: string;
    user_id: string;
    user_email: string;
    user_name: string;
    service: string;
    date: string;
    time: string;
    status: BookingStatus;
    notes: string;
    created_at: string;
}

interface ProfileRow {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
    created_at: string;
}

function mapBooking(row: BookingRow): Booking {
    return {
        id: row.id,
        userId: row.user_id,
        userEmail: row.user_email,
        userName: row.user_name,
        service: row.service,
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
    userId: string;
    userEmail: string;
    userName: string;
    service: string;
    date: string;
    time: string;
    notes: string;
}): Promise<Booking> {
    const supabase = await createClient();
    const { data: row, error } = await supabase
        .from("bookings")
        .insert({
            user_id: data.userId,
            user_email: data.userEmail,
            user_name: data.userName,
            service: data.service,
            date: data.date,
            time: data.time,
            notes: data.notes,
            status: "pending",
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return mapBooking(row as BookingRow);
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
