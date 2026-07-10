"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import SiteErrorFallback from "@/components/SiteErrorFallback";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-jakarta",
});

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en" className={plusJakarta.variable}>
            <body className="font-jakarta antialiased text-gray-900 bg-page">
                <SiteErrorFallback onRetry={reset} />
            </body>
        </html>
    );
}
