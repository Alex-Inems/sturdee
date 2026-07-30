import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import LandingLanguages from "@/components/landing/LandingLanguages";
import LandingMethod from "@/components/landing/LandingMethod";
import LandingCTA from "@/components/landing/LandingCTA";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getLocalizedHomeMeta } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";

// Previous marketing sections (disabled with feature flags) kept for restore:
// Stats, AlumniOutcomes, Philosophy, LearningExperience, FeaturedCourses,
// LearningPaths, Instructors, Testimonial, Benefits, Accreditation,
// DirectionalCTA, Newsletter

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const meta = await getLocalizedHomeMeta(locale as Locale);
    return pageMetadata({
        title: meta.title,
        description: meta.description,
        path: "/",
        locale: locale as Locale,
        keywords: [
            "learn skills online",
            "book tutoring session",
            "career skills training",
            "web development coaching",
            "AI automation training",
            "project management mentorship",
        ],
    });
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const meta = await getLocalizedHomeMeta(locale as Locale);

    return (
        <div className="font-jakarta bg-page">
            <JsonLd data={breadcrumbJsonLd([{ name: meta.breadcrumb, path: "/" }])} />
            <LandingHero />
            <LandingLanguages />
            <LandingMethod />
            <LandingCTA />
        </div>
    );
}
