import Link from "next/link";
import { Globe2, Home, BookOpen } from "lucide-react";
import {
    UNAVAILABLE_DESCRIPTION,
    UNAVAILABLE_FOOTNOTE,
    UNAVAILABLE_HEADING,
} from "@/lib/unavailable";

interface FeatureUnavailableFallbackProps {
    showActions?: boolean;
    compact?: boolean;
}

export default function FeatureUnavailableFallback({
    showActions = true,
    compact = false,
}: FeatureUnavailableFallbackProps) {
    return (
        <div
            className={`font-jakarta flex flex-col items-center justify-center text-center px-6 ${
                compact ? "py-16" : "min-h-[70vh] py-24"
            }`}
        >
            <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Globe2 className="w-11 h-11 text-amber-600" aria-hidden />
                </div>
                <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg">
                    🌍
                </span>
            </div>

            <span className="inline-flex px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full font-bold text-xs mb-5">
                Regional availability
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 max-w-xl leading-tight">
                {UNAVAILABLE_HEADING}
            </h1>

            <p className="text-gray-500 font-medium max-w-lg leading-relaxed mb-3">{UNAVAILABLE_DESCRIPTION}</p>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-10">{UNAVAILABLE_FOOTNOTE}</p>

            {showActions && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go to Home
                    </Link>
                    <Link
                        href="/tutorials"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:border-gray-300 font-semibold rounded-full text-sm transition-colors shadow-sm"
                    >
                        <BookOpen className="w-4 h-4" />
                        Browse Tutorials
                    </Link>
                </div>
            )}
        </div>
    );
}
