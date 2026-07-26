import { getSessionUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { listOpenClasses } from "@/lib/classrooms-db";
import type { LiveClassListing } from "@/lib/classrooms-db";

export type StudentEnrollment = {
    id: string;
    class_id: string;
    joined_at: string | null;
    created_at: string;
    live_classes: {
        id: string;
        title: string;
        slug: string;
        topic: string;
        starts_at: string;
        status: string;
        capacity: number;
        host_name: string;
    } | null;
};

export async function getStudentEnrollments(userId: string): Promise<StudentEnrollment[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_class_enrollments")
        .select(
            "id, class_id, joined_at, created_at, live_classes ( id, title, slug, topic, starts_at, status, capacity, host_name )"
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as StudentEnrollment[];
}

export async function getStudentDashboardData(userId: string) {
    const [enrollments, openClasses] = await Promise.all([
        getStudentEnrollments(userId),
        listOpenClasses().catch(() => [] as LiveClassListing[]),
    ]);
    return { enrollments, openClasses };
}

export async function requireStudentPageUser() {
    const user = await getSessionUser();
    return user;
}
