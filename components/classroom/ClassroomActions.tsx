"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { isClassroomGuestAllowed } from "@/lib/classroom-guest-flags";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";

type Props = {
    classId: string;
    slug: string;
    status: string;
    provider: "livekit" | "meet";
    meetUrl: string;
    enrolledCount: number;
    capacity: number;
    isHost: boolean;
    initiallyEnrolled: boolean;
};

async function ensureGuestStudent() {
    const res = await fetch("/api/classrooms/guest/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "student", name: "Dev Student" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not start guest student session");
}

export default function ClassroomActions({
    classId,
    slug,
    status,
    provider,
    meetUrl,
    enrolledCount,
    capacity,
    isHost,
    initiallyEnrolled,
}: Props) {
    const { isAuthenticated, ensureAuth, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [enrolled, setEnrolled] = useState(initiallyEnrolled);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const guestMode = isClassroomGuestAllowed();

    const full = enrolledCount >= capacity;

    const enroll = async () => {
        setBusy(true);
        setError("");
        try {
            if (!isAuthenticated) {
                if (guestMode) {
                    await ensureGuestStudent();
                } else {
                    ensureAuth();
                    await signInWithGoogle("student", `/classroom/${slug}`);
                    return;
                }
            }
            const res = await fetch(`/api/classrooms/${classId}/enroll`, { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not enroll");
            setEnrolled(true);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not enroll");
        } finally {
            setBusy(false);
        }
    };

    const enterMeet = async () => {
        setBusy(true);
        setError("");
        try {
            if (!isAuthenticated) {
                if (guestMode) {
                    await ensureGuestStudent();
                } else {
                    ensureAuth();
                    await signInWithGoogle("student", `/classroom/${slug}`);
                    return;
                }
            }
            const res = await fetch(`/api/classrooms/${classId}/join`, { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not join");
            window.open(data.meetUrl, "_blank", "noopener,noreferrer");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not join");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="space-y-4">
            {guestMode && !isAuthenticated && (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                    Dev mode: enroll works without login (guest student).
                </p>
            )}

            <p className="text-sm font-medium text-gray-500">
                {enrolledCount} / {capacity || MAX_CLASS_CAPACITY} seats filled
                {full && !enrolled && !isHost ? " — class is full" : ""}
            </p>

            <div className="flex flex-wrap gap-3">
                {!isHost && !enrolled && ["scheduled", "live"].includes(status) && (
                    <button
                        type="button"
                        disabled={busy || full}
                        onClick={() => void enroll()}
                        className="px-7 py-3 bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-50 text-white font-semibold text-sm rounded-full"
                    >
                        {full ? "Class full" : guestMode && !isAuthenticated ? "Enroll as guest" : "Enroll in class"}
                    </button>
                )}

                {provider === "meet" &&
                    (isHost || enrolled) &&
                    meetUrl &&
                    ["scheduled", "live"].includes(status) && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => void enterMeet()}
                            className="px-7 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-full"
                        >
                            {status === "live" ? "Join Google Meet" : "Enter Meet room"}
                        </button>
                    )}

                {provider === "meet" && (isHost || enrolled) && !meetUrl && (
                    <p className="text-sm text-amber-700 font-medium">
                        Waiting for the host to add a Google Meet link.
                    </p>
                )}

                {provider === "livekit" && enrolled && !["scheduled", "live"].includes(status) && (
                    <p className="text-sm text-gray-500 font-medium">
                        You&apos;re enrolled. The live room opens here when the class starts.
                    </p>
                )}
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </div>
    );
}
