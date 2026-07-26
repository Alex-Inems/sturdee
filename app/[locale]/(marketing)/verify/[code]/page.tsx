import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { getChallenge } from "@/lib/credentials";
import { verifySignature } from "@/lib/credentials/crypto";
import { getCertificateByCode } from "@/lib/credentials-db";
import { assertFeatureEnabled } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";

interface Props {
    params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params;
    const cert = await getCertificateByCode(code).catch(() => null);
    if (!cert) return { title: "Credential Not Found" };
    return pageMetadata({
        title: `${cert.title} — Verified Micro-Certificate`,
        description: `${cert.userName} earned the ${cert.skill} micro-certificate on Sturdee. Cryptographically verified by code commit ${cert.commitSha.slice(0, 7)}.`,
        path: `/verify/${code}`,
        keywords: [cert.skill, "verified credential", "micro-certificate"],
    });
}

export default async function VerifyCredentialPage({ params }: Props) {
    assertFeatureEnabled("credentials");

    const { code } = await params;
    const certificate = await getCertificateByCode(code).catch(() => null);
    if (!certificate) notFound();

    const challenge = getChallenge(certificate.challengeId);
    const valid = verifySignature(
        certificate.signature,
        certificate.userId,
        certificate.challengeId,
        certificate.commitSha,
        certificate.issuedAt
    );

    const issued = new Date(certificate.issuedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "EducationalOccupationalCredential",
                    name: certificate.title,
                    description: `${certificate.skill} — verified by Sturdee commit ${certificate.commitSha.slice(0, 7)}`,
                    credentialCategory: certificate.skill,
                    recognizedBy: { "@type": "Organization", name: "Sturdee" },
                    dateCreated: certificate.issuedAt,
                }}
            />
            <div className="max-w-2xl mx-auto px-6 md:px-12">
                <div
                    className={`rounded-2xl border p-8 shadow-xl ${
                        valid ? "border-emerald-200 bg-white" : "border-red-200 bg-red-50"
                    }`}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                valid ? "bg-emerald-100" : "bg-red-100"
                            }`}
                        >
                            <span className="text-xl">{valid ? "✓" : "✗"}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                {valid ? "Verified Credential" : "Invalid Signature"}
                            </p>
                            <h1 className="text-2xl font-bold text-gray-900">{certificate.title}</h1>
                        </div>
                    </div>

                    <dl className="space-y-4 text-sm mb-8">
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <dt className="text-gray-500">Issued to</dt>
                            <dd className="font-semibold text-gray-900">{certificate.userName}</dd>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <dt className="text-gray-500">Skill</dt>
                            <dd className="font-semibold text-gray-900">{certificate.skill}</dd>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <dt className="text-gray-500">Category</dt>
                            <dd className="font-semibold text-gray-900">{certificate.category}</dd>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <dt className="text-gray-500">Issued</dt>
                            <dd className="font-semibold text-gray-900">{issued}</dd>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-3">
                            <dt className="text-gray-500">Commit SHA</dt>
                            <dd className="font-mono text-xs text-gray-700">{certificate.commitSha}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Verification code</dt>
                            <dd className="font-mono text-xs font-bold text-emerald-700">{certificate.verificationCode}</dd>
                        </div>
                    </dl>

                    {challenge && (
                        <p className="text-sm text-gray-500 font-medium mb-6">
                            Earned by pushing {certificate.commitLog.length} verified commit
                            {certificate.commitLog.length !== 1 ? "s" : ""} to the{" "}
                            <em>{challenge.title}</em> simulated repository.
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/credentials"
                            className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-300"
                        >
                            All Challenges
                        </Link>
                        {challenge && (
                            <Link
                                href={`/workspace/${challenge.id}`}
                                className="px-5 py-2.5 bg-[#10B981] hover:bg-[#0F9F72] text-white rounded-full text-sm font-semibold"
                            >
                                Try This Challenge
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
