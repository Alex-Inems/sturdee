import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { enrollInClass } from "@/lib/classrooms-db";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";

interface Props {
    params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in to join this class" }, { status: 401 });
    }
    if (session.role === "tutor" || session.role === "admin") {
        return NextResponse.json(
            { error: "Tutors host classes — sign in as a student to enroll" },
            { status: 403 }
        );
    }

    const { id } = await params;

    try {
        await enrollInClass(id, {
            id: session.id,
            name: session.name,
            email: session.email,
        });
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Could not enroll" },
            { status: 400 }
        );
    }
}
