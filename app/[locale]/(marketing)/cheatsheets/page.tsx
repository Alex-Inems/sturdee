import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CHEATSHEETS } from "@/lib/cheatsheets";

export const metadata: Metadata = pageMetadata({
    title: "Free Programming Cheat Sheets — HTML, CSS, JS, Python, Git, SQL, Liquid",
    description:
        "Download-free programming cheat sheets. Quick reference for HTML, CSS, JavaScript, Python, Git, SQL, and Shopify Liquid. Printable and SEO-friendly.",
    path: "/cheatsheets",
    keywords: ["programming cheat sheet", "html cheat sheet", "css cheat sheet", "javascript cheat sheet"],
});

export default function CheatsheetsIndexPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Cheat Sheets</h1>
                <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed">
                    Quick-reference sheets for developers. Bookmark, share, and link to these from your blog or course.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                    {CHEATSHEETS.map((sheet) => (
                        <Link
                            key={sheet.slug}
                            href={`/cheatsheets/${sheet.slug}`}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover:border-emerald-200 transition-all"
                        >
                            <h2 className="text-lg font-bold text-gray-900">{sheet.title}</h2>
                            <p className="text-sm text-gray-500 font-medium mt-2">{sheet.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
