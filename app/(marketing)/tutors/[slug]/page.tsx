import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorProfileView from "@/components/tutors/TutorProfileView";
import { getPublishedTutorBySlug, getPublishedTutors } from "@/lib/tutors-db";
import { tutorMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tutor = await getPublishedTutorBySlug(slug);
    if (!tutor) return { title: "Tutor not found" };
    return tutorMetadata(tutor);
}

export default async function TutorProfilePage({ params }: Props) {
    const { slug } = await params;
    const tutor = await getPublishedTutorBySlug(slug);
    if (!tutor) notFound();

    const all = await getPublishedTutors();
    const similar = all
        .filter((t) => t.slug !== tutor.slug && t.categories.some((c) => tutor.categories.includes(c)))
        .slice(0, 3);

    return <TutorProfileView tutor={tutor} similar={similar} />;
}
