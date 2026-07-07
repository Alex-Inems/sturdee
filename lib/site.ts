/** Canonical site URL — must match your Google Search Console property exactly (www vs non-www). */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sturdee.online"
).replace(/\/$/, "");

export const SITE_NAME = "Sturdee";

export const POLICY_URLS = {
    privacy: `${SITE_URL}/privacy`,
    terms: `${SITE_URL}/terms`,
    legal: `${SITE_URL}/legal`,
} as const;
