import { redirect } from "next/navigation";
import { assertFeatureEnabled } from "@/lib/features";

export default function InstructorsPage() {
    assertFeatureEnabled("instructors");
    redirect("/tutors");
}
