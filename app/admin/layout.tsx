import type { Metadata } from "next";
import { assertFeatureEnabled } from "@/lib/features";
import { NOINDEX_ROBOTS } from "@/lib/seo";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
    robots: NOINDEX_ROBOTS,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    assertFeatureEnabled("admin");

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
