"use client";

import dynamic from "next/dynamic";
import { isFeatureEnabled } from "@/lib/feature-flags";

const AiTutorChat = dynamic(() => import("@/components/ai/AiTutorChat"), { ssr: false });

/** Site-wide AI Tutor FAB when the ai feature flag is on. */
export default function AiTutorFab() {
    if (!isFeatureEnabled("ai")) return null;
    return <AiTutorChat />;
}
