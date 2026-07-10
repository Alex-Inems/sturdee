import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { openGraphLocale, schemaLanguage } from "@/lib/i18n/translate";
import { SITE_NAME, SITE_URL } from "@/lib/site-core";
import { DEFAULT_LOCALE, hreflangAlternates, localizedUrl } from "@/lib/site";
import type { Course, LearningPath } from "@/lib/courses";
import type { MediaAsset } from "@/lib/media";
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
    locale?: Locale;
    keywords?: string[];
    type?: "website" | "article";
    image?: string;
    imageAlt?: string;
};

export function pageMetadata({
    title,
    description,
    path,
    locale = DEFAULT_LOCALE,
    keywords = [],
    type = "website",
    image,
    imageAlt,
}: PageMetaInput): Metadata {
    const url = localizedUrl(locale, path);
    const ogImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : localizedUrl(locale, "/opengraph-image");
    const localizedImageAlt = imageAlt ?? title;
    return {
        title,
        description,
        keywords: [...DEFAULT_KEYWORDS, ...keywords],
        alternates: {
            canonical: url,
            languages: hreflangAlternates(path),
        },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url,
            type,
            locale: openGraphLocale(locale),
            siteName: SITE_NAME,
            images: [{ url: ogImage, alt: localizedImageAlt, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
            images: [ogImage],
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

export function faqJsonLd(items: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

export function articleJsonLd(title: string, description: string, path: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE_URL}${path}`,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    };
}

export function blogPostMetadata(post: import("@/lib/blog/types").BlogPost): Metadata {
    const path = `/blog/${post.slug}`;
    const base = pageMetadata({
        title: post.seoTitle,
        description: post.description,
        path,
        keywords: post.keywords,
        type: "article",
    });

    return {
        ...base,
        openGraph: {
            ...base.openGraph,
            type: "article",
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            section: post.category,
            tags: post.keywords,
        },
        other: {
            "article:section": post.category,
            "article:tag": post.keywords.join(", "),
        },
    };
}

export function blogPostJsonLd(post: import("@/lib/blog/types").BlogPost) {
    const path = `/blog/${post.slug}`;
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        name: post.seoTitle,
        description: post.description,
        url: `${SITE_URL}${path}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: "en-US",
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
        },
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        about: { "@type": "Thing", name: post.focusKeyword },
        timeRequired: post.readTime,
        isAccessibleForFree: true,
    };
}

export function blogListJsonLd(count: number) {
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${SITE_NAME} Tech Blog`,
        url: `${SITE_URL}/blog`,
        description: "Free programming tutorials, web development guides, and tech lessons.",
        blogPost: `${count} articles on HTML, CSS, JavaScript, Python, Shopify, and more.`,
    };
}

export function courseListJsonLd(courses: Course[]) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${SITE_NAME} Courses`,
        url: `${SITE_URL}/courses`,
        description: "Web development, programming, and cryptocurrency courses.",
        numberOfItems: courses.length,
        itemListElement: courses.map((course, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/courses/${course.slug}`,
            name: course.title,
        })),
    };
}

export function courseMetadata(course: Course): Metadata {
    return pageMetadata({
        title: `${course.title} — ${course.level} Course`,
        description: `${course.description} ${course.duration}, ${course.format} format. Taught by ${course.instructor}. ${course.rating}★ rating from ${course.reviews} reviews.`,
        path: `/courses/${course.slug}`,
        keywords: [
            course.title.toLowerCase(),
            course.category.toLowerCase(),
            `${course.level.toLowerCase()} course`,
            course.instructor,
        ],
        type: "article",
        image: course.image,
        imageAlt: course.title,
    });
}

export function courseJsonLd(course: Course) {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description,
        url: `${SITE_URL}/courses/${course.slug}`,
        provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        educationalLevel: course.level,
        timeRequired: `PT${course.hours}H`,
        courseCode: course.code,
        image: `${SITE_URL}${course.image}`,
        offers: {
            "@type": "Offer",
            price: course.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/courses/${course.slug}`,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: course.rating,
            reviewCount: course.reviews,
        },
    };
}

export function courseLessonMetadata(course: Course, lessonTitle: string, lessonSlug: string): Metadata {
    const title = `${lessonTitle} — ${course.title}`;
    const description = `Lesson from ${course.title}: ${lessonTitle}. Part of the ${course.duration} ${course.format.toLowerCase()} course taught by ${course.instructor} on ${SITE_NAME}.`;
    return pageMetadata({
        title,
        description,
        path: `/courses/${course.slug}/lessons/${lessonSlug}`,
        keywords: [lessonTitle.toLowerCase(), course.title.toLowerCase(), "course lesson"],
        type: "article",
        image: course.image,
        imageAlt: lessonTitle,
    });
}

export function courseLessonJsonLd(course: Course, lessonTitle: string, lessonSlug: string, lessonDescription: string) {
    return {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: lessonTitle,
        description: lessonDescription,
        url: `${SITE_URL}/courses/${course.slug}/lessons/${lessonSlug}`,
        learningResourceType: "lesson",
        isPartOf: {
            "@type": "Course",
            name: course.title,
            url: `${SITE_URL}/courses/${course.slug}`,
        },
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    };
}

export function learningPathMetadata(path: LearningPath, courseCount = 0): Metadata {
    return pageMetadata({
        title: `${path.title} — Learning Path`,
        description: `${path.description}${courseCount ? ` ${courseCount} courses` : ""} over ${path.duration}. ${path.category} program at ${SITE_NAME}.`,
        path: `/programs/${path.slug}`,
        keywords: [path.title.toLowerCase(), "learning path", path.category.toLowerCase()],
        image: path.image,
        imageAlt: path.title,
    });
}

export function learningPathJsonLd(path: LearningPath) {
    return {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        name: path.title,
        description: path.description,
        url: `${SITE_URL}/programs/${path.slug}`,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        occupationalCategory: path.category,
        timeToComplete: path.duration,
        image: `${SITE_URL}${path.image}`,
    };
}

export function instructorMetadata(instructor: {
    name: string;
    title: string;
    bio: string;
    slug: string;
    image: string;
    expertise: string[];
}): Metadata {
    return pageMetadata({
        title: `${instructor.name} — Tutor Profile`,
        description: `${instructor.bio} Tutor at ${SITE_NAME}. ${instructor.title}.`,
        path: `/tutors/${instructor.slug}`,
        keywords: [instructor.name, "coding tutor", ...instructor.expertise.map((e) => e.toLowerCase())],
        image: instructor.image,
        imageAlt: instructor.name,
    });
}

export function instructorJsonLd(instructor: {
    name: string;
    title: string;
    bio: string;
    slug: string;
    image: string;
    expertise: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: instructor.name,
        jobTitle: instructor.title,
        description: instructor.bio,
        url: `${SITE_URL}/tutors/${instructor.slug}`,
        image: instructor.image.startsWith("http") ? instructor.image : `${SITE_URL}${instructor.image}`,
        worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        knowsAbout: instructor.expertise,
    };
}

export function mediaMetadata(asset: MediaAsset): Metadata {
    return pageMetadata({
        title: asset.title,
        description: asset.description,
        path: `/media/${asset.slug}`,
        keywords: [asset.category, asset.title.toLowerCase(), "education image"],
        image: asset.path,
        imageAlt: asset.alt,
    });
}

export function imageObjectJsonLd(asset: MediaAsset) {
    return {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: asset.title,
        description: asset.description,
        contentUrl: `${SITE_URL}${asset.path}`,
        url: `${SITE_URL}/media/${asset.slug}`,
        width: asset.width,
        height: asset.height,
        caption: asset.alt,
    };
}

export function categoryMetadata(category: string, slug: string): Metadata {
    return pageMetadata({
        title: `${category} Courses`,
        description: `Browse all ${category.toLowerCase()} courses at ${SITE_NAME}. Live cohorts, self-paced options, and verified certificates.`,
        path: `/courses/category/${slug}`,
        keywords: [`${category.toLowerCase()} courses`, "online classes", "programming bootcamp"],
    });
}

export function tutorMetadata(tutor: import("@/lib/tutors").Tutor): Metadata {
    return pageMetadata({
        title: `${tutor.name} — ${tutor.title}`,
        description: `${tutor.bio} $${tutor.hourlyRate}/hr · ${tutor.jobSuccess}% job success · ${tutor.location}. Book 1:1 sessions on ${SITE_NAME}.`,
        path: `/tutors/${tutor.slug}`,
        keywords: [...tutor.skills.map((s) => s.name.toLowerCase()), "tutor", "mentor", tutor.name],
        image: tutor.image,
        imageAlt: tutor.name,
    });
}

export function tutorJsonLd(tutor: import("@/lib/tutors").Tutor) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: tutor.name,
        jobTitle: tutor.title,
        description: tutor.bio,
        url: `${SITE_URL}/tutors/${tutor.slug}`,
        image: `${SITE_URL}${tutor.image}`,
        address: { "@type": "PostalAddress", addressLocality: tutor.location },
        knowsAbout: tutor.skills.map((s) => s.name),
        worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        offers: {
            "@type": "Offer",
            price: tutor.hourlyRate,
            priceCurrency: "USD",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: tutor.hourlyRate,
                priceCurrency: "USD",
                unitText: "hour",
            },
        },
    };
}

