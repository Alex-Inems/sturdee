import { NextResponse } from "next/server";
import {
    clearGuestCookie,
    ensureGuestUser,
    isClassroomGuestAllowed,
    readGuestActor,
    setGuestCookie,
} from "@/lib/classroom-guest";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import type { AccountRole } from "@/lib/types";

/** Current guest classroom actor (dev/testing). */
export async function GET() {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();
    if (!isClassroomGuestAllowed()) {
        return NextResponse.json({ allowed: false, guest: null });
    }
    const guest = await readGuestActor();
    return NextResponse.json({ allowed: true, guest });
}

/** Start or switch guest role (tutor | student) without logging in. */
export async function POST(request: Request) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();
    if (!isClassroomGuestAllowed()) {
        return NextResponse.json(
            { error: "Guest classroom is disabled outside development." },
            { status: 403 }
        );
    }

    try {
        const body = (await request.json().catch(() => ({}))) as {
            role?: AccountRole;
            name?: string;
        };
        const role: AccountRole = body.role === "tutor" ? "tutor" : "student";
        const payload = await ensureGuestUser(role, body.name);
        await setGuestCookie(payload);
        return NextResponse.json({
            allowed: true,
            guest: { id: payload.id, name: payload.name, email: payload.email, role: payload.role },
        });
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    err instanceof Error
                        ? err.message
                        : "Could not start guest session. Is SUPABASE_SERVICE_ROLE_KEY set?",
            },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    if (!isClassroomGuestAllowed()) {
        return NextResponse.json({ ok: true });
    }
    await clearGuestCookie();
    return NextResponse.json({ ok: true });
}
