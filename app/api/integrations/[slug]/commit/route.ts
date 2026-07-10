import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getOssTool } from "@/lib/opensource/tools";
import { createSimulatedCommit, getIntegrationWorkspace, saveIntegrationWorkspace } from "@/lib/opensource-db";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function POST(request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    if (!getOssTool(slug)) return NextResponse.json({ error: "Tool not found" }, { status: 404 });

    try {
        const { message } = await request.json();
        const workspace = await getIntegrationWorkspace(session.id, slug);
        if (!workspace.stagedFiles.length) {
            return NextResponse.json({ error: "Nothing staged" }, { status: 400 });
        }

        const snapshot: Record<string, string> = {};
        for (const f of workspace.stagedFiles) snapshot[f] = workspace.files[f] ?? "";

        const commit = createSimulatedCommit(session.id, `oss-${slug}`, snapshot, message);
        const commits = [...workspace.commits, commit];
        await saveIntegrationWorkspace(session.id, slug, { ...workspace, commits, stagedFiles: [] });

        return NextResponse.json({ commit, commits, stagedFiles: [] });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Commit failed" }, { status: 500 });
    }
}
