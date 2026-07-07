import Link from "next/link";
import TutorialPageContent from "@/components/tutorials/TutorialPageContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { TutorialBlock } from "@/lib/tutorials/types";

interface ContentPageProps {
    title: string;
    description: string;
    path: string;
    badge: string;
    badgeHref?: string;
    readTime?: string;
    sections: TutorialBlock[];
    children?: React.ReactNode;
}

export default function ContentPage({
    title,
    description,
    path,
    badge,
    badgeHref,
    readTime,
    sections,
    children,
}: ContentPageProps) {
    const hubHref = badgeHref ?? `/${badge.toLowerCase()}`;
    const crumbs = [
        { label: "Home", href: "/" },
        { label: badge, href: hubHref },
        { label: title },
    ];

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: badge, path: hubHref },
                        { name: title, path },
                    ]),
                    articleJsonLd(title, description, path),
                ]}
            />
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Breadcrumbs items={crumbs} />
                <article className="rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 mb-2">{badge}</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                    {readTime && <p className="text-sm text-gray-400 font-medium mb-6">{readTime}</p>}
                    <TutorialPageContent sections={sections} />
                    {children}
                </article>
            </div>
        </div>
    );
}
