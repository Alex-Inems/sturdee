import type { Metadata } from "next";
import { rootMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-jakarta",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
            <head>
                <link rel="preload" href="/student.png" as="image" type="image/png" />
            </head>
            <body className="font-jakarta antialiased text-gray-900 bg-page">
                <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
                {children}
            </body>
        </html>
    );
}
