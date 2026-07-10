"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck, Plus } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import StatusBadge from "@/components/admin/StatusBadge";
import { useAuth } from "@/components/AuthContext";
import type { Booking } from "@/lib/types";

export default function DashboardPage() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [fetching, setFetching] = useState(true);
    const [tutorSlug, setTutorSlug] = useState<string | null>(null);
    const [tutorStatus, setTutorStatus] = useState<string | null>(null);

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.replace("/?auth=login");
            return;
        }

        let active = true;

        (async () => {
            const [bookingsRes, tutorRes] = await Promise.all([
                fetch("/api/bookings"),
                fetch("/api/tutors/me"),
            ]);
            if (active && bookingsRes.ok) {
                const data = await bookingsRes.json();
                setBookings(data.bookings);
            }
            if (active && tutorRes.ok) {
                const data = await tutorRes.json();
                if (data.profile) {
                    setTutorSlug(data.profile.slug);
                    setTutorStatus(data.profile.status);
                }
            }
            if (active) setFetching(false);
        })();

        return () => {
            active = false;
        };
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="font-jakarta bg-page min-h-screen">
                <PageHero
                    highlight="My Dashboard"
                    title="Your Bookings"
                    subtitle="Track and manage all your scheduled sessions in one place."
                />
                <SectionShell compact>
                    <div className="space-y-4 animate-pulse">
                        <div className="h-10 w-48 rounded-lg bg-gray-100" />
                        <div className="h-24 rounded-2xl bg-gray-50" />
                        <div className="h-24 rounded-2xl bg-gray-50" />
                    </div>
                </SectionShell>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="My Dashboard"
                title="Your Bookings"
                subtitle="Track and manage all your scheduled sessions in one place."
            />
            <SectionShell compact>
                <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-gray-900">Sturdee Tutor Profile</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {tutorStatus === "published"
                                ? "Your profile is live in the tutors marketplace."
                                : tutorSlug
                                  ? "Finish onboarding to publish your tutor profile."
                                  : "Register as a tutor and earn from 1:1 sessions."}
                        </p>
                    </div>
                    <Link
                        href={
                            tutorStatus === "published"
                                ? `/tutors/${tutorSlug}`
                                : tutorSlug
                                  ? "/tutors/register"
                                  : "/tutors/register"
                        }
                        className="shrink-0 px-5 py-2.5 border border-emerald-200 text-emerald-700 font-semibold rounded-full text-sm hover:bg-emerald-50"
                    >
                        {tutorStatus === "published" ? "View public profile" : "Become a tutor"}
                    </Link>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500 font-medium">
                        {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
                    </p>
                    <Link
                        href="/book"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all"
                    >
                        <Plus className="h-4 w-4" /> New Booking
                    </Link>
                </div>

                {fetching ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-24 rounded-2xl bg-gray-50" />
                        <div className="h-24 rounded-2xl bg-gray-50" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-xl">
                        <CalendarCheck className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No bookings yet</h3>
                        <p className="text-gray-500 text-sm mt-2 mb-6">Schedule your first session to get started.</p>
                        <Link
                            href="/book"
                            className="inline-flex px-6 py-3 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                        >
                            Book a Session
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((b) => (
                            <div
                                key={b.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl hover:translate-y-[-1px] transition-all"
                            >
                                <div>
                                    <p className="font-bold text-gray-900">{b.service}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(b.date + "T00:00:00").toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}{" "}
                                        at {b.time}
                                    </p>
                                    {b.notes && (
                                        <p className="text-xs text-gray-400 mt-2 italic">&quot;{b.notes}&quot;</p>
                                    )}
                                </div>
                                <StatusBadge status={b.status} />
                            </div>
                        ))}
                    </div>
                )}
            </SectionShell>
        </div>
    );
}
