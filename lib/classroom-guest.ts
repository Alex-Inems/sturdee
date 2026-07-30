import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AccountRole, SessionUser } from "@/lib/types";
import {
    GUEST_COOKIE,
    isClassroomGuestAllowed,
} from "@/lib/classroom-guest-flags";

export {
    DEMO_ROOM_NAME,
    GUEST_COOKIE,
    isClassroomGuestAllowed,
} from "@/lib/classroom-guest-flags";

type GuestPayload = {
    id: string;
    email: string;
    name: string;
    role: AccountRole;
};

const GUEST_EMAIL: Record<AccountRole, string> = {
    tutor: "dev-tutor@sturdee.guest",
    student: "dev-student@sturdee.guest",
};

export function guestPayloadToUser(payload: GuestPayload): SessionUser {
    return {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
    };
}

export async function readGuestActor(): Promise<SessionUser | null> {
    if (!isClassroomGuestAllowed()) return null;
    try {
        const jar = await cookies();
        const raw = jar.get(GUEST_COOKIE)?.value;
        if (!raw) return null;
        const parsed = JSON.parse(raw) as GuestPayload;
        if (!parsed?.id || (parsed.role !== "tutor" && parsed.role !== "student")) return null;
        return guestPayloadToUser(parsed);
    } catch {
        return null;
    }
}

export async function setGuestCookie(payload: GuestPayload): Promise<void> {
    const jar = await cookies();
    jar.set(GUEST_COOKIE, JSON.stringify(payload), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
        secure: process.env.NODE_ENV === "production",
    });
}

export async function clearGuestCookie(): Promise<void> {
    const jar = await cookies();
    jar.delete(GUEST_COOKIE);
}

/**
 * Finds or creates a sticky guest auth user + profile for tutor/student testing.
 * Requires SUPABASE_SERVICE_ROLE_KEY.
 */
export async function ensureGuestUser(
    role: AccountRole,
    displayName?: string
): Promise<GuestPayload> {
    if (!isClassroomGuestAllowed()) {
        throw new Error("Guest classroom is disabled");
    }

    const admin = createAdminClient();
    const email = GUEST_EMAIL[role];
    const name =
        displayName?.trim() ||
        (role === "tutor" ? "Dev Tutor" : "Dev Student");

    const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    let user = listed.data.users.find((u) => u.email === email);

    if (!user) {
        const created = await admin.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: { name, account_role: role },
        });
        if (created.error || !created.data.user) {
            throw new Error(created.error?.message || "Could not create guest user");
        }
        user = created.data.user;
    }

    const { error: profileError } = await admin.from("profiles").upsert(
        {
            id: user.id,
            email,
            name,
            role,
        },
        { onConflict: "id" }
    );
    if (profileError) {
        await admin.from("profiles").update({ name, role, email }).eq("id", user.id);
    }

    return { id: user.id, email, name, role };
}
