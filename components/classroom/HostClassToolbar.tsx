"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    classId: string;
    status: string;
};

/**
 * Always-visible host bar above the live room — End class and create another
 * were easy to miss when buried inside the video overlay / dashboard.
 */
export default function HostClassToolbar({ classId, status }: Props) {
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const endClass = async () => {
        if (!confirm("End this class for everyone?")) return;
        setBusy(true);
        setError("");
        try {
            // Tear down the LiveKit room (kicks everyone) + mark ended in DB.
            const mod = await fetch(`/api/classrooms/${classId}/moderate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "end" }),
            });
            if (!mod.ok) {
                // Fallback: status-only end if room was never connected.
                const patch = await fetch(`/api/classrooms/${classId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "ended" }),
                });
                if (!patch.ok) {
                    const data = await patch.json().catch(() => ({}));
                    throw new Error(data.error || "Could not end class");
                }
            }
            router.push("/dashboard/tutor");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not end class");
        } finally {
            setBusy(false);
        }
    };

    const goLive = async () => {
        setBusy(true);
        setError("");
        try {
            const res = await fetch(`/api/classrooms/${classId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "live" }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not go live");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not go live");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-bold text-gray-900">Host controls</p>
                    <p className="text-xs font-medium text-gray-500">
                        End the session, or go back to schedule another class.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        href="/dashboard/tutor"
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:border-gray-300"
                    >
                        New class
                    </Link>
                    {status === "scheduled" && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => void goLive()}
                            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            Go live
                        </button>
                    )}
                    {["scheduled", "live"].includes(status) && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => void endClass()}
                            className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black disabled:opacity-50"
                        >
                            {busy ? "Ending…" : "End class"}
                        </button>
                    )}
                </div>
            </div>
            {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
        </div>
    );
}
