"use client";

import { useCallback, useEffect, useState } from "react";

type AttendanceRow = {
    user_id: string | null;
    display_name: string;
    role: string;
    first_joined_at: string;
    last_seen_at: string;
    sessions: number;
    total_seconds: number;
};

function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
}

/** Host-facing attendance rollup: who joined, how long, how many times. */
export default function AttendancePanel({ classId }: { classId: string }) {
    const [rows, setRows] = useState<AttendanceRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        try {
            const res = await fetch(`/api/classrooms/${classId}/attendance`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load attendance");
            setRows(data.attendance ?? []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load attendance");
        } finally {
            setLoading(false);
        }
    }, [classId]);

    useEffect(() => {
        void load();
        const t = setInterval(() => void load(), 15000);
        return () => clearInterval(t);
    }, [load]);

    const students = rows.filter((r) => r.role === "student");

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Attendance</h2>
                <button
                    type="button"
                    onClick={() => void load()}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                    Refresh
                </button>
            </div>
            <p className="mt-1 text-xs font-medium text-gray-400">
                Recorded from real join/leave events · {students.length} attendee
                {students.length === 1 ? "" : "s"}
            </p>

            {loading ? (
                <p className="mt-4 text-sm font-medium text-gray-500">Loading…</p>
            ) : error ? (
                <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
            ) : students.length === 0 ? (
                <p className="mt-4 text-sm font-medium text-gray-500">No attendance recorded yet.</p>
            ) : (
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                <th className="pb-2 pr-4">Student</th>
                                <th className="pb-2 pr-4">First joined</th>
                                <th className="pb-2 pr-4">Time in class</th>
                                <th className="pb-2">Joins</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((r) => (
                                <tr key={r.user_id ?? r.display_name}>
                                    <td className="py-2 pr-4 font-semibold text-gray-900">
                                        {r.display_name}
                                    </td>
                                    <td className="py-2 pr-4 text-gray-500">
                                        {new Date(r.first_joined_at).toLocaleTimeString()}
                                    </td>
                                    <td className="py-2 pr-4 text-gray-700">
                                        {formatDuration(r.total_seconds)}
                                    </td>
                                    <td className="py-2 text-gray-700">{r.sessions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
