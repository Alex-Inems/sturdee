import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface SiteErrorFallbackProps {
    onRetry?: () => void;
    compact?: boolean;
}

export default function SiteErrorFallback({ onRetry, compact = false }: SiteErrorFallbackProps) {
    return (
        <div
            className={`font-jakarta flex flex-col items-center justify-center text-center px-6 ${
                compact ? "py-16" : "min-h-[60vh] py-24"
            }`}
        >
            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mb-8">
                <AlertTriangle className="w-9 h-9 text-rose-600" aria-hidden />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 max-w-xl leading-tight">
                Something went wrong
            </h1>

            <p className="text-gray-500 font-medium max-w-lg leading-relaxed mb-8">
                We hit an unexpected problem loading this page. Please try again, or return home and
                continue from there.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try again
                    </button>
                )}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-colors"
                >
                    <Home className="w-4 h-4" />
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
