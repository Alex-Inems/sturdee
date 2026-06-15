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
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { SessionUser } from "@/lib/types";

interface AuthContextType {
    user: SessionUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    register: (email: string, name: string, password: string) => Promise<{ error?: string; message?: string }>;
    signInWithGoogle: () => Promise<{ error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(supabase: ReturnType<typeof createClient>, userId: string): Promise<SessionUser | null> {
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

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [loading, setLoading] = useState(true);
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

    const refreshUser = useCallback(async () => {
        const {
            data: { user: authUser },
        } = await supabase.auth.getUser();
        await applySession(authUser);
    }, [supabase, applySession]);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            void applySession(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase, applySession]);

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        await refreshUser();
        return {};
    };

    const register = async (email: string, name: string, password: string) => {
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

    const logout = async () => {
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
                logout,
                refreshUser,
                isAuthenticated: !!user,
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
