"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Users, CalendarCheck, Clock, CheckCircle2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";

interface Stats {
    totalUsers: number;
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
}

export default function AdminOverviewPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = useCallback(async () => {
        setRefreshing(true);
        try {
            const res = await fetch("/api/admin/stats");
            if (res.ok) setStats(await res.json());
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        (async () => {
            const res = await fetch("/api/admin/stats");
            if (active && res.ok) {
                setStats(await res.json());
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    return (
        <>
            <AdminHeader
                title="Project Overview"
                description="Stwedy education platform metrics"
                onRefresh={fetchStats}
                refreshing={refreshing}
            />
            <main className="p-6">
                <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Total Users" value={stats?.totalUsers ?? "—"} icon={Users} accent="emerald" />
                    <StatCard label="Total Bookings" value={stats?.totalBookings ?? "—"} icon={CalendarCheck} accent="gray" />
                    <StatCard label="Pending" value={stats?.pendingBookings ?? "—"} icon={Clock} accent="amber" />
                    <StatCard label="Confirmed" value={stats?.confirmedBookings ?? "—"} icon={CheckCircle2} accent="emerald" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/admin/users"
                        className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-sm"
                    >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                            <Users className="h-5 w-5" />
                        </div>
                        <h2 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700">
                            Manage Users
                        </h2>
                        <p className="mt-1 text-[13px] text-gray-500">
                            View all registered users, roles, and sign-up dates.
                        </p>
                    </Link>
                    <Link
                        href="/admin/bookings"
                        className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-sm"
                    >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                            <CalendarCheck className="h-5 w-5" />
                        </div>
                        <h2 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700">
                            Manage Bookings
                        </h2>
                        <p className="mt-1 text-[13px] text-gray-500">
                            Review, confirm, or cancel all session bookings.
                        </p>
                    </Link>
                </div>

                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
                    <h3 className="text-[13px] font-semibold text-gray-900">Supabase setup</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
                        Run <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] text-emerald-700">supabase/migrations/001_initial_schema.sql</code> in your Supabase SQL Editor.
                        Enable Google under Authentication → Providers. Set redirect URL to{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] text-emerald-700">/auth/callback</code>.
                        Promote admins:{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] text-emerald-700">update profiles set role = &apos;admin&apos; where email = &apos;you@email.com&apos;;</code>
                    </p>
                </div>
            </main>
        </>
    );
}
