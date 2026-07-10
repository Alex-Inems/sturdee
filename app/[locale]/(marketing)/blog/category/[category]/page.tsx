import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { BLOG_POSTS, getCategorySlug, getPostsByCategory, type BlogCategory } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ category: string }>;
}

const SLUG_TO_CATEGORY: Record<string, BlogCategory> = Object.fromEntries(
    [...new Set(BLOG_POSTS.map((p) => p.category))].map((cat) => [getCategorySlug(cat), cat])
) as Record<string, BlogCategory>;

export function generateStaticParams() {
    return Object.keys(SLUG_TO_CATEGORY).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const cat = SLUG_TO_CATEGORY[category];
    if (!cat) return {};
    return pageMetadata({
        title: `${cat} Blog — Programming Articles & Tutorials`,
        description: `Free ${cat.toLowerCase()} articles, guides, and lessons. Learn ${cat.toLowerCase()} with Sturdee tutorials and blog posts.`,
        path: `/blog/category/${category}`,
        keywords: [`${cat.toLowerCase()} blog`, `${cat.toLowerCase()} tutorial`, "programming articles"],
        type: "website",
    });
}

export default async function BlogCategoryPage({ params }: Props) {
    const { category } = await params;
    const cat = SLUG_TO_CATEGORY[category];
    if (!cat) notFound();

    const posts = getPostsByCategory(cat);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Blog", path: "/blog" },
                    { name: cat, path: `/blog/category/${category}` },
                ])}
            />
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <Link href="/blog" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-4 inline-block">
                    ← All articles
                </Link>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{cat}</h1>
                <p className="text-gray-500 font-medium mb-10">{posts.length} articles</p>
                <div className="space-y-4">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover:border-emerald-200 transition-all"
                        >
                            <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
