import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getChallenge } from "@/lib/credentials/challenges";
import { runChallengeTests } from "@/lib/credentials/validators";
import { getOrCreateWorkspace } from "@/lib/credentials-db";

interface Props {
    params: Promise<{ challengeId: string }>;
}

export async function POST(_request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { challengeId } = await params;
    const challenge = getChallenge(challengeId);
    if (!challenge) return NextResponse.json({ error: "Challenge not found" }, { status: 404 });

    try {
        const workspace = await getOrCreateWorkspace(session.id, challengeId);
        const result = runChallengeTests(challenge, workspace.files);
        return NextResponse.json(result);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Test failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
