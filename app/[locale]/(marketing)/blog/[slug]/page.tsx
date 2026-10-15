import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { blogPostMetadata, pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("blog", () =>
        routing.locales.flatMap((locale) => BLOG_POSTS.map((p) => ({ locale, slug: p.slug })))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = getBlogPost(slug, locale as Locale);
    if (!post) return {};
    const base = blogPostMetadata(post);
    return {
        ...base,
        ...pageMetadata({
            title: post.seoTitle,
            description: post.description,
            path: `/blog/${post.slug}`,
            locale: locale as Locale,
            keywords: post.keywords,
            type: "article",
            image: post.coverImage,
            imageAlt: post.coverAlt ?? post.title,
        }),
        openGraph: {
            ...base.openGraph,
            type: "article",
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            section: post.category,
            tags: post.keywords,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    assertFeatureEnabled("blog");

    const { locale, slug } = await params;
    const loc = locale as Locale;
    const post = getBlogPost(slug, loc);
    if (!post) notFound();

    const related = post.relatedSlugs
        .map((s) => getBlogPost(s, loc))
        .filter((p): p is NonNullable<typeof p> => !!p);

    return <BlogArticle post={post} related={related} locale={loc} />;
}
