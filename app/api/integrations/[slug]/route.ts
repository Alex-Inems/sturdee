import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getOssTool } from "@/lib/opensource/tools";
import { getCompletion, getIntegrationWorkspace } from "@/lib/opensource-db";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    const tool = getOssTool(slug);
    if (!tool) return NextResponse.json({ error: "Tool not found" }, { status: 404 });

    try {
        const workspace = await getIntegrationWorkspace(session.id, slug);
        const completion = await getCompletion(session.id, slug);
        return NextResponse.json({ tool, workspace, completion });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load workspace";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    try {
        const { files } = await request.json();
        const workspace = await getIntegrationWorkspace(session.id, slug);
        const { saveIntegrationWorkspace } = await import("@/lib/opensource-db");
        await saveIntegrationWorkspace(session.id, slug, {
            files,
            stagedFiles: workspace.stagedFiles,
            commits: workspace.commits,
        });
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Save failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
