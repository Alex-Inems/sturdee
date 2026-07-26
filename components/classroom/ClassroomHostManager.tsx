"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";
import { useAuth } from "@/components/AuthContext";

type HostClass = {
    id: string;
    title: string;
    slug: string;
    topic: string;
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

export default function ClassroomHostManager() {
    const { isAuthenticated, loading, signInWithGoogleMeet, ensureAuth, user } = useAuth();
    const [classes, setClasses] = useState<HostClass[]>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [startsAt, setStartsAt] = useState(() => toLocalInputValue(new Date(Date.now() + 60 * 60 * 1000)));
    const [capacity, setCapacity] = useState(MAX_CLASS_CAPACITY);
    const [meetUrl, setMeetUrl] = useState("");
    const [generateMeet, setGenerateMeet] = useState(true);

    const load = useCallback(async () => {
        const res = await fetch("/api/classrooms/me");
        if (!res.ok) return;
        const data = await res.json();
        setClasses(data.classes ?? []);
    }, []);

    useEffect(() => {
        if (isAuthenticated) load();
    }, [isAuthenticated, load]);

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
                    meetUrl: generateMeet ? undefined : meetUrl || undefined,
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
            setMessage("Class created.");
            setTitle("");
            setTopic("");
            setDescription("");
            setMeetUrl("");
            await load();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create class");
        } finally {
            setBusy(false);
        }
    };

    const setStatus = async (id: string, status: string) => {
        setBusy(true);
        setError("");
        try {
            const res = await fetch(`/api/classrooms/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");
            await load();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Update failed");
        } finally {
            setBusy(false);
        }
    };

    if (loading) {
        return <p className="text-gray-500 font-medium">Loading…</p>;
    }

    if (!isAuthenticated || (user && user.role !== "tutor" && user.role !== "admin")) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 max-w-lg">
                <h2 className="text-xl font-bold text-gray-900">Tutor access only</h2>
                <p className="mt-2 text-gray-500 font-medium text-sm leading-relaxed">
                    Sign in as a tutor to schedule Google Meet classes for up to {MAX_CLASS_CAPACITY} students.
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

    return (
        <div className="grid lg:grid-cols-2 gap-10">
            <form onSubmit={createClass} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Schedule a class</h2>
                <p className="text-sm text-gray-500 font-medium">
                    Creates a Google Meet room and opens enrollment for up to {MAX_CLASS_CAPACITY} students.
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

                <fieldset className="space-y-3 pt-2">
                    <legend className="text-xs font-bold uppercase tracking-wide text-gray-500">Google Meet</legend>
                    <label className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <input
                            type="radio"
                            checked={generateMeet}
                            onChange={() => setGenerateMeet(true)}
                            className="mt-1"
                        />
                        <span>
                            Create a Meet link automatically
                            <span className="block text-gray-400 font-normal text-xs mt-0.5">
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

                {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                {message && <p className="text-sm font-medium text-emerald-700">{message}</p>}

                <button
                    type="submit"
                    disabled={busy}
                    className="w-full sm:w-auto px-8 py-3 bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 text-white font-semibold text-sm rounded-full"
                >
                    {busy ? "Creating…" : "Create class"}
                </button>
            </form>

            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your classes</h2>
                {classes.length === 0 ? (
                    <p className="text-gray-500 font-medium text-sm">No classes yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {classes.map((c) => (
                            <li key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <Link
                                            href={`/classroom/${c.slug}`}
                                            className="font-bold text-gray-900 hover:text-emerald-700"
                                        >
                                            {c.title}
                                        </Link>
                                        <p className="text-xs text-gray-500 font-medium mt-1">
                                            {new Date(c.starts_at).toLocaleString()} · {c.enrolled_count}/
                                            {c.capacity} enrolled · {c.status}
                                        </p>
                                        {c.meet_url && (
                                            <a
                                                href={c.meet_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-semibold text-emerald-700 mt-2 inline-block"
                                            >
                                                Open Meet
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {c.status === "scheduled" && (
                                            <button
                                                type="button"
                                                disabled={busy}
                                                onClick={() => setStatus(c.id, "live")}
                                                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-600 text-white"
                                            >
                                                Go live
                                            </button>
                                        )}
                                        {c.status === "live" && (
                                            <button
                                                type="button"
                                                disabled={busy}
                                                onClick={() => setStatus(c.id, "ended")}
                                                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-800 text-white"
                                            >
                                                End class
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
