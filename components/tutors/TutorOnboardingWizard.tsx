"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import type { TutorProfileRow } from "@/lib/tutors-db";
import {
    AVAILABILITY_OPTIONS,
    ENGLISH_LEVELS,
    ONBOARDING_STEPS,
    SKILL_LEVELS,
    TUTOR_CATEGORIES,
    tutorAvatarUrl,
    type SkillLevel,
    type TutorEducation,
    type TutorLanguage,
    type TutorSkill,
} from "@/lib/tutors";

const TIMEZONES = [
    "UTC-8", "UTC-7", "UTC-6", "UTC-5", "UTC+0", "UTC+1", "UTC+5:30", "UTC+8", "UTC+9",
];

export default function TutorOnboardingWizard() {
    const { isAuthenticated, loading: authLoading, user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<TutorProfileRow | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [error, setError] = useState("");

    const [categories, setCategories] = useState<string[]>([]);
    const [skills, setSkills] = useState<TutorSkill[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [skillLevel, setSkillLevel] = useState<SkillLevel>("Intermediate");
    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [timezone, setTimezone] = useState("UTC-5");
    const [englishLevel, setEnglishLevel] = useState("Fluent");
    const [languages, setLanguages] = useState<TutorLanguage[]>([{ name: "English", level: "Fluent" }]);
    const [hourlyRate, setHourlyRate] = useState(45);
    const [availability, setAvailability] = useState<(typeof AVAILABILITY_OPTIONS)[number]>("Available now");
    const [education, setEducation] = useState<TutorEducation[]>([]);

    const hydrateForm = useCallback((p: TutorProfileRow) => {
        setStep(p.onboarding_step || 1);
        setCategories(p.categories ?? []);
        setSkills(p.skills ?? []);
        setTitle(p.title ?? "");
        setOverview(p.overview ?? "");
        setBio(p.bio ?? "");
        setLocation(p.location ?? "");
        setTimezone(p.timezone ?? "UTC-5");
        setEnglishLevel(p.english_level ?? "Fluent");
        setLanguages(p.languages?.length ? p.languages : [{ name: "English", level: "Fluent" }]);
        setHourlyRate(Number(p.hourly_rate) || 45);
        setAvailability(p.availability ?? "Available now");
        setEducation(p.education ?? []);
    }, []);

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) {
            router.replace("/?auth=login&next=/tutors/register");
            return;
        }

        (async () => {
            const res = await fetch("/api/tutors/me", { method: "POST" });
            const data = await res.json();
            if (res.ok && data.profile) {
                setProfile(data.profile);
                hydrateForm(data.profile);
                if (data.profile.status === "published") {
                    router.replace(`/tutors/${data.profile.slug}`);
                }
            }
            setLoading(false);
        })();
    }, [authLoading, isAuthenticated, router, hydrateForm]);

    const saveStep = async (nextStep: number) => {
        setSaving(true);
        setError("");
        try {
            const payload: Record<string, unknown> = { onboarding_step: nextStep };
            if (step === 1) {
                payload.categories = categories;
                payload.skills = skills;
            } else if (step === 2) {
                payload.title = title;
                payload.overview = overview;
                payload.bio = bio;
            } else if (step === 3) {
                payload.location = location;
                payload.timezone = timezone;
                payload.english_level = englishLevel;
                payload.languages = languages;
            } else if (step === 4) {
                payload.hourly_rate = hourlyRate;
                payload.availability = availability;
                payload.education = education;
            }

            const res = await fetch("/api/tutors/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Save failed");
            setProfile(data.profile);
            setStep(nextStep);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Save failed");
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        setPublishing(true);
        setError("");
        try {
            await saveStep(5);
            const res = await fetch("/api/tutors/me/publish", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Publish failed");
            router.push(`/tutors/${data.slug}?published=1`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Publish failed");
        } finally {
            setPublishing(false);
        }
    };

    const addSkill = () => {
        const name = skillInput.trim();
        if (!name || skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
        setSkills([...skills, { name, level: skillLevel }]);
        setSkillInput("");
    };

    const toggleCategory = (cat: string) => {
        setCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-page flex items-center justify-center font-jakarta">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    const displayName = user?.name ?? "You";
    const avatar = profile?.image_url || tutorAvatarUrl(displayName);

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-6">
                <Link href="/tutors" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to tutors
                </Link>

                <div className="mb-8">
                    <span className="inline-flex px-4 py-1.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs mb-3">
                        Become a Sturdee Tutor
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900">Create your tutor profile</h1>
                    <p className="text-gray-500 font-medium mt-2">
                        Complete these steps — just like Upwork — then your profile goes live for students to hire you.
                    </p>
                </div>

                {/* Progress */}
                <div className="flex gap-1 mb-8">
                    {ONBOARDING_STEPS.map((s) => (
                        <div
                            key={s.step}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                                step >= s.step ? "bg-emerald-500" : "bg-gray-200"
                            }`}
                        />
                    ))}
                </div>
                <p className="text-sm font-bold text-emerald-700 mb-1">Step {step} of 5</p>
                <p className="text-lg font-bold text-gray-900 mb-6">{ONBOARDING_STEPS[step - 1].title}</p>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-3">Categories you teach</label>
                                <div className="flex flex-wrap gap-2">
                                    {TUTOR_CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => toggleCategory(cat)}
                                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                                                categories.includes(cat)
                                                    ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                                                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Skills</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                        placeholder="e.g. React, Python, Solidity"
                                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                                    />
                                    <select
                                        value={skillLevel}
                                        onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                                        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
                                    >
                                        {SKILL_LEVELS.map((l) => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={addSkill} className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold">
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((s) => (
                                        <span key={s.name} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-sm">
                                            {s.name}
                                            <span className="text-xs text-gray-400">{s.level}</span>
                                            <button type="button" onClick={() => setSkills(skills.filter((x) => x.name !== s.name))} className="text-gray-400 hover:text-red-500">×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Professional title</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Full-Stack Developer | React & Node.js Tutor"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                                    maxLength={120}
                                />
                                <p className="text-xs text-gray-400 mt-1">{title.length}/120</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Overview (short pitch)</label>
                                <textarea
                                    value={overview}
                                    onChange={(e) => setOverview(e.target.value)}
                                    rows={3}
                                    placeholder="One paragraph that sells your expertise..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none"
                                    maxLength={500}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Full bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={5}
                                    placeholder="Your background, teaching style, and what students can expect..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none"
                                    maxLength={2000}
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="City, Country"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Timezone</label>
                                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm">
                                        {TIMEZONES.map((tz) => (
                                            <option key={tz} value={tz}>{tz}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">English level</label>
                                    <select value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm">
                                        {ENGLISH_LEVELS.map((l) => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Hourly rate (USD)</label>
                                <div className="relative max-w-xs">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                    <input
                                        type="number"
                                        min={5}
                                        max={500}
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg text-sm font-bold"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Minimum $5/hr. You keep 85% after platform fee.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Availability</label>
                                <div className="space-y-2">
                                    {AVAILABILITY_OPTIONS.map((opt) => (
                                        <label key={opt} className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                                            <input
                                                type="radio"
                                                name="availability"
                                                checked={availability === opt}
                                                onChange={() => setAvailability(opt)}
                                                className="accent-emerald-600"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Education (optional)</label>
                                <button
                                    type="button"
                                    onClick={() => setEducation([...education, { school: "", degree: "", years: "" }])}
                                    className="text-sm font-semibold text-emerald-600"
                                >
                                    + Add education
                                </button>
                                {education.map((edu, i) => (
                                    <div key={i} className="grid gap-2 mt-3 p-4 bg-gray-50 rounded-lg">
                                        <input placeholder="School" value={edu.school} onChange={(e) => {
                                            const next = [...education];
                                            next[i] = { ...edu, school: e.target.value };
                                            setEducation(next);
                                        }} className="px-3 py-2 border border-gray-200 rounded text-sm" />
                                        <input placeholder="Degree" value={edu.degree} onChange={(e) => {
                                            const next = [...education];
                                            next[i] = { ...edu, degree: e.target.value };
                                            setEducation(next);
                                        }} className="px-3 py-2 border border-gray-200 rounded text-sm" />
                                        <input placeholder="Years" value={edu.years} onChange={(e) => {
                                            const next = [...education];
                                            next[i] = { ...edu, years: e.target.value };
                                            setEducation(next);
                                        }} className="px-3 py-2 border border-gray-200 rounded text-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                                    <Image src={avatar} alt={displayName} fill sizes="64px" className="object-cover" unoptimized />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{displayName}</p>
                                    <p className="text-sm text-gray-600">{title || "—"}</p>
                                    <p className="text-lg font-bold text-gray-900 mt-2">${hourlyRate}/hr</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {categories.length} categories · {skills.length} skills</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {location || "Location not set"}</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {availability}</li>
                            </ul>
                            <p className="text-sm text-gray-500">
                                By publishing, your profile appears in the Sturdee Tutors marketplace. Students can view your profile and book sessions with you.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            disabled={step === 1 || saving}
                            onClick={() => setStep(step - 1)}
                            className="px-5 py-2.5 text-sm font-semibold text-gray-600 disabled:opacity-40"
                        >
                            Back
                        </button>
                        {step < 5 ? (
                            <button
                                type="button"
                                disabled={saving || (step === 1 && (!categories.length || !skills.length)) || (step === 2 && !title.trim())}
                                onClick={() => saveStep(step + 1)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                            </button>
                        ) : (
                            <button
                                type="button"
                                disabled={publishing}
                                onClick={handlePublish}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-bold rounded-full text-sm disabled:opacity-50"
                            >
                                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish profile"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
