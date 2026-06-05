import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Sturdee | Education",
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
                    <Navigation />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
