import { NextResponse } from "next/server";
import { getSessionUser, requireTutor } from "@/lib/auth";
import { createLiveClass, listOpenClasses } from "@/lib/classrooms-db";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import { createMeetSpace, isValidMeetUrl, MAX_CLASS_CAPACITY } from "@/lib/google-meet";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    try {
        const classes = await listOpenClasses();
        return NextResponse.json({ classes });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to load classes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    let session;
    try {
        session = await requireTutor();
    } catch {
        const user = await getSessionUser();
        if (!user) {
            return NextResponse.json({ error: "Please sign in as a tutor to host a class" }, { status: 401 });
        }
        return NextResponse.json({ error: "Only tutors can create classes" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const {
            title,
            description,
            topic,
            startsAt,
            endsAt,
            capacity,
            meetUrl,
            generateMeet,
        } = body as {
            title?: string;
            description?: string;
            topic?: string;
            startsAt?: string;
            endsAt?: string | null;
            capacity?: number;
            meetUrl?: string;
            generateMeet?: boolean;
        };

        if (!title?.trim() || !startsAt) {
            return NextResponse.json({ error: "Title and start time are required" }, { status: 400 });
        }

        let resolvedMeetUrl = typeof meetUrl === "string" ? meetUrl.trim() : "";
        let meetSpaceName = "";
        let meetCode = "";

        if (generateMeet && !resolvedMeetUrl) {
            const supabase = await createClient();
            const {
                data: { session: authSession },
            } = await supabase.auth.getSession();
            const token = authSession?.provider_token;
            if (!token) {
                return NextResponse.json(
                    {
                        error:
                            "No Google Meet token. Sign in with Google as a tutor, or paste a meet.google.com link.",
                        code: "MEET_AUTH_REQUIRED",
                    },
                    { status: 400 }
                );
            }
            const space = await createMeetSpace(token);
            resolvedMeetUrl = space.meetingUri;
            meetSpaceName = space.name;
            meetCode = space.meetingCode;
        } else if (resolvedMeetUrl && !isValidMeetUrl(resolvedMeetUrl)) {
            return NextResponse.json(
                { error: "Enter a valid Google Meet URL (meet.google.com/xxx-xxxx-xxx)" },
                { status: 400 }
            );
        }

        const liveClass = await createLiveClass(
            { id: session.id, name: session.name, email: session.email },
            {
                title,
                description,
                topic,
                startsAt,
                endsAt: endsAt ?? null,
                capacity: Math.min(MAX_CLASS_CAPACITY, capacity ?? MAX_CLASS_CAPACITY),
                meetUrl: resolvedMeetUrl || undefined,
                meetSpaceName,
                meetCode,
                status: resolvedMeetUrl ? "scheduled" : "draft",
            }
        );

        return NextResponse.json({ class: liveClass }, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to create class" },
            { status: 400 }
        );
    }
}
