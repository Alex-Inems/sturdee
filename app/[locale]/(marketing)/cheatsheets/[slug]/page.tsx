import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import { CHEATSHEETS, getCheatsheet } from "@/lib/cheatsheets";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("cheatsheets", () => CHEATSHEETS.map((c) => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const sheet = getCheatsheet(slug);
    if (!sheet) return {};
    return pageMetadata({
        title: sheet.title,
        description: sheet.description,
        path: `/cheatsheets/${slug}`,
        keywords: [sheet.language, "cheat sheet", "quick reference"],
        type: "article",
    });
}

export default async function CheatsheetPage({ params }: Props) {
    assertFeatureEnabled("cheatsheets");

    const { slug } = await params;
    const sheet = getCheatsheet(slug);
    if (!sheet) notFound();

    return (
        <ContentPage
            title={sheet.title}
            description={sheet.description}
            path={`/cheatsheets/${slug}`}
            badge="Cheatsheets"
            sections={sheet.sections}
        />
    );
}
