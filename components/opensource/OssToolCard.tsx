import Link from "next/link";
import type { OssTool } from "@/lib/opensource/types";

interface OssToolCardProps {
    tool: OssTool;
    completed?: boolean;
}

export default function OssToolCard({ tool, completed }: OssToolCardProps) {
    return (
        <Link
            href={`/opensource/${tool.slug}`}
            className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-lg hover:border-emerald-200 hover:shadow-xl transition-all"
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-emerald-600">{tool.category}</span>
                <div className="flex items-center gap-2">
                    {completed && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            ✓ Done
                        </span>
                    )}
                    <span className="text-xs font-bold text-amber-600">+{tool.points} pts</span>
                </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{tool.name}</h3>
            <p className="text-sm text-gray-500 font-medium mb-3 line-clamp-2">{tool.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
                {tool.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 font-semibold">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">★ {tool.stars}</span>
                <span className="font-semibold text-emerald-600">Practice integration →</span>
            </div>
        </Link>
    );
}
