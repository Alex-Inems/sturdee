import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
    createCourse,
    getCoursesByUserId,
    updateCourse,
    type CourseInput,
} from "@/lib/courses-db";

export async function GET() {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const courses = await getCoursesByUserId(session.id);
        return NextResponse.json({ courses });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load courses";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in to create a course" }, { status: 401 });
    }

    try {
        const body = (await request.json()) as CourseInput;
        const course = await createCourse(session.id, body);
        return NextResponse.json({ course }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create course";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function PATCH(request: Request) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = (await request.json()) as CourseInput & { slug: string };
        if (!body.slug) {
            return NextResponse.json({ error: "Course slug is required" }, { status: 400 });
        }
        const { slug, ...input } = body;
        const course = await updateCourse(session.id, slug, input);
        return NextResponse.json({ course });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update course";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
