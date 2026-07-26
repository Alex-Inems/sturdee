import { notFound } from "next/navigation";
import { FEATURES, type FeatureKey } from "./feature-flags";

export { FEATURES, isFeatureEnabled, disabledFeatureForPath } from "./feature-flags";
export type { FeatureKey } from "./feature-flags";

/** Renders the not-found page when a disabled section is requested. */
export function assertFeatureEnabled(feature: FeatureKey): void {
    if (!FEATURES[feature]) notFound();
}

/** Empty static params so disabled sections are not prerendered. */
export function staticParamsFor<T>(feature: FeatureKey, params: () => T[]): T[] {
    return FEATURES[feature] ? params() : [];
}

export function featureDisabledResponse(): Response {
    return Response.json({ error: "This feature is currently unavailable" }, { status: 404 });
}
