import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { CHALLENGES } from "@/lib/credentials";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Free Micro-Certificates — Verified by Code Commits",
    description:
        "Earn free cryptographic micro-credentials on Sturdee by pushing working code to a simulated Git repo — not by paying for multiple-choice quiz certificates.",
    path: "/credentials",
    keywords: [
        "micro-credentials",
        "free coding certificate",
        "git certificate",
        "verified developer credentials",
        "alternative to W3Schools certificate",
    ],
});

export default function CredentialsMarketingPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Sturdee Micro-Certificates",
                    description: "Free cryptographic credentials verified by actual code commits.",
                    url: "https://sturdee.com/credentials",
                }}
            />
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs mb-4">
                    Free · Commit-Verified
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Micro-Certificates Verified by Real Code
                </h1>
                <p className="text-lg text-gray-500 font-medium mb-10 max-w-3xl leading-relaxed">
                    W3Schools charges for generic quiz certificates. Sturdee issues{" "}
                    <strong className="text-gray-800">free, cryptographic micro-credentials</strong> when you
                    successfully push a working, bug-free feature to a simulated Git repository — the same way
                    professional teams ship software.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">❌ Quiz Certificates</h2>
                        <ul className="text-sm text-gray-600 space-y-2 font-medium">
                            <li>• Pay $95+ for multiple-choice tests</li>
                            <li>• No proof you can write code</li>
                            <li>• Same generic credential for everyone</li>
                            <li>• Employers increasingly ignore them</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">✓ Sturdee Micro-Certs</h2>
                        <ul className="text-sm text-gray-600 space-y-2 font-medium">
                            <li>• 100% free — always</li>
                            <li>• Pass automated tests on your commits</li>
                            <li>• Cryptographic signature + public verify URL</li>
                            <li>• Tied to specific skills (HTML, APIs, Python…)</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                <ol className="grid sm:grid-cols-4 gap-4 mb-16">
                    {[
                        { step: "1", title: "Open Workspace", desc: "Get a simulated repo with starter files for a module challenge." },
                        { step: "2", title: "Write Code", desc: "Build the feature — semantic HTML, Flexbox nav, API handler, etc." },
                        { step: "3", title: "Commit & Test", desc: "git add, git commit, run tests. Fix bugs until everything passes." },
                        { step: "4", title: "Push & Earn", desc: "git push issues your signed micro-certificate with a verify link." },
                    ].map((item) => (
                        <li key={item.step} className="rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
                            <span className="text-2xl font-bold text-emerald-600">{item.step}</span>
                            <h3 className="font-bold text-gray-900 mt-2 mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                        </li>
                    ))}
                </ol>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Challenges</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {CHALLENGES.map((c) => (
                        <Link
                            key={c.id}
                            href={`/workspace/${c.id}`}
                            className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-lg hover:border-emerald-200 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-emerald-600">{c.skill}</span>
                                <span className="text-xs text-gray-400">{c.moduleTitle}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                            <p className="text-sm text-gray-500 font-medium">{c.description}</p>
                        </Link>
                    ))}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl">
                    <p className="text-gray-600 font-medium mb-4">
                        Sign in to start a challenge. Your workspace and commit history are saved to your account.
                    </p>
                    <Link
                        href="/?auth=login"
                        className="inline-flex px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        Sign In & Start Building →
                    </Link>
                </div>
            </div>
        </div>
    );
}
