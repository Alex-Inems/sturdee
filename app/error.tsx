"use client";

import { useEffect } from "react";
import SiteErrorFallback from "@/components/SiteErrorFallback";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="bg-page min-h-screen pt-28 pb-20">
            <SiteErrorFallback onRetry={reset} />
        </div>
    );
}
