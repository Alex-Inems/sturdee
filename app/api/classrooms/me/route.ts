import { NextResponse } from "next/server";
import { getClassesByHost } from "@/lib/classrooms-db";
import { requireClassroomTutor } from "@/lib/classroom-actor";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";

export async function GET() {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    try {
        const { actor, bypassRls } = await requireClassroomTutor();
        const classes = await getClassesByHost(actor.id, { bypassRls });
        return NextResponse.json({ classes });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load your classes";
        const status =
            message === "Unauthorized" ? 401 : message.includes("tutors") ? 403 : 500;
        return NextResponse.json(
            { error: message === "Unauthorized" ? "Please sign in" : message },
            { status }
        );
    }
}
