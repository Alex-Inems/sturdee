"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import ClassroomHostManager from "@/components/classroom/ClassroomHostManager";
import { useAuth } from "@/components/AuthContext";
import { isTutorRole } from "@/lib/types";
import { MAX_CLASS_CAPACITY } from "@/lib/google-meet";

export default function TutorDashboard() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.replace("/?auth=login");
            return;
        }
        if (user && !isTutorRole(user.role)) {
            router.replace("/dashboard/student");
        }
    }, [loading, isAuthenticated, user, router]);

    if (loading || !user || !isTutorRole(user.role)) {
        return (
            <div className="font-jakarta bg-page min-h-screen">
                <PageHero highlight="Tutor" title="Your dashboard" subtitle="Loading…" />
            </div>
        );
    }

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Tutor"
                title={`Hi, ${user.name.split(" ")[0] || "tutor"}`}
                subtitle={`Schedule Google Meet classes for up to ${MAX_CLASS_CAPACITY} students and go live when ready.`}
            />
            <SectionShell compact>
                <ClassroomHostManager />
            </SectionShell>
        </div>
    );
}
