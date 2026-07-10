"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import type { CourseCategory } from "@/lib/courses";
import { COURSE_CATEGORIES } from "@/lib/courses";

interface CourseRow {
    slug: string;
    title: string;
    status: string;
    category: CourseCategory;
    price: number;
}

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const FORMATS = ["Cohort", "Self-paced", "Live"] as const;

export default function CourseManager() {
    const [courses, setCourses] = useState<CourseRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: "",
        category: "Web Development" as CourseCategory,
        level: "Beginner" as (typeof LEVELS)[number],
        format: "Cohort" as (typeof FORMATS)[number],
        duration: "",
        hours: 10,
        price: 0,
        description: "",
        useTemplate: true,
    });

    const load = async () => {
        setLoading(true);
        const res = await fetch("/api/courses/me");
        if (res.ok) {
            const data = await res.json();
            setCourses(data.courses ?? []);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const createCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        const res = await fetch("/api/courses/me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: form.title,
                category: form.category,
                level: form.level,
                format: form.format,
                duration: form.duration,
                hours: form.hours,
                price: form.price,
                description: form.description,
                useTemplate: form.useTemplate,
            }),
        });
        const data = await res.json();
        setSaving(false);
        if (!res.ok) {
            setError(data.error ?? "Failed to create course");
            return;
        }
        setForm({
            title: "",
            category: "Web Development",
            level: "Beginner",
            format: "Cohort",
            duration: "",
            hours: 10,
            price: 0,
            description: "",
            useTemplate: true,
        });
        await load();
    };

    const publish = async (slug: string) => {
        setError(null);
        const res = await fetch("/api/courses/me/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
        });
        const data = await res.json();
        if (!res.ok) {
            setError(data.error ?? "Failed to publish");
            return;
        }
        await load();
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                    {error}
                </p>
            )}

            <form onSubmit={createCourse} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Create a course
                </h2>
                <p className="text-sm text-gray-500">Only published tutors can create courses. Drafts can be published when complete.</p>

                <input
                    required
                    placeholder="Course title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                />
                <textarea
                    required
                    placeholder="Course description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as CourseCategory })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    >
                        {COURSE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <select
                        value={form.level}
                        onChange={(e) => setForm({ ...form, level: e.target.value as (typeof LEVELS)[number] })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    >
                        {LEVELS.map((l) => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                    <select
                        value={form.format}
                        onChange={(e) => setForm({ ...form, format: e.target.value as (typeof FORMATS)[number] })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    >
                        {FORMATS.map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                    <input
                        required
                        placeholder="Duration (e.g. 8 weeks)"
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    />
                    <input
                        type="number"
                        min={1}
                        placeholder="Hours"
                        value={form.hours}
                        onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    />
                    <input
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="Price (USD)"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                        type="checkbox"
                        checked={form.useTemplate}
                        onChange={(e) => setForm({ ...form, useTemplate: e.target.checked })}
                    />
                    Start with default curriculum template for this category
                </label>
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-[#10B981] text-white font-semibold rounded-full text-sm disabled:opacity-60"
                >
                    {saving ? "Creating…" : "Create draft course"}
                </button>
            </form>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your courses</h2>
                {courses.length === 0 ? (
                    <p className="text-sm text-gray-500">No courses yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {courses.map((course) => (
                            <li
                                key={course.slug}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100"
                            >
                                <div>
                                    <p className="font-bold text-gray-900">{course.title}</p>
                                    <p className="text-xs text-gray-500">
                                        {course.category} · ${course.price} ·{" "}
                                        <span className={course.status === "published" ? "text-emerald-600" : "text-amber-600"}>
                                            {course.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {course.status === "published" && (
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            className="px-4 py-2 text-sm font-semibold text-emerald-700 border border-emerald-200 rounded-full"
                                        >
                                            View
                                        </Link>
                                    )}
                                    {course.status === "draft" && (
                                        <button
                                            type="button"
                                            onClick={() => publish(course.slug)}
                                            className="px-4 py-2 text-sm font-semibold bg-[#10B981] text-white rounded-full"
                                        >
                                            Publish
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
