import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import AiTutorChat from "@/components/ai/AiTutorChat";
import { assertFeatureEnabled } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "AI Tutor — Learn with Sturdee",
    description:
        "Chat with Sturdee’s AI tutor about automation, prompts, agents, and AI-augmented career skills. Practice anytime, then join a live cohort.",
    path: "/ai",
    keywords: ["AI tutor", "AI learning", "prompt engineering", "AI automation", "Sturdee"],
});

export default function AiHubPage() {
    assertFeatureEnabled("ai");

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="AI Tutor"
                title="Learn AI. Learn with AI."
                subtitle="Ask questions, get explanations, and practice — then register for a live cohort with a human tutor."
            />
            <SectionShell compact>
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">What you can do</h2>
                            <ul className="mt-4 space-y-3 text-sm font-medium text-gray-600">
                                <li>· Ask about prompts, agents, and automation workflows</li>
                                <li>· Get help while reading tutorials and skill pages</li>
                                <li>· Practice with the AI coach on lesson pages</li>
                                <li>· Register at /book for smart skill matching + a cohort</li>
                            </ul>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/skills"
                                className="rounded-full bg-[#10B981] hover:bg-[#0F9F72] px-5 py-2.5 text-sm font-semibold text-white"
                            >
                                Browse AI skills
                            </Link>
                            <Link
                                href="/book"
                                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-300"
                            >
                                Register for a cohort
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <AiTutorChat
                            embedded
                            defaultOpen
                            context={{ pageTitle: "Sturdee AI Tutor hub" }}
                        />
                    </div>
                </div>
            </SectionShell>
        </div>
    );
}
