import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
    createTutorProfile,
    getTutorProfileByUserId,
    updateTutorProfile,
    type TutorProfileInput,
} from "@/lib/tutors-db";

export async function GET() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const profile = await getTutorProfileByUserId(session.id);
        return NextResponse.json({ profile });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load profile";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in to become a tutor" }, { status: 401 });
    }

    try {
        const existing = await getTutorProfileByUserId(session.id);
        if (existing) {
            return NextResponse.json({ profile: existing });
        }
        const profile = await createTutorProfile(session.id, session.name);
        return NextResponse.json({ profile }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create profile";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let profile = await getTutorProfileByUserId(session.id);
        if (!profile) {
            profile = await createTutorProfile(session.id, session.name);
        }

        const body = (await request.json()) as TutorProfileInput;
        const updated = await updateTutorProfile(session.id, body);
        return NextResponse.json({ profile: updated });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update profile";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
