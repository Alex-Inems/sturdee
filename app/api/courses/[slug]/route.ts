import { NextResponse } from "next/server";
import { getPublishedCourseBySlug } from "@/lib/courses-db";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Props) {
    const { slug } = await params;
    try {
        const course = await getPublishedCourseBySlug(slug);
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }
        return NextResponse.json({ course });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load course";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
