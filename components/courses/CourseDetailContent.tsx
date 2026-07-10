import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import TutorialPageContent from "@/components/tutorials/TutorialPageContent";
import { getChallengeForLesson } from "@/lib/credentials";
import { courseFaqs, courseOutcomes, coursePrerequisites, getCourseCurriculum } from "@/lib/course-content";
import type { Course } from "@/lib/courses";
import { formatStudents, EXTENDED_INSTRUCTORS } from "@/lib/courses";
import { faq, h2, list, p } from "@/lib/tutorials/builder";
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from "@/lib/seo";

const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100/60 text-emerald-700",
    Intermediate: "bg-amber-100/60 text-amber-700",
    Advanced: "bg-violet-100/60 text-violet-700",
};

interface CourseDetailContentProps {
    course: Course;
}

export default function CourseDetailContent({ course }: CourseDetailContentProps) {
    const curriculum = getCourseCurriculum(course);
    const instructor = EXTENDED_INSTRUCTORS.find((i) => i.name === course.instructor);

    const crumbs = [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: course.title },
    ];

    const faqItems = courseFaqs(course);
    const sections = [
        h2("What You'll Learn"),
        list(courseOutcomes(course.category)),
        h2("Prerequisites"),
        list(coursePrerequisites(course)),
        h2("About This Course"),
        p(course.description),
        p(`This ${course.level.toLowerCase()} ${course.category.toLowerCase()} course runs for ${course.duration} with ${course.hours} instructional hours in a ${course.format.toLowerCase()} format. ${course.reviews.toLocaleString()} students have reviewed this course with an average rating of ${course.rating} stars.`),
    ];

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Courses", path: "/courses" },
                        { name: course.title, path: `/courses/${course.slug}` },
                    ]),
                    courseJsonLd(course),
                    faqJsonLd(faqItems),
                ]}
            />
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <Breadcrumbs items={crumbs} />

                <div className="grid lg:grid-cols-5 gap-10 mt-6">
                    <article className="lg:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                            <div className="relative aspect-[16/9]">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="p-6 md:p-10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${levelColors[course.level]}`}>
                                        {course.level}
                                    </span>
                                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                                        {course.code}
                                    </span>
                                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                                        {course.format}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
                                <p className="text-gray-500 font-medium mb-6">
                                    {instructor ? (
                                        <Link href={`/instructors/${instructor.slug}`} className="text-emerald-600 hover:text-emerald-700">
                                            {course.instructor}
                                        </Link>
                                    ) : (
                                        course.instructor
                                    )}
                                    {" · "}{course.instructorTitle}
                                </p>
                                <TutorialPageContent sections={sections} />
                            </div>
                        </div>

                        <section className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                            <div className="space-y-8">
                                {curriculum.map((mod) => (
                                    <div key={mod.title}>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">{mod.title}</h3>
                                        <ul className="space-y-3">
                                            {mod.lessons.map((lesson) => {
                                                const challenge = getChallengeForLesson(lesson.slug);
                                                return (
                                                <li key={lesson.slug}>
                                                    <Link
                                                        href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{lesson.title}</p>
                                                            <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                                                            {challenge && (
                                                                <p className="text-xs font-bold text-emerald-600 mt-2">
                                                                    🎓 Free micro-cert: {challenge.skill}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-400 shrink-0">{lesson.duration}</span>
                                                    </Link>
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <TutorialPageContent sections={[faq(faqItems)]} />
                        </section>
                    </article>

                    <aside className="lg:col-span-2">
                        <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white shadow-xl p-6">
                            <p className="text-3xl font-bold text-gray-900 mb-1">${course.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 font-medium mb-6">
                                {course.rating} ★ · {formatStudents(course.students)} enrolled
                            </p>
                            <dl className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Duration</dt>
                                    <dd className="font-semibold text-gray-900">{course.duration}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Hours</dt>
                                    <dd className="font-semibold text-gray-900">{course.hours}h</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Format</dt>
                                    <dd className="font-semibold text-gray-900">{course.format}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Updated</dt>
                                    <dd className="font-semibold text-gray-900">{course.updatedAt}</dd>
                                </div>
                            </dl>
                            <Link
                                href="/book"
                                className="block w-full text-center py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all mb-3"
                            >
                                Enroll Now
                            </Link>
                            <Link
                                href="/credentials"
                                className="block w-full text-center py-3.5 border border-emerald-200 text-emerald-700 font-semibold rounded-full text-sm hover:bg-emerald-50 transition-all mb-3"
                            >
                                Free Micro-Certificates
                            </Link>
                            <Link
                                href="/tutorials"
                                className="block w-full text-center py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-full text-sm hover:border-gray-300 transition-all"
                            >
                                Try Free Tutorials
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