export function practiceProblemMetadata(
    problem: import("@/lib/practice").PracticeProblem,
    locale: Locale = DEFAULT_LOCALE,
    localized?: { title: string; description: string }
): Metadata {
    const title = localized?.title ?? `${problem.title} — ${problem.difficulty} Coding Problem #${problem.number}`;
    const description =
        localized?.description ??
        `${problem.description.replace(/\*\*/g, "")} Practice in our LeetCode-style IDE with JavaScript and Python solutions. Topic: ${problem.topic}.`;
    return pageMetadata({
        title,
        description: description.slice(0, 300),
        path: `/practice/${problem.slug}`,
        locale,
        keywords: problem.seoKeywords,
        type: "article",
    });
}

export function practiceProblemJsonLd(
    problem: import("@/lib/practice").PracticeProblem,
    locale: Locale = DEFAULT_LOCALE
) {
    return {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: problem.title,
        description: problem.description.replace(/\*\*/g, ""),
        url: localizedUrl(locale, `/practice/${problem.slug}`),
        inLanguage: schemaLanguage(locale),
        learningResourceType: "coding exercise",
        educationalLevel: problem.difficulty,
        teaches: problem.topics.join(", "),
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        isAccessibleForFree: true,
    };
}

export function practiceHubJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Sturdee Coding Practice — LeetCode-Style Problems",
        description: "1000+ algorithm and data structure practice problems with live code execution and solutions.",
        url: `${SITE_URL}/practice`,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    };
}
