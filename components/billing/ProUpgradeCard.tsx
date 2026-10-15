"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { isProEntitled, PRO_PRICE_LABEL, PRO_PLAN_NAME } from "@/lib/billing";

type Props = {
    compact?: boolean;
    featureLabel?: string;
};

export default function ProUpgradeCard({
    compact = false,
    featureLabel = "AI features",
}: Props) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (user && isProEntitled(user)) return null;

    const startCheckout = async () => {
        setError("");
        if (!isAuthenticated) {
            router.push(`/?auth=login&role=student&next=${encodeURIComponent("/pricing")}`);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/billing/checkout", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Checkout failed");
            if (data.url) {
                window.location.href = data.url as string;
                return;
            }
            throw new Error("No checkout URL returned");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Checkout failed");
            setLoading(false);
        }
    };

    if (compact) {
        return (
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3">
                <p className="text-sm font-semibold text-amber-950">
                    {featureLabel} are on {PRO_PLAN_NAME} ({PRO_PRICE_LABEL})
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => void startCheckout()}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-black disabled:opacity-60"
                    >
                        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                        Upgrade to Pro
                    </button>
                    <Link href="/pricing" className="text-xs font-semibold text-amber-900 underline-offset-2 hover:underline">
                        See plans
                    </Link>
                </div>
                {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700">
                <Sparkles className="h-5 w-5" />
                <p className="text-xs font-bold uppercase tracking-wide">{PRO_PLAN_NAME}</p>
            </div>
            <h3 className="mt-3 text-xl font-bold text-gray-900">Unlock {featureLabel}</h3>
            <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">
                AI Tutor, Practice Coach, and smart skill matching — {PRO_PRICE_LABEL}.
            </p>
            <button
                type="button"
                onClick={() => void startCheckout()}
                disabled={loading}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isAuthenticated ? `Upgrade — ${PRO_PRICE_LABEL}` : "Sign in to upgrade"}
            </button>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
    );
}
