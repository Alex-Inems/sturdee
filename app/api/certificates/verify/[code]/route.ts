import { NextResponse } from "next/server";
import { getCertificateByCode } from "@/lib/credentials-db";
import { verifySignature } from "@/lib/credentials/crypto";

interface Props {
    params: Promise<{ code: string }>;
}

export async function GET(_request: Request, { params }: Props) {
    const { code } = await params;

    try {
        const certificate = await getCertificateByCode(code);
        if (!certificate) {
            return NextResponse.json({ valid: false, error: "Credential not found" }, { status: 404 });
        }

        const valid = verifySignature(
            certificate.signature,
            certificate.userId,
            certificate.challengeId,
            certificate.commitSha,
            certificate.issuedAt
        );

        return NextResponse.json({ valid, certificate });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Verification failed";
        return NextResponse.json({ valid: false, error: message }, { status: 500 });
    }
}
