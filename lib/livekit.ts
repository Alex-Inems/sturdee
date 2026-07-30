import "server-only";
import {
    AccessToken,
    RoomServiceClient,
    WebhookReceiver,
    type VideoGrant,
} from "livekit-server-sdk";

/**
 * Sturdee-native classroom video, powered by LiveKit.
 *
 * Server env:
 *   LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL (wss://… or https://…)
 * Client env:
 *   NEXT_PUBLIC_LIVEKIT_URL (the wss URL the browser connects to)
 */

export const MAX_CLASS_CAPACITY = 100;

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing ${name}. Set up LiveKit to run native classrooms.`);
    }
    return value;
}

export function isLiveKitConfigured(): boolean {
    return Boolean(
        process.env.LIVEKIT_API_KEY &&
            process.env.LIVEKIT_API_SECRET &&
            (process.env.LIVEKIT_URL || process.env.NEXT_PUBLIC_LIVEKIT_URL)
    );
}

export function livekitServerUrl(): string {
    return requireEnv("LIVEKIT_URL");
}

export function livekitPublicUrl(): string {
    return process.env.NEXT_PUBLIC_LIVEKIT_URL || process.env.LIVEKIT_URL || "";
}

/** Deterministic room name for a class. */
export function roomNameForClass(classId: string): string {
    return `class_${classId}`;
}

type TokenInput = {
    room: string;
    identity: string;
    name: string;
    isHost: boolean;
    /** Extra metadata surfaced to other participants (JSON string). */
    metadata?: Record<string, unknown>;
};

/**
 * Mints a join token. Hosts get publish + room admin (mute/remove others);
 * students get publish (cam/mic) but no admin rights.
 */
export async function createRoomToken({
    room,
    identity,
    name,
    isHost,
    metadata,
}: TokenInput): Promise<string> {
    const apiKey = requireEnv("LIVEKIT_API_KEY");
    const apiSecret = requireEnv("LIVEKIT_API_SECRET");

    const at = new AccessToken(apiKey, apiSecret, {
        identity,
        name,
        // Students shouldn't linger; hosts stay as long as the room lives.
        ttl: isHost ? "6h" : "4h",
        metadata: JSON.stringify({ role: isHost ? "host" : "student", ...metadata }),
    });

    const grant: VideoGrant = {
        room,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
        // Host moderation: manage the room and other participants.
        roomAdmin: isHost,
    };

    at.addGrant(grant);
    return at.toJwt();
}

let roomService: RoomServiceClient | null = null;

/** Lazily-built RoomServiceClient for server-side moderation calls. */
export function getRoomService(): RoomServiceClient {
    if (!roomService) {
        const url = requireEnv("LIVEKIT_URL")
            .replace(/^wss:/, "https:")
            .replace(/^ws:/, "http:");
        roomService = new RoomServiceClient(
            url,
            requireEnv("LIVEKIT_API_KEY"),
            requireEnv("LIVEKIT_API_SECRET")
        );
    }
    return roomService;
}

/** Remove (kick) a participant from a room. */
export async function removeParticipant(room: string, identity: string): Promise<void> {
    await getRoomService().removeParticipant(room, identity);
}

/** Force-mute every track a participant is publishing. */
export async function muteParticipant(room: string, identity: string): Promise<void> {
    const svc = getRoomService();
    const participant = await svc.getParticipant(room, identity);
    await Promise.all(
        (participant.tracks ?? []).map((t) =>
            svc.mutePublishedTrack(room, identity, t.sid, true)
        )
    );
}

/** End the session for everyone by deleting the room. */
export async function endRoom(room: string): Promise<void> {
    await getRoomService().deleteRoom(room).catch(() => undefined);
}

let webhookReceiver: WebhookReceiver | null = null;

export function getWebhookReceiver(): WebhookReceiver {
    if (!webhookReceiver) {
        webhookReceiver = new WebhookReceiver(
            requireEnv("LIVEKIT_API_KEY"),
            requireEnv("LIVEKIT_API_SECRET")
        );
    }
    return webhookReceiver;
}
