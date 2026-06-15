import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getStats } from "@/lib/db";

export async function GET() {
    try {
        await requireAdmin();
        const stats = await getStats();
        return NextResponse.json(stats);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error";
        const status = message === "Forbidden" ? 403 : 401;
        return NextResponse.json({ error: message }, { status });
    }
}
