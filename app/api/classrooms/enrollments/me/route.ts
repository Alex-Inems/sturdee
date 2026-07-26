import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getStudentEnrollments } from "@/lib/dashboards";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";

export async function GET() {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in" }, { status: 401 });
    }

    try {
        const enrollments = await getStudentEnrollments(session.id);
        return NextResponse.json({ enrollments });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to load enrollments" },
            { status: 500 }
        );
    }
}
