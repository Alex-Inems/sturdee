import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllBookings, updateBookingStatus } from "@/lib/db";
import type { BookingStatus } from "@/lib/types";

export async function GET() {
    try {
        await requireAdmin();
        const bookings = await getAllBookings();
        return NextResponse.json({ bookings });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error";
        const status = message === "Forbidden" ? 403 : 401;
        return NextResponse.json({ error: message }, { status });
    }
}

export async function PATCH(request: Request) {
    try {
        await requireAdmin();
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: "ID and status required" }, { status: 400 });
        }

        const validStatuses: BookingStatus[] = ["pending", "confirmed", "cancelled", "completed"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const booking = await updateBookingStatus(id, status);
        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json({ booking });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error";
        const status = message === "Forbidden" ? 403 : 401;
        return NextResponse.json({ error: message }, { status });
    }
}
