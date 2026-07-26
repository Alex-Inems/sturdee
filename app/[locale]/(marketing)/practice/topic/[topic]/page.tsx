import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import PracticeProblemList from "@/components/practice/PracticeProblemList";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import {
    getProblemsByTopic,
    PRACTICE_TOPICS,
    topicSlug,
    type PracticeTopic,
} from "@/lib/practice";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

interface Props {
    params: Promise<{ locale: string; topic: string }>;
}

function resolveTopic(slug: string): PracticeTopic | undefined {
    return PRACTICE_TOPICS.find((t) => topicSlug(t) === slug);
}

export function generateStaticParams() {
    return staticParamsFor("practice", () =>
        routing.locales.flatMap((locale) =>
            PRACTICE_TOPICS.map((topic) => ({ locale, topic: topicSlug(topic) }))
        )
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, topic: topicParam } = await params;
    const topic = resolveTopic(topicParam);
    if (!topic) return {};
    const problems = getProblemsByTopic(topic);
    return pageMetadata({
        title: `${topic} Coding Problems — Practice & Solutions`,
        description: `Practice ${problems.length} ${topic.toLowerCase()} coding interview problems. LeetCode-style environment with JavaScript and Python solutions on Sturdee.`,
        path: `/practice/topic/${topicParam}`,
        locale: locale as Locale,
        keywords: [
            `${topic.toLowerCase()} coding problems`,
            "leetcode practice",
            "coding interview",
            `${topic.toLowerCase()} algorithms`,
        ],
    });
}

export default async function PracticeTopicPage({ params }: Props) {
    assertFeatureEnabled("practice");

    const { topic: topicParam } = await params;
    const topic = resolveTopic(topicParam);
    if (!topic) notFound();

    const problems = getProblemsByTopic(topic);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: `${topic} Coding Practice Problems`,
                    description: `${problems.length} ${topic} algorithm problems with solutions.`,
                    url: `${SITE_URL}/practice/topic/${topicParam}`,
                }}
            />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Practice", href: "/practice" },
                        { label: topic },
                    ]}
                />
                <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-3">{topic} Problems</h1>
                <p className="text-gray-500 font-medium mb-8">
                    {problems.length} LeetCode-style problems focused on {topic.toLowerCase()}. Run code live and
                    study reference solutions.
                </p>
                <PracticeProblemList problems={problems} />
                <p className="text-center mt-8">
                    <Link href="/practice" className="text-emerald-600 font-semibold hover:underline text-sm">
                        ← All topics
                    </Link>
                </p>
            </div>
        </div>
    );
}
