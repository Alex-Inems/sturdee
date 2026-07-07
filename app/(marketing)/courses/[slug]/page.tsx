import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailContent from "@/components/courses/CourseDetailContent";
import { COURSES, getCourse } from "@/lib/courses";
import { courseMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const course = getCourse(slug);
    if (!course) return {};
    return courseMetadata(course);
}

export default async function CoursePage({ params }: Props) {
    const { slug } = await params;
    const course = getCourse(slug);
    if (!course) notFound();
    return <CourseDetailContent course={course} />;
}
