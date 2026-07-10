import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { MAX_OSS_POINTS, OSS_TOOL_COUNT } from "@/lib/opensource";
import { getUserPointsSummary } from "@/lib/opensource-db";

export async function GET() {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const summary = await getUserPointsSummary(session.id);
        return NextResponse.json({
            ...summary,
            maxPoints: MAX_OSS_POINTS,
            totalTools: OSS_TOOL_COUNT,
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
    }
}
