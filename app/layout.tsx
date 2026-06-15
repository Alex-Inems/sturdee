import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
    title: "Stwedy | Education",
    description: "Inspiring education exploration",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-jakarta antialiased text-gray-900 bg-white">
                <AuthProvider>
                    <SiteShell>{children}</SiteShell>
                </AuthProvider>
            </body>
        </html>
    );
}
