import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import IntegrationWorkspace from "@/components/opensource/IntegrationWorkspace";
import { getSessionUser } from "@/lib/auth";
import { assertFeatureEnabled } from "@/lib/features";
import { getOssTool } from "@/lib/opensource";
import { getCompletion, getIntegrationWorkspace } from "@/lib/opensource-db";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function IntegrateToolPage({ params }: Props) {
    assertFeatureEnabled("openSource");

    const session = await getSessionUser();
    if (!session) redirect(`/?auth=login&next=/integrate/${(await params).slug}`);

    const { slug } = await params;
    const tool = getOssTool(slug);
    if (!tool) notFound();

    let workspace;
    let completion = null;
    let dbError: string | null = null;

    try {
        [workspace, completion] = await Promise.all([
            getIntegrationWorkspace(session.id, slug),
            getCompletion(session.id, slug),
        ]);
    } catch (e) {
        dbError = e instanceof Error ? e.message : "Database unavailable";
    }

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight={`+${tool.points} Integration Points`}
                title={`Integrate ${tool.name}`}
                subtitle={tool.integrationGoal}
            />
            <SectionShell compact>
                <Link href={`/opensource/${tool.slug}`} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
                    ← {tool.name} overview
                </Link>

                {dbError ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
                        Run migration <code className="font-mono text-xs">004_opensource_integrations.sql</code> in Supabase. ({dbError})
                    </div>
                ) : workspace ? (
                    <IntegrationWorkspace
                        tool={tool}
                        initialFiles={workspace.files}
                        initialCommits={workspace.commits}
                        initialStaged={workspace.stagedFiles}
                        completed={!!completion}
                        githubPushUrl={completion?.githubPushUrl}
                        pointsEarned={completion?.points}
                    />
                ) : null}
            </SectionShell>
        </div>
    );
}
