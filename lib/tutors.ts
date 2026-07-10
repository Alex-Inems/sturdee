import { IMAGES } from "@/lib/images";

export type TutorBadge = "Top Tutor" | "Rising Talent" | "Expert-Vetted";
export type TutorAvailability = "Available now" | "Limited availability" | "Not available";
export type SkillLevel = "Expert" | "Advanced" | "Intermediate";

export interface TutorSkill {
    name: string;
    level: SkillLevel;
}

export interface TutorLanguage {
    name: string;
    level: string;
}

export interface TutorPortfolioItem {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
}

export interface TutorWorkHistory {
    title: string;
    client: string;
    description: string;
    rating: number;
    reviews: number;
    earnings: string;
    period: string;
    hours: number;
}

export interface TutorReview {
    author: string;
    rating: number;
    date: string;
    text: string;
    project: string;
    hours: number;
}

export interface TutorEducation {
    school: string;
    degree: string;
    years: string;
}

export interface TutorCertification {
    name: string;
    issuer: string;
    year: string;
}

export interface Tutor {
    slug: string;
    userId?: string;
    name: string;
    title: string;
    location: string;
    timezone: string;
    hourlyRate: number;
    jobSuccess: number;
    totalEarned: string;
    totalHours: number;
    totalJobs: number;
    memberSince: string;
    availability: TutorAvailability;
    englishLevel: string;
    badge?: TutorBadge;
    verified: boolean;
    image: string;
    coverImage: string;
    hasVideoIntro: boolean;
    bio: string;
    overview: string;
    skills: TutorSkill[];
    categories: string[];
    languages: TutorLanguage[];
    portfolio: TutorPortfolioItem[];
    workHistory: TutorWorkHistory[];
    reviews: TutorReview[];
    education: TutorEducation[];
    certifications: TutorCertification[];
    responseTime: string;
    repeatClients: number;
}

export const TUTOR_CATEGORIES = [
    "Web Development",
    "JavaScript & TypeScript",
    "Python",
    "Shopify & Liquid",
    "Blockchain & Solidity",
    "Data Structures",
    "CSS & Design",
    "Career Coaching",
] as const;

export const SKILL_LEVELS: SkillLevel[] = ["Expert", "Advanced", "Intermediate"];

export const AVAILABILITY_OPTIONS: TutorAvailability[] = [
    "Available now",
    "Limited availability",
    "Not available",
];

export const ENGLISH_LEVELS = ["Native", "Fluent", "Conversational"] as const;

export const ONBOARDING_STEPS = [
    { step: 1, title: "Skills & expertise", description: "What subjects can you teach?" },
    { step: 2, title: "Professional profile", description: "Your headline and story" },
    { step: 3, title: "Location & languages", description: "Where you are and what you speak" },
    { step: 4, title: "Rate & availability", description: "Set your hourly rate" },
    { step: 5, title: "Review & publish", description: "Go live on Sturdee Tutors" },
] as const;

export function tutorAvatarUrl(name: string): string {
    const encoded = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encoded}&background=10B981&color=fff&size=256&bold=true`;
}

export function tutorCoverUrl(_slug: string): string {
    return IMAGES.programsStudents;
}

export function getAverageRating(tutor: Tutor): number {
    if (tutor.reviews.length === 0) return 5;
    return tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / tutor.reviews.length;
}

export function getReviewCount(tutor: Tutor): number {
    return tutor.reviews.length + tutor.workHistory.reduce((sum, w) => sum + w.reviews, 0);
}
