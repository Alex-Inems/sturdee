import type { Metadata } from "next";
import { NOINDEX_ROBOTS } from "@/lib/seo";
import { AuthProvider } from "@/components/AuthContext";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
    robots: NOINDEX_ROBOTS,
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SiteShell>{children}</SiteShell>
        </AuthProvider>
    );
}
