"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

export default function ResetPasswordPage() {
    const { updatePassword, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);
        const result = await updatePassword(password);
        setSubmitting(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center font-jakarta">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="font-jakarta max-w-md mx-auto px-6 py-32 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900">Link expired or invalid</h1>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                    Request a new password reset link from the sign-in page.
                </p>
                <Link
                    href="/?auth=login"
                    className="mt-8 inline-flex px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-all"
                >
                    Back to Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="font-jakarta max-w-md mx-auto px-6 py-32">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                <h1 className="text-2xl font-bold text-gray-900">Set a new password</h1>
                <p className="mt-2 text-sm text-gray-500">Choose a strong password for your account.</p>

                {error && (
                    <div className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        Password updated. Redirecting to your dashboard...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">New password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">Confirm password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="••••••••"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                        >
                            {submitting ? "Updating..." : "Update Password"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
