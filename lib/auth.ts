import { createClient } from "@/lib/supabase/server";
import type { SessionUser, UserRole } from "./types";

interface ProfileRow {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export async function getSessionUser(): Promise<SessionUser | null> {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email, name, role")
        .eq("id", user.id)
        .single<ProfileRow>();

    if (profileError || !profile) {
        return {
            id: user.id,
            email: user.email ?? "",
            name:
                (user.user_metadata?.name as string) ||
                (user.user_metadata?.full_name as string) ||
                user.email?.split("@")[0] ||
                "User",
            role: "student",
        };
    }

    // Legacy "user" rows → treat as student until migration runs
    if ((profile.role as string) === "user") {
        return { ...profile, role: "student" };
    }

    return profile;
}

/** Real session, or sticky guest tutor/student when guest classroom mode is on. */
export async function getClassroomActor(): Promise<SessionUser | null> {
    const session = await getSessionUser();
    if (session) return session;
    const { readGuestActor } = await import("@/lib/classroom-guest");
    return readGuestActor();
}

/** True when the actor is a guest cookie (no Supabase auth session). */
export async function isGuestClassroomActor(): Promise<boolean> {
    const session = await getSessionUser();
    if (session) return false;
    const guest = await (await import("@/lib/classroom-guest")).readGuestActor();
    return !!guest;
}

export async function requireSessionUser(): Promise<SessionUser> {
    const user = await getSessionUser();
    if (!user) throw new Error("Unauthorized");
    return user;
}

export async function requireAdmin(): Promise<SessionUser> {
    const user = await requireSessionUser();
    if (user.role !== "admin") throw new Error("Forbidden");
    return user;
}

export async function requireTutor(): Promise<SessionUser> {
    const user = await requireSessionUser();
    if (user.role !== "tutor" && user.role !== "admin") {
        throw new Error("Only tutors can do this");
    }
    return user;
}

export function getSiteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
}
