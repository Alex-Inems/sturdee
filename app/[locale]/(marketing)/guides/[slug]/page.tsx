import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { GUIDES, getGuide } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("guides", () => GUIDES.map((g) => ({ slug: g.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) return {};
    return pageMetadata({
        title: guide.title,
        description: guide.description,
        path: `/guides/${slug}`,
        keywords: guide.keywords,
        type: "article",
    });
}

export default async function GuidePage({ params }: Props) {
    assertFeatureEnabled("guides");

    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) notFound();

    return (
        <ContentPage
            title={guide.title}
            description={guide.description}
            path={`/guides/${slug}`}
            badge="Guides"
            readTime={guide.readTime}
            sections={guide.sections}
        />
    );
}
