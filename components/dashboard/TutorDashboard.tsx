"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import ClassroomHostManager from "@/components/classroom/ClassroomHostManager";
import { useAuth } from "@/components/AuthContext";
import { isClassroomGuestAllowed } from "@/lib/classroom-guest-flags";
import { isTutorRole } from "@/lib/types";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";

export default function TutorDashboard() {
    const { user, loading, isAuthenticated } = useAuth();
    const [guestReady, setGuestReady] = useState(false);
    const [guestName, setGuestName] = useState("Dev Tutor");
    const [guestError, setGuestError] = useState("");
    const guestMode = isClassroomGuestAllowed();

    useEffect(() => {
        if (loading) return;
        if (isAuthenticated && user && isTutorRole(user.role)) {
            setGuestReady(false);
            return;
        }
        if (!guestMode) return;

        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/classrooms/guest/session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: "tutor", name: "Dev Tutor" }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Guest tutor failed");
                if (!cancelled) {
                    setGuestName(data.guest?.name || "Dev Tutor");
                    setGuestReady(true);
                }
            } catch (err) {
                if (!cancelled) {
                    setGuestError(err instanceof Error ? err.message : "Guest tutor failed");
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [loading, isAuthenticated, user, guestMode]);

    const asTutor = isAuthenticated && user && isTutorRole(user.role);
    const asGuestTutor = guestMode && guestReady && !asTutor;

    if (loading || (!asTutor && guestMode && !guestReady && !guestError)) {
        return (
            <div className="font-jakarta bg-page min-h-screen">
                <PageHero highlight="Tutor" title="Your dashboard" subtitle="Loading…" />
            </div>
        );
    }

    if (!asTutor && !asGuestTutor) {
        return (
            <div className="font-jakarta bg-page min-h-screen">
                <PageHero
                    highlight="Tutor"
                    title="Tutor dashboard"
                    subtitle={guestError || "Sign in as a tutor to schedule classes."}
                />
            </div>
        );
    }

    const titleName = asTutor
        ? user!.name.split(" ")[0] || "tutor"
        : guestName.split(" ")[0] || "tutor";

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Tutor"
                title={`Hi, ${titleName}`}
                subtitle={
                    asGuestTutor
                        ? `Dev guest mode — create and host classes without logging in (up to ${MAX_CLASS_CAPACITY} students).`
                        : `Schedule live classes for up to ${MAX_CLASS_CAPACITY} students. End sessions and create new ones from this page.`
                }
            />
            <SectionShell compact>
                {asGuestTutor && (
                    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-950">
                        Guest tutor session active. Open a private window and enroll as guest student to
                        test two participants.
                    </div>
                )}
                <ClassroomHostManager guestMode={asGuestTutor} />
            </SectionShell>
        </div>
    );
}
