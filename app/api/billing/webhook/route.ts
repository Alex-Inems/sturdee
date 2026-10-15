import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { updateProfilePlan } from "@/lib/billing-db";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import type { PlanStatus } from "@/lib/types";

export const runtime = "nodejs";

function mapStripeStatus(status: Stripe.Subscription.Status): PlanStatus {
    if (status === "active") return "active";
    if (status === "trialing") return "trialing";
    if (status === "past_due") return "past_due";
    if (status === "canceled" || status === "unpaid" || status === "incomplete_expired") {
        return "canceled";
    }
    return "inactive";
}

function periodEnd(sub: Stripe.Subscription): Date | null {
    const end = (sub as { current_period_end?: number }).current_period_end;
    return typeof end === "number" ? new Date(end * 1000) : null;
}

async function applySubscription(
    sub: Stripe.Subscription,
    userIdHint?: string | null
) {
    const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
    const customerMeta =
        typeof sub.customer !== "string" && !("deleted" in sub.customer && sub.customer.deleted)
            ? sub.customer.metadata?.supabase_user_id
            : undefined;
    const userId = userIdHint || sub.metadata?.supabase_user_id || customerMeta;

    const status = mapStripeStatus(sub.status);
    const entitled = status === "active" || status === "trialing";

    await updateProfilePlan({
        userId: userId || undefined,
        stripeCustomerId: customerId,
        plan: entitled ? "pro" : "free",
        planStatus: status,
        stripeSubscriptionId: sub.id,
        planPeriodEnd: periodEnd(sub),
    });
}

export async function POST(request: Request) {
    if (!isStripeConfigured()) {
        return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (!secret) {
        return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET missing" }, { status: 503 });
    }

    const stripe = getStripe();
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const rawBody = await request.text();

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid signature";
        return NextResponse.json({ error: message }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.mode === "subscription" && session.subscription) {
                    const subId =
                        typeof session.subscription === "string"
                            ? session.subscription
                            : session.subscription.id;
                    const sub = await stripe.subscriptions.retrieve(subId);
                    await applySubscription(sub, session.metadata?.supabase_user_id);
                }
                break;
            }
            case "customer.subscription.updated":
            case "customer.subscription.created": {
                const sub = event.data.object as Stripe.Subscription;
                await applySubscription(sub);
                break;
            }
            case "customer.subscription.deleted": {
                const sub = event.data.object as Stripe.Subscription;
                const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
                await updateProfilePlan({
                    userId: sub.metadata?.supabase_user_id,
                    stripeCustomerId: customerId,
                    plan: "free",
                    planStatus: "canceled",
                    stripeSubscriptionId: null,
                    planPeriodEnd: null,
                });
                break;
            }
            default:
                break;
        }
    } catch (err) {
        console.error("[stripe webhook]", err);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
