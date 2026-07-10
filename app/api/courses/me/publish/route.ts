import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { publishCourse } from "@/lib/courses-db";

export async function POST(request: Request) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { slug } = (await request.json()) as { slug: string };
        if (!slug) {
            return NextResponse.json({ error: "Course slug is required" }, { status: 400 });
        }
        const course = await publishCourse(session.id, slug);
        return NextResponse.json({ course });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to publish course";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
