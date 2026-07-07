import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
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

export const metadata: Metadata = pageMetadata({
    title: "Learn to Code — Free Tutorials, Courses & Study Resources",
    description:
        "Sturdee is your free study platform for web development, programming, and Shopify Liquid. Interactive tutorials, video lessons, live courses, and expert instructors — learn by doing.",
    path: "/",
    keywords: [
        "learn to code free",
        "programming study site",
        "web development education",
        "coding courses online",
        "Shopify theme development",
    ],
});

export default function HomePage() {
    return (
        <div className="font-jakarta bg-page">
            <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
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
