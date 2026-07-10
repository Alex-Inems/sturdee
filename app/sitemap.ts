import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/routing";
import { BLOG_POSTS, getAllCategorySlugs } from "@/lib/blog";
import { CHEATSHEETS } from "@/lib/cheatsheets";
import { getCourseCurriculum } from "@/lib/course-content";
import { COURSE_CATEGORIES, LEARNING_PATHS } from "@/lib/courses";
import { getPublishedCourses } from "@/lib/courses-db";
import { GUIDES } from "@/lib/guides";
import { MEDIA_ASSETS } from "@/lib/media";
import { categorySlug } from "@/lib/slug";
import { LOCALES, localizedUrl } from "@/lib/site";
import { SITE_URL } from "@/lib/site-core";
import { TUTORIAL_TRACKS } from "@/lib/tutorials";
import { OSS_TOOLS } from "@/lib/opensource";
import { getPracticeCatalog, PRACTICE_TOPICS, topicSlug } from "@/lib/practice";
import { getPublishedTutorSlugs } from "@/lib/tutors-db";

type Sitemap = MetadataRoute.Sitemap;

function localeEntries(
    path: string,
    priority: number,
    changeFrequency: Sitemap[number]["changeFrequency"] = "weekly",
    images?: string[],
    lastModified?: string
): Sitemap {
    return LOCALES.map((locale) => ({
        url: localizedUrl(locale as Locale, path),
        lastModified: lastModified ? new Date(lastModified) : new Date(),
        changeFrequency,
        priority,
        ...(images && images.length > 0 && { images: images.map((img) => `${SITE_URL}${img}`) }),
    }));
}

export default async function sitemap(): Promise<Sitemap> {
    const staticRoutes = localeEntries("/", 1, "weekly").concat(
        localeEntries("/tutorials", 0.95, "daily"),
        localeEntries("/guides", 0.9, "weekly"),
        localeEntries("/blog", 0.92, "daily"),
        localeEntries("/cheatsheets", 0.9, "weekly"),
        localeEntries("/resources", 0.85, "monthly"),
        localeEntries("/courses", 0.9, "weekly"),
        localeEntries("/opensource", 0.91, "weekly"),
        localeEntries("/practice", 0.93, "daily"),
        localeEntries("/credentials", 0.9, "weekly"),
        localeEntries("/programs", 0.85, "weekly"),
        localeEntries("/tutors", 0.9, "daily"),
        localeEntries("/media", 0.8, "monthly"),
        localeEntries("/privacy", 0.3, "yearly"),
        localeEntries("/terms", 0.3, "yearly"),
        localeEntries("/legal", 0.3, "yearly")
    );

    const guideRoutes = GUIDES.flatMap((guide) => localeEntries(`/guides/${guide.slug}`, 0.88, "monthly"));
    const blogRoutes = BLOG_POSTS.flatMap((post) =>
        localeEntries(`/blog/${post.slug}`, 0.87, "weekly", undefined, post.publishedAt)
    );
    const blogCategoryRoutes = getAllCategorySlugs().flatMap((c) =>
        localeEntries(`/blog/category/${c.category}`, 0.86, "weekly")
    );
    const cheatsheetRoutes = CHEATSHEETS.flatMap((sheet) =>
        localeEntries(`/cheatsheets/${sheet.slug}`, 0.88, "monthly")
    );

    const categoryRoutes = COURSE_CATEGORIES.flatMap((cat) =>
        localeEntries(`/courses/category/${categorySlug(cat)}`, 0.87, "weekly")
    );

    const publishedCourses = await getPublishedCourses();

    const courseRoutes = publishedCourses.flatMap((course) => {
        const courseEntry = localeEntries(`/courses/${course.slug}`, 0.86, "weekly", [course.image]);
        const lessonEntries = getCourseCurriculum(course).flatMap((mod) =>
            mod.lessons.flatMap((lesson) =>
                localeEntries(`/courses/${course.slug}/lessons/${lesson.slug}`, 0.82, "monthly", [course.image])
            )
        );
        return [...courseEntry, ...lessonEntries];
    });

    const programRoutes = LEARNING_PATHS.flatMap((path) =>
        localeEntries(`/programs/${path.slug}`, 0.85, "monthly", [path.image])
    );

    const tutorSlugs = await getPublishedTutorSlugs();
    const tutorRoutes = tutorSlugs.flatMap((slug) => localeEntries(`/tutors/${slug}`, 0.88, "weekly"));

    const mediaRoutes = MEDIA_ASSETS.flatMap((asset) =>
        localeEntries(`/media/${asset.slug}`, 0.75, "yearly", [asset.path])
    );

    const tutorialRoutes = TUTORIAL_TRACKS.flatMap((track) => {
        const langHub = localeEntries(`/tutorials/${track.language.id}`, 0.9, "weekly");
        const lessons = track.sections.flatMap((section) =>
            section.pages.flatMap((page) =>
                localeEntries(`/tutorials/${track.language.id}/${page.slug}`, 0.8, "monthly")
            )
        );
        return [...langHub, ...lessons];
    });

    const ossRoutes = OSS_TOOLS.flatMap((tool) => localeEntries(`/opensource/${tool.slug}`, 0.86, "monthly"));

    const practiceRoutes = getPracticeCatalog().flatMap((p) =>
        localeEntries(`/practice/${p.slug}`, 0.84, "monthly")
    );
    const practiceTopicRoutes = PRACTICE_TOPICS.flatMap((t) =>
        localeEntries(`/practice/topic/${topicSlug(t)}`, 0.88, "weekly")
    );

    return [
        ...staticRoutes,
        ...guideRoutes,
        ...blogRoutes,
        ...blogCategoryRoutes,
        ...cheatsheetRoutes,
        ...ossRoutes,
        ...practiceRoutes,
        ...practiceTopicRoutes,
        ...categoryRoutes,
        ...courseRoutes,
        ...programRoutes,
        ...tutorRoutes,
        ...mediaRoutes,
        ...tutorialRoutes,
    ];
}
