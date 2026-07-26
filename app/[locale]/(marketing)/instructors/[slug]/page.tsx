import { redirect } from "next/navigation";
import { assertFeatureEnabled } from "@/lib/features";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function InstructorRedirectPage({ params }: Props) {
    assertFeatureEnabled("instructors");

    const { slug } = await params;
    redirect(`/tutors/${slug}`);
}
