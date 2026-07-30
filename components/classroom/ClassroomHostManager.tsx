"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";
import { useAuth } from "@/components/AuthContext";

type HostClass = {
    id: string;
    title: string;
    slug: string;
    topic: string;
    provider?: "livekit" | "meet";
    meet_url: string;
    starts_at: string;
    capacity: number;
    status: string;
    enrolled_count: number;
};

function toLocalInputValue(d: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ClassroomHostManager({ guestMode = false }: { guestMode?: boolean }) {
    const { isAuthenticated, loading, signInWithGoogleMeet, ensureAuth, user } = useAuth();
    const [classes, setClasses] = useState<HostClass[]>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [startsAt, setStartsAt] = useState(() => toLocalInputValue(new Date(Date.now() + 60 * 60 * 1000)));
    const [capacity, setCapacity] = useState(MAX_CLASS_CAPACITY);
    const [meetUrl, setMeetUrl] = useState("");
    const [generateMeet, setGenerateMeet] = useState(true);

    const canHost =
        guestMode ||
        (isAuthenticated && user && (user.role === "tutor" || user.role === "admin"));

    const load = useCallback(async () => {
        const res = await fetch("/api/classrooms/me");
        if (!res.ok) return;
        const data = await res.json();
        setClasses(data.classes ?? []);
    }, []);

    useEffect(() => {
        if (canHost) void load();
    }, [canHost, load]);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    };

    const createClass = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        setMessage("");
        try {
            const res = await fetch("/api/classrooms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    topic,
                    description,
                    startsAt: new Date(startsAt).toISOString(),
                    capacity,
                    provider: "meet",
                    meetUrl: !generateMeet ? meetUrl || undefined : undefined,
                    generateMeet,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.code === "MEET_AUTH_REQUIRED") {
                    setError(data.error);
                    return;
                }
                throw new Error(data.error || "Failed to create class");
            }
            setMessage(`Created “${data.class?.title ?? title}”. Open it below, or schedule another.`);
            setTitle("");
            setTopic("");
            setDescription("");
            setMeetUrl("");
            setStartsAt(toLocalInputValue(new Date(Date.now() + 60 * 60 * 1000)));
            await load();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create class");
        } finally {
            setBusy(false);
        }
    };

    const setStatus = async (id: string, status: string, classProvider?: "livekit" | "meet") => {
        setBusy(true);
        setError("");
        try {
            if (status === "ended" && classProvider === "livekit") {
                // Tear down LiveKit room so anyone still connected is kicked.
                const mod = await fetch(`/api/classrooms/${id}/moderate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "end" }),
                });
                if (!mod.ok) {
                    const res = await fetch(`/api/classrooms/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: "ended" }),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || "Update failed");
                }
            } else {
                const res = await fetch(`/api/classrooms/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Update failed");
            }
            await load();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Update failed");
        } finally {
            setBusy(false);
        }
    };

    if (loading && !guestMode) {
        return <p className="text-gray-500 font-medium">Loading…</p>;
    }

    if (!canHost) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 max-w-lg">
                <h2 className="text-xl font-bold text-gray-900">Tutor access only</h2>
                <p className="mt-2 text-gray-500 font-medium text-sm leading-relaxed">
                    Sign in as a tutor to schedule classes for up to {MAX_CLASS_CAPACITY} students.
                </p>
                <button
                    type="button"
                    onClick={() => {
                        ensureAuth();
                        void signInWithGoogleMeet("/dashboard/tutor");
                    }}
                    className="mt-6 px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-sm rounded-full"
                >
                    Sign in as tutor with Google
                </button>
            </div>
        );
    }

    const active = classes.filter((c) => ["scheduled", "live", "draft"].includes(c.status));
    const past = classes.filter((c) => ["ended", "cancelled"].includes(c.status));

    return (
        <div className="space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Your classes</h2>
                    <p className="text-sm font-medium text-gray-500">
                        Open a room, end a session, or schedule another class anytime.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={scrollToForm}
                    className="rounded-full bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F9F72]"
                >
                    + New class
                </button>
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            {message && <p className="text-sm font-medium text-emerald-700">{message}</p>}

            {active.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-10 text-center">
                    <p className="text-sm font-medium text-gray-600">No active classes yet.</p>
                    <button
                        type="button"
                        onClick={scrollToForm}
                        className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                        Schedule your first class ↓
                    </button>
                </div>
            ) : (
                <ul className="space-y-3">
                    {active.map((c) => {
                        const provider = c.provider ?? "meet";
                        return (
                            <li key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {c.status === "live" ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
                                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                                                    Live
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                                    {c.status}
                                                </span>
                                            )}
                                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                                                {provider === "livekit" ? "Sturdee Classroom" : "Google Meet"}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/classroom/${c.slug}`}
                                            className="mt-1 block truncate text-lg font-bold text-gray-900 hover:text-emerald-700"
                                        >
                                            {c.title}
                                        </Link>
                                        <p className="mt-1 text-xs font-medium text-gray-500">
                                            {new Date(c.starts_at).toLocaleString()} · {c.enrolled_count}/
                                            {c.capacity} enrolled
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={`/classroom/${c.slug}`}
                                            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                                        >
                                            {provider === "livekit" ? "Open room" : "Open class"}
                                        </Link>
                                        {c.status === "scheduled" && (
                                            <button
                                                type="button"
                                                disabled={busy}
                                                onClick={() => void setStatus(c.id, "live", provider)}
                                                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 hover:border-gray-300 disabled:opacity-50"
                                            >
                                                Go live
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            disabled={busy}
                                            onClick={() => void setStatus(c.id, "ended", provider)}
                                            className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black disabled:opacity-50"
                                        >
                                            End class
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {past.length > 0 && (
                <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-400">Past</h3>
                    <ul className="space-y-2">
                        {past.map((c) => (
                            <li
                                key={c.id}
                                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white/60 px-4 py-3"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">{c.title}</p>
                                    <p className="text-xs font-medium text-gray-400">
                                        {c.status} · {new Date(c.starts_at).toLocaleString()}
                                    </p>
                                </div>
                                <Link
                                    href={`/classroom/${c.slug}`}
                                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                                >
                                    View
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form
                id="new-class"
                ref={formRef}
                onSubmit={(e) => void createClass(e)}
                className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4"
            >
                <h2 className="text-xl font-bold text-gray-900">Schedule a new class</h2>
                <p className="text-sm text-gray-500 font-medium">
                    Opens enrollment for up to {MAX_CLASS_CAPACITY} students with live video, screen share,
                    chat and attendance tracking.
                </p>

                <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Title</span>
                    <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium"
                        placeholder="Intro to JavaScript live"
                    />
                </label>

                <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Topic</span>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium"
                        placeholder="JavaScript"
                    />
                </label>

                <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Description</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium"
                        placeholder="What students will learn in this session"
                    />
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Starts</span>
                        <input
                            required
                            type="datetime-local"
                            value={startsAt}
                            onChange={(e) => setStartsAt(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium"
                        />
                    </label>
                    <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Capacity (max {MAX_CLASS_CAPACITY})
                        </span>
                        <input
                            type="number"
                            min={1}
                            max={MAX_CLASS_CAPACITY}
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                            className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium"
                        />
                    </label>
                </div>

                <fieldset className="space-y-3 rounded-xl bg-gray-50 p-4">
                    <legend className="px-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Google Meet link
                    </legend>
                    <label className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <input
                            type="radio"
                            checked={generateMeet}
                            onChange={() => setGenerateMeet(true)}
                            className="mt-1"
                        />
                        <span>
                            Create a Meet link automatically
                            <span className="mt-0.5 block text-xs font-normal text-gray-400">
                                Requires Google sign-in with Meet permission
                            </span>
                        </span>
                    </label>
                    <label className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <input
                            type="radio"
                            checked={!generateMeet}
                            onChange={() => setGenerateMeet(false)}
                            className="mt-1"
                        />
                        <span>Paste an existing Meet link</span>
                    </label>
                    {!generateMeet && (
                        <input
                            value={meetUrl}
                            onChange={(e) => setMeetUrl(e.target.value)}
                            placeholder="https://meet.google.com/abc-defg-hij"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium"
                        />
                    )}
                    {generateMeet && (
                        <button
                            type="button"
                            onClick={() => void signInWithGoogleMeet("/dashboard/tutor")}
                            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                            Reconnect Google for Meet access →
                        </button>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-full bg-[#10B981] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0F9F72] disabled:opacity-60 sm:w-auto"
                >
                    {busy ? "Creating…" : "Create class"}
                </button>
            </form>
        </div>
    );
}
