import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { isTutorRole } from "@/lib/types";

/** Legacy host URL — tutors manage classes from their dashboard. */
export default async function ClassroomHostRedirectPage() {
    const user = await getSessionUser();
    if (!user) redirect("/?auth=login");
    if (!isTutorRole(user.role)) redirect("/dashboard/student");
    redirect("/dashboard/tutor");
}
