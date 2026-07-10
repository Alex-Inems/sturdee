import type { Metadata } from "next";
import Link from "next/link";
import { getChallengeForLesson } from "@/lib/credentials";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import TutorialPageContent from "@/components/tutorials/TutorialPageContent";
import { getCourseLesson } from "@/lib/course-content";
import { getPublishedCourseBySlug } from "@/lib/courses-db";
import { h2, list, p } from "@/lib/tutorials/builder";
import { breadcrumbJsonLd, courseLessonJsonLd, courseLessonMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ locale: string; slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, lessonSlug } = await params;
    const course = await getPublishedCourseBySlug(slug);
    const match = course ? getCourseLesson(course, lessonSlug) : undefined;
    if (!course || !match) return {};
    return courseLessonMetadata(course, match.lesson.title, lessonSlug);
}

export default async function CourseLessonPage({ params }: Props) {
    const { slug, lessonSlug } = await params;
    const course = await getPublishedCourseBySlug(slug);
    const match = course ? getCourseLesson(course, lessonSlug) : undefined;
    if (!course || !match) notFound();

    const { module, lesson } = match;
    const challenge = getChallengeForLesson(lessonSlug);
    const crumbs = [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: course.title, href: `/courses/${course.slug}` },
        { label: lesson.title },
    ];

    const sections = [
        h2("Lesson Overview"),
        p(lesson.description),
        h2("Module"),
        p(`This lesson is part of the "${module.title}" module in ${course.title}.`),
        h2("What You'll Cover"),
        list([
            `Duration: ${lesson.duration}`,
            `Course: ${course.title} (${course.code})`,
            `Tutor: ${course.instructor}`,
            `Format: ${course.format}`,
        ]),
    ];

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Courses", path: "/courses" },
                        { name: course.title, path: `/courses/${course.slug}` },
                        { name: lesson.title, path: `/courses/${course.slug}/lessons/${lessonSlug}` },
                    ]),
                    courseLessonJsonLd(course, lesson.title, lessonSlug, lesson.description),
                ]}
            />
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Breadcrumbs items={crumbs} />
                <article className="rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10 mt-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 mb-2">
                        {course.code} · {module.title}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
                    <p className="text-sm text-gray-400 font-medium mb-8">{lesson.duration}</p>
                    <TutorialPageContent sections={sections} />
                    <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-3">
                        {challenge && (
                            <Link
                                href={`/workspace/${challenge.id}`}
                                className="inline-flex items-center px-5 py-2.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-colors"
                            >
                                Earn {challenge.skill} micro-certificate →
                            </Link>
                        )}
                        {lesson.tutorialLink && (
                            <Link
                                href={lesson.tutorialLink}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                Free tutorial version →
                            </Link>
                        )}
                        <Link
                            href={`/courses/${course.slug}`}
                            className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                        >
                            ← Back to course
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
