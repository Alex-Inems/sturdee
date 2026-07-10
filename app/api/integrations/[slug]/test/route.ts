import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getOssTool } from "@/lib/opensource/tools";
import { validateIntegration } from "@/lib/opensource/validators";
import { getIntegrationWorkspace } from "@/lib/opensource-db";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function POST(_request: Request, { params }: Props) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    const tool = getOssTool(slug);
    if (!tool) return NextResponse.json({ error: "Tool not found" }, { status: 404 });

    try {
        const workspace = await getIntegrationWorkspace(session.id, slug);
        const result = validateIntegration(tool, workspace.files);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Test failed" }, { status: 500 });
    }
}
