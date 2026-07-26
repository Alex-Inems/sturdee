import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { dashboardPathForRole } from "@/lib/types";

/** Role-aware entry: send each account to its own dashboard. */
export default async function DashboardIndexPage() {
    const user = await getSessionUser();
    if (!user) redirect("/?auth=login");
    redirect(dashboardPathForRole(user.role));
}
