"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
    useMemo,
} from "react";
import type { User, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { SessionUser } from "@/lib/types";

interface AuthContextType {
    user: SessionUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    register: (email: string, name: string, password: string) => Promise<{ error?: string; message?: string }>;
    signInWithGoogle: () => Promise<{ error?: string }>;
    resetPassword: (email: string) => Promise<{ error?: string; message?: string }>;
    updatePassword: (password: string) => Promise<{ error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
    ensureAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(supabase: SupabaseClient, userId: string): Promise<SessionUser | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, email, name, role")
        .eq("id", userId)
        .single();

    if (error || !data) return null;
    return data as SessionUser;
}

function sessionUserFromAuth(authUser: User, profile: SessionUser | null): SessionUser {
    if (profile) return profile;

    return {
        id: authUser.id,
        email: authUser.email ?? "",
        name:
            (authUser.user_metadata?.name as string) ||
            (authUser.user_metadata?.full_name as string) ||
            authUser.email?.split("@")[0] ||
            "User",
        role: "user",
    };
}

export function AuthProvider({
    children,
    deferAuth = false,
}: {
    children: ReactNode;
    deferAuth?: boolean;
}) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [loading, setLoading] = useState(!deferAuth);
    const [authEnabled, setAuthEnabled] = useState(!deferAuth);
    const supabase = useMemo(() => createClient(), []);

    const applySession = useCallback(
        async (authUser: User | null | undefined) => {
            if (!authUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            const profile = await fetchProfile(supabase, authUser.id);
            setUser(sessionUserFromAuth(authUser, profile));
            setLoading(false);
        },
        [supabase]
    );

    const ensureAuth = useCallback(() => {
        setAuthEnabled(true);
    }, []);

    const refreshUser = useCallback(async () => {
        setAuthEnabled(true);
        const {
            data: { user: authUser },
        } = await supabase.auth.getUser();
        await applySession(authUser);
    }, [supabase, applySession]);

    useEffect(() => {
        if (!authEnabled) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            void applySession(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase, applySession, authEnabled]);

    useEffect(() => {
        if (!deferAuth || authEnabled) return;

        const enable = () => setAuthEnabled(true);
        const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 100));
        const id = idle(enable);
        return () => {
            if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
        };
    }, [deferAuth, authEnabled]);

    const login = async (email: string, password: string) => {
        ensureAuth();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        await refreshUser();
        return {};
    };

    const register = async (email: string, name: string, password: string) => {
        ensureAuth();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, full_name: name },
                emailRedirectTo: `${siteUrl}/auth/callback`,
            },
        });

        if (error) return { error: error.message };

        if (data.user && !data.session) {
            return {
                message: "Check your email for a confirmation link to complete sign-up.",
            };
        }

        await refreshUser();
        return {};
    };

    const signInWithGoogle = async () => {
        ensureAuth();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${siteUrl}/auth/callback`,
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        });

        if (error) return { error: error.message };
        return {};
    };

    const resetPassword = async (email: string) => {
        ensureAuth();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
        });

        if (error) return { error: error.message };
        return { message: "Check your email for a password reset link." };
    };

    const updatePassword = async (password: string) => {
        ensureAuth();
        const { error } = await supabase.auth.updateUser({ password });
        if (error) return { error: error.message };
        await refreshUser();
        return {};
    };

    const logout = async () => {
        ensureAuth();
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                signInWithGoogle,
                resetPassword,
                updatePassword,
                logout,
                refreshUser,
                isAuthenticated: !!user,
                ensureAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
