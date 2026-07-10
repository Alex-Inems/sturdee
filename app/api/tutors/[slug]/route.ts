import { NextResponse } from "next/server";
import { getPublishedTutorBySlug } from "@/lib/tutors-db";

interface RouteContext {
    params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
    const { slug } = await context.params;
    try {
        const tutor = await getPublishedTutorBySlug(slug);
        if (!tutor) {
            return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
        }
        return NextResponse.json({ tutor });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load tutor";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
