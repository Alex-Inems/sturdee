/**
 * Pure flags shared by client + server. Do not import next/headers here.
 *
 * Guest classroom access for local testing without sign-in.
 * Enabled automatically in `next dev`, or when ALLOW_CLASSROOM_GUEST=true.
 */
export function isClassroomGuestAllowed(): boolean {
    if (process.env.ALLOW_CLASSROOM_GUEST === "true") return true;
    if (process.env.NEXT_PUBLIC_ALLOW_CLASSROOM_GUEST === "true") return true;
    if (process.env.ALLOW_CLASSROOM_GUEST === "false") return false;
    if (process.env.NEXT_PUBLIC_ALLOW_CLASSROOM_GUEST === "false") return false;
    return process.env.NODE_ENV === "development";
}

export const DEMO_ROOM_NAME = "sturdee_classroom_demo";
export const GUEST_COOKIE = "sturdee_classroom_guest";
