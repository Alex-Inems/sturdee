import { NextResponse } from "next/server";
import { enrollInClass } from "@/lib/classrooms-db";
import { requireClassroomActor } from "@/lib/classroom-actor";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";

interface Props {
    params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    let ctx;
    try {
        ctx = await requireClassroomActor();
    } catch {
        return NextResponse.json(
            { error: "Please sign in (or use guest student in dev) to join this class" },
            { status: 401 }
        );
    }

    if (ctx.actor.role === "tutor" || ctx.actor.role === "admin") {
        return NextResponse.json(
            { error: "Tutors host classes — use guest student (or a student account) to enroll" },
            { status: 403 }
        );
    }

    const { id } = await params;

    try {
        await enrollInClass(
            id,
            { id: ctx.actor.id, name: ctx.actor.name, email: ctx.actor.email },
            { bypassRls: ctx.bypassRls }
        );
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Could not enroll" },
            { status: 400 }
        );
    }
}
