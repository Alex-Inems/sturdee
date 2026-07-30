"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParticipants } from "@livekit/components-react";
import { decodeIdentity } from "@/lib/classroom-identity";

/**
 * Host-only overlay: live roster with per-participant mute/remove and an
 * "end for everyone" button. Actions hit the server-side moderation API so
 * they're authoritative (a kicked student can't just rejoin the token).
 */
export default function HostControls({ classId }: { classId: string }) {
    const participants = useParticipants();
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [busy, setBusy] = useState<string | null>(null);
    const [error, setError] = useState("");

    const moderate = async (action: "mute" | "remove" | "end", identity?: string) => {
        setBusy(identity ? `${action}:${identity}` : action);
        setError("");
        try {
            const res = await fetch(`/api/classrooms/${classId}/moderate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, identity }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Action failed");
            }
            if (action === "end") {
                router.push("/dashboard/tutor");
                router.refresh();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Action failed");
        } finally {
            setBusy(null);
        }
    };

    const students = participants.filter((p) => decodeIdentity(p.identity).role === "student");

    return (
        <div className="pointer-events-auto absolute right-3 top-3 z-20 w-72 max-w-[80vw]">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-full rounded-lg bg-gray-900/90 px-4 py-2 text-left text-sm font-semibold text-white shadow-lg backdrop-blur hover:bg-gray-900"
            >
                Host controls · {students.length} student{students.length === 1 ? "" : "s"}
                <span className="float-right text-gray-400">{open ? "▾" : "▸"}</span>
            </button>

            {open && (
                <div className="mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="max-h-64 space-y-1.5 overflow-y-auto">
                        {students.length === 0 && (
                            <p className="px-1 py-2 text-xs font-medium text-gray-400">
                                No students connected yet.
                            </p>
                        )}
                        {students.map((p) => (
                            <div
                                key={p.identity}
                                className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50"
                            >
                                <span className="truncate text-sm font-medium text-gray-800">
                                    {p.name || p.identity}
                                </span>
                                <div className="flex shrink-0 gap-1">
                                    <button
                                        type="button"
                                        disabled={busy === `mute:${p.identity}`}
                                        onClick={() => void moderate("mute", p.identity)}
                                        className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-200 disabled:opacity-50"
                                    >
                                        Mute
                                    </button>
                                    <button
                                        type="button"
                                        disabled={busy === `remove:${p.identity}`}
                                        onClick={() => void moderate("remove", p.identity)}
                                        className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {error && <p className="mt-2 px-1 text-xs font-medium text-red-600">{error}</p>}

                    <button
                        type="button"
                        disabled={busy === "end"}
                        onClick={() => {
                            if (confirm("End the class for everyone?")) void moderate("end");
                        }}
                        className="mt-3 w-full rounded-lg bg-gray-900 px-3 py-2 text-xs font-bold text-white hover:bg-black disabled:opacity-50"
                    >
                        End class for everyone
                    </button>
                </div>
            )}
        </div>
    );
}
