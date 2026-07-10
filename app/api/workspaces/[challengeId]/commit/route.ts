import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getChallenge } from "@/lib/credentials/challenges";
import {
    createSimulatedCommit,
    getOrCreateWorkspace,
    saveWorkspace,
} from "@/lib/credentials-db";

interface Props {
    params: Promise<{ challengeId: string }>;
}

export async function POST(request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { challengeId } = await params;
    const challenge = getChallenge(challengeId);
    if (!challenge) return NextResponse.json({ error: "Challenge not found" }, { status: 404 });

    try {
        const { message } = await request.json();
        if (!message || typeof message !== "string" || message.trim().length < 4) {
            return NextResponse.json({ error: "Commit message must be at least 4 characters" }, { status: 400 });
        }

        const workspace = await getOrCreateWorkspace(session.id, challengeId);
        if (workspace.stagedFiles.length === 0) {
            return NextResponse.json({ error: "Nothing staged. Run git add first." }, { status: 400 });
        }

        if (challenge.requiredCommitMessage && !challenge.requiredCommitMessage.test(message)) {
            return NextResponse.json(
                { error: "Commit message should describe what you added (e.g. 'Add project README')." },
                { status: 400 }
            );
        }

        const snapshot: Record<string, string> = {};
        for (const f of workspace.stagedFiles) {
            snapshot[f] = workspace.files[f] ?? "";
        }

        const commit = createSimulatedCommit(session.id, challengeId, snapshot, message.trim());
        const commits = [...workspace.commits, commit];
        const updated = await saveWorkspace(session.id, {
            ...workspace,
            commits,
            stagedFiles: [],
        });

        return NextResponse.json({
            commit,
            commits: updated.commits,
            stagedFiles: updated.stagedFiles,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Commit failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
