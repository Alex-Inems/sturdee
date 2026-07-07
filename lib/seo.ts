import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { TutorialPage, TutorialTrack } from "@/lib/tutorials/types";

const DEFAULT_KEYWORDS = [
    "learn to code",
    "free programming tutorials",
    "web development courses",
    "HTML CSS JavaScript tutorial",
    "Python tutorial",
    "Shopify Liquid tutorial",
    "coding for beginners",
    "interactive coding lessons",
    SITE_NAME.toLowerCase(),
];

export const NOINDEX_ROBOTS: Metadata["robots"] = {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
};

export const rootMetadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} — Free Coding Tutorials, Courses & Study Resources`,
        template: `%s | ${SITE_NAME}`,
    },
    description:
        "Master web development, programming, and Shopify Liquid with free interactive tutorials. Read lessons, copy code, watch videos, and run examples — the Sturdee way.",
    keywords: DEFAULT_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "education",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: `${SITE_NAME} — Free Coding Tutorials & Courses`,
        description:
            "Free interactive tutorials for HTML, CSS, JavaScript, Python, SQL, Java, Shopify Liquid, and 20+ languages. Learn by doing on Sturdee.",
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE_NAME} — Free Coding Tutorials`,
        description: "Interactive programming tutorials with code examples, videos, and try-it-yourself editors.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
};

type PageMetaInput = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    type?: "website" | "article";
};

export function pageMetadata({
    title,
    description,
    path,
    keywords = [],
    type = "website",
}: PageMetaInput): Metadata {
    const url = `${SITE_URL}${path}`;
    return {
        title,
        description,
        keywords: [...DEFAULT_KEYWORDS, ...keywords],
        alternates: { canonical: url },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url,
            type,
            siteName: SITE_NAME,
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
        },
    };
}

export function getTutorialPageDescription(page: TutorialPage, languageName: string): string {
    if (page.description) return page.description;

    const firstParagraph = page.sections.find(
        (block): block is Extract<typeof block, { type: "p" }> => block.type === "p"
    );
    if (firstParagraph) {
        const text = firstParagraph.text.trim();
        if (text.length <= 155) return text;
        return `${text.slice(0, 152).trim()}…`;
    }

    return `Free ${languageName} tutorial: ${page.title}. Step-by-step lessons with code examples, video walkthroughs, and a try-it-yourself editor on ${SITE_NAME}.`;
}

export function tutorialLessonMetadata(
    track: TutorialTrack,
    page: TutorialPage,
    lang: string,
    slug: string
): Metadata {
    const title = `${page.title} — ${track.language.name} Tutorial`;
    const description = getTutorialPageDescription(page, track.language.name);
    const path = `/tutorials/${lang}/${slug}`;
    const keywords = [
        track.language.name.toLowerCase(),
        `${track.language.name.toLowerCase()} tutorial`,
        page.title.toLowerCase(),
        "free tutorial",
        "learn programming",
    ];

    return pageMetadata({
        title,
        description,
        path,
        keywords,
        type: "article",
    });
}

export function tutorialLanguageMetadata(track: TutorialTrack): Metadata {
    const pageCount = track.sections.reduce((total, section) => total + section.pages.length, 0);
    const title = `Learn ${track.language.name} — Free Tutorial`;
    const description = `${track.language.tagline} Free ${track.language.name} tutorial with ${pageCount} interactive lessons, code examples, and video guides. Start learning on ${SITE_NAME}.`;

    return pageMetadata({
        title,
        description,
        path: `/tutorials/${track.language.id}`,
        keywords: [
            track.language.name.toLowerCase(),
            `learn ${track.language.name.toLowerCase()}`,
            `${track.language.name.toLowerCase()} tutorial for beginners`,
        ],
    });
}

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: [SITE_URL],
        description: rootMetadata.description,
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: rootMetadata.description,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/tutorials?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    };
}

export function tutorialLessonJsonLd(
    track: TutorialTrack,
    page: TutorialPage,
    lang: string,
    slug: string
) {
    const path = `/tutorials/${lang}/${slug}`;
    return {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: page.title,
        description: getTutorialPageDescription(page, track.language.name),
        url: `${SITE_URL}${path}`,
        learningResourceType: "tutorial",
        educationalLevel: "Beginner",
        inLanguage: "en",
        isAccessibleForFree: true,
        provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        about: {
            "@type": "Thing",
            name: track.language.name,
        },
    };
}

export function courseListJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${SITE_NAME} Courses`,
        url: `${SITE_URL}/courses`,
        description: "Web development, programming, and cryptocurrency courses.",
    };
}
