import { redirect } from "next/navigation";
import { getClassroomActor, getSessionUser } from "@/lib/auth";
import { isClassroomGuestAllowed } from "@/lib/classroom-guest-flags";
import { dashboardPathForRole } from "@/lib/types";

/** Role-aware entry: send each account to its own dashboard. */
export default async function DashboardIndexPage() {
    const user = await getSessionUser();
    if (user) redirect(dashboardPathForRole(user.role));

    if (isClassroomGuestAllowed()) {
        const guest = await getClassroomActor();
        if (guest) redirect(dashboardPathForRole(guest.role));
        redirect("/dashboard/tutor");
    }

    redirect("/?auth=login");
}
