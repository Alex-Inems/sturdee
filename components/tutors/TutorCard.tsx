"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Star, Video } from "lucide-react";
import type { Tutor } from "@/lib/tutors";
import { getAverageRating, getReviewCount } from "@/lib/tutors";

const badgeStyles: Record<string, string> = {
    "Top Tutor": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Rising Talent": "bg-amber-100 text-amber-800 border-amber-200",
    "Expert-Vetted": "bg-violet-100 text-violet-800 border-violet-200",
};

interface TutorCardProps {
    tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
    const rating = getAverageRating(tutor);
    const reviewCount = getReviewCount(tutor);

    return (
        <article className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <div className="p-5 md:p-6">
                <div className="flex gap-4">
                    <Link href={`/tutors/${tutor.slug}`} className="shrink-0">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-gray-100">
                            <Image
                                src={tutor.image}
                                alt={tutor.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <Link
                                    href={`/tutors/${tutor.slug}`}
                                    className="text-lg font-bold text-gray-900 hover:text-emerald-700 transition-colors"
                                >
                                    {tutor.name}
                                </Link>
                                {tutor.verified && (
                                    <BadgeCheck className="inline w-4 h-4 text-emerald-600 ml-1 -mt-0.5" aria-label="Verified" />
                                )}
                                <p className="text-sm text-gray-600 font-medium mt-0.5 line-clamp-1">{tutor.title}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xl font-bold text-gray-900">${tutor.hourlyRate}<span className="text-sm font-medium text-gray-500">/hr</span></p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {tutor.location}
                            </span>
                            <span className="text-emerald-700 font-semibold">{tutor.jobSuccess}% Job Success</span>
                            <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                {rating.toFixed(1)} ({reviewCount})
                            </span>
                            {tutor.hasVideoIntro && (
                                <span className="flex items-center gap-1 text-emerald-600">
                                    <Video className="w-3.5 h-3.5" />
                                    Video intro
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tutor.badge && (
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${badgeStyles[tutor.badge]}`}>
                                    {tutor.badge}
                                </span>
                            )}
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                tutor.availability === "Available now"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : tutor.availability === "Limited availability"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-gray-100 text-gray-500"
                            }`}>
                                {tutor.availability}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">{tutor.bio}</p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tutor.skills.slice(0, 5).map((skill) => (
                                <span
                                    key={skill.name}
                                    className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-xs font-semibold text-gray-700"
                                >
                                    {skill.name}
                                </span>
                            ))}
                            {tutor.skills.length > 5 && (
                                <span className="px-2.5 py-1 text-xs font-semibold text-gray-400">
                                    +{tutor.skills.length - 5}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-medium">
                        {tutor.totalEarned} earned · {tutor.totalHours.toLocaleString()} hrs · {tutor.responseTime}
                    </p>
                    <div className="flex gap-2">
                        <Link
                            href={`/tutors/${tutor.slug}`}
                            className="px-4 py-2 text-sm font-semibold text-emerald-700 border border-emerald-200 rounded-full hover:bg-emerald-50 transition-colors"
                        >
                            View Profile
                        </Link>
                        <Link
                            href={`/book?tutor=${tutor.slug}`}
                            className="px-4 py-2 text-sm font-semibold bg-[#10B981] hover:bg-[#0F9F72] text-white rounded-full transition-colors"
                        >
                            Hire Tutor
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
