"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, User, Mail, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { BOOKING_SERVICES } from "@/lib/constants";
import { useAuth } from "@/components/AuthContext";
import { getSkill } from "@/lib/skills";
import { isFeatureEnabled } from "@/lib/feature-flags";
import type { Booking } from "@/lib/types";

const EXPERIENCE_LEVELS = ["Beginner", "Some experience", "Intermediate", "Advanced"] as const;

type MatchResult = {
    skillSlug: string;
    reason: string;
    confidence: number;
    skillTitle?: string;
};

export default function BookingForm() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const skillSlug = searchParams.get("skill");
    const preselectedSkill = skillSlug ? getSkill(skillSlug) : undefined;
    const aiOn = isFeatureEnabled("ai");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skill, setSkill] = useState(preselectedSkill?.id ?? "");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [matching, setMatching] = useState(false);
    const [match, setMatch] = useState<MatchResult | null>(null);
    const [error, setError] = useState("");
    const [result, setResult] = useState<Booking | null>(null);
    const [wasGuest, setWasGuest] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        if (!preselectedSkill) return;
        setSkill(preselectedSkill.id);
        setNotes((prev) =>
            prev || `I want to learn ${preselectedSkill.title}. My goals: `
        );
    }, [preselectedSkill]);

    const activeSkill = skill ? getSkill(skill) : undefined;
    const assigned = result?.status === "confirmed" && result.batchId;

    const runMatch = async () => {
        if (!aiOn) return;
        if (!notes.trim() && !skill) {
            setError("Add your goals or pick a skill so we can recommend a path.");
            return;
        }
        setMatching(true);
        setError("");
        try {
            const res = await fetch("/api/ai/match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    goals: notes.trim(),
                    experienceLevel,
                    preferredSkill: skill || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not match a skill");
            setMatch(data as MatchResult);
            setSkill(data.skillSlug);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not match a skill");
        } finally {
            setMatching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user?.role === "tutor") {
            setError("Tutors host sessions — register as a student instead.");
            return;
        }

        if (!skill) {
            setError("Choose a skill to learn.");
            return;
        }

        if (!name.trim() || !email.trim()) {
            setError("Name and email are required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const matchNote =
                match && match.skillSlug === skill
                    ? `AI match: ${match.reason} (confidence ${Math.round(match.confidence * 100)}%)`
                    : "";
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    skillSlug: skill,
                    experienceLevel,
                    notes: [notes.trim(), matchNote].filter(Boolean).join("\n"),
                    name: name.trim(),
                    email: email.trim(),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Registration failed");

            setWasGuest(Boolean(data.guest));
            setResult(data.booking as Booking);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {assigned ? "You're in a cohort" : "Registration received"}
                </h2>
                <p className="mt-3 text-gray-500 font-medium max-w-md mx-auto">
                    {assigned ? (
                        <>
                            You&apos;ve been placed in a batch for{" "}
                            <strong className="text-gray-800">{activeSkill?.title ?? result.service}</strong>
                            {result.tutorName ? (
                                <> with tutor <strong className="text-gray-800">{result.tutorName}</strong></>
                            ) : null}
                            {result.date && result.time ? (
                                <> — starts {result.date} at {result.time}</>
                            ) : null}
                            .
                        </>
                    ) : (
                        <>
                            You&apos;re registered for{" "}
                            <strong className="text-gray-800">{activeSkill?.title ?? result.service}</strong>.
                            We&apos;ll assign you to the next available batch and tutor shortly.
                        </>
                    )}
                </p>
                {wasGuest && (
                    <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
                        Create a free student account anytime to track your cohort in the dashboard.
                    </p>
                )}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {wasGuest ? (
                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    `/?auth=register&role=student&next=${encodeURIComponent("/dashboard/student")}`
                                )
                            }
                            className="px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all"
                        >
                            Create account (optional)
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => router.push("/dashboard/student")}
                            className="px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all"
                        >
                            Student dashboard
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            setResult(null);
                            setWasGuest(false);
                            setMatch(null);
                            if (!preselectedSkill) setSkill("");
                            setExperienceLevel("");
                            setNotes("");
                        }}
                        className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-full text-sm hover:bg-gray-50"
                    >
                        Register for another skill
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
            <div className="border-b border-gray-100 bg-emerald-50/40 px-8 py-5">
                <h2 className="text-lg font-bold text-gray-900">Student registration</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Enter your details and goals. {aiOn ? "We can recommend the best AI skill path, then " : "We'll "}
                    place you in an available batch with a tutor.
                </p>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="p-8 space-y-8">
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <User className="h-4 w-4 text-emerald-600" /> Full name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isAuthenticated}
                            placeholder="Your name"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Mail className="h-4 w-4 text-emerald-600" /> Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isAuthenticated}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Experience level
                    </label>
                    <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                        <option value="">Select your level</option>
                        {EXPERIENCE_LEVELS.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Goals & background
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        placeholder="What do you want to achieve? Any projects, job goals, or AI topics you're curious about…"
                        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                </div>

                {aiOn && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-emerald-600" />
                                    AI skill match
                                </p>
                                <p className="mt-1 text-xs text-gray-600 font-medium">
                                    Recommend the best path from your goals — you can still change it below.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => void runMatch()}
                                disabled={matching}
                                className="inline-flex items-center gap-2 rounded-full bg-gray-900 hover:bg-black disabled:opacity-60 px-4 py-2 text-xs font-semibold text-white"
                            >
                                {matching ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                                {matching ? "Matching…" : "Recommend skill"}
                            </button>
                        </div>
                        {match && (
                            <div className="mt-4 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm">
                                <p className="font-bold text-gray-900">
                                    Suggested: {match.skillTitle ?? getSkill(match.skillSlug)?.title}
                                </p>
                                <p className="mt-1 text-gray-600 leading-relaxed">{match.reason}</p>
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <BookOpen className="h-4 w-4 text-emerald-600" /> Skill you want to learn
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {BOOKING_SERVICES.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                    setSkill(s.id);
                                    if (match && match.skillSlug !== s.id) {
                                        /* keep match note but allow override */
                                    }
                                }}
                                className={`rounded-xl border p-4 text-left transition-all ${
                                    skill === s.id
                                        ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <p className="text-sm font-bold text-gray-900">
                                    {getSkill(s.id)?.title ?? s.name}
                                </p>
                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                                    {s.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || !skill}
                        className="rounded-full bg-[#10B981] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0F9F72] disabled:opacity-60"
                    >
                        {loading ? "Registering…" : "Register & get assigned"}
                    </button>
                </div>
            </form>
        </div>
    );
}
