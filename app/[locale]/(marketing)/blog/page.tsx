import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalizedHubMeta } from "@/lib/i18n/metadata";
import { BLOG_POSTS, BLOG_POST_COUNT, getCategorySlug } from "@/lib/blog";
import { assertFeatureEnabled } from "@/lib/features";
import { getLocaleSeoKeywords } from "@/lib/i18n/seo-locale";
import { blogListJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const meta = await getLocalizedHubMeta(locale as Locale, "blog");
    const description =
        locale === "en"
            ? `Read ${BLOG_POST_COUNT}+ free articles on HTML, CSS, JavaScript, Python, Shopify Liquid, SQL, and developer careers. SEO-optimized lessons linked to Sturdee tutorials.`
            : meta.description;
    return pageMetadata({
        title: meta.title,
        description,
        path: "/blog",
        locale: locale as Locale,
        keywords: getLocaleSeoKeywords(locale as Locale),
    });
}

const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))];

export default async function BlogIndexPage({ params }: Props) {
    assertFeatureEnabled("blog");
    const { locale } = await params;

    const sorted = [...BLOG_POSTS].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const heading =
        locale === "fr"
            ? {
                  badge: `${BLOG_POST_COUNT} articles`,
                  title: "Apprendre l'IA & coder — Blog Sturdee",
                  subtitle:
                      "Guides approfondis sur l'intelligence artificielle, le prompt engineering, les tutoriels de code gratuits et le développement web.",
              }
            : locale === "es"
              ? {
                    badge: `${BLOG_POST_COUNT} artículos`,
                    title: "Aprende IA y código — Blog Sturdee",
                    subtitle:
                        "Guías profundas sobre inteligencia artificial, ingeniería de prompts, tutoriales de código gratis y desarrollo web.",
                }
              : locale === "zh"
                ? {
                      badge: `${BLOG_POST_COUNT} 篇文章`,
                      title: "学 AI 与编程 — Sturdee 博客",
                      subtitle:
                          "深入指南：人工智能、提示词工程、免费编程教程与网页开发 — 每篇都链接到互动练习。",
                  }
                : {
                      badge: `${BLOG_POST_COUNT} Articles`,
                      title: "Learn AI & Code — Sturdee Blog",
                      subtitle:
                          "In-depth guides on artificial intelligence, prompt engineering, free coding tutorials, and web development — each article links to free interactive lessons and skill paths.",
                  };

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd data={blogListJsonLd(BLOG_POST_COUNT)} />
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs mb-4">
                    {heading.badge}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{heading.title}</h1>
                <p className="text-lg text-gray-500 font-medium mb-8 leading-relaxed">{heading.subtitle}</p>

                <div className="flex flex-wrap gap-2 mb-10">
                    <Link
                        href="/blog"
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-900 text-white"
                    >
                        All
                    </Link>
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat}
                            href={`/blog/category/${getCategorySlug(cat)}`}
                            className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-emerald-200 transition-colors"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                <div className="space-y-4">
                    {sorted.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover:border-emerald-200 hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-emerald-600">{post.category}</span>
                                <span className="text-xs text-gray-400">
                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                                <span className="text-xs text-gray-400">{post.readTime}</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                            <p className="text-gray-500 font-medium mt-2 text-sm leading-relaxed line-clamp-2">
                                {post.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
