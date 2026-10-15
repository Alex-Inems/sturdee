import { NextResponse } from "next/server";
import { getSessionUser, getSiteUrl } from "@/lib/auth";
import {
    isProEntitled,
    PRO_CHECKOUT_ENABLED,
    PRO_CHECKOUT_UNAVAILABLE_MESSAGE,
} from "@/lib/billing";
import { getProfileBilling, setStripeCustomerId } from "@/lib/billing-db";
import { getProPriceId, getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST() {
    if (!PRO_CHECKOUT_ENABLED || !isStripeConfigured()) {
        return NextResponse.json(
            { error: PRO_CHECKOUT_UNAVAILABLE_MESSAGE, code: "CHECKOUT_UNAVAILABLE" },
            { status: 503 }
        );
    }

    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json({ error: "Please sign in to upgrade" }, { status: 401 });
    }

    if (isProEntitled(session)) {
        return NextResponse.json({ error: "You already have Pro" }, { status: 400 });
    }

    try {
        const stripe = getStripe();
        const billing = await getProfileBilling(session.id);
        let customerId = billing.stripe_customer_id as string | null;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: session.email,
                name: session.name,
                metadata: { supabase_user_id: session.id },
            });
            customerId = customer.id;
            await setStripeCustomerId(session.id, customerId);
        }

        const priceId = await getProPriceId();
        const siteUrl = getSiteUrl();

        const checkout = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customerId,
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${siteUrl}/pricing?success=1`,
            cancel_url: `${siteUrl}/pricing?canceled=1`,
            allow_promotion_codes: true,
            metadata: { supabase_user_id: session.id },
            subscription_data: {
                metadata: { supabase_user_id: session.id },
            },
        });

        return NextResponse.json({ url: checkout.url });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Checkout failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
