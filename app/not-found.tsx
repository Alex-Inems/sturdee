import type { Metadata } from "next";
import FeatureUnavailableFallback from "@/components/FeatureUnavailableFallback";
import { NOINDEX_ROBOTS } from "@/lib/seo";
import { UNAVAILABLE_TITLE } from "@/lib/unavailable";

export const metadata: Metadata = {
    title: UNAVAILABLE_TITLE,
    robots: NOINDEX_ROBOTS,
};

export default function NotFound() {
    return (
        <div className="bg-page min-h-screen pt-28 pb-20">
            <FeatureUnavailableFallback />
        </div>
    );
}
