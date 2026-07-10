import type { Difficulty } from "@/lib/practice/types";

const STYLES: Record<Difficulty, string> = {
    Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
    Hard: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
    return (
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${STYLES[difficulty]}`}>
            {difficulty}
        </span>
    );
}
