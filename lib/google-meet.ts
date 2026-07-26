/** Google Meet helpers — create spaces via Meet REST API and validate join URLs. */

export const MEET_OAUTH_SCOPE = "https://www.googleapis.com/auth/meetings.space.created";

export const MAX_CLASS_CAPACITY = 100;

const MEET_URL_RE = /^https:\/\/meet\.google\.com\/[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{3}(?:\?.*)?$/i;
const MEET_URL_LOOSE_RE = /^https:\/\/meet\.google\.com\/[a-z0-9-]+(?:\?.*)?$/i;

export function isValidMeetUrl(url: string): boolean {
    const trimmed = url.trim();
    return MEET_URL_RE.test(trimmed) || MEET_URL_LOOSE_RE.test(trimmed);
}

export function normalizeMeetUrl(url: string): string {
    return url.trim().split("?")[0].replace(/\/$/, "");
}

export function extractMeetCode(url: string): string {
    try {
        const path = new URL(normalizeMeetUrl(url)).pathname.replace(/^\//, "");
        return path;
    } catch {
        return "";
    }
}

export type MeetSpace = {
    meetingUri: string;
    meetingCode: string;
    name: string;
};

/**
 * Creates a Google Meet space using the host's OAuth access token.
 * Requires the meetings.space.created scope (sign in with Google Meet scopes).
 */
export async function createMeetSpace(accessToken: string): Promise<MeetSpace> {
    const res = await fetch("https://meet.googleapis.com/v2/spaces", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        if (res.status === 401 || res.status === 403) {
            throw new Error(
                "Google Meet permission missing. Sign in with Google again and grant Meet access, or paste a Meet link."
            );
        }
        throw new Error(`Failed to create Google Meet space (${res.status}): ${body.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
        meetingUri?: string;
        meetingCode?: string;
        name?: string;
    };

    if (!data.meetingUri) {
        throw new Error("Google Meet did not return a meeting URL");
    }

    return {
        meetingUri: data.meetingUri,
        meetingCode: data.meetingCode ?? extractMeetCode(data.meetingUri),
        name: data.name ?? "",
    };
}
