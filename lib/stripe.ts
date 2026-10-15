import Stripe from "stripe";
import { PRO_PRICE_USD } from "@/lib/billing";

let stripe: Stripe | null = null;

export function isStripeConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripe(): Stripe {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    if (!key) {
        throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    if (!stripe) {
        stripe = new Stripe(key, {
            apiVersion: "2026-09-30.endive",
            typescript: true,
        });
    }
    return stripe;
}

/** Resolve Price ID from env, or create/reuse a $20/mo price when missing (dev convenience). */
export async function getProPriceId(): Promise<string> {
    const fromEnv = process.env.STRIPE_PRICE_ID?.trim();
    if (fromEnv) return fromEnv;

    const s = getStripe();
    const products = await s.products.list({ limit: 20, active: true });
    let product = products.data.find((p) => p.metadata?.sturdee_plan === "pro");
    if (!product) {
        product = await s.products.create({
            name: "Sturdee Pro",
            description: "AI Tutor, Practice Coach, and smart skill matching",
            metadata: { sturdee_plan: "pro" },
        });
    }

    const prices = await s.prices.list({ product: product.id, active: true, limit: 10 });
    const monthly = prices.data.find(
        (p) =>
            p.recurring?.interval === "month" &&
            p.unit_amount === PRO_PRICE_USD * 100 &&
            p.currency === "usd"
    );
    if (monthly) return monthly.id;

    const created = await s.prices.create({
        product: product.id,
        unit_amount: PRO_PRICE_USD * 100,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { sturdee_plan: "pro" },
    });
    return created.id;
}
