import type { Metadata } from "next";
import { NOINDEX_ROBOTS } from "@/lib/seo";
import { AuthProvider } from "@/components/AuthContext";
import AppIntlProvider from "@/components/AppIntlProvider";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
    robots: NOINDEX_ROBOTS,
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppIntlProvider>
            <AuthProvider>
                <SiteShell>{children}</SiteShell>
            </AuthProvider>
        </AppIntlProvider>
    );
}
