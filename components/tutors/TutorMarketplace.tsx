"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Loader2, UserPlus } from "lucide-react";
import type { Tutor } from "@/lib/tutors";
import { getAverageRating, getReviewCount } from "@/lib/tutors";
import TutorCard from "./TutorCard";
import TutorFilters, { defaultFilters, type TutorFiltersState } from "./TutorFilters";
import { useAuth } from "@/components/AuthContext";

function filterAndSortTutors(tutors: Tutor[], filters: TutorFiltersState): Tutor[] {
    let result = tutors.filter((t) => {
        const q = filters.query.toLowerCase();
        const matchesQuery =
            !q ||
            t.name.toLowerCase().includes(q) ||
            t.title.toLowerCase().includes(q) ||
            t.bio.toLowerCase().includes(q) ||
            t.skills.some((s) => s.name.toLowerCase().includes(q));

        const matchesCategory = !filters.category || t.categories.includes(filters.category);
        const matchesRate = t.hourlyRate >= filters.minRate && t.hourlyRate <= filters.maxRate;
        const matchesSuccess = t.jobSuccess >= filters.minJobSuccess;
        const matchesAvailability = !filters.availability || t.availability === filters.availability;
        const matchesBadge = !filters.badge || t.badge === filters.badge;

        return matchesQuery && matchesCategory && matchesRate && matchesSuccess && matchesAvailability && matchesBadge;
    });

    switch (filters.sort) {
        case "rate-low":
            result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
            break;
        case "rate-high":
            result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
            break;
        case "success":
            result = [...result].sort((a, b) => b.jobSuccess - a.jobSuccess);
            break;
        case "reviews":
            result = [...result].sort((a, b) => getReviewCount(b) - getReviewCount(a));
            break;
        default:
            result = [...result].sort((a, b) => {
                const scoreA = a.jobSuccess + getAverageRating(a) * 10 + (a.badge === "Top Tutor" ? 5 : 0);
                const scoreB = b.jobSuccess + getAverageRating(b) * 10 + (b.badge === "Top Tutor" ? 5 : 0);
                return scoreB - scoreA;
            });
    }

    return result;
}

export default function TutorMarketplace() {
    const { isAuthenticated } = useAuth();
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<TutorFiltersState>(defaultFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/tutors");
                const data = await res.json();
                if (res.ok) setTutors(data.tutors ?? []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = useMemo(() => filterAndSortTutors(tutors, filters), [tutors, filters]);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-16">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs">
                                    Sturdee Talent
                                </span>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find Expert Tutors</h1>
                            </div>
                            <p className="text-gray-500 font-medium max-w-2xl">
                                Real tutors on Sturdee — sign up, complete your profile, and get hired for 1:1 sessions.
                            </p>
                        </div>
                        <Link
                            href={isAuthenticated ? "/tutors/register" : "/?auth=login"}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full text-sm shrink-0 transition-colors"
                        >
                            <UserPlus className="w-4 h-4" />
                            Become a tutor
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search by skill, name, or keyword"
                                value={filters.query}
                                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 bg-white"
                            />
                        </div>
                        <select
                            value={filters.sort}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value as TutorFiltersState["sort"] })}
                            className="px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 min-w-[180px]"
                        >
                            <option value="recommended">Best match</option>
                            <option value="rate-low">Rate: low to high</option>
                            <option value="rate-high">Rate: high to low</option>
                            <option value="success">Job success</option>
                            <option value="reviews">Most reviews</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                    </div>
                ) : (
                    <div className="flex gap-8">
                        <TutorFilters
                            filters={filters}
                            onChange={setFilters}
                            resultCount={filtered.length}
                            mobileOpen={mobileFiltersOpen}
                            onMobileToggle={() => setMobileFiltersOpen((o) => !o)}
                        />

                        <main className="flex-1 min-w-0">
                            <p className="text-sm text-gray-500 font-medium mb-4">
                                Showing <span className="font-bold text-gray-900">{filtered.length}</span> tutor{filtered.length !== 1 ? "s" : ""}
                            </p>
                            <div className="space-y-4">
                                {filtered.length === 0 ? (
                                    <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                                        <p className="text-gray-500 font-medium mb-4">
                                            {tutors.length === 0
                                                ? "No tutors yet. Be the first to join Sturdee Talent!"
                                                : "No tutors match your filters."}
                                        </p>
                                        <Link
                                            href={isAuthenticated ? "/tutors/register" : "/?auth=login"}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            Become a tutor
                                        </Link>
                                    </div>
                                ) : (
                                    filtered.map((tutor) => <TutorCard key={tutor.slug} tutor={tutor} />)
                                )}
                            </div>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}
