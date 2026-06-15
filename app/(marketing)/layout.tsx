import { AuthProvider } from "@/components/AuthContext";
import SiteShell from "@/components/SiteShell";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider deferAuth>
      <SiteShell>{children}</SiteShell>
    </AuthProvider>
  );
}
