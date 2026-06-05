"use client";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AlumniOutcomes from "@/components/AlumniOutcomes";
import Philosophy from "@/components/Philosophy";
import LearningExperience from "@/components/LearningExperience";
import FeaturedCourses from "@/components/FeaturedCourses";
import LearningPaths from "@/components/LearningPaths";
import Instructors from "@/components/Instructors";
import Testimonial from "@/components/Testimonial";
import Benefits from "@/components/Benefits";
import Accreditation from "@/components/Accreditation";
import DirectionalCTA from "@/components/DirectionalCTA";
import Newsletter from "@/components/Newsletter";

export default function LuxuryEducationTemplate() {
  return (
    <div className="font-jakarta bg-white">
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
