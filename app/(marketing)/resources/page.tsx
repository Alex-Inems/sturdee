import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/content/ContentPage";
import { h2, h3, list, p, steps, code, tip, faq } from "@/lib/tutorials/builder";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
    title: "Developer Resources — SEO, Backlinks & Study Tools",
    description:
        "How to submit your sitemap to Google Search Console, earn backlinks for your education site, and use Sturdee tutorials, guides, and cheat sheets for learning.",
    path: "/resources",
    keywords: ["developer resources", "google search console sitemap", "programming backlinks"],
});

const sections = [
    h2("Submit Your Sitemap to Google (Fix Invalid Sitemap)"),
    p("If Google Search Console shows 'Invalid sitemap' or 'Couldn't fetch', the cause is almost always one of these fixable issues — not a broken XML file."),
    h3("Step 1 — Verify the sitemap loads in your browser"),
    p("After deploying, open this URL directly:"),
    code("text", `${SITE_URL}/sitemap.xml`),
    p("You should see XML starting with <?xml version=\"1.0\"?>. If you see an HTML error page, the deploy failed or the URL is wrong."),
    h3("Step 2 — Match your Search Console property exactly"),
    list([
        `If your site is ${SITE_URL} — add a URL-prefix property for that exact URL (with www)`,
        "Do NOT mix www and non-www — sitemap URLs must match the property",
        "If you use Vercel preview URLs (xxx.vercel.app), submit sitemap only on the production domain property",
    ]),
    steps([
        "Go to search.google.com/search-console",
        "Add property → URL prefix → enter your exact live domain",
        "Verify ownership (DNS TXT record or HTML file — DNS is most reliable)",
        "Open Sitemaps in the left sidebar",
        `Enter: sitemap.xml (not the full URL — GSC adds the domain)`,
        "Click Submit and wait 24–48 hours",
    ]),
    tip(`Set NEXT_PUBLIC_SITE_URL=${SITE_URL} in your production environment variables so sitemap URLs always match your live domain.`),
    h3("Step 3 — Fix common 'Invalid' errors"),
    list([
        "Couldn't fetch → Site not deployed yet, or robots.txt blocks Googlebot",
        "URL not allowed → Sitemap contains URLs from a different domain than the property",
        "Parse error → Rare with Next.js; redeploy latest code",
        "Pending → Normal for new sites; wait up to 1 week",
    ]),
    code("text", `Production env (Vercel example):\nNEXT_PUBLIC_SITE_URL=${SITE_URL}`),
    h2("Free Backlink Sources for Education Sites"),
    p("Backlinks are the #1 off-page SEO factor. Sturdee content is designed to be linkable — guides, cheat sheets, and 300+ tutorial pages. Submit and share these assets:"),
    h3("Directories & Communities (submit your site)"),
    list([
        "Google Search Console — sitemap + indexing (required)",
        "Bing Webmaster Tools — bing.com/webmasters (submit same sitemap)",
        "GitHub — link sturdee.online in your profile README and awesome-list PRs",
        "dev.to — write articles linking to /tutorials and /guides pages",
        "Hashnode — cross-post tutorial summaries with canonical to Sturdee",
        "Reddit — r/learnprogramming, r/webdev, r/shopify (follow rules, add value)",
        "Hacker News — 'Show HN' when launching major tutorial updates",
        "Product Hunt — launch as education product",
        "Indie Hackers — share build journey",
        "Lobsters — tech-focused community",
    ]),
    h3("Linkable pages on Sturdee (share these URLs)"),
    list([
        `${SITE_URL}/guides/how-to-learn-programming`,
        `${SITE_URL}/guides/web-developer-roadmap-2026`,
        `${SITE_URL}/guides/shopify-theme-development-guide`,
        `${SITE_URL}/cheatsheets/html-cheatsheet`,
        `${SITE_URL}/cheatsheets/javascript-cheatsheet`,
        `${SITE_URL}/cheatsheets/shopify-liquid-cheatsheet`,
        `${SITE_URL}/tutorials/liquid`,
        `${SITE_URL}/tutorials/html`,
    ]),
    h3("Earn links from other sites"),
    steps([
        "Guest post on dev blogs — include 1–2 links to relevant Sturdee tutorials",
        "Answer Stack Overflow questions — link to your cheat sheet when genuinely helpful",
        "Create GitHub 'awesome-*' lists linking to Sturdee guides",
        "Reach out to bootcamps and offer free tutorial links for students",
        "Submit cheat sheets to freebie directories and Notion template galleries",
        "Partner with YouTube creators — offer tutorial pages as show notes links",
    ]),
    h2("Link to Sturdee (for partners & bloggers)"),
    p("If you write about us, use this HTML snippet:"),
    code("html", `<a href="${SITE_URL}/tutorials">Free coding tutorials on Sturdee</a>`),
  p("Suggested anchor text: 'free coding tutorials', 'learn programming free', 'Shopify Liquid tutorial', 'HTML cheat sheet'."),
    faq([
        {
            question: "How many backlinks do I need to rank #1?",
            answer: "There is no fixed number. Focus on quality links from relevant education and developer sites. 20–50 strong links outperform 500 spam links.",
        },
        {
            question: "How long until Google indexes my tutorials?",
            answer: "After sitemap submission, most pages index within 1–4 weeks. New domains may take 2–3 months to build authority.",
        },
        {
            question: "Why is my sitemap still invalid?",
            answer: `Confirm ${SITE_URL}/sitemap.xml loads XML in an incognito browser, your Search Console property matches exactly (www vs non-www), and you deployed the latest code with NEXT_PUBLIC_SITE_URL set.`,
        },
    ]),
];

export default function ResourcesPage() {
    return (
        <ContentPage
            title="Developer Resources & SEO Setup"
            description="Google Search Console sitemap guide, backlink sources, and linkable Sturdee assets."
            path="/resources"
            badge="Resources"
            sections={sections}
        >
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-3">
                <Link href="/tutorials" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Tutorials →</Link>
                <Link href="/guides" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Guides →</Link>
                <Link href="/cheatsheets" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Cheat Sheets →</Link>
            </div>
        </ContentPage>
    );
}
