import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
import type { CourseModule } from "@/lib/course-content";
import { getDefaultModulesForCategory } from "@/lib/course-content";
import type { Course, CourseCategory } from "@/lib/courses";
import { IMAGES } from "@/lib/images";
import { tutorAvatarUrl } from "@/lib/tutors";
import { getTutorProfileByUserId } from "@/lib/tutors-db";

export type CourseStatus = "draft" | "published" | "suspended";

export interface CourseRow {
    id: string;
    tutor_profile_id: string;
    user_id: string;
    slug: string;
    code: string;
    title: string;
    category: CourseCategory;
    level: Course["level"];
    duration: string;
    hours: number;
    students: number;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    image_url: string | null;
    format: Course["format"];
    featured: boolean;
    modules: CourseModule[];
    status: CourseStatus;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface CourseListingRow extends CourseRow {
    tutor_slug: string;
    tutor_name: string;
    tutor_title: string;
    tutor_image_url: string | null;
}

export interface CourseInput {
    title?: string;
    category?: CourseCategory;
    level?: Course["level"];
    duration?: string;
    hours?: number;
    price?: number;
    description?: string;
    image_url?: string | null;
    format?: Course["format"];
    featured?: boolean;
    modules?: CourseModule[];
    code?: string;
    useTemplate?: boolean;
}

function defaultCourseImage(): string {
    return IMAGES.featuredDigital;
}

function mapListingToCourse(row: CourseListingRow): Course {
    return {
        id: row.id,
        code: row.code || row.slug.toUpperCase().slice(0, 8),
        slug: row.slug,
        title: row.title,
        category: row.category,
        level: row.level,
        instructor: row.tutor_name,
        instructorSlug: row.tutor_slug,
        instructorTitle: row.tutor_title || "Tutor on Sturdee",
        instructorImage: row.tutor_image_url || tutorAvatarUrl(row.tutor_name),
        duration: row.duration || "Self-paced",
        hours: row.hours,
        students: row.students,
        price: Number(row.price),
        rating: Number(row.rating),
        reviews: row.reviews,
        description: row.description,
        image: row.image_url || defaultCourseImage(),
        format: row.format,
        featured: row.featured,
        updatedAt: (row.updated_at ?? row.created_at).slice(0, 10),
        modules: row.modules ?? [],
        tutorProfileId: row.tutor_profile_id,
    };
}

async function uniqueCourseSlug(base: string, userId: string): Promise<string> {
    const supabase = await createClient();
    let slug = slugify(base) || `course-${userId.slice(0, 8)}`;
    const { data } = await supabase.from("tutor_courses").select("slug").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    return `${slug}-${userId.slice(0, 6)}`;
}

export async function getPublishedCourses(): Promise<Course[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("course_listings")
        .select("*")
        .order("published_at", { ascending: false });

    if (error) {
        console.error("getPublishedCourses:", error.message);
        return [];
    }
    return (data as CourseListingRow[]).map(mapListingToCourse);
}

export async function getPublishedCourseBySlug(slug: string): Promise<Course | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("course_listings")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error || !data) return null;
    return mapListingToCourse(data as CourseListingRow);
}

export async function getPublishedCourseSlugs(): Promise<string[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_courses")
        .select("slug")
        .eq("status", "published");

    if (error) return [];
    return (data ?? []).map((r) => r.slug as string);
}

export async function getCoursesByTutorSlug(tutorSlug: string): Promise<Course[]> {
    const courses = await getPublishedCourses();
    return courses.filter((c) => c.instructorSlug === tutorSlug);
}

export async function getCoursesByCategory(category: CourseCategory): Promise<Course[]> {
    const courses = await getPublishedCourses();
    return courses.filter((c) => c.category === category);
}

export async function getFeaturedCourses(): Promise<Course[]> {
    const courses = await getPublishedCourses();
    const featured = courses.filter((c) => c.featured);
    return featured.length ? featured : courses.slice(0, 3);
}

export async function getCoursesByUserId(userId: string): Promise<CourseRow[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_courses")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

    if (error) return [];
    return (data ?? []) as CourseRow[];
}

export async function getCourseByUserAndSlug(userId: string, slug: string): Promise<CourseRow | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_courses")
        .select("*")
        .eq("user_id", userId)
        .eq("slug", slug)
        .maybeSingle();

    if (error || !data) return null;
    return data as CourseRow;
}

export async function createCourse(userId: string, input: CourseInput): Promise<CourseRow> {
    const profile = await getTutorProfileByUserId(userId);
    if (!profile) throw new Error("Tutor profile required");
    if (profile.status !== "published") {
        throw new Error("Publish your tutor profile before creating courses");
    }
    if (!input.title?.trim()) throw new Error("Course title is required");

    const supabase = await createClient();
    const slug = await uniqueCourseSlug(input.title, userId);
    const category = input.category ?? "Web Development";
    const modules =
        input.modules ??
        (input.useTemplate ? getDefaultModulesForCategory(category) : []);

    const { data, error } = await supabase
        .from("tutor_courses")
        .insert({
            tutor_profile_id: profile.id,
            user_id: userId,
            slug,
            code: input.code?.trim() || slug.toUpperCase().replace(/-/g, "").slice(0, 8),
            title: input.title.trim(),
            category,
            level: input.level ?? "Beginner",
            duration: input.duration ?? "",
            hours: input.hours ?? 0,
            price: input.price ?? 0,
            description: input.description ?? "",
            image_url: input.image_url ?? null,
            format: input.format ?? "Cohort",
            featured: input.featured ?? false,
            modules,
            status: "draft",
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as CourseRow;
}

export async function updateCourse(userId: string, slug: string, input: CourseInput): Promise<CourseRow> {
    const existing = await getCourseByUserAndSlug(userId, slug);
    if (!existing) throw new Error("Course not found");

    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (input.title !== undefined) patch.title = input.title;
    if (input.category !== undefined) patch.category = input.category;
    if (input.level !== undefined) patch.level = input.level;
    if (input.duration !== undefined) patch.duration = input.duration;
    if (input.hours !== undefined) patch.hours = input.hours;
    if (input.price !== undefined) patch.price = input.price;
    if (input.description !== undefined) patch.description = input.description;
    if (input.image_url !== undefined) patch.image_url = input.image_url;
    if (input.format !== undefined) patch.format = input.format;
    if (input.featured !== undefined) patch.featured = input.featured;
    if (input.modules !== undefined) patch.modules = input.modules;
    if (input.code !== undefined) patch.code = input.code;

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_courses")
        .update(patch)
        .eq("user_id", userId)
        .eq("slug", slug)
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as CourseRow;
}

export function validateCourseForPublish(row: CourseRow): string[] {
    const errors: string[] = [];
    if (!row.title?.trim()) errors.push("Title is required");
    if (!row.description?.trim()) errors.push("Description is required");
    if (!row.category) errors.push("Category is required");
    if (Number(row.price) < 0) errors.push("Price cannot be negative");
    if (!row.duration?.trim()) errors.push("Duration is required");
    if (row.hours < 1) errors.push("Add at least 1 instructional hour");
    return errors;
}

export async function publishCourse(userId: string, slug: string): Promise<CourseRow> {
    const course = await getCourseByUserAndSlug(userId, slug);
    if (!course) throw new Error("Course not found");

    const errors = validateCourseForPublish(course);
    if (errors.length) throw new Error(errors.join(". "));

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_courses")
        .update({
            status: "published",
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("slug", slug)
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as CourseRow;
}
