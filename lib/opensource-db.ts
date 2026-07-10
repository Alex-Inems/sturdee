import { createClient } from "@/lib/supabase/server";
import { getOssTool } from "@/lib/opensource/tools";
import {
    createSimulatedCommit,
} from "@/lib/credentials-db";
import type { SimulatedCommit } from "@/lib/credentials/types";
import type { IntegrationCompletion, UserPointsSummary } from "@/lib/opensource/types";

interface WorkspaceRow {
    tool_slug: string;
    files: Record<string, string>;
    staged_files: string[];
    commits: SimulatedCommit[];
}

interface CompletionRow {
    id: string;
    user_id: string;
    tool_slug: string;
    points: number;
    github_repo: string | null;
    github_commit_sha: string | null;
    github_push_url: string | null;
    completed_at: string;
}

function mapCompletion(row: CompletionRow): IntegrationCompletion {
    return {
        id: row.id,
        userId: row.user_id,
        toolSlug: row.tool_slug,
        points: row.points,
        githubRepo: row.github_repo,
        githubCommitSha: row.github_commit_sha,
        githubPushUrl: row.github_push_url,
        completedAt: row.completed_at,
    };
}

export async function getIntegrationWorkspace(userId: string, toolSlug: string) {
    const tool = getOssTool(toolSlug);
    if (!tool) throw new Error("Tool not found");

    const supabase = await createClient();
    const { data: existing } = await supabase
        .from("integration_workspaces")
        .select("*")
        .eq("user_id", userId)
        .eq("tool_slug", toolSlug)
        .maybeSingle<WorkspaceRow & { id: string }>();

    if (existing) {
        return {
            toolSlug,
            files: existing.files ?? {},
            stagedFiles: existing.staged_files ?? [],
            commits: (existing.commits as SimulatedCommit[]) ?? [],
        };
    }

    const { data: row, error } = await supabase
        .from("integration_workspaces")
        .insert({
            user_id: userId,
            tool_slug: toolSlug,
            files: tool.starterFiles,
            staged_files: [],
            commits: [],
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return {
        toolSlug,
        files: (row as WorkspaceRow).files,
        stagedFiles: [],
        commits: [],
    };
}

export async function saveIntegrationWorkspace(
    userId: string,
    toolSlug: string,
    data: { files: Record<string, string>; stagedFiles: string[]; commits: SimulatedCommit[] }
) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("integration_workspaces")
        .update({
            files: data.files,
            staged_files: data.stagedFiles,
            commits: data.commits,
            updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("tool_slug", toolSlug);

    if (error) throw new Error(error.message);
}

export async function getCompletion(userId: string, toolSlug: string): Promise<IntegrationCompletion | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("integration_completions")
        .select("*")
        .eq("user_id", userId)
        .eq("tool_slug", toolSlug)
        .maybeSingle<CompletionRow>();

    return data ? mapCompletion(data) : null;
}

export async function recordIntegrationCompletion(data: {
    userId: string;
    toolSlug: string;
    points: number;
    githubRepo: string;
    githubCommitSha: string;
    githubPushUrl: string;
}): Promise<IntegrationCompletion> {
    const existing = await getCompletion(data.userId, data.toolSlug);
    if (existing) return existing;

    const supabase = await createClient();
    const { data: row, error } = await supabase
        .from("integration_completions")
        .insert({
            user_id: data.userId,
            tool_slug: data.toolSlug,
            points: data.points,
            github_repo: data.githubRepo,
            github_commit_sha: data.githubCommitSha,
            github_push_url: data.githubPushUrl,
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return mapCompletion(row as CompletionRow);
}

export async function getUserPointsSummary(userId: string): Promise<UserPointsSummary> {
    const supabase = await createClient();
    const [{ data: profile }, { data: completions }] = await Promise.all([
        supabase.from("profiles").select("integration_points").eq("id", userId).single(),
        supabase
            .from("integration_completions")
            .select("*")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false }),
    ]);

    const list = (completions as CompletionRow[] | null)?.map(mapCompletion) ?? [];
    return {
        totalPoints: profile?.integration_points ?? list.reduce((s, c) => s + c.points, 0),
        completedCount: list.length,
        completions: list,
    };
}

export { createSimulatedCommit };
