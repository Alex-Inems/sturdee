"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Booking, BookingStatus } from "@/lib/types";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const fetchBookings = useCallback(async () => {
        setRefreshing(true);
        try {
            const res = await fetch("/api/admin/bookings");
            if (res.ok) {
                const data = await res.json();
                setBookings(data.bookings);
            }
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        (async () => {
            const res = await fetch("/api/admin/bookings");
            if (active && res.ok) {
                const data = await res.json();
                setBookings(data.bookings);
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    const updateStatus = async (id: string, status: BookingStatus) => {
        const res = await fetch("/api/admin/bookings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        if (res.ok) fetchBookings();
    };

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return bookings;
        return bookings.filter(
            (b) =>
                b.userName.toLowerCase().includes(q) ||
                b.userEmail.toLowerCase().includes(q) ||
                b.service.toLowerCase().includes(q) ||
                b.status.toLowerCase().includes(q)
        );
    }, [bookings, search]);

    return (
        <>
            <AdminHeader
                title="Database · Bookings"
                description="All session bookings across the platform"
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Filter bookings..."
                onRefresh={fetchBookings}
                refreshing={refreshing}
            />
            <main className="p-6">
                <DataTable
                    data={filtered}
                    rowKey={(b) => b.id}
                    columns={[
                        {
                            key: "id",
                            header: "ID",
                            className: "font-mono text-[11px] text-gray-400",
                            render: (b) => b.id.slice(0, 8) + "...",
                        },
                        {
                            key: "user",
                            header: "User",
                            render: (b) => (
                                <div>
                                    <p className="font-medium text-gray-900">{b.userName}</p>
                                    <p className="text-[11px] text-gray-400">{b.userEmail}</p>
                                </div>
                            ),
                        },
                        {
                            key: "service",
                            header: "Service",
                            render: (b) => b.service,
                        },
                        {
                            key: "datetime",
                            header: "Date & Time",
                            render: (b) => (
                                <div>
                                    <p>{new Date(b.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                                    <p className="text-[11px] text-gray-400">{b.time}</p>
                                </div>
                            ),
                        },
                        {
                            key: "status",
                            header: "Status",
                            render: (b) => <StatusBadge status={b.status} />,
                        },
                        {
                            key: "actions",
                            header: "Actions",
                            render: (b) => (
                                <select
                                    value={b.status}
                                    onChange={(e) => updateStatus(b.id, e.target.value as BookingStatus)}
                                    className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[12px] text-gray-700 focus:border-emerald-500 focus:outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            ),
                        },
                    ]}
                />
            </main>
        </>
    );
}
