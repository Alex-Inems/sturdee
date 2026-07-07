import type { Metadata } from "next";
import { NOINDEX_ROBOTS } from "@/lib/seo";
import { AuthProvider } from "@/components/AuthContext";

export const metadata: Metadata = {
    robots: NOINDEX_ROBOTS,
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
