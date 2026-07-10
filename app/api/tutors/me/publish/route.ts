import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getTutorProfileByUserId, publishTutorProfile } from "@/lib/tutors-db";

export async function POST() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in" }, { status: 401 });
    }

    try {
        const existing = await getTutorProfileByUserId(session.id);
        if (!existing) {
            return NextResponse.json({ error: "Complete onboarding first" }, { status: 400 });
        }
        if (existing.status === "published") {
            return NextResponse.json({ profile: existing, slug: existing.slug });
        }

        const profile = await publishTutorProfile(session.id);
        return NextResponse.json({ profile, slug: profile.slug });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to publish profile";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
