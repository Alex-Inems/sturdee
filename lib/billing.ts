/** Sturdee Pro — AI features at $20/month */

export const PRO_PRICE_USD = 20;
export const PRO_PRICE_LABEL = "$20/month";
export const PRO_PLAN_NAME = "Sturdee Pro";

export type PlanTier = "free" | "pro";
export type PlanStatus = "inactive" | "active" | "past_due" | "canceled" | "trialing";

export const PRO_FEATURES = [
    "AI Tutor chat on every page",
    "Practice Coach with feedback",
    "Smart skill matching at registration",
    "Priority access to new AI tools",
] as const;

export const FREE_FEATURES = [
    "Free interactive tutorials",
    "Browse AI skill paths",
    "Register for live cohorts",
    "Join Google Meet classrooms",
] as const;

export function isProEntitled(input: {
    role?: string | null;
    plan?: string | null;
    planStatus?: string | null;
}): boolean {
    if (input.role === "admin") return true;
    if (input.plan !== "pro") return false;
    return input.planStatus === "active" || input.planStatus === "trialing";
}
