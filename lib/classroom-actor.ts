import {
    getClassroomActor,
    getSessionUser,
    isGuestClassroomActor,
} from "@/lib/auth";
import type { SessionUser } from "@/lib/types";

export type ClassroomActorContext = {
    actor: SessionUser;
    /** Guest cookie actors must use service-role DB writes (no auth.uid()). */
    bypassRls: boolean;
};

export async function requireClassroomActor(): Promise<ClassroomActorContext> {
    const actor = await getClassroomActor();
    if (!actor) {
        throw new Error("Unauthorized");
    }
    return { actor, bypassRls: await isGuestClassroomActor() };
}

export async function requireClassroomTutor(): Promise<ClassroomActorContext> {
    const ctx = await requireClassroomActor();
    if (ctx.actor.role !== "tutor" && ctx.actor.role !== "admin") {
        throw new Error("Only tutors can do this");
    }
    return ctx;
}

/** Prefer real session; fall back to guest only when guest mode is enabled. */
export async function optionalClassroomActor(): Promise<ClassroomActorContext | null> {
    try {
        return await requireClassroomActor();
    } catch {
        return null;
    }
}

export async function hasRealSession(): Promise<boolean> {
    return !!(await getSessionUser());
}
