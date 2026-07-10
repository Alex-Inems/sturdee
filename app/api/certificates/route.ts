import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getCertificatesByUserId } from "@/lib/credentials-db";

export async function GET() {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const certificates = await getCertificatesByUserId(session.id);
        return NextResponse.json({ certificates });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch certificates";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
