import { createClient } from "@/lib/supabase/server";
import { isProEntitled } from "@/lib/billing";
import type { PlanStatus, PlanTier, SessionUser, UserRole } from "./types";

interface ProfileRow {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    plan: PlanTier | null;
    plan_status: PlanStatus | null;
}

function normalizePlan(plan: string | null | undefined): PlanTier {
    return plan === "pro" ? "pro" : "free";
}

function normalizePlanStatus(status: string | null | undefined): PlanStatus {
    if (
        status === "active" ||
        status === "past_due" ||
        status === "canceled" ||
        status === "trialing"
    ) {
        return status;
    }
    return "inactive";
}

function mapProfile(profile: ProfileRow): SessionUser {
    const role = (profile.role as string) === "user" ? "student" : profile.role;
    return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role,
        plan: normalizePlan(profile.plan),
        planStatus: normalizePlanStatus(profile.plan_status),
    };
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
        .select("id, email, name, role, plan, plan_status")
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
            plan: "free",
            planStatus: "inactive",
        };
    }

    return mapProfile(profile);
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

export async function requireProUser(): Promise<SessionUser> {
    const user = await requireSessionUser();
    if (!isProEntitled(user)) {
        throw new Error("Pro plan required");
    }
    return user;
}

export function userHasPro(user: SessionUser | null | undefined): boolean {
    if (!user) return false;
    return isProEntitled(user);
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
