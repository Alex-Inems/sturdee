"use client";

import { useState } from "react";
import { Dumbbell, Loader2, RefreshCw } from "lucide-react";
import type { AiPageContext } from "@/lib/ai/context";

type Exercise = {
    title: string;
    prompt: string;
    hint?: string;
    difficulty: "beginner" | "intermediate" | "advanced";
};

type Props = {
    context?: AiPageContext;
};

export default function PracticeCoach({ context }: Props) {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generate = async () => {
        setLoading(true);
        setError("");
        setFeedback("");
        setAnswer("");
        try {
            const res = await fetch("/api/ai/practice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "generate", context }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not generate exercise");
            setExercise(data.exercise as Exercise);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not generate exercise");
        } finally {
            setLoading(false);
        }
    };

    const grade = async () => {
        if (!exercise || !answer.trim()) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/ai/practice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "grade",
                    context,
                    exercisePrompt: `${exercise.title}\n\n${exercise.prompt}`,
                    answer: answer.trim(),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not grade answer");
            setFeedback(data.feedback as string);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not grade answer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Practice coach</p>
                    <h3 className="mt-1 text-lg font-bold text-gray-900">Practice this topic</h3>
                    <p className="mt-1 text-sm text-gray-600 font-medium">
                        Get a short exercise, submit your answer, and receive AI feedback.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => void generate()}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 px-4 py-2 text-sm font-semibold text-white"
                >
                    {loading && !exercise ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : exercise ? (
                        <RefreshCw className="h-4 w-4" />
                    ) : (
                        <Dumbbell className="h-4 w-4" />
                    )}
                    {exercise ? "New exercise" : "Generate exercise"}
                </button>
            </div>

            {error && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            {exercise && (
                <div className="mt-5 space-y-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-gray-900">{exercise.title}</p>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-600">
                                {exercise.difficulty}
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {exercise.prompt}
                        </p>
                        {exercise.hint && (
                            <p className="mt-2 text-xs text-gray-500">Hint: {exercise.hint}</p>
                        )}
                    </div>

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={4}
                        placeholder="Write your answer or solution here…"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                    />

                    <button
                        type="button"
                        onClick={() => void grade()}
                        disabled={loading || !answer.trim()}
                        className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-300 disabled:opacity-50"
                    >
                        {loading && exercise ? "Checking…" : "Get feedback"}
                    </button>

                    {feedback && (
                        <div className="rounded-xl border border-emerald-200 bg-white p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">
                                Feedback
                            </p>
                            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{feedback}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
