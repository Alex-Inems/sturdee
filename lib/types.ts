export type AccountRole = "student" | "tutor";
export type UserRole = AccountRole | "admin";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface PublicUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
}

export interface Booking {
    id: string;
    userId: string;
    userEmail: string;
    userName: string;
    service: string;
    date: string;
    time: string;
    status: BookingStatus;
    notes: string;
    createdAt: string;
}

export interface SessionUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export interface ProfileRow {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    created_at: string;
}

export interface BookingRow {
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

export function dashboardPathForRole(role: UserRole): string {
    if (role === "tutor" || role === "admin") return "/dashboard/tutor";
    return "/dashboard/student";
}

export function isTutorRole(role: UserRole): boolean {
    return role === "tutor" || role === "admin";
}

export function normalizeAccountRole(value: unknown): AccountRole | null {
    if (value === "student" || value === "tutor") return value;
    if (value === "user") return "student";
    return null;
}
