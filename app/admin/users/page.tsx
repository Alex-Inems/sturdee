"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import type { PublicUser } from "@/lib/types";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<PublicUser[]>([]);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const fetchUsers = useCallback(async () => {
        setRefreshing(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
            }
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        (async () => {
            const res = await fetch("/api/admin/users");
            if (active && res.ok) {
                const data = await res.json();
                setUsers(data.users);
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return users;
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.role.toLowerCase().includes(q)
        );
    }, [users, search]);

    return (
        <>
            <AdminHeader
                title="Authentication · Users"
                description="All registered platform users"
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Filter users..."
                onRefresh={fetchUsers}
                refreshing={refreshing}
            />
            <main className="p-6">
                <DataTable
                    data={filtered}
                    rowKey={(u) => u.id}
                    columns={[
                        {
                            key: "id",
                            header: "UID",
                            className: "font-mono text-[11px] text-gray-400",
                            render: (u) => u.id.slice(0, 8) + "...",
                        },
                        {
                            key: "name",
                            header: "Name",
                            render: (u) => <span className="font-medium text-gray-900">{u.name}</span>,
                        },
                        {
                            key: "email",
                            header: "Email",
                            render: (u) => u.email,
                        },
                        {
                            key: "role",
                            header: "Role",
                            render: (u) => (
                                <span
                                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${
                                        u.role === "admin"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {u.role}
                                </span>
                            ),
                        },
                        {
                            key: "created",
                            header: "Created",
                            render: (u) =>
                                new Date(u.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }),
                        },
                    ]}
                />
            </main>
        </>
    );
}
