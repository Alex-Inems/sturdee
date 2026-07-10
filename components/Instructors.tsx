import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SectionShell from "./SectionShell";
import { getPublishedTutors } from "@/lib/tutors-db";
import { getAverageRating, getReviewCount } from "@/lib/tutors";

export default async function Instructors() {
    const tutors = (await getPublishedTutors()).slice(0, 3);

    if (!tutors.length) {
        return (
            <SectionShell id="instructors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
                    <div className="lg:col-span-5">
                        <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                            Tutors
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                            Learn from Registered Tutors
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-6">
                            Tutor profiles are created by real educators on Sturdee.{" "}
                            <Link href="/tutors/register" className="text-emerald-600 font-semibold hover:underline">
                                Register as a tutor
                            </Link>{" "}
                            to appear here.
                        </p>
                    </div>
                </div>
            </SectionShell>
        );
    }

    return (
        <SectionShell id="instructors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
                <div className="lg:col-span-5">
                    <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                        Tutors
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                        Learn from Registered Tutors
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-6">
                        Book 1:1 sessions and enroll in courses from verified Sturdee tutors.
                    </p>
                    <Link
                        href="/tutors"
                        className="inline-block mt-6 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                        Browse all tutors →
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                    <Link
                        key={tutor.slug}
                        href={`/tutors/${tutor.slug}`}
                        className="group bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 text-center hover:translate-y-[-2px] transition-all duration-300"
                    >
                        <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-amber-100/60">
                            <Image
                                src={tutor.image}
                                alt={tutor.name}
                                width={112}
                                height={112}
                                sizes="112px"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{tutor.name}</h3>
                        <p className="text-xs font-semibold text-emerald-600 mb-2">{tutor.title}</p>
                        <p className="text-xs text-gray-500 font-medium mb-3 line-clamp-2">{tutor.bio}</p>
                        <p className="text-[11px] text-gray-400 font-medium">
                            ${tutor.hourlyRate}/hr · {getAverageRating(tutor).toFixed(1)}★ · {getReviewCount(tutor)} reviews
                        </p>
                    </Link>
                ))}
            </div>
        </SectionShell>
    );
}
