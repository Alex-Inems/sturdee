import { NextResponse } from "next/server";
import { requireTutor } from "@/lib/auth";
import { updateLiveClass, type LiveClassStatus } from "@/lib/classrooms-db";
import { featureDisabledResponse, isFeatureEnabled } from "@/lib/features";
import { createMeetSpace, isValidMeetUrl, type MeetSpace } from "@/lib/google-meet";
import { createClient } from "@/lib/supabase/server";

interface Props {
    params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Props) {
    if (!isFeatureEnabled("classroom")) return featureDisabledResponse();

    let session;
    try {
        session = await requireTutor();
    } catch (err) {
        const message = err instanceof Error ? err.message : "Forbidden";
        return NextResponse.json(
            { error: message === "Unauthorized" ? "Please sign in" : message },
            { status: message.includes("tutors") ? 403 : 401 }
        );
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const {
            title,
            description,
            topic,
            startsAt,
            endsAt,
            capacity,
            status,
            meetUrl,
            generateMeet,
        } = body as {
            title?: string;
            description?: string;
            topic?: string;
            startsAt?: string;
            endsAt?: string | null;
            capacity?: number;
            status?: LiveClassStatus;
            meetUrl?: string;
            generateMeet?: boolean;
        };

        let resolvedMeet = meetUrl;
        let meetSpaceName: string | undefined;
        let meetCode: string | undefined;

        if (generateMeet) {
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
            const space: MeetSpace = await createMeetSpace(token);
            resolvedMeet = space.meetingUri;
            meetSpaceName = space.name;
            meetCode = space.meetingCode;
        } else if (meetUrl !== undefined && meetUrl && !isValidMeetUrl(meetUrl)) {
            return NextResponse.json({ error: "Invalid Google Meet URL" }, { status: 400 });
        }

        const updated = await updateLiveClass(id, session.id, {
            title,
            description,
            topic,
            startsAt,
            endsAt,
            capacity,
            status,
            meetUrl: resolvedMeet,
            meetSpaceName,
            meetCode,
        });

        if (status === "live" && !updated.meet_url) {
            return NextResponse.json(
                { error: "Add a Google Meet link before going live" },
                { status: 400 }
            );
        }

        return NextResponse.json({ class: updated });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to update class" },
            { status: 400 }
        );
    }
}
