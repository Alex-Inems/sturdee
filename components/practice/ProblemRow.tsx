"use client";

import Link from "next/link";
import DifficultyBadge from "./DifficultyBadge";
import type { PracticeProblem } from "@/lib/practice/types";

interface ProblemRowProps {
    problem: PracticeProblem;
    status?: "solved" | "attempted";
}

export default function ProblemRow({ problem, status }: ProblemRowProps) {
    return (
        <Link
            href={`/practice/${problem.slug}`}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
        >
            <span className="w-12 text-sm font-mono text-gray-400 shrink-0">{problem.number}</span>
            <span className="flex-1 text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors truncate">
                {status === "solved" && <span className="text-emerald-500 mr-1.5">✓</span>}
                {problem.title}
            </span>
            <DifficultyBadge difficulty={problem.difficulty} />
            <span className="hidden sm:inline text-xs text-gray-400 w-28 truncate">{problem.topic}</span>
            <span className="hidden md:inline text-xs text-gray-400 w-16 text-right">{problem.acceptanceRate}%</span>
        </Link>
    );
}
