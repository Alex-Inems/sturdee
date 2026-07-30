"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
    LiveKitRoom,
    RoomAudioRenderer,
    VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import HostControls from "@/components/classroom/HostControls";

type Props = {
    classId: string;
    title: string;
    isHost?: boolean;
};

type Connection = {
    token: string;
    url: string;
    isHost: boolean;
};

/**
 * Sturdee-native classroom. Fetches a per-user LiveKit token, then embeds the
 * full conference (grid, screen share, chat) with a host moderation overlay.
 */
export default function LiveRoom({ classId, title, isHost = false }: Props) {
    const [conn, setConn] = useState<Connection | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [ended, setEnded] = useState(false);

    const connect = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/classrooms/${classId}/token`, { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not join the class");
            setConn({ token: data.token, url: data.url, isHost: data.isHost });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not join the class");
        } finally {
            setLoading(false);
        }
    }, [classId]);

    // Auto-connect on mount for a one-click experience.
    useEffect(() => {
        void connect();
    }, [connect]);

    const leave = () => {
        setConn(null);
        setEnded(true);
    };

    if (ended) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <p className="text-lg font-bold text-gray-900">You left the classroom</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setEnded(false);
                            void connect();
                        }}
                        className="rounded-full bg-[#10B981] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0F9F72]"
                    >
                        Rejoin
                    </button>
                    {isHost && (
                        <Link
                            href="/dashboard/tutor"
                            className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-300"
                        >
                            Tutor dashboard
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
                <p className="text-sm font-semibold text-red-700">{error}</p>
                <button
                    type="button"
                    onClick={() => void connect()}
                    className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-black"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (loading || !conn) {
        return (
            <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-12">
                <p className="text-sm font-medium text-gray-500">Connecting to {title}…</p>
            </div>
        );
    }

    return (
        <div
            className="relative h-[72vh] min-h-120 w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#0b0d12]"
            data-lk-theme="default"
        >
            <LiveKitRoom
                token={conn.token}
                serverUrl={conn.url}
                connect
                video
                audio
                onDisconnected={leave}
                style={{ height: "100%" }}
            >
                <VideoConference />
                <RoomAudioRenderer />
                {conn.isHost && <HostControls classId={classId} />}
            </LiveKitRoom>
        </div>
    );
}
