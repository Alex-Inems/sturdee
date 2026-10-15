import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { BLOG_POSTS, getCategorySlug, getPostsByCategory, type BlogCategory } from "@/lib/blog";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
    params: Promise<{ locale: string; category: string }>;
}

const SLUG_TO_CATEGORY: Record<string, BlogCategory> = Object.fromEntries(
    [...new Set(BLOG_POSTS.map((p) => p.category))].map((cat) => [getCategorySlug(cat), cat])
) as Record<string, BlogCategory>;

export function generateStaticParams() {
    return staticParamsFor("blog", () =>
        routing.locales.flatMap((locale) =>
            Object.keys(SLUG_TO_CATEGORY).map((category) => ({ locale, category }))
        )
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, category } = await params;
    const cat = SLUG_TO_CATEGORY[category];
    if (!cat) return {};
    const isAi = cat === "AI";
    return pageMetadata({
        title: isAi
            ? "AI Blog — Learn Artificial Intelligence Free"
            : `${cat} Blog — Programming Articles & Tutorials`,
        description: isAi
            ? "Free AI articles: learn artificial intelligence, prompt engineering, generative AI courses, and coding with AI — linked to Sturdee practice."
            : `Free ${cat.toLowerCase()} articles, guides, and lessons. Learn ${cat.toLowerCase()} with Sturdee tutorials and blog posts.`,
        path: `/blog/category/${category}`,
        locale: locale as Locale,
        keywords: isAi
            ? [
                  "AI blog",
                  "learn artificial intelligence free",
                  "prompt engineering tutorial",
                  "free generative AI courses",
                  "AI tutorials",
              ]
            : [`${cat.toLowerCase()} blog`, `${cat.toLowerCase()} tutorial`, "programming articles"],
        type: "website",
    });
}

export default async function BlogCategoryPage({ params }: Props) {
    assertFeatureEnabled("blog");

    const { locale, category } = await params;
    const cat = SLUG_TO_CATEGORY[category];
    if (!cat) notFound();

    const posts = getPostsByCategory(cat, locale as Locale);

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
                            className="group flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-lg hover:border-emerald-200 transition-all"
                        >
                            {post.coverImage ? (
                                <div className="sm:w-40 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-emerald-50/40">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.coverImage}
                                        alt={post.coverAlt ?? post.title}
                                        className="h-36 sm:h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                                        loading="lazy"
                                    />
                                </div>
                            ) : null}
                            <div className="min-w-0 flex-1 py-1">
                                <p className="text-xs font-semibold text-gray-400 mb-1">{post.readTime}</p>
                                <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
