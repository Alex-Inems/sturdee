import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Education`,
  description: "Web development, programming, and cryptocurrency courses at Sturdee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link rel="preload" href="/student.png" as="image" type="image/png" />
      </head>
      <body className="font-jakarta antialiased text-gray-900 bg-page">{children}</body>
    </html>
  );
}
