import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { COURSE_CATEGORIES, getCoursesByCategory, type CourseCategory } from "@/lib/courses";
import { categorySlug } from "@/lib/slug";
import { breadcrumbJsonLd, categoryMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ category: string }>;
}

const SLUG_TO_CATEGORY: Record<string, CourseCategory> = {
    "web-development": "Web Development",
    programming: "Programming",
    cryptocurrency: "Cryptocurrency",
};

export function generateStaticParams() {
    return COURSE_CATEGORIES.map((cat) => ({ category: categorySlug(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const cat = SLUG_TO_CATEGORY[category];
    if (!cat) return {};
    return categoryMetadata(cat, category);
}

const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100/60 text-emerald-700",
    Intermediate: "bg-amber-100/60 text-amber-700",
    Advanced: "bg-violet-100/60 text-violet-700",
};

export default async function CourseCategoryPage({ params }: Props) {
    const { category } = await params;
    const cat = SLUG_TO_CATEGORY[category];
    if (!cat) notFound();

    const courses = getCoursesByCategory(cat);

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Courses", path: "/courses" },
                    { name: cat, path: `/courses/category/${category}` },
                ])}
            />
            <PageHero
                highlight={cat}
                title={`${cat} Courses`}
                subtitle={`${courses.length} courses in ${cat.toLowerCase()} — cohort, self-paced, and live formats.`}
            />
            <SectionShell>
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Courses", href: "/courses" },
                        { label: cat },
                    ]}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.slug}`}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${levelColors[course.level]} mb-4`}>
                                {course.level}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4 line-clamp-3">
                                {course.description}
                            </p>
                            <p className="text-emerald-600 font-semibold text-sm">View course →</p>
                        </Link>
                    ))}
                </div>
            </SectionShell>
        </div>
    );
}
