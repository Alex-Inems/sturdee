import { NextResponse } from "next/server";
import { getSessionUser, getSiteUrl } from "@/lib/auth";
import { getProfileBilling } from "@/lib/billing-db";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST() {
    if (!isStripeConfigured()) {
        return NextResponse.json(
            { error: "Billing is not configured. Set STRIPE_SECRET_KEY." },
            { status: 503 }
        );
    }

    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in" }, { status: 401 });
    }

    try {
        const billing = await getProfileBilling(session.id);
        const customerId = billing.stripe_customer_id as string | null;
        if (!customerId) {
            return NextResponse.json(
                { error: "No billing account yet. Upgrade to Pro first." },
                { status: 400 }
            );
        }

        const stripe = getStripe();
        const portal = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${getSiteUrl()}/pricing`,
        });

        return NextResponse.json({ url: portal.url });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Portal failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
