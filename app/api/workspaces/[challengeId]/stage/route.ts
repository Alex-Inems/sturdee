import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getChallenge } from "@/lib/credentials/challenges";
import { getOrCreateWorkspace, saveWorkspace } from "@/lib/credentials-db";

interface Props {
    params: Promise<{ challengeId: string }>;
}

export async function POST(request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { challengeId } = await params;
    if (!getChallenge(challengeId)) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    try {
        const { files } = await request.json();
        if (!Array.isArray(files) || files.length === 0) {
            return NextResponse.json({ error: "No files to stage" }, { status: 400 });
        }

        const workspace = await getOrCreateWorkspace(session.id, challengeId);
        const staged = [...new Set([...workspace.stagedFiles, ...files])];
        const updated = await saveWorkspace(session.id, { ...workspace, stagedFiles: staged });
        return NextResponse.json({ stagedFiles: updated.stagedFiles });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Stage failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
