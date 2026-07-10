"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { useAuth } from "@/components/AuthContext";
import type { MicroCertificate } from "@/lib/credentials/types";

export default function MyCredentialsPage() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [certs, setCerts] = useState<MicroCertificate[]>([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.replace("/?auth=login");
            return;
        }
        fetch("/api/certificates")
            .then((r) => r.json())
            .then((d) => setCerts(d.certificates ?? []))
            .finally(() => setFetching(false));
    }, [loading, isAuthenticated, router]);

    if (loading || !isAuthenticated) return null;

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="My Credentials"
                title="Micro-Certificates"
                subtitle="Free credentials verified by your code commits — share the verify link with employers."
            />
            <SectionShell compact>
                {fetching ? (
                    <div className="animate-pulse h-24 rounded-2xl bg-gray-50" />
                ) : certs.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-xl">
                        <Award className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium mb-4">No micro-certificates yet.</p>
                        <Link
                            href="/credentials"
                            className="inline-flex px-6 py-3 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                        >
                            Browse Challenges →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {certs.map((c) => (
                            <div
                                key={c.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div>
                                    <p className="text-xs font-bold text-emerald-600 mb-1">{c.skill}</p>
                                    <h2 className="font-bold text-gray-900">{c.title}</h2>
                                    <p className="text-xs text-gray-400 mt-1 font-mono">{c.verificationCode}</p>
                                </div>
                                <Link
                                    href={`/verify/${c.verificationCode}`}
                                    className="px-5 py-2.5 border border-emerald-200 text-emerald-700 font-semibold rounded-full text-sm hover:bg-emerald-50 shrink-0 text-center"
                                >
                                    View & Share
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </SectionShell>
        </div>
    );
}
