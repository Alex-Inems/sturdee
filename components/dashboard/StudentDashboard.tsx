"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { useAuth } from "@/components/AuthContext";
import { isTutorRole } from "@/lib/types";

type Enrollment = {
    id: string;
    joined_at: string | null;
    live_classes: {
        id: string;
        title: string;
        slug: string;
        topic: string;
        starts_at: string;
        status: string;
        host_name: string;
    } | null;
};

type OpenClass = {
    id: string;
    title: string;
    slug: string;
    topic: string;
    starts_at: string;
    status: string;
    enrolled_count: number;
    capacity: number;
    host_name: string;
};

export default function StudentDashboard() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [openClasses, setOpenClasses] = useState<OpenClass[]>([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.replace("/?auth=login");
            return;
        }
        if (user && isTutorRole(user.role)) {
            router.replace("/dashboard/tutor");
            return;
        }

        let active = true;
        (async () => {
            const [enrollRes, classesRes] = await Promise.all([
                fetch("/api/classrooms/enrollments/me"),
                fetch("/api/classrooms"),
            ]);
            if (active && enrollRes.ok) {
                const data = await enrollRes.json();
                setEnrollments(data.enrollments ?? []);
            }
            if (active && classesRes.ok) {
                const data = await classesRes.json();
                setOpenClasses(data.classes ?? []);
            }
            if (active) setFetching(false);
        })();

        return () => {
            active = false;
        };
    }, [loading, isAuthenticated, user, router]);

    if (loading || fetching) {
        return (
            <div className="font-jakarta bg-page min-h-screen">
                <PageHero highlight="Student" title="Your dashboard" subtitle="Loading your classes…" />
            </div>
        );
    }

    const enrolledIds = new Set(enrollments.map((e) => e.live_classes?.id).filter(Boolean));

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Student"
                title={`Hi, ${user?.name?.split(" ")[0] || "there"}`}
                subtitle="Register for a skill cohort and join live classroom classes."
            />
            <SectionShell compact>
                <section className="mb-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-6 py-6 sm:px-8">
                    <h2 className="text-xl font-bold text-gray-900">Learn a skill in a cohort</h2>
                    <p className="mt-2 text-sm text-gray-600 font-medium max-w-2xl">
                        Register with your goals — we&apos;ll assign you to an available batch and tutor.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            href="/skills"
                            className="rounded-full bg-[#10B981] hover:bg-[#0F9F72] px-5 py-2.5 text-sm font-semibold text-white"
                        >
                            Browse skills
                        </Link>
                        <Link
                            href="/book"
                            className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-300"
                        >
                            Register to learn
                        </Link>
                    </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-10">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">My classes</h2>
                        {enrollments.length === 0 ? (
                            <p className="text-sm text-gray-500 font-medium">
                                You haven&apos;t enrolled in a class yet.{" "}
                                <Link href="/classroom" className="text-emerald-700 font-semibold">
                                    Browse classroom
                                </Link>
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {enrollments.map((e) => {
                                    const c = e.live_classes;
                                    if (!c) return null;
                                    return (
                                        <li key={e.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                                            <Link
                                                href={`/classroom/${c.slug}`}
                                                className="font-bold text-gray-900 hover:text-emerald-700"
                                            >
                                                {c.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 font-medium mt-1">
                                                {new Date(c.starts_at).toLocaleString()} · {c.host_name} · {c.status}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Open sessions</h2>
                            <Link href="/classroom" className="text-sm font-semibold text-emerald-700">
                                View all
                            </Link>
                        </div>
                        {openClasses.filter((c) => !enrolledIds.has(c.id)).length === 0 ? (
                            <p className="text-sm text-gray-500 font-medium">No new sessions right now.</p>
                        ) : (
                            <ul className="space-y-3">
                                {openClasses
                                    .filter((c) => !enrolledIds.has(c.id))
                                    .slice(0, 6)
                                    .map((c) => (
                                        <li key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                                            <Link
                                                href={`/classroom/${c.slug}`}
                                                className="font-bold text-gray-900 hover:text-emerald-700"
                                            >
                                                {c.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 font-medium mt-1">
                                                {new Date(c.starts_at).toLocaleString()} · {c.enrolled_count}/
                                                {c.capacity} seats
                                            </p>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </section>
                </div>
            </SectionShell>
        </div>
    );
}
