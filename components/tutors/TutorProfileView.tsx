import Image from "next/image";
import Link from "next/link";
import {
    BadgeCheck,
    Bookmark,
    Clock,
    Globe,
    MapPin,
    MessageCircle,
    Share2,
    Star,
    Video,
} from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import type { Course } from "@/lib/courses";
import type { Tutor } from "@/lib/tutors";
import { getAverageRating, getReviewCount } from "@/lib/tutors";
import { breadcrumbJsonLd, tutorJsonLd } from "@/lib/seo";

const badgeStyles: Record<string, string> = {
    "Top Tutor": "bg-emerald-100 text-emerald-800",
    "Rising Talent": "bg-amber-100 text-amber-800",
    "Expert-Vetted": "bg-violet-100 text-violet-800",
};

interface TutorProfileViewProps {
    tutor: Tutor;
    similar?: Tutor[];
    courses?: Course[];
}

export default function TutorProfileView({ tutor, similar: similarProp, courses = [] }: TutorProfileViewProps) {
    const rating = getAverageRating(tutor);
    const reviewCount = getReviewCount(tutor);
    const similar = similarProp ?? [];

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Tutors", path: "/tutors" },
                        { name: tutor.name, path: `/tutors/${tutor.slug}` },
                    ]),
                    tutorJsonLd(tutor),
                ]}
            />

            {/* Cover banner — Upwork-style */}
            <div className="relative h-36 md:h-48 bg-gray-200 mt-[72px]">
                <Image src={tutor.coverImage} alt="" fill className="object-cover" priority sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-16 relative z-10 pb-16">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Tutors", href: "/tutors" },
                        { label: tutor.name },
                    ]}
                />

                <div className="grid lg:grid-cols-3 gap-8 mt-4">
                    {/* Main column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile header card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg shrink-0 -mt-20 sm:-mt-16">
                                    <Image src={tutor.image} alt={tutor.name} fill sizes="112px" className="object-cover" priority />
                                </div>
                                <div className="flex-1 pt-2 sm:pt-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{tutor.name}</h1>
                                        {tutor.verified && <BadgeCheck className="w-6 h-6 text-emerald-600" />}
                                    </div>
                                    <p className="text-gray-600 font-medium mt-1">{tutor.title}</p>
                                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{tutor.location}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{tutor.timezone}</span>
                                        <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{tutor.englishLevel} English</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {tutor.badge && (
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeStyles[tutor.badge]}`}>
                                                {tutor.badge}
                                            </span>
                                        )}
                                        {tutor.hasVideoIntro && (
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 flex items-center gap-1">
                                                <Video className="w-3.5 h-3.5" /> Video introduction
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Stats row — Upwork Job Success / earnings */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
                                <div>
                                    <p className="text-2xl font-bold text-emerald-700">{tutor.jobSuccess}%</p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">Job Success</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{tutor.totalEarned}</p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">Total earned</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{tutor.totalHours.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">Hours tutored</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        {rating.toFixed(1)}
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">{reviewCount} reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600 font-medium leading-relaxed">{tutor.overview}</p>
                            <p className="text-gray-600 font-medium leading-relaxed mt-4">{tutor.bio}</p>
                            <p className="text-xs text-gray-400 font-medium mt-6">Member since {tutor.memberSince} · {tutor.repeatClients}% repeat clients</p>
                        </section>

                        {/* Skills */}
                        <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                            <div className="space-y-3">
                                {tutor.skills.map((skill) => (
                                    <div key={skill.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                        <span className="font-semibold text-gray-900">{skill.name}</span>
                                        <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Portfolio */}
                        {tutor.portfolio.length > 0 && (
                            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {tutor.portfolio.map((item) => (
                                        <div key={item.slug} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="relative aspect-video">
                                                <Image src={item.image} alt={item.title} fill sizes="(max-width:640px) 100vw, 320px" className="object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-900">{item.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {item.tags.map((tag) => (
                                                        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Work history */}
                        {tutor.workHistory.length > 0 && (
                        <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Work History</h2>
                            <div className="space-y-6">
                                {tutor.workHistory.map((job) => (
                                    <div key={job.title + job.period} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <h3 className="font-bold text-gray-900">{job.title}</h3>
                                            <span className="text-sm font-semibold text-gray-500">{job.period}</span>
                                        </div>
                                        <p className="text-sm text-emerald-600 font-medium mt-1">{job.client}</p>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{job.description}</p>
                                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 font-medium">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                {job.rating} ({job.reviews} review{job.reviews !== 1 ? "s" : ""})
                                            </span>
                                            <span>{job.earnings} earned</span>
                                            <span>{job.hours} hrs</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        )}

                        {/* Education & Certifications */}
                        {(tutor.education.length > 0 || tutor.certifications.length > 0) && (
                            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                                {tutor.education.length > 0 && (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                                        {tutor.education.map((edu) => (
                                            <div key={edu.school} className="mb-4">
                                                <p className="font-bold text-gray-900">{edu.school}</p>
                                                <p className="text-sm text-gray-600">{edu.degree}</p>
                                                <p className="text-xs text-gray-400">{edu.years}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {tutor.certifications.length > 0 && (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 mt-6">Certifications</h2>
                                        {tutor.certifications.map((cert) => (
                                            <div key={cert.name} className="mb-3">
                                                <p className="font-semibold text-gray-900">{cert.name}</p>
                                                <p className="text-sm text-gray-500">{cert.issuer} · {cert.year}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </section>
                        )}

                        {/* Reviews */}
                        {tutor.reviews.length > 0 ? (
                        <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Client Reviews</h2>
                            <div className="space-y-6">
                                {tutor.reviews.map((review) => (
                                    <div key={review.author + review.date} className="pb-6 border-b border-gray-100 last:border-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-gray-900">{review.author}</p>
                                            <p className="text-xs text-gray-400">{review.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{review.project} · {review.hours} hrs</p>
                                        <p className="text-gray-600 mt-3 leading-relaxed">&quot;{review.text}&quot;</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        ) : (
                        <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Client Reviews</h2>
                            <p className="text-gray-500 text-sm font-medium">New tutor — reviews will appear after completed sessions.</p>
                        </section>
                        )}
                        <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
                            <div className="flex flex-wrap gap-3">
                                {tutor.languages.map((lang) => (
                                    <span key={lang.name} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-700">
                                        {lang.name}: <span className="text-gray-500">{lang.level}</span>
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sticky sidebar — Upwork hire box */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
                            <div>
                                <p className="text-3xl font-bold text-gray-900">${tutor.hourlyRate}<span className="text-lg font-medium text-gray-500">/hr</span></p>
                                <p className={`text-sm font-semibold mt-2 ${
                                    tutor.availability === "Available now" ? "text-emerald-600" : "text-gray-500"
                                }`}>
                                    {tutor.availability}
                                </p>
                            </div>

                            <Link
                                href={`/book?tutor=${tutor.slug}`}
                                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-bold rounded-full transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Hire {tutor.name.split(" ").pop()}
                            </Link>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm"
                            >
                                <Bookmark className="w-4 h-4" />
                                Save tutor
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 w-full py-2 text-gray-500 font-medium text-sm hover:text-gray-700"
                            >
                                <Share2 className="w-4 h-4" />
                                Share profile
                            </button>

                            <dl className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Response time</dt>
                                    <dd className="font-semibold text-gray-900">{tutor.responseTime}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Total jobs</dt>
                                    <dd className="font-semibold text-gray-900">{tutor.totalJobs}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Repeat clients</dt>
                                    <dd className="font-semibold text-gray-900">{tutor.repeatClients}%</dd>
                                </div>
                            </dl>

                            {tutor.verified && (
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 text-sm text-emerald-700 font-medium">
                                    <BadgeCheck className="w-5 h-5 shrink-0" />
                                    ID & credentials verified by Sturdee
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {courses.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Courses by {tutor.name}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/courses/${course.slug}`}
                                    className="p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-200 transition-colors"
                                >
                                    <p className="text-xs font-bold text-gray-400 mb-1">{course.code}</p>
                                    <p className="font-bold text-gray-900">{course.title}</p>
                                    <p className="text-sm text-gray-500 mt-2">{course.duration} · ${course.price}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Similar tutors */}
                {similar.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Tutors</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {similar.map((t) => (
                                <Link
                                    key={t.slug}
                                    href={`/tutors/${t.slug}`}
                                    className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                                        <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 truncate">{t.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{t.title}</p>
                                        <p className="text-sm font-bold text-gray-900 mt-1">${t.hourlyRate}/hr</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
