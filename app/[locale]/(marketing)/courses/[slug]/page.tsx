import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailContent from "@/components/courses/CourseDetailContent";
import { getPublishedCourseBySlug } from "@/lib/courses-db";
import { courseMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const course = await getPublishedCourseBySlug(slug);
    if (!course) return {};
    return courseMetadata(course);
}

export default async function CoursePage({ params }: Props) {
    const { slug } = await params;
    const course = await getPublishedCourseBySlug(slug);
    if (!course) notFound();
    return <CourseDetailContent course={course} />;
}
