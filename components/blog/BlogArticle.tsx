import Link from "next/link";
import TutorialPageContent from "@/components/tutorials/TutorialPageContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getCategorySlug } from "@/lib/blog";
import { blogPostJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import type { BlogPost } from "@/lib/blog/types";
import type { TutorialBlock } from "@/lib/tutorials/types";
import type { Locale } from "@/i18n/routing";

function extractFaq(sections: TutorialBlock[]) {
    const block = sections.find((s) => s.type === "faq");
    if (!block || block.type !== "faq") return [];
    return block.items;
}

const UI: Record<Locale, { home: string; blog: string; related: string; continueLearning: string }> = {
    en: {
        home: "Home",
        blog: "Blog",
        related: "Related articles",
        continueLearning: "Continue learning interactively",
    },
    fr: {
        home: "Accueil",
        blog: "Blog",
        related: "Articles connexes",
        continueLearning: "Continuer à apprendre en interactif",
    },
    es: {
        home: "Inicio",
        blog: "Blog",
        related: "Artículos relacionados",
        continueLearning: "Seguir aprendiendo de forma interactiva",
    },
    zh: {
        home: "首页",
        blog: "博客",
        related: "相关文章",
        continueLearning: "继续互动学习",
    },
};

interface BlogArticleProps {
    post: BlogPost;
    related?: BlogPost[];
    locale?: Locale;
}

export default function BlogArticle({ post, related = [], locale = "en" }: BlogArticleProps) {
    const path = `/blog/${post.slug}`;
    const faqItems = extractFaq(post.sections);
    const labels = UI[locale] ?? UI.en;
    const dateLocale = locale === "zh" ? "zh-CN" : locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US";
    const published = new Date(post.publishedAt).toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: labels.home, path: "/" },
                        { name: labels.blog, path: "/blog" },
                        { name: post.title, path },
                    ]),
                    blogPostJsonLd(post),
                    ...(faqItems.length ? [faqJsonLd(faqItems)] : []),
                ]}
            />
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: labels.home, href: "/" },
                        { label: labels.blog, href: "/blog" },
                        { label: post.title },
                    ]}
                />
                <article className="rounded-2xl border border-gray-200 bg-white shadow-xl p-6 md:p-10 mt-4 overflow-hidden">
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
                            <p className="text-sm font-bold text-gray-900 mb-2">{labels.continueLearning}</p>
                            <Link href={post.tutorialPath} className="text-emerald-700 font-semibold text-sm hover:underline">
                                {post.tutorialPath} →
                            </Link>
                        </div>
                    )}
                    {related.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">{labels.related}</h2>
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
