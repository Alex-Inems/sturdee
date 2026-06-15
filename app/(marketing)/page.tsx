import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
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

export default function HomePage() {
    return (
        <div className="font-jakarta bg-page">
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
