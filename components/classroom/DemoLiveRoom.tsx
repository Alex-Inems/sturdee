"use client";

import { useCallback, useEffect, useState } from "react";
import {
    LiveKitRoom,
    RoomAudioRenderer,
    VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";

type Connection = {
    token: string;
    url: string;
};

/**
 * No-login LiveKit room for local testing. Hits /api/classrooms/demo/token.
 */
export default function DemoLiveRoom() {
    const [name, setName] = useState("");
    const [asHost, setAsHost] = useState(true);
    const [conn, setConn] = useState<Connection | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [ended, setEnded] = useState(false);

    const connect = useCallback(async () => {
        setLoading(true);
        setError("");
        setEnded(false);
        try {
            const res = await fetch("/api/classrooms/demo/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name || undefined, asHost }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not join demo room");
            setConn({ token: data.token, url: data.url });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not join demo room");
            setConn(null);
        } finally {
            setLoading(false);
        }
    }, [name, asHost]);

    useEffect(() => {
        // Auto-join once so testing is one click from the hub link.
        void connect();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- join once on mount with defaults
    }, []);

    if (ended) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <p className="text-lg font-bold text-gray-900">You left the demo room</p>
                <button
                    type="button"
                    onClick={() => void connect()}
                    className="rounded-full bg-[#10B981] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0F9F72]"
                >
                    Rejoin
                </button>
            </div>
        );
    }

    if (error && !conn) {
        return (
            <div className="space-y-4 rounded-2xl border border-red-200 bg-red-50 p-8">
                <p className="text-sm font-semibold text-red-700">{error}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-left">
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Display name</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium"
                        />
                    </label>
                    <label className="flex items-end gap-2 pb-2 text-sm font-medium text-gray-700">
                        <input type="checkbox" checked={asHost} onChange={(e) => setAsHost(e.target.checked)} />
                        Join with host permissions
                    </label>
                </div>
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => void connect()}
                    className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-black disabled:opacity-50"
                >
                    {loading ? "Connecting…" : "Try again"}
                </button>
            </div>
        );
    }

    if (loading || !conn) {
        return (
            <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-12">
                <p className="text-sm font-medium text-gray-500">Connecting to demo classroom…</p>
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
                onDisconnected={() => {
                    setConn(null);
                    setEnded(true);
                }}
                style={{ height: "100%" }}
            >
                <VideoConference />
                <RoomAudioRenderer />
            </LiveKitRoom>
        </div>
    );
}
