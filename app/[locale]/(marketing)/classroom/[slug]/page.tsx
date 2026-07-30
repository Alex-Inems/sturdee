import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getClassroomActor, isGuestClassroomActor } from "@/lib/auth";
import { getClassBySlug, isEnrolled } from "@/lib/classrooms-db";
import { assertFeatureEnabled } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";
import ClassroomActions from "@/components/classroom/ClassroomActions";
import LiveRoom from "@/components/classroom/LiveRoom";
import AttendancePanel from "@/components/classroom/AttendancePanel";
import HostClassToolbar from "@/components/classroom/HostClassToolbar";
import SectionShell from "@/components/SectionShell";

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const cls = await getClassBySlug(slug).catch(() => null);
    if (!cls) return { title: "Class not found" };
    return pageMetadata({
        title: `${cls.title} — Live Classroom`,
        description: cls.description || `Join ${cls.title} live on Google Meet with Sturdee.`,
        path: `/classroom/${slug}`,
    });
}

export default async function ClassroomDetailPage({ params }: Props) {
    assertFeatureEnabled("classroom");

    const { slug } = await params;
    const cls = await getClassBySlug(slug);
    if (!cls || ["draft", "cancelled"].includes(cls.status)) notFound();

    const session = await getClassroomActor();
    const guest = await isGuestClassroomActor();
    const isHost = session?.id === cls.host_user_id || session?.role === "admin";
    const enrolled = session
        ? await isEnrolled(cls.id, session.id, guest ? { bypassRls: true } : undefined)
        : false;

    const isNative = cls.provider === "livekit";
    const canJoinRoom = isNative && (isHost || enrolled) && ["scheduled", "live"].includes(cls.status);

    if (canJoinRoom) {
        return (
            <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
                <SectionShell compact className="!pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                            href="/classroom"
                            className="text-sm font-semibold text-gray-500 hover:text-gray-900"
                        >
                            ← All classes
                        </Link>
                        <div className="flex items-center gap-2">
                            {cls.status === "live" && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                                    Live now
                                </span>
                            )}
                            <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600">
                                {cls.enrolled_count} / {cls.capacity} enrolled
                            </span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {cls.title}
                        </h1>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                            Hosted by {cls.host_name}
                            {isHost ? " · You are the host" : ""}
                        </p>
                    </div>

                    {isHost && (
                        <div className="mt-6">
                            <HostClassToolbar classId={cls.id} status={cls.status} />
                        </div>
                    )}

                    <div className="mt-6">
                        <LiveRoom classId={cls.id} title={cls.title} isHost={isHost} />
                    </div>

                    {isHost && (
                        <div className="mt-8">
                            <AttendancePanel classId={cls.id} />
                        </div>
                    )}
                </SectionShell>
            </div>
        );
    }

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <SectionShell compact className="!pt-0">
                <Link href="/classroom" className="text-sm font-semibold text-gray-500 hover:text-gray-900">
                    ← All classes
                </Link>

                <div className="mt-8 grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            {cls.status === "live" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    Live now
                                </span>
                            )}
                            {cls.topic && (
                                <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-600">
                                    {cls.topic}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                            {cls.title}
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                            {cls.description ||
                                (isNative
                                    ? "A live Sturdee classroom session — video, screen share and chat, right here."
                                    : "A live Sturdee classroom session on Google Meet.")}
                        </p>

                        <dl className="mt-10 grid sm:grid-cols-2 gap-6 text-sm">
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Host</dt>
                                <dd className="mt-1 font-semibold text-gray-900">{cls.host_name}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Starts</dt>
                                <dd className="mt-1 font-semibold text-gray-900">
                                    {new Date(cls.starts_at).toLocaleString()}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Platform</dt>
                                <dd className="mt-1 font-semibold text-gray-900">
                                    {isNative ? "Sturdee Classroom" : "Google Meet"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Capacity</dt>
                                <dd className="mt-1 font-semibold text-gray-900">
                                    {cls.enrolled_count} / {cls.capacity} students
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">Classroom</h2>
                            <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">
                                {isNative
                                    ? "Enroll to reserve a seat. When the class is in session you'll join the live room right here on this page."
                                    : "Enroll to reserve a seat, then open Google Meet when you're ready. Meet opens in a new tab — keep this page for class details."}
                            </p>
                            <div className="mt-6">
                                <ClassroomActions
                                    classId={cls.id}
                                    slug={cls.slug}
                                    status={cls.status}
                                    provider={cls.provider}
                                    meetUrl={cls.meet_url}
                                    enrolledCount={cls.enrolled_count}
                                    capacity={cls.capacity}
                                    isHost={isHost}
                                    initiallyEnrolled={enrolled || isHost}
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </SectionShell>
        </div>
    );
}
