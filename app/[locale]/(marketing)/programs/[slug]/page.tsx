import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import SectionShell from "@/components/SectionShell";
import { countCoursesForPath, getCoursesForPath, getLearningPath } from "@/lib/courses";
import { getPublishedCourses } from "@/lib/courses-db";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { breadcrumbJsonLd, learningPathJsonLd, learningPathMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("programs", () => [
        { slug: "full-stack-web-development" },
        { slug: "professional-programming" },
        { slug: "blockchain-cryptocurrency" },
    ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const path = getLearningPath(slug);
    if (!path) return {};
    const courses = await getPublishedCourses();
    return learningPathMetadata(path, countCoursesForPath(path, courses));
}

export default async function ProgramPage({ params }: Props) {
    assertFeatureEnabled("programs");

    const { slug } = await params;
    const path = getLearningPath(slug);
    if (!path) notFound();

    const allCourses = await getPublishedCourses();
    const courses = getCoursesForPath(path, allCourses);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Programs", path: "/programs" },
                        { name: path.title, path: `/programs/${path.slug}` },
                    ]),
                    learningPathJsonLd(path),
                ]}
            />
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Programs", href: "/programs" },
                        { label: path.title },
                    ]}
                />
                <div className="grid lg:grid-cols-2 gap-10 mt-6 items-start">
                    <div>
                        <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs mb-4">
                            {path.tag}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{path.title}</h1>
                        <p className="text-gray-500 font-medium leading-relaxed mb-6">{path.description}</p>
                        <p className="text-sm text-gray-400 font-medium mb-8">
                            {courses.length} course{courses.length !== 1 ? "s" : ""} · {path.duration} · {path.category}
                        </p>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Program Outcomes</h2>
                        <ul className="space-y-2 mb-8">
                            {path.outcomes.map((outcome) => (
                                <li key={outcome} className="text-gray-600 font-medium text-sm flex gap-2">
                                    <span className="text-emerald-500">✓</span> {outcome}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/book"
                            className="inline-block px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all"
                        >
                            Apply to Program
                        </Link>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 aspect-[3/4]">
                        <Image
                            src={path.image}
                            alt={path.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <SectionShell>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses in This Path</h2>
                    {courses.length === 0 ? (
                        <p className="text-gray-500 font-medium">
                            No tutor-created courses in this path yet.{" "}
                            <Link href="/tutors/register" className="text-emerald-600 font-semibold hover:underline">
                                Published tutors can add courses
                            </Link>
                            .
                        </p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/courses/${course.slug}`}
                                    className="p-5 rounded-xl border border-gray-100 bg-white hover:border-emerald-200 transition-colors"
                                >
                                    <p className="text-xs font-bold text-gray-400 mb-1">{course.code}</p>
                                    <p className="font-bold text-gray-900">{course.title}</p>
                                    <p className="text-sm text-gray-500 mt-2">{course.duration} · {course.level}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </SectionShell>
            </div>
        </div>
    );
}
