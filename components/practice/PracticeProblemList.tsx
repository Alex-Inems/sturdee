"use client";

import { useEffect, useMemo, useState } from "react";
import ProblemRow from "./ProblemRow";
import { loadPracticeProgress, type Difficulty, type PracticeProblem } from "@/lib/practice";

interface PracticeProblemListProps {
    problems: PracticeProblem[];
}

export default function PracticeProblemList({ problems }: PracticeProblemListProps) {
    const [query, setQuery] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
    const [topic, setTopic] = useState("All");
    const [progress, setProgress] = useState<Record<string, "attempted" | "solved">>({});

    useEffect(() => {
        setProgress(loadPracticeProgress());
    }, []);

    const topics = useMemo(() => ["All", ...new Set(problems.map((p) => p.topic))], [problems]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return problems.filter((p) => {
            if (difficulty !== "All" && p.difficulty !== difficulty) return false;
            if (topic !== "All" && p.topic !== topic) return false;
            if (q && !p.title.toLowerCase().includes(q) && !p.slug.includes(q)) return false;
            return true;
        });
    }, [problems, query, difficulty, topic]);

    const solvedCount = Object.values(progress).filter((s) => s === "solved").length;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 space-y-3">
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <input
                        type="search"
                        placeholder="Search problems..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                    <span className="text-xs text-gray-400 font-semibold">
                        {solvedCount} solved · {filtered.length} shown
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => setDifficulty(d)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                                difficulty === d
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="ml-auto text-xs font-semibold border border-gray-200 rounded-full px-3 py-1 bg-white"
                    >
                        {topics.map((t) => (
                            <option key={t} value={t}>
                                {t === "All" ? "All topics" : t}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
                {filtered.slice(0, 200).map((p) => (
                    <ProblemRow key={p.slug} problem={p} status={progress[p.slug]} />
                ))}
                {filtered.length > 200 && (
                    <p className="p-4 text-xs text-gray-400 text-center">
                        Showing first 200 matches. Refine your search to find more.
                    </p>
                )}
                {filtered.length === 0 && (
                    <p className="p-8 text-center text-gray-400 text-sm">No problems match your filters.</p>
                )}
            </div>
        </div>
    );
}
