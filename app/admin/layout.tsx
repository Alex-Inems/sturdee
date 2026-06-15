"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAuthenticated, refreshUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated || user?.role !== "admin") {
            router.replace("/");
            return;
        }
        void refreshUser();
    }, [loading, isAuthenticated, user?.role, router, refreshUser]);

    if (loading || !isAuthenticated || user?.role !== "admin") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fafafa] font-jakarta">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                    <p className="text-sm text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] font-jakarta">
            <AdminSidebar />
            <div className="pl-[240px]">{children}</div>
        </div>
    );
}
