import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { h2, p } from "@/lib/tutorials/builder";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
    title: "Legal Information",
    description: `Legal notices, copyright information, and compliance details for ${SITE_NAME}.`,
    path: "/legal",
});

const sections = [
    h2("Copyright"),
    p(`All tutorials, course materials, guides, cheat sheets, and visual assets on ${SITE_NAME} are protected by copyright. You may link to our pages but may not reproduce content without permission.`),
    h2("Trademarks"),
    p(`${SITE_NAME} and its logo are trademarks. Third-party names (React, Next.js, Shopify, etc.) are property of their respective owners.`),
    h2("Accessibility"),
    p("We are committed to making our platform accessible. Report accessibility issues through our resources page."),
    h2("Governing Law"),
    p("These terms are governed by applicable law. Disputes will be resolved through binding arbitration where permitted."),
];

export default function LegalPage() {
    return (
        <ContentPage
            title="Legal Information"
            description={`Legal notices and copyright for ${SITE_NAME}.`}
            path="/legal"
            badge="Legal"
            sections={sections}
        />
    );
}
