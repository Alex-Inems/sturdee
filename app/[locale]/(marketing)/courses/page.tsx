import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { COURSE_CATEGORIES, formatStudents } from "@/lib/courses";
import { getPublishedCourses } from "@/lib/courses-db";
import { assertFeatureEnabled } from "@/lib/features";
import { courseListJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const meta = await getLocalizedHubMeta(locale as Locale, "courses");
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/courses",
        locale: locale as Locale,
        keywords: ["programming courses", "web development bootcamp", "cryptocurrency course", "online coding classes"],
    });
}

const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100/60 text-emerald-700",
    Intermediate: "bg-amber-100/60 text-amber-700",
    Advanced: "bg-violet-100/60 text-violet-700",
};

export default async function CoursesPage() {
    assertFeatureEnabled("courses");

    const courses = await getPublishedCourses();
    const featured = courses.find((c) => c.featured) ?? courses[0];

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd data={courseListJsonLd(courses)} />
            <PageHero
                highlight="Course Catalog"
                title="Explore Tutor-Led Courses"
                subtitle="Every course is created by a published Sturdee tutor — no hardcoded catalog."
            />

            <section className="sticky top-[72px] z-40 bg-page/90 backdrop-blur-md border-b border-gray-200/70">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-4 overflow-x-auto">
                    {["All Subjects", ...COURSE_CATEGORIES].map((f, i) => (
                        <button
                            key={f}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                i === 0
                                    ? "bg-[#FFE55E] text-black shadow-md"
                                    : "bg-white border border-gray-100 text-gray-600 hover:border-gray-200"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            <SectionShell>
                {courses.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No courses yet</h2>
                        <p className="text-gray-500 font-medium mb-6 max-w-lg mx-auto">
                            Courses appear here when published tutors create them. Register as a tutor, publish your
                            profile, then add your first course.
                        </p>
                        <Link
                            href="/tutors/register"
                            className="inline-flex px-8 py-3.5 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                        >
                            Become a tutor →
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300 block"
                            >
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${levelColors[course.level]}`}>
                                        {course.level}
                                    </span>
                                    <span className="text-[11px] font-bold text-gray-400">{course.code}</span>
                                </div>
                                <span className="inline-flex px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold mb-4">
                                    {course.category} · {course.duration}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">
                                    {course.description}
                                </p>
                                <p className="text-xs text-gray-500 font-medium mb-6">
                                    {course.instructor} · {course.format} · {course.hours}h · Updated {course.updatedAt}
                                </p>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">${course.price.toLocaleString()}</p>
                                        {course.reviews > 0 && (
                                            <p className="text-xs text-gray-400 font-medium">
                                                {course.rating} ★ · {formatStudents(course.students)} enrolled
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-emerald-600 font-semibold text-sm">View course →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </SectionShell>

            {featured && (
                <SectionShell>
                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xl grid lg:grid-cols-2">
                        <div className="relative aspect-[16/10] lg:aspect-auto min-h-[240px]">
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                            <span className="text-xs font-bold uppercase text-emerald-600 mb-2">Featured</span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{featured.title}</h2>
                            <p className="text-gray-500 font-medium mb-6">{featured.description}</p>
                            <Link
                                href={`/courses/${featured.slug}`}
                                className="inline-flex w-fit px-6 py-3 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                            >
                                View course →
                            </Link>
                        </div>
                    </div>
                </SectionShell>
            )}
        </div>
    );
}
