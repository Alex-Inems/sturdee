import { createHash } from "crypto";

const SECRET = process.env.CREDENTIAL_SIGNING_SECRET ?? "sturdee-dev-signing-key";

export function hashCommit(payload: string): string {
    return createHash("sha256").update(payload).digest("hex").slice(0, 40);
}

export function buildCommitSha(
    userId: string,
    challengeId: string,
    files: Record<string, string>,
    message: string,
    timestamp: string
): string {
    const body = JSON.stringify({ userId, challengeId, files, message, timestamp });
    return hashCommit(body);
}

export function buildVerificationCode(commitSha: string, challengeId: string): string {
    const raw = createHash("sha256").update(`${commitSha}:${challengeId}`).digest("hex");
    return `STD-${raw.slice(0, 4).toUpperCase()}-${raw.slice(4, 12)}`;
}

/** Cryptographic signature proving issuance integrity — verifiable without DB lookup. */
export function signCredential(
    userId: string,
    challengeId: string,
    commitSha: string,
    issuedAt: string
): string {
    return createHash("sha256")
        .update(`${SECRET}|${userId}|${challengeId}|${commitSha}|${issuedAt}`)
        .digest("hex");
}

export function verifySignature(
    signature: string,
    userId: string,
    challengeId: string,
    commitSha: string,
    issuedAt: string
): boolean {
    return signCredential(userId, challengeId, commitSha, issuedAt) === signature;
}
