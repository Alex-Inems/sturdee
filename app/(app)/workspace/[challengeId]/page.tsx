import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import GitWorkspace from "@/components/credentials/GitWorkspace";
import { getSessionUser } from "@/lib/auth";
import { getChallenge } from "@/lib/credentials";
import {
    getCertificateForChallenge,
    getOrCreateWorkspace,
} from "@/lib/credentials-db";

interface Props {
    params: Promise<{ challengeId: string }>;
}

export default async function WorkspacePage({ params }: Props) {
    const session = await getSessionUser();
    if (!session) redirect(`/?auth=login`);

    const { challengeId } = await params;
    const challenge = getChallenge(challengeId);
    if (!challenge) notFound();

    let workspace;
    let existingCert = null;
    let dbError: string | null = null;

    try {
        [workspace, existingCert] = await Promise.all([
            getOrCreateWorkspace(session.id, challengeId),
            getCertificateForChallenge(session.id, challengeId),
        ]);
    } catch (e) {
        dbError = e instanceof Error ? e.message : "Database unavailable";
    }

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Git Workspace"
                title={challenge.title}
                subtitle={`${challenge.moduleTitle} · ${challenge.skill} — push working code to earn your free micro-certificate.`}
            />
            <SectionShell compact>
                <div className="mb-6">
                    <Link href="/credentials" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                        ← All challenges
                    </Link>
                </div>

                {dbError ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
                        <p className="font-bold mb-2">Workspace unavailable</p>
                        <p>
                            Run the Supabase migration <code className="font-mono text-xs">003_micro_credentials.sql</code>{" "}
                            to enable simulated Git workspaces. ({dbError})
                        </p>
                    </div>
                ) : workspace ? (
                    <>
                        <ul className="mb-6 space-y-2">
                            {challenge.instructions.map((line, i) => (
                                <li key={i} className="text-sm text-gray-600 font-medium flex gap-2">
                                    <span className="text-emerald-600 font-bold">{i + 1}.</span>
                                    {line}
                                </li>
                            ))}
                        </ul>
                        <GitWorkspace
                            challenge={challenge}
                            initialFiles={workspace.files}
                            initialCommits={workspace.commits}
                            initialStaged={workspace.stagedFiles}
                            existingCertCode={existingCert?.verificationCode}
                        />
                    </>
                ) : null}
            </SectionShell>
        </div>
    );
}
