import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
import type {
    Tutor,
    TutorAvailability,
    TutorCertification,
    TutorEducation,
    TutorLanguage,
    TutorPortfolioItem,
    TutorSkill,
    SkillLevel,
} from "@/lib/tutors";
import { tutorAvatarUrl, tutorCoverUrl } from "@/lib/tutors";

export type TutorProfileStatus = "draft" | "published" | "suspended";

export interface TutorProfileRow {
    id: string;
    user_id: string;
    slug: string;
    display_name: string;
    status: TutorProfileStatus;
    onboarding_step: number;
    title: string;
    categories: string[];
    skills: TutorSkill[];
    bio: string;
    overview: string;
    location: string;
    timezone: string;
    english_level: string;
    languages: TutorLanguage[];
    hourly_rate: number;
    availability: TutorAvailability;
    education: TutorEducation[];
    certifications: TutorCertification[];
    portfolio: TutorPortfolioItem[];
    image_url: string | null;
    cover_image_url: string | null;
    job_success: number;
    total_hours: number;
    total_jobs: number;
    response_time: string;
    repeat_clients: number;
    verified: boolean;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface TutorListingRow extends TutorProfileRow {
    user_name: string;
}

export interface TutorProfileInput {
    title?: string;
    categories?: string[];
    skills?: TutorSkill[];
    bio?: string;
    overview?: string;
    location?: string;
    timezone?: string;
    english_level?: string;
    languages?: TutorLanguage[];
    hourly_rate?: number;
    availability?: TutorAvailability;
    education?: TutorEducation[];
    certifications?: TutorCertification[];
    portfolio?: TutorPortfolioItem[];
    image_url?: string | null;
    cover_image_url?: string | null;
    onboarding_step?: number;
}

function mapListingToTutor(row: TutorListingRow): Tutor {
    const memberSince = new Date(row.published_at ?? row.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return {
        slug: row.slug,
        userId: row.user_id,
        name: row.user_name,
        title: row.title || "Tutor on Sturdee",
        location: row.location || "Remote",
        timezone: row.timezone,
        hourlyRate: Number(row.hourly_rate),
        jobSuccess: row.job_success,
        totalEarned: row.total_jobs > 0 ? `$${(row.total_hours * Number(row.hourly_rate) * 0.7).toFixed(0)}+` : "$0",
        totalHours: row.total_hours,
        totalJobs: row.total_jobs,
        memberSince,
        availability: row.availability,
        englishLevel: row.english_level,
        badge: row.total_jobs >= 10 ? "Top Tutor" : row.total_jobs >= 3 ? "Rising Talent" : undefined,
        verified: row.verified,
        image: row.image_url || tutorAvatarUrl(row.user_name),
        coverImage: row.cover_image_url || tutorCoverUrl(row.slug),
        hasVideoIntro: false,
        bio: row.bio,
        overview: row.overview || row.bio,
        skills: row.skills ?? [],
        categories: row.categories ?? [],
        languages: row.languages ?? [],
        portfolio: (row.portfolio ?? []).map((p, i) => ({
            ...p,
            slug: p.slug || `item-${i}`,
            image: p.image || tutorCoverUrl(row.slug),
        })),
        workHistory: [],
        reviews: [],
        education: row.education ?? [],
        certifications: row.certifications ?? [],
        responseTime: row.response_time,
        repeatClients: row.repeat_clients,
    };
}

async function uniqueSlug(base: string, userId: string): Promise<string> {
    const supabase = await createClient();
    let slug = slugify(base) || `tutor-${userId.slice(0, 8)}`;
    const { data } = await supabase.from("tutor_profiles").select("slug").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    return `${slug}-${userId.slice(0, 6)}`;
}

export async function getPublishedTutors(): Promise<Tutor[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_listings")
        .select("*")
        .order("published_at", { ascending: false });

    if (error) {
        console.error("getPublishedTutors:", error.message);
        return [];
    }
    return (data as TutorListingRow[]).map(mapListingToTutor);
}

export async function getPublishedTutorBySlug(slug: string): Promise<Tutor | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_listings")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error || !data) return null;
    return mapListingToTutor(data as TutorListingRow);
}

export async function getPublishedTutorSlugs(): Promise<string[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_profiles")
        .select("slug")
        .eq("status", "published");

    if (error) return [];
    return (data ?? []).map((r) => r.slug as string);
}

export async function getTutorProfileByUserId(userId: string): Promise<TutorProfileRow | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error || !data) return null;
    return data as TutorProfileRow;
}

export async function createTutorProfile(userId: string, userName: string): Promise<TutorProfileRow> {
    const supabase = await createClient();
    const slug = await uniqueSlug(userName, userId);

    const { data, error } = await supabase
        .from("tutor_profiles")
        .insert({
            user_id: userId,
            slug,
            display_name: userName,
            status: "draft",
            onboarding_step: 1,
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as TutorProfileRow;
}

export async function updateTutorProfile(
    userId: string,
    input: TutorProfileInput
): Promise<TutorProfileRow> {
    const supabase = await createClient();
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (input.title !== undefined) patch.title = input.title;
    if (input.categories !== undefined) patch.categories = input.categories;
    if (input.skills !== undefined) patch.skills = input.skills;
    if (input.bio !== undefined) patch.bio = input.bio;
    if (input.overview !== undefined) patch.overview = input.overview;
    if (input.location !== undefined) patch.location = input.location;
    if (input.timezone !== undefined) patch.timezone = input.timezone;
    if (input.english_level !== undefined) patch.english_level = input.english_level;
    if (input.languages !== undefined) patch.languages = input.languages;
    if (input.hourly_rate !== undefined) patch.hourly_rate = input.hourly_rate;
    if (input.availability !== undefined) patch.availability = input.availability;
    if (input.education !== undefined) patch.education = input.education;
    if (input.certifications !== undefined) patch.certifications = input.certifications;
    if (input.portfolio !== undefined) patch.portfolio = input.portfolio;
    if (input.image_url !== undefined) patch.image_url = input.image_url;
    if (input.cover_image_url !== undefined) patch.cover_image_url = input.cover_image_url;
    if (input.onboarding_step !== undefined) patch.onboarding_step = input.onboarding_step;

    const { data, error } = await supabase
        .from("tutor_profiles")
        .update(patch)
        .eq("user_id", userId)
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as TutorProfileRow;
}

export function validateForPublish(row: TutorProfileRow): string[] {
    const errors: string[] = [];
    if (!row.title?.trim()) errors.push("Professional title is required");
    if (!row.overview?.trim() && !row.bio?.trim()) errors.push("Overview or bio is required");
    if (!row.categories?.length) errors.push("Select at least one category");
    if (!row.skills?.length) errors.push("Add at least one skill");
    if (Number(row.hourly_rate) < 5) errors.push("Hourly rate must be at least $5");
    if (!row.location?.trim()) errors.push("Location is required");
    return errors;
}

export async function publishTutorProfile(userId: string): Promise<TutorProfileRow> {
    const profile = await getTutorProfileByUserId(userId);
    if (!profile) throw new Error("Tutor profile not found");

    const errors = validateForPublish(profile);
    if (errors.length) throw new Error(errors.join(". "));

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tutor_profiles")
        .update({
            status: "published",
            onboarding_step: 5,
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as TutorProfileRow;
}

export function parseSkillLevel(level: string): SkillLevel {
    if (level === "Expert" || level === "Advanced" || level === "Intermediate") return level;
    return "Intermediate";
}
