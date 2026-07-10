import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { h2, list, p } from "@/lib/tutorials/builder";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
    title: "Privacy Policy",
    description: `How ${SITE_NAME} collects, uses, and protects your personal data when you use our tutorials, courses, and platform.`,
    path: "/privacy",
});

const sections = [
    h2("Information We Collect"),
    p(`When you create an account on ${SITE_NAME}, we collect your email address, name, and authentication credentials. We also collect usage data such as pages visited, tutorials completed, and course progress.`),
    h2("How We Use Your Data"),
    list([
        "Provide and improve our educational services",
        "Personalize your learning experience",
        "Send course updates and account notifications",
        "Analyze site usage to improve content and performance",
    ]),
    h2("Data Storage & Security"),
    p("Account data is stored securely using Supabase with row-level security policies. We use HTTPS encryption for all data in transit."),
    h2("Your Rights"),
    p("You may request access to, correction of, or deletion of your personal data by contacting us. You can delete your account from your dashboard settings."),
    h2("Contact"),
    p(`For privacy inquiries, contact ${SITE_NAME} at ${SITE_URL}/resources.`),
];

export default function PrivacyPage() {
    return (
        <ContentPage
            title="Privacy Policy"
            description={`How ${SITE_NAME} handles your personal information.`}
            path="/privacy"
            badge="Legal"
            badgeHref="/legal"
            sections={sections}
        />
    );
}
