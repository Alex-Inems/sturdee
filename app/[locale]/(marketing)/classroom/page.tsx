import type { Metadata } from "next";
import Link from "next/link";
import { assertFeatureEnabled } from "@/lib/features";
import { listOpenClasses } from "@/lib/classrooms-db";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = pageMetadata({
    title: "Live Classroom — Google Meet Classes for up to 100 Students",
    description:
        "Join live Sturdee classroom sessions over Google Meet. Enroll, enter the Meet room, and learn with up to 100 students in real time.",
    path: "/classroom",
    keywords: ["live coding class", "google meet classroom", "online coding class", "live tutorials"],
});

export const dynamic = "force-dynamic";

function formatWhen(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

export default async function ClassroomHubPage() {
    assertFeatureEnabled("classroom");
    const classes = await listOpenClasses().catch(() => []);

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Live Classroom"
                title="Learn together, live"
                subtitle={`Real-time Google Meet classes for up to ${MAX_CLASS_CAPACITY} students — enroll, join the Meet room, and learn together.`}
            />
            <SectionShell compact>
                <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">Upcoming & live sessions</h2>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/dashboard/tutor"
                            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                        >
                            Tutor dashboard
                        </Link>
                    </div>
                </div>

                {classes.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-14 text-center">
                        <p className="text-gray-600 font-medium">No live classes scheduled yet.</p>
                        <Link
                            href="/dashboard/tutor"
                            className="inline-flex mt-5 text-emerald-700 font-semibold text-sm hover:text-emerald-800"
                        >
                            Open tutor dashboard →
                        </Link>
                    </div>
                ) : (
                    <ul className="grid sm:grid-cols-2 gap-4">
                        {classes.map((c) => (
                            <li key={c.id}>
                                <Link
                                    href={`/classroom/${c.slug}`}
                                    className="block h-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-emerald-300 transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        {c.status === "live" ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wide">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                Live now
                                            </span>
                                        ) : (
                                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wide">
                                                Scheduled
                                            </span>
                                        )}
                                        {c.topic && (
                                            <span className="text-xs font-medium text-gray-400">{c.topic}</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500 font-medium line-clamp-2">
                                        {c.description || "Live Google Meet classroom session."}
                                    </p>
                                    <p className="mt-4 text-xs font-semibold text-gray-500">
                                        {formatWhen(c.starts_at)} · {c.host_name} · {c.enrolled_count}/
                                        {c.capacity} seats
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </SectionShell>
        </div>
    );
}
