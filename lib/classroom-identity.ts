/** Pure helpers shared by client and server — no server-only imports here. */

export type AttendanceRole = "student" | "host" | "admin";

/**
 * LiveKit participant identity is `${userId}::${role}` so the webhook can
 * attribute a join/leave to a Supabase user without trusting client input.
 */
export function encodeIdentity(userId: string, role: AttendanceRole): string {
    return `${userId}::${role}`;
}

export function decodeIdentity(identity: string): { userId: string | null; role: AttendanceRole } {
    const [userId, role] = identity.split("::");
    const validRole: AttendanceRole = role === "host" || role === "admin" ? role : "student";
    return { userId: userId || null, role: validRole };
}
