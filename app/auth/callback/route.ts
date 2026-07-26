import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { dashboardPathForRole, normalizeAccountRole, type UserRole } from "@/lib/types";

/**
 * After OAuth: apply the chosen student/tutor role for new accounts,
 * reject mismatches for existing accounts, then redirect to the right dashboard.
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const nextParam = searchParams.get("next") ?? "/";
    const intendedRole = normalizeAccountRole(searchParams.get("role"));

    if (!code) {
        return NextResponse.redirect(`${origin}/?auth=error`);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
        return NextResponse.redirect(`${origin}/?auth=error`);
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(`${origin}/?auth=error`);
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("id, role, created_at")
        .eq("id", user.id)
        .maybeSingle();

    let role: UserRole = (profile?.role as UserRole) || "student";
    if ((role as string) === "user") role = "student";

    if (intendedRole && role !== "admin") {
        const createdAt = profile?.created_at ? new Date(profile.created_at).getTime() : 0;
        const isBrandNew = !profile || Date.now() - createdAt < 5 * 60 * 1000;

        if (isBrandNew) {
            if (intendedRole !== role) {
                await supabase.from("profiles").update({ role: intendedRole }).eq("id", user.id);
                await supabase.auth.updateUser({ data: { account_role: intendedRole } });
                role = intendedRole;
            }
        } else if (role !== intendedRole) {
            await supabase.auth.signOut();
            return NextResponse.redirect(
                `${origin}/?auth=error&reason=${encodeURIComponent(`This account is a ${role}. Sign in as ${role}.`)}`
            );
        }
    }

    const safeNext = nextParam.startsWith("/") ? nextParam : "/";
    const dest =
        safeNext === "/" || safeNext.startsWith("/dashboard")
            ? dashboardPathForRole(role)
            : safeNext;

    return NextResponse.redirect(`${origin}${dest}`);
}
