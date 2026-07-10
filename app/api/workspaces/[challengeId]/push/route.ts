import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getChallenge } from "@/lib/credentials/challenges";
import { runChallengeTests } from "@/lib/credentials/validators";
import {
    getCertificateForChallenge,
    getOrCreateWorkspace,
    issueCertificate,
} from "@/lib/credentials-db";

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
        const existing = await getCertificateForChallenge(session.id, challengeId);
        if (existing) {
            return NextResponse.json({ pass: true, certificate: existing });
        }

        const workspace = await getOrCreateWorkspace(session.id, challengeId);

        if (workspace.commits.length < challenge.minCommits) {
            return NextResponse.json(
                {
                    pass: false,
                    summary: `Need at least ${challenge.minCommits} commit(s) before push. You have ${workspace.commits.length}.`,
                },
                { status: 400 }
            );
        }

        const result = runChallengeTests(challenge, workspace.files);
        if (!result.pass) {
            return NextResponse.json(result, { status: 400 });
        }

        const certificate = await issueCertificate({
            userId: session.id,
            userName: session.name,
            challengeId,
            commits: workspace.commits,
            files: workspace.files,
        });

        return NextResponse.json({ pass: true, certificate, tests: result.tests, summary: result.summary });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Push failed";
        return NextResponse.json({ error: message, pass: false }, { status: 500 });
    }
}
