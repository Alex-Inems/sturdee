import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function InstructorRedirectPage({ params }: Props) {
    const { slug } = await params;
    redirect(`/tutors/${slug}`);
}
