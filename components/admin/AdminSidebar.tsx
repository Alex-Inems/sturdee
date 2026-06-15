"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    ChevronLeft,
    Database,
    Settings,
    LogOut,
} from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
];

const secondaryItems = [
    { label: "Database", href: "/admin", icon: Database, disabled: true },
    { label: "Settings", href: "/admin", icon: Settings, disabled: true },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r border-gray-200 bg-[#fafafa]">
            <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10B981] text-xs font-bold text-white">
                    S
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">Sturdee</p>
                    <p className="truncate text-[11px] text-gray-500">Admin Dashboard</p>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Project
                </p>
                <ul className="space-y-0.5">
                    {navItems.map(({ label, href, icon: Icon }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
                                    isActive(href)
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="mb-2 mt-6 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Configuration
                </p>
                <ul className="space-y-0.5">
                    {secondaryItems.map(({ label, icon: Icon, disabled }) => (
                        <li key={label}>
                            <span
                                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium ${
                                    disabled
                                        ? "cursor-not-allowed text-gray-300"
                                        : "text-gray-600"
                                }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {label}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t border-gray-200 p-3">
                <div className="mb-2 rounded-md bg-white px-3 py-2 border border-gray-200">
                    <p className="truncate text-xs font-semibold text-gray-900">{user?.name}</p>
                    <p className="truncate text-[11px] text-gray-500">{user?.email}</p>
                </div>
                <Link
                    href="/"
                    className="mb-1 flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to site
                </Link>
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[13px] font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut className="h-4 w-4" />
                    Sign out
                </button>
            </div>
        </aside>
    );
}
