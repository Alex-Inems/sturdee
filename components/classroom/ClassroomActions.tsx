"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";

type Props = {
    classId: string;
    slug: string;
    status: string;
    meetUrl: string;
    enrolledCount: number;
    capacity: number;
    isHost: boolean;
    initiallyEnrolled: boolean;
};

export default function ClassroomActions({
    classId,
    slug,
    status,
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

    const full = enrolledCount >= capacity;

    const enroll = async () => {
        setBusy(true);
        setError("");
        try {
            if (!isAuthenticated) {
                ensureAuth();
                await signInWithGoogle("student", `/classroom/${slug}`);
                return;
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
                ensureAuth();
                await signInWithGoogle("student", `/classroom/${slug}`);
                return;
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
                        {full ? "Class full" : "Enroll in class"}
                    </button>
                )}

                {(isHost || enrolled) && meetUrl && ["scheduled", "live"].includes(status) && (
                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => void enterMeet()}
                        className="px-7 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-full"
                    >
                        {status === "live" ? "Join Google Meet" : "Enter Meet room"}
                    </button>
                )}

                {(isHost || enrolled) && !meetUrl && (
                    <p className="text-sm text-amber-700 font-medium">
                        Waiting for the host to add a Google Meet link.
                    </p>
                )}
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </div>
    );
}
