import { NextResponse } from "next/server";
import { getPublishedCourses } from "@/lib/courses-db";

export async function GET() {
    try {
        const courses = await getPublishedCourses();
        return NextResponse.json({ courses });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load courses";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
