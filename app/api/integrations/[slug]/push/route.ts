import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import { getGithubUsernameFromMetadata, pushToGithub, verifyGithubIntegration } from "@/lib/github/client";
import { getOssTool } from "@/lib/opensource/tools";
import { validateIntegration } from "@/lib/opensource/validators";
import {
    getCompletion,
    getIntegrationWorkspace,
    recordIntegrationCompletion,
} from "@/lib/opensource-db";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function POST(request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    const tool = getOssTool(slug);
    if (!tool) return NextResponse.json({ error: "Tool not found" }, { status: 404 });

    const existing = await getCompletion(session.id, slug);
    if (existing) {
        return NextResponse.json({
            pass: true,
            verified: true,
            pushed: true,
            points: existing.points,
            githubPushUrl: existing.githubPushUrl,
            message: "Already integrated — points previously awarded.",
        });
    }

    try {
        const workspace = await getIntegrationWorkspace(session.id, slug);
        const validation = validateIntegration(tool, workspace.files);

        if (!validation.pass) {
            return NextResponse.json(validation, { status: 400 });
        }

        if (workspace.commits.length < 1) {
            return NextResponse.json(
                { pass: false, summary: "Make at least one git commit before pushing to GitHub." },
                { status: 400 }
            );
        }

        const body = await request.json().catch(() => ({}));
        const repoInput = body.repo as string | undefined;

        const supabase = await createClient();
        const {
            data: { session: authSession },
        } = await supabase.auth.getSession();

        const providerToken = authSession?.provider_token as string | undefined;
        const githubUser = getGithubUsernameFromMetadata(authSession?.user?.user_metadata);

        let githubRepo = "";
        let commitSha = workspace.commits[workspace.commits.length - 1]?.sha ?? "";
        let commitUrl = "";
        let pushed = false;

        if (providerToken && githubUser) {
            const pushResult = await pushToGithub(tool, workspace.files, providerToken, githubUser);
            if (pushResult.pushed) {
                pushed = true;
                githubRepo = pushResult.repo;
                commitSha = pushResult.commitSha ?? commitSha;
                commitUrl = pushResult.commitUrl ?? `https://github.com/${pushResult.repo}`;
            } else if (repoInput) {
                const verify = await verifyGithubIntegration(repoInput, tool, providerToken);
                if (!verify.verified) {
                    return NextResponse.json({ pass: true, requiresGitHub: true, message: verify.message, tests: validation.tests }, { status: 400 });
                }
                pushed = true;
                githubRepo = repoInput.includes("/") ? repoInput.replace(/https?:\/\/github\.com\//, "") : repoInput;
                commitSha = verify.commitSha ?? commitSha;
                commitUrl = verify.commitUrl ?? "";
            } else {
                return NextResponse.json({
                    pass: true,
                    requiresGitHub: true,
                    message: pushResult.message,
                    instructions: `git remote add origin git@github.com:${githubUser}/${tool.slug}-integration.git && git push -u origin main`,
                    tests: validation.tests,
                }, { status: 400 });
            }
        } else if (repoInput) {
            const verify = await verifyGithubIntegration(repoInput, tool);
            if (!verify.verified) {
                return NextResponse.json({ pass: true, requiresGitHub: true, message: verify.message, tests: validation.tests }, { status: 400 });
            }
            pushed = true;
            githubRepo = repoInput.replace(/https?:\/\/github\.com\//, "").replace(/\/$/, "");
            commitSha = verify.commitSha ?? commitSha;
            commitUrl = verify.commitUrl ?? "";
        } else {
            return NextResponse.json({
                pass: true,
                requiresGitHub: true,
                message: "Connect GitHub (Sign in with GitHub) for auto-push, or paste your repo URL after pushing manually.",
                instructions: [
                    "1. Sign in with GitHub from the auth modal",
                    "2. Complete integration files and commit",
                    "3. Click Push to GitHub — we create sturdee-{tool}-integration repo",
                    "Or push manually and paste owner/repo in the verify field",
                ],
                tests: validation.tests,
            }, { status: 400 });
        }

        const completion = await recordIntegrationCompletion({
            userId: session.id,
            toolSlug: slug,
            points: tool.points,
            githubRepo,
            githubCommitSha: commitSha,
            githubPushUrl: commitUrl,
        });

        return NextResponse.json({
            pass: true,
            pushed,
            verified: true,
            points: completion.points,
            commitUrl,
            githubPushUrl: commitUrl,
            message: `+${tool.points} points — ${tool.name} integrated on GitHub`,
            tests: validation.tests,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Push failed", pass: false },
            { status: 500 }
        );
    }
}
