import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { COURSES, EXTENDED_INSTRUCTORS, getInstructor } from "@/lib/courses";
import { MEDIA_ASSETS } from "@/lib/media";
import { breadcrumbJsonLd, instructorJsonLd, instructorMetadata } from "@/lib/seo";

function getMediaSlugForImage(imagePath: string): string | undefined {
    return MEDIA_ASSETS.find((a) => a.path === imagePath)?.slug;
}

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return EXTENDED_INSTRUCTORS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const instructor = getInstructor(slug);
    if (!instructor) return {};
    return instructorMetadata(instructor);
}

export default async function InstructorPage({ params }: Props) {
    const { slug } = await params;
    const instructor = getInstructor(slug);
    if (!instructor) notFound();

    const taughtCourses = COURSES.filter((c) => instructor.courses.includes(c.code));
    const mediaSlug = getMediaSlugForImage(instructor.image);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Instructors", path: "/instructors" },
                        { name: instructor.name, path: `/instructors/${instructor.slug}` },
                    ]),
                    instructorJsonLd(instructor),
                ]}
            />
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Instructors", href: "/instructors" },
                        { label: instructor.name },
                    ]}
                />
                <div className="grid md:grid-cols-3 gap-10 mt-6">
                    <div className="md:col-span-1">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                            <Image
                                src={instructor.image}
                                alt={instructor.name}
                                fill
                                sizes="320px"
                                className="object-cover"
                                priority
                            />
                        </div>
                        {mediaSlug && (
                            <Link
                                href={`/media/${mediaSlug}`}
                                className="text-xs text-emerald-600 hover:text-emerald-700 mt-3 block text-center"
                            >
                                View image page →
                            </Link>
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 mb-2">Faculty</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{instructor.name}</h1>
                        <p className="text-emerald-600 font-semibold mb-1">{instructor.title}</p>
                        <p className="text-gray-500 text-sm font-medium mb-6">{instructor.credentials}</p>
                        <p className="text-gray-600 font-medium leading-relaxed mb-8">{instructor.bio}</p>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Expertise</h2>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {instructor.expertise.map((skill) => (
                                <span key={skill} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Courses Taught</h2>
                        <div className="space-y-3">
                            {taughtCourses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/courses/${course.slug}`}
                                    className="block p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
                                >
                                    <p className="text-xs font-bold text-gray-400">{course.code}</p>
                                    <p className="font-bold text-gray-900">{course.title}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
