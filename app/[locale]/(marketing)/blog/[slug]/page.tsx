import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { assertFeatureEnabled, staticParamsFor } from "@/lib/features";
import { blogPostMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return staticParamsFor("blog", () => BLOG_POSTS.map((p) => ({ slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return {};
    return blogPostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
    assertFeatureEnabled("blog");

    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) notFound();

    const related = post.relatedSlugs
        .map((s) => getBlogPost(s))
        .filter((p): p is NonNullable<typeof p> => !!p);

    return <BlogArticle post={post} related={related} />;
}
