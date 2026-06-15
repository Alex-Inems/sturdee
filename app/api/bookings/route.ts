import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createBooking, getBookingsByUserId } from "@/lib/db";

export async function GET() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const bookings = await getBookingsByUserId(session.id);
        return NextResponse.json({ bookings });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch bookings";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in to book" }, { status: 401 });
    }

    try {
        const { service, date, time, notes } = await request.json();

        if (!service || !date || !time) {
            return NextResponse.json({ error: "Service, date, and time are required" }, { status: 400 });
        }

        const booking = await createBooking({
            userId: session.id,
            userEmail: session.email,
            userName: session.name,
            service,
            date,
            time,
            notes: notes || "",
        });

        return NextResponse.json({ booking }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create booking";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
