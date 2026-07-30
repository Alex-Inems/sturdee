import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoLiveRoom from "@/components/classroom/DemoLiveRoom";
import SectionShell from "@/components/SectionShell";
import { isClassroomGuestAllowed } from "@/lib/classroom-guest-flags";
import { assertFeatureEnabled } from "@/lib/features";
import { NOINDEX_ROBOTS, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
    ...pageMetadata({
        title: "Demo Classroom — Try Live Video (No Login)",
        description: "Test Sturdee’s live classroom room without signing in.",
        path: "/classroom/demo",
    }),
    robots: NOINDEX_ROBOTS,
};

export const dynamic = "force-dynamic";

export default function ClassroomDemoPage() {
    assertFeatureEnabled("classroom");
    if (!isClassroomGuestAllowed()) notFound();

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
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                        Demo · no login
                    </span>
                </div>

                <div className="mt-4">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Demo classroom
                    </h1>
                    <p className="mt-1 max-w-2xl text-sm font-medium text-gray-500">
                        Open this page in two browser windows (or one normal + one private) to test video,
                        mute, and screen share without creating an account.
                    </p>
                </div>

                <div className="mt-6">
                    <DemoLiveRoom />
                </div>
            </SectionShell>
        </div>
    );
}
