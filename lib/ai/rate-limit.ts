type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

/** Simple in-memory rate limit (per server instance). Good enough for MVP. */
export function checkAiRateLimit(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || now >= existing.resetAt) {
        buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return { ok: true };
    }

    if (existing.count >= MAX_REQUESTS) {
        return { ok: false, retryAfterSec: Math.ceil((existing.resetAt - now) / 1000) };
    }

    existing.count += 1;
    return { ok: true };
}

export function clientKeyFromRequest(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() || "anon";
    return request.headers.get("x-real-ip") || "anon";
}
