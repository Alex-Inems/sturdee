"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import {
    FREE_FEATURES,
    isProEntitled,
    PRO_CHECKOUT_ENABLED,
    PRO_CHECKOUT_UNAVAILABLE_MESSAGE,
    PRO_FEATURES,
    PRO_PLAN_NAME,
    PRO_PRICE_LABEL,
    PRO_PRICE_USD,
} from "@/lib/billing";

export default function PricingCards() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const success = searchParams.get("success") === "1";
    const canceled = searchParams.get("canceled") === "1";
    const [loading, setLoading] = useState<"checkout" | "portal" | null>(null);
    const [error, setError] = useState("");
    const [unavailable, setUnavailable] = useState(!PRO_CHECKOUT_ENABLED);
    const isPro = user ? isProEntitled(user) : false;

    const checkout = async () => {
        setError("");
        if (!PRO_CHECKOUT_ENABLED) {
            setUnavailable(true);
            return;
        }
        if (!isAuthenticated) {
            router.push(`/?auth=login&role=student&next=${encodeURIComponent("/pricing")}`);
            return;
        }
        setLoading("checkout");
        try {
            const res = await fetch("/api/billing/checkout", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Checkout failed");
            window.location.href = data.url as string;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Checkout failed");
            setLoading(null);
        }
    };

    const portal = async () => {
        setError("");
        setLoading("portal");
        try {
            const res = await fetch("/api/billing/portal", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not open billing portal");
            window.location.href = data.url as string;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Portal failed");
            setLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            {success && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    Welcome to Pro — refresh if AI features don&apos;t unlock right away (webhook may take a moment).
                </p>
            )}
            {canceled && (
                <p className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    Checkout canceled. You can upgrade anytime.
                </p>
            )}
            {unavailable && (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-950">
                    {PRO_CHECKOUT_UNAVAILABLE_MESSAGE}
                </p>
            )}
            {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-8">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Free</p>
                    <p className="mt-2 text-4xl font-bold text-gray-900">$0</p>
                    <p className="mt-1 text-sm text-gray-500 font-medium">Learn the basics forever</p>
                    <ul className="mt-8 space-y-3">
                        {FREE_FEATURES.map((f) => (
                            <li key={f} className="flex gap-2 text-sm font-medium text-gray-700">
                                <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                                {f}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-sm font-semibold text-gray-400">Always included</p>
                </div>

                <div className="rounded-2xl border-2 border-emerald-500 bg-white p-8 shadow-lg relative">
                    <span className="absolute -top-3 left-8 rounded-full bg-[#FFE55E] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
                        AI access
                    </span>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        {PRO_PLAN_NAME}
                    </p>
                    <p className="mt-2 text-4xl font-bold text-gray-900">
                        ${PRO_PRICE_USD}
                        <span className="text-lg font-semibold text-gray-400">/mo</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500 font-medium">All AI tools unlocked</p>
                    <ul className="mt-8 space-y-3">
                        {PRO_FEATURES.map((f) => (
                            <li key={f} className="flex gap-2 text-sm font-medium text-gray-700">
                                <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                                {f}
                            </li>
                        ))}
                    </ul>
                    {isPro ? (
                        <button
                            type="button"
                            onClick={() => void portal()}
                            disabled={loading !== null}
                            className="mt-8 w-full rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 hover:border-gray-300 disabled:opacity-60"
                        >
                            {loading === "portal" ? (
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Opening…
                                </span>
                            ) : (
                                "Manage subscription"
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => void checkout()}
                            disabled={loading !== null}
                            className="mt-8 w-full rounded-full bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 px-6 py-3.5 text-sm font-semibold text-white"
                        >
                            {loading === "checkout" ? (
                                <span className="inline-flex items-center gap-2 justify-center">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Redirecting…
                                </span>
                            ) : isAuthenticated ? (
                                `Get Pro — ${PRO_PRICE_LABEL}`
                            ) : (
                                "Sign in to get Pro"
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
