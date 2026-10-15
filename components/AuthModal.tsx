"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    X,
    BookOpen,
    Mail,
    Lock,
    ArrowRight,
    User,
    AlertCircle,
    CheckCircle2,
    GraduationCap,
    Presentation,
} from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import { useAuth } from "./AuthContext";
import type { AccountRole } from "@/lib/types";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialError?: string;
    initialRole?: AccountRole | null;
    initialView?: AuthView;
    redirectNext?: string | null;
}

type AuthView = "role" | "login" | "register" | "forgot";

export default function AuthModal({
    isOpen,
    onClose,
    initialError,
    initialRole = null,
    initialView,
    redirectNext = null,
}: AuthModalProps) {
    const [view, setView] = useState<AuthView>(initialView ?? (initialRole ? "login" : "role"));
    const [accountRole, setAccountRole] = useState<AccountRole | null>(initialRole);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(initialError ?? "");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login, register, resetPassword } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (initialError) setError(initialError);
    }, [initialError]);

    useEffect(() => {
        if (!isOpen) return;
        if (initialView) {
            setView(initialView);
            if (initialRole) setAccountRole(initialRole);
            return;
        }
        if (initialRole) {
            setAccountRole(initialRole);
            setView("login");
        } else {
            setView("role");
            setAccountRole(null);
        }
    }, [isOpen, initialRole, initialView]);

    if (!isOpen) return null;

    const isLogin = view === "login";
    const isForgot = view === "forgot";
    const isRole = view === "role";
    const displayError = error || initialError || "";

    const chooseRole = (role: AccountRole) => {
        setAccountRole(role);
        setView("login");
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!accountRole && !isForgot) return;

        setError("");
        setSuccess("");
        setSubmitting(true);

        const result = isForgot
            ? await resetPassword(email)
            : isLogin
              ? await login(email, password, accountRole!, redirectNext ?? undefined)
              : await register(email, name, password, accountRole!, redirectNext ?? undefined);

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
        setView("role");
        setAccountRole(null);

        if ("redirectTo" in result && result.redirectTo) {
            router.push(result.redirectTo);
        }
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
                            {isRole
                                ? "How will you use Sturdee?"
                                : isForgot
                                  ? "Reset Password"
                                  : accountRole === "tutor"
                                    ? "Tutor sign-in"
                                    : "Student sign-in"}
                        </h2>
                        <p className="text-white/70 font-medium leading-relaxed">
                            {isRole
                                ? "Students learn with tutorials, AI Tutor, and live classes. Tutors host cohorts over Meet."
                                : isForgot
                                  ? "We'll email you a link to choose a new password."
                                  : accountRole === "tutor"
                                    ? "Host live classroom sessions and manage your classes."
                                    : "Access tutorials, AI Tutor, skills, and live classes with your email account."}
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

                    {isRole ? (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose your role</h3>
                            <p className="text-gray-500 text-sm mb-8">You can only access the dashboard for the role you sign in as.</p>
                            <div className="grid gap-3">
                                <button
                                    type="button"
                                    onClick={() => chooseRole("student")}
                                    className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 text-left hover:border-emerald-400 hover:bg-emerald-50/40 transition-colors"
                                >
                                    <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <GraduationCap className="w-5 h-5" />
                                    </span>
                                    <span>
                                        <span className="block font-bold text-gray-900">I&apos;m a student</span>
                                        <span className="block text-sm text-gray-500 font-medium mt-1">
                                            Tutorials, AI Tutor, skills, and live classroom sessions.
                                        </span>
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => chooseRole("tutor")}
                                    className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 text-left hover:border-emerald-400 hover:bg-emerald-50/40 transition-colors"
                                >
                                    <span className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                        <Presentation className="w-5 h-5" />
                                    </span>
                                    <span>
                                        <span className="block font-bold text-gray-900">I&apos;m a tutor</span>
                                        <span className="block text-sm text-gray-500 font-medium mt-1">
                                            Create and run live classes for up to 100 students.
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <button
                                    type="button"
                                    onClick={() => switchView("role")}
                                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-3"
                                >
                                    ← Change role
                                </button>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {isForgot
                                        ? "Forgot password?"
                                        : isLogin
                                          ? `Sign in as ${accountRole}`
                                          : `Create ${accountRole} account`}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {isForgot
                                        ? "Enter your email and we'll send a reset link."
                                        : `Continuing as ${accountRole}.`}
                                </p>
                            </div>

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
                                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                                            Full Name
                                        </label>
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
                                            <label className="block text-xs font-semibold text-gray-500">
                                                Password
                                            </label>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
