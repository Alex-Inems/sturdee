import { createAdminClient } from "@/lib/supabase/admin";
import type { PlanStatus, PlanTier } from "@/lib/types";

export async function updateProfilePlan(input: {
    userId?: string;
    stripeCustomerId?: string;
    plan: PlanTier;
    planStatus: PlanStatus;
    stripeSubscriptionId?: string | null;
    planPeriodEnd?: Date | null;
}) {
    const admin = createAdminClient();
    const patch: Record<string, unknown> = {
        plan: input.plan,
        plan_status: input.planStatus,
        stripe_subscription_id: input.stripeSubscriptionId ?? null,
        plan_period_end: input.planPeriodEnd ? input.planPeriodEnd.toISOString() : null,
    };
    if (input.stripeCustomerId) {
        patch.stripe_customer_id = input.stripeCustomerId;
    }

    let query = admin.from("profiles").update(patch);
    if (input.userId) {
        query = query.eq("id", input.userId);
    } else if (input.stripeCustomerId) {
        query = query.eq("stripe_customer_id", input.stripeCustomerId);
    } else {
        throw new Error("userId or stripeCustomerId required");
    }

    const { error } = await query;
    if (error) throw new Error(error.message);
}

export async function setStripeCustomerId(userId: string, customerId: string) {
    const admin = createAdminClient();
    const { error } = await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    if (error) throw new Error(error.message);
}

export async function getProfileBilling(userId: string) {
    const admin = createAdminClient();
    const { data, error } = await admin
        .from("profiles")
        .select("id, email, name, plan, plan_status, stripe_customer_id, stripe_subscription_id, plan_period_end")
        .eq("id", userId)
        .single();
    if (error) throw new Error(error.message);
    return data;
}
