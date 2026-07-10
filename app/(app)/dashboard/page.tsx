"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck, Plus, Award } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import StatusBadge from "@/components/admin/StatusBadge";
import { useAuth } from "@/components/AuthContext";
import type { Booking } from "@/lib/types";
import type { MicroCertificate } from "@/lib/credentials/types";

export default function DashboardPage() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [fetching, setFetching] = useState(true);
    const [tutorSlug, setTutorSlug] = useState<string | null>(null);
    const [tutorStatus, setTutorStatus] = useState<string | null>(null);
    const [certificates, setCertificates] = useState<MicroCertificate[]>([]);
    const [ossPoints, setOssPoints] = useState({ total: 0, completed: 0, max: 0 });

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.replace("/?auth=login");
            return;
        }

        let active = true;

        (async () => {
            const [bookingsRes, tutorRes, certsRes, pointsRes] = await Promise.all([
                fetch("/api/bookings"),
                fetch("/api/tutors/me"),
                fetch("/api/certificates"),
                fetch("/api/integrations/points"),
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
            if (active && certsRes.ok) {
                const data = await certsRes.json();
                setCertificates(data.certificates ?? []);
            }
            if (active && pointsRes.ok) {
                const data = await pointsRes.json();
                setOssPoints({
                    total: data.totalPoints ?? 0,
                    completed: data.completedCount ?? 0,
                    max: data.maxPoints ?? 0,
                });
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
                title="Learning & Bookings"
                subtitle="Track micro-certificates, tutor profile, and scheduled sessions."
            />
            <SectionShell compact>
                <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Open Source Points</h3>
                        <Link href="/opensource" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                            Integrate tools →
                        </Link>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-amber-600">{ossPoints.total}</span>
                        <span className="text-sm text-gray-400 font-medium">
                            / {ossPoints.max} pts · {ossPoints.completed} integrations
                        </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#10B981] rounded-full transition-all"
                            style={{ width: ossPoints.max ? `${(ossPoints.total / ossPoints.max) * 100}%` : "0%" }}
                        />
                    </div>
                </div>

                <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" /> Micro-Certificates
                        </h3>
                        <Link
                            href="/credentials"
                            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                            Browse challenges →
                        </Link>
                    </div>
                    {fetching ? (
                        <div className="h-12 rounded-lg bg-gray-50 animate-pulse" />
                    ) : certificates.length === 0 ? (
                        <p className="text-sm text-gray-500 font-medium">
                            No credentials yet.{" "}
                            <Link href="/credentials" className="text-emerald-600 font-semibold hover:underline">
                                Push your first commit
                            </Link>{" "}
                            to earn a free verified micro-certificate.
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {certificates.slice(0, 3).map((c) => (
                                <li key={c.id}>
                                    <Link
                                        href={`/verify/${c.verificationCode}`}
                                        className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:border-emerald-200 text-sm"
                                    >
                                        <span className="font-semibold text-gray-900">{c.title}</span>
                                        <span className="text-xs font-mono text-emerald-600">{c.verificationCode}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    {certificates.length > 3 && (
                        <Link href="/my-credentials" className="block text-center text-sm font-semibold text-gray-500 mt-3">
                            View all {certificates.length} credentials
                        </Link>
                    )}
                </div>

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
