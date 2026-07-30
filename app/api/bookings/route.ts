import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createBooking, getBookingsByUserId } from "@/lib/db";
import { getSkill, skillBookingServiceName } from "@/lib/skills";

export async function GET() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const bookings = await getBookingsByUserId(session.id);
        return NextResponse.json({ bookings });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch registrations";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSessionUser();

    if (session?.role === "tutor") {
        return NextResponse.json(
            { error: "Tutors host sessions — register as a student instead." },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const skillSlug = typeof body.skillSlug === "string" ? body.skillSlug.trim() : "";
        const notes = typeof body.notes === "string" ? body.notes.trim() : "";
        const experienceLevel =
            typeof body.experienceLevel === "string" ? body.experienceLevel.trim() : "";
        const guestName = typeof body.name === "string" ? body.name.trim() : "";
        const guestEmail = typeof body.email === "string" ? body.email.trim() : "";

        if (!skillSlug) {
            return NextResponse.json({ error: "Skill is required" }, { status: 400 });
        }

        const skill = getSkill(skillSlug);
        if (!skill) {
            return NextResponse.json({ error: "Unknown skill" }, { status: 400 });
        }

        const userName = session?.name || guestName;
        const userEmail = session?.email || guestEmail;

        if (!userName || !userEmail) {
            return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
        }

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
        if (!emailOk) {
            return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
        }

        const noteParts = [
            notes,
            experienceLevel ? `Experience level: ${experienceLevel}` : "",
            !session ? "Registered as guest (no account yet)" : "",
        ].filter(Boolean);

        const booking = await createBooking({
            userId: session?.id ?? null,
            userEmail,
            userName,
            service: skillBookingServiceName(skill),
            skillSlug: skill.id,
            notes: noteParts.join("\n"),
        });

        return NextResponse.json({ booking, guest: !session }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to register";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
