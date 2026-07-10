import type { MetadataRoute } from "next";
import { BLOG_POSTS, getAllCategorySlugs } from "@/lib/blog";
import { CHEATSHEETS } from "@/lib/cheatsheets";
import { getCourseCurriculum } from "@/lib/course-content";
import { COURSE_CATEGORIES, COURSES, EXTENDED_INSTRUCTORS, LEARNING_PATHS } from "@/lib/courses";
import { GUIDES } from "@/lib/guides";
import { MEDIA_ASSETS } from "@/lib/media";
import { categorySlug } from "@/lib/slug";
import { SITE_URL } from "@/lib/site";
import { TUTORIAL_TRACKS } from "@/lib/tutorials";
import { getPublishedTutorSlugs } from "@/lib/tutors-db";

function entry(
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
    images?: string[],
    lastModified?: string
): MetadataRoute.Sitemap[number] {
    return {
        url: `${SITE_URL}${path}`,
        lastModified: lastModified ? new Date(lastModified) : new Date(),
        changeFrequency,
        priority,
        ...(images && images.length > 0 && { images: images.map((img) => `${SITE_URL}${img}`) }),
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        entry("/", 1, "weekly"),
        entry("/tutorials", 0.95, "daily"),
        entry("/guides", 0.9, "weekly"),
        entry("/blog", 0.92, "daily"),
        entry("/cheatsheets", 0.9, "weekly"),
        entry("/resources", 0.85, "monthly"),
        entry("/courses", 0.9, "weekly"),
        entry("/programs", 0.85, "weekly"),
        entry("/instructors", 0.85, "weekly"),
        entry("/tutors", 0.9, "daily"),
        entry("/media", 0.8, "monthly"),
        entry("/privacy", 0.3, "yearly"),
        entry("/terms", 0.3, "yearly"),
        entry("/legal", 0.3, "yearly"),
    ];

    const guideRoutes = GUIDES.map((guide) => entry(`/guides/${guide.slug}`, 0.88, "monthly"));
    const blogRoutes = BLOG_POSTS.map((post) =>
        entry(`/blog/${post.slug}`, 0.87, "weekly", undefined, post.publishedAt)
    );
    const blogCategoryRoutes = getAllCategorySlugs().map((c) =>
        entry(`/blog/category/${c.category}`, 0.86, "weekly")
    );
    const cheatsheetRoutes = CHEATSHEETS.map((sheet) =>
        entry(`/cheatsheets/${sheet.slug}`, 0.88, "monthly")
    );

    const categoryRoutes = COURSE_CATEGORIES.map((cat) =>
        entry(`/courses/category/${categorySlug(cat)}`, 0.87, "weekly")
    );

    const courseRoutes = COURSES.flatMap((course) => {
        const courseEntry = entry(`/courses/${course.slug}`, 0.86, "weekly", [course.image]);
        const lessonEntries = getCourseCurriculum(course).flatMap((mod) =>
            mod.lessons.map((lesson) =>
                entry(`/courses/${course.slug}/lessons/${lesson.slug}`, 0.82, "monthly", [course.image])
            )
        );
        return [courseEntry, ...lessonEntries];
    });

    const programRoutes = LEARNING_PATHS.map((path) =>
        entry(`/programs/${path.slug}`, 0.85, "monthly", [path.image])
    );

    const instructorRoutes = EXTENDED_INSTRUCTORS.map((instructor) =>
        entry(`/instructors/${instructor.slug}`, 0.84, "monthly", [instructor.image])
    );

    const tutorSlugs = await getPublishedTutorSlugs();
    const tutorRoutes = tutorSlugs.map((slug) => entry(`/tutors/${slug}`, 0.88, "weekly"));

    const mediaRoutes = MEDIA_ASSETS.map((asset) =>
        entry(`/media/${asset.slug}`, 0.75, "yearly", [asset.path])
    );

    const tutorialRoutes: MetadataRoute.Sitemap = TUTORIAL_TRACKS.flatMap((track) => {
        const langHub = entry(`/tutorials/${track.language.id}`, 0.9, "weekly");
        const lessons = track.sections.flatMap((section) =>
            section.pages.map((page) =>
                entry(`/tutorials/${track.language.id}/${page.slug}`, 0.8, "monthly")
            )
        );
        return [langHub, ...lessons];
    });

    return [
        ...staticRoutes,
        ...guideRoutes,
        ...blogRoutes,
        ...blogCategoryRoutes,
        ...cheatsheetRoutes,
        ...categoryRoutes,
        ...courseRoutes,
        ...programRoutes,
        ...instructorRoutes,
        ...tutorRoutes,
        ...mediaRoutes,
        ...tutorialRoutes,
    ];
}
