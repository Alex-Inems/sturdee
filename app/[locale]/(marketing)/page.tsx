import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getLocalizedHomeMeta } from "@/lib/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import Stats from "@/components/Stats";
import AlumniOutcomes from "@/components/AlumniOutcomes";
import Philosophy from "@/components/Philosophy";
import LearningExperience from "@/components/LearningExperience";
import Testimonial from "@/components/Testimonial";
import Benefits from "@/components/Benefits";
import Accreditation from "@/components/Accreditation";
import DirectionalCTA from "@/components/DirectionalCTA";
import Newsletter from "@/components/Newsletter";
import SectionPlaceholder from "@/components/SectionPlaceholder";

const FeaturedCourses = dynamic(() => import("@/components/FeaturedCourses"), {
    loading: () => <SectionPlaceholder />,
});
const LearningPaths = dynamic(() => import("@/components/LearningPaths"), {
    loading: () => <SectionPlaceholder />,
});
const Instructors = dynamic(() => import("@/components/Instructors"), {
    loading: () => <SectionPlaceholder />,
});

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
            "learn to code free",
            "programming study site",
            "web development education",
            "coding courses online",
            "Shopify theme development",
        ],
    });
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const meta = await getLocalizedHomeMeta(locale as Locale);

    return (
        <div className="font-jakarta bg-page">
            <JsonLd data={breadcrumbJsonLd([{ name: meta.breadcrumb, path: "/" }])} />
            <Hero />
            <Stats />
            <AlumniOutcomes />
            <Philosophy />
            <LearningExperience />
            <FeaturedCourses />
            <LearningPaths />
            <Instructors />
            <Testimonial />
            <Benefits />
            <Accreditation />
            <DirectionalCTA />
            <Newsletter />
        </div>
    );
}
