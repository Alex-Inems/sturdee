import { NextResponse } from "next/server";
import { getPublishedTutors } from "@/lib/tutors-db";

export async function GET() {
    try {
        const tutors = await getPublishedTutors();
        return NextResponse.json({ tutors });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load tutors";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
