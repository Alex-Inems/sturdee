/**
 * Site-wide feature switches (pure module — safe to import from middleware).
 *
 * Flip a flag back to `true` to restore that section. Disabled routes return
 * not-found; navigation entries for them stay hidden.
 */
export const FEATURES = {
    tutorials: false,
    classroom: true,

    blog: false,
    guides: false,
    cheatsheets: false,
    courses: false,
    practice: false,
    openSource: false,
    credentials: false,
    programs: false,
    instructors: false,
    tutors: false,
    media: false,
    resources: false,
    booking: true,
    dashboard: true,
    admin: false,
    auth: true,
} as const;

export type FeatureKey = keyof typeof FEATURES;

export function isFeatureEnabled(feature: FeatureKey): boolean {
    return FEATURES[feature];
}

/** Route prefixes owned by a feature, used to block APIs and auth handlers. */
const PATH_FEATURES: ReadonlyArray<readonly [string, FeatureKey]> = [
    ["/api/admin", "admin"],
    ["/api/bookings", "booking"],
    ["/api/certificates", "credentials"],
    ["/api/workspaces", "credentials"],
    ["/api/integrations", "openSource"],
    ["/api/tutors", "tutors"],
    ["/api/courses", "courses"],
    ["/api/classrooms", "classroom"],
    ["/auth", "auth"],
];

/** Returns the disabled feature owning this path, or null when allowed. */
export function disabledFeatureForPath(pathname: string): FeatureKey | null {
    for (const [prefix, feature] of PATH_FEATURES) {
        if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
            return FEATURES[feature] ? null : feature;
        }
    }
    return null;
}
