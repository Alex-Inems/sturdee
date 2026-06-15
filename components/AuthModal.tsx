"use client";

import { useState } from "react";
import { X, BookOpen, Mail, Lock, ArrowRight, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import { useAuth } from "./AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialError?: string;
}

function GoogleIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

type AuthView = "login" | "register" | "forgot";

export default function AuthModal({ isOpen, onClose, initialError }: AuthModalProps) {
    const [view, setView] = useState<AuthView>("login");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(initialError ?? "");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login, register, signInWithGoogle, resetPassword } = useAuth();

    const isLogin = view === "login";
    const isForgot = view === "forgot";

    if (!isOpen) return null;

    const displayError = error || initialError || "";

    const handleGoogleSignIn = async () => {
        setError("");
        setSubmitting(true);
        const result = await signInWithGoogle();
        setSubmitting(false);
        if (result.error) setError(result.error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSubmitting(true);

        const result = isForgot
            ? await resetPassword(email)
            : isLogin
              ? await login(email, password)
              : await register(email, name, password);

        setSubmitting(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        if ("message" in result && typeof result.message === "string") {
            setSuccess(result.message);
            return;
        }

        onClose();
        setEmail("");
        setName("");
        setPassword("");
        setView("login");
    };

    const switchView = (next: AuthView) => {
        setView(next);
        setError("");
        setSuccess("");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="relative md:w-2/5 bg-gray-900 text-white p-8 flex-col justify-between hidden md:flex">
                    <div className="absolute inset-0 opacity-[0.03] dot-pattern" aria-hidden />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 font-bold text-[#FFE55E] mb-8">
                            <BookOpen className="w-5 h-5" />
                            {SITE_NAME}
                        </div>
                        <h2 className="text-3xl font-bold leading-tight mb-4">
                            {isForgot ? "Reset Password" : isLogin ? "Welcome Back" : "Begin Your Journey"}
                        </h2>
                        <p className="text-white/70 font-medium leading-relaxed">
                            {isForgot
                                ? "We'll email you a link to choose a new password."
                                : "Sign in with Google or email to book sessions and access your dashboard."}
                        </p>
                    </div>
                    <p className="relative z-10 text-xs text-white/40">© 2026 {SITE_NAME}</p>
                </div>

                <div className="flex-1 p-8 md:p-12 relative bg-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {isForgot ? "Forgot password?" : isLogin ? "Sign in" : "Create account"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {isForgot
                                ? "Enter your email and we'll send a reset link."
                                : isLogin
                                  ? "Continue to your account."
                                  : "Get started in seconds."}
                        </p>
                    </div>

                    {!isForgot && (
                        <>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full py-3.5 font-semibold text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60 transition-all mb-6"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-3 text-gray-400 font-medium">or continue with email</span>
                        </div>
                    </div>
                        </>
                    )}

                    {displayError && (
                        <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {displayError}
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {view === "register" && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-2">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="you@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        {!isForgot && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold text-gray-500">Password</label>
                                {isLogin && (
                                    <button
                                        type="button"
                                        onClick={() => switchView("forgot")}
                                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>
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
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-60 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                        >
                            {submitting
                                ? "Please wait..."
                                : isForgot
                                  ? "Send Reset Link"
                                  : isLogin
                                    ? "Sign In"
                                    : "Create Account"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center text-sm">
                        {isForgot ? (
                            <button
                                type="button"
                                onClick={() => switchView("login")}
                                className="text-emerald-600 hover:text-emerald-700 font-semibold"
                            >
                                Back to sign in
                            </button>
                        ) : (
                            <>
                        <span className="text-gray-500 mr-2">
                            {isLogin ? "No account?" : "Already have one?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => switchView(isLogin ? "register" : "login")}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
