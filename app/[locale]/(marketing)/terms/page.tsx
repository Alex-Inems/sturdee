import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { h2, list, p } from "@/lib/tutorials/builder";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
    title: "Terms of Service",
    description: `Terms and conditions for using ${SITE_NAME} tutorials, courses, and educational platform.`,
    path: "/terms",
});

const sections = [
    h2("Acceptance of Terms"),
    p(`By accessing ${SITE_NAME}, you agree to these Terms of Service. If you do not agree, please do not use our platform.`),
    h2("Educational Content"),
    p("Tutorials and course materials are provided for educational purposes. Free tutorials are available to all users. Paid courses require enrollment and payment."),
    h2("Refund Policy"),
    list([
        "Full refund within 14 days of enrollment if less than 20% of course content is completed",
        "No refunds after certificate issuance",
        "Technical issues preventing access are handled case-by-case",
    ]),
    h2("User Conduct"),
    p("You agree not to scrape, redistribute, or resell course content without written permission. Account sharing is prohibited."),
    h2("Limitation of Liability"),
    p(`${SITE_NAME} provides educational content as-is. We do not guarantee employment outcomes or specific learning results.`),
];

export default function TermsPage() {
    return (
        <ContentPage
            title="Terms of Service"
            description={`Terms and conditions for using ${SITE_NAME}.`}
            path="/terms"
            badge="Legal"
            badgeHref="/legal"
            sections={sections}
        />
    );
}
