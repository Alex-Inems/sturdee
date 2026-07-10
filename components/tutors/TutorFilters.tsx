"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { TUTOR_CATEGORIES } from "@/lib/tutors";

export interface TutorFiltersState {
    query: string;
    category: string;
    minRate: number;
    maxRate: number;
    minJobSuccess: number;
    availability: string;
    badge: string;
    sort: "recommended" | "rate-low" | "rate-high" | "success" | "reviews";
}

export const defaultFilters: TutorFiltersState = {
    query: "",
    category: "",
    minRate: 0,
    maxRate: 200,
    minJobSuccess: 0,
    availability: "",
    badge: "",
    sort: "recommended",
};

interface TutorFiltersProps {
    filters: TutorFiltersState;
    onChange: (filters: TutorFiltersState) => void;
    resultCount: number;
    mobileOpen: boolean;
    onMobileToggle: () => void;
}

export default function TutorFilters({
    filters,
    onChange,
    resultCount,
    mobileOpen,
    onMobileToggle,
}: TutorFiltersProps) {
    const update = (patch: Partial<TutorFiltersState>) => onChange({ ...filters, ...patch });

    const clearAll = () => onChange(defaultFilters);

    const hasActiveFilters =
        filters.category ||
        filters.minRate > 0 ||
        filters.maxRate < 200 ||
        filters.minJobSuccess > 0 ||
        filters.availability ||
        filters.badge;

    const panel = (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Filters</h2>
                {hasActiveFilters && (
                    <button type="button" onClick={clearAll} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                        Clear all
                    </button>
                )}
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Category</label>
                <select
                    value={filters.category}
                    onChange={(e) => update({ category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                >
                    <option value="">All categories</option>
                    {TUTOR_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                    Hourly rate: ${filters.minRate} – ${filters.maxRate}
                </label>
                <div className="space-y-2">
                    <input
                        type="range"
                        min={0}
                        max={150}
                        step={5}
                        value={filters.minRate}
                        onChange={(e) => update({ minRate: Number(e.target.value) })}
                        className="w-full accent-emerald-600"
                    />
                    <input
                        type="range"
                        min={50}
                        max={200}
                        step={5}
                        value={filters.maxRate}
                        onChange={(e) => update({ maxRate: Number(e.target.value) })}
                        className="w-full accent-emerald-600"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                    Job success: {filters.minJobSuccess}%+
                </label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={filters.minJobSuccess}
                    onChange={(e) => update({ minJobSuccess: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Availability</label>
                <div className="space-y-2">
                    {["", "Available now", "Limited availability"].map((opt) => (
                        <label key={opt || "all"} className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
                            <input
                                type="radio"
                                name="availability"
                                checked={filters.availability === opt}
                                onChange={() => update({ availability: opt })}
                                className="accent-emerald-600"
                            />
                            {opt || "Any"}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Talent badge</label>
                <div className="space-y-2">
                    {["", "Top Tutor", "Rising Talent", "Expert-Vetted"].map((opt) => (
                        <label key={opt || "all"} className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
                            <input
                                type="radio"
                                name="badge"
                                checked={filters.badge === opt}
                                onChange={() => update({ badge: opt })}
                                className="accent-emerald-600"
                            />
                            {opt || "Any"}
                        </label>
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">
                {resultCount} tutor{resultCount !== 1 ? "s" : ""} found
            </p>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={onMobileToggle}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 mb-4"
            >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
            </button>

            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={onMobileToggle}>
                    <div
                        className="absolute right-0 top-0 bottom-0 w-[min(100%,320px)] bg-white p-6 overflow-y-auto shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-4">
                            <button type="button" onClick={onMobileToggle} aria-label="Close filters">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        {panel}
                    </div>
                </div>
            )}

            <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    {panel}
                </div>
            </aside>
        </>
    );
}
