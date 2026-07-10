import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getChallenge } from "@/lib/credentials/challenges";
import { getCertificateForChallenge, getOrCreateWorkspace, saveWorkspace } from "@/lib/credentials-db";

interface Props {
    params: Promise<{ challengeId: string }>;
}

export async function GET(_request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { challengeId } = await params;
    const challenge = getChallenge(challengeId);
    if (!challenge) return NextResponse.json({ error: "Challenge not found" }, { status: 404 });

    try {
        const workspace = await getOrCreateWorkspace(session.id, challengeId);
        const existing = await getCertificateForChallenge(session.id, challengeId);
        return NextResponse.json({ challenge, workspace, certificate: existing });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load workspace";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { challengeId } = await params;
    try {
        const { files } = await request.json();
        const workspace = await getOrCreateWorkspace(session.id, challengeId);
        const updated = await saveWorkspace(session.id, { ...workspace, files });
        return NextResponse.json({ files: updated.files });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save files";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
