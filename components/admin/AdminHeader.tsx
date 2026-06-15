"use client";

import { RefreshCw, Search } from "lucide-react";

interface AdminHeaderProps {
    title: string;
    description?: string;
    onRefresh?: () => void;
    refreshing?: boolean;
    search?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
}

export default function AdminHeader({
    title,
    description,
    onRefresh,
    refreshing,
    search,
    onSearchChange,
    searchPlaceholder = "Search...",
}: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
            <div className="flex h-14 items-center justify-between px-6">
                <div>
                    <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
                    {description && (
                        <p className="text-[12px] text-gray-500">{description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {onSearchChange !== undefined && (
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="h-8 w-56 rounded-md border border-gray-200 bg-gray-50 pl-8 pr-3 text-[13px] text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    )}
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            disabled={refreshing}
                            className="flex h-8 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 text-[12px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                            Refresh
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
