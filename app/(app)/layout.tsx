import { AuthProvider } from "@/components/AuthContext";
import SiteShell from "@/components/SiteShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SiteShell>{children}</SiteShell>
        </AuthProvider>
    );
}
