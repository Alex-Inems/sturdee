import Link from "next/link";
import TutorialPageContent from "@/components/tutorials/TutorialPageContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getCategorySlug } from "@/lib/blog";
import { blogPostJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import type { BlogPost } from "@/lib/blog/types";
import type { TutorialBlock } from "@/lib/tutorials/types";

function extractFaq(sections: TutorialBlock[]) {
    const block = sections.find((s) => s.type === "faq");
    if (!block || block.type !== "faq") return [];
    return block.items;
}

interface BlogArticleProps {
    post: BlogPost;
    related?: BlogPost[];
}

export default function BlogArticle({ post, related = [] }: BlogArticleProps) {
    const path = `/blog/${post.slug}`;
    const faqItems = extractFaq(post.sections);
    const published = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Blog", path: "/blog" },
                        { name: post.title, path },
                    ]),
                    blogPostJsonLd(post),
                    ...(faqItems.length ? [faqJsonLd(faqItems)] : []),
                ]}
            />
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blog" },
                        { label: post.title },
                    ]}
                />
                <article className="rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10 mt-4">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Link
                            href={`/blog/category/${getCategorySlug(post.category)}`}
                            className="text-xs font-bold uppercase tracking-wide text-emerald-600 hover:text-emerald-700"
                        >
                            {post.category}
                        </Link>
                        <span className="text-gray-300">·</span>
                        <time dateTime={post.publishedAt} className="text-xs text-gray-400 font-medium">
                            {published}
                        </time>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400 font-medium">{post.readTime}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6 border-l-4 border-emerald-500 pl-4">
                        {post.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.keywords.slice(0, 5).map((kw) => (
                            <span
                                key={kw}
                                className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[11px] font-semibold text-gray-600"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                    <TutorialPageContent sections={post.sections} />
                    {post.tutorialPath && (
                        <div className="mt-10 p-5 rounded-xl bg-emerald-50 border border-emerald-100">
                            <p className="text-sm font-bold text-gray-900 mb-2">Continue learning interactively</p>
                            <Link href={post.tutorialPath} className="text-emerald-700 font-semibold text-sm hover:underline">
                                Free tutorial: {post.tutorialPath} →
                            </Link>
                        </div>
                    )}
                    {related.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Related articles</h2>
                            <ul className="space-y-2">
                                {related.map((r) => (
                                    <li key={r.slug}>
                                        <Link href={`/blog/${r.slug}`} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                                            {r.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
}
