import type { Metadata } from "next";
import TutorMarketplace from "@/components/tutors/TutorMarketplace";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Find Expert Tutors — 1:1 Mentoring & Live Sessions",
    description:
        "Browse Sturdee tutors for web development, Python, JavaScript, Shopify Liquid, blockchain, and career coaching. Filter by rate, skills, and job success score.",
    path: "/tutors",
    keywords: ["online tutors", "coding tutor", "programming mentor", "hire tutor", "1:1 tutoring"],
});

export default function TutorsPage() {
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Tutors", path: "/tutors" },
                ])}
            />
            <TutorMarketplace />
        </>
    );
}
