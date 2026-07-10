import { createClient } from "@/lib/supabase/server";
import { getChallenge } from "@/lib/credentials/challenges";
import {
    buildCommitSha,
    buildVerificationCode,
    signCredential,
} from "@/lib/credentials/crypto";
import type { MicroCertificate, SimulatedCommit, WorkspaceState } from "@/lib/credentials/types";

interface WorkspaceRow {
    id: string;
    user_id: string;
    challenge_id: string;
    files: Record<string, string>;
    staged_files: string[];
    commits: SimulatedCommit[];
    updated_at: string;
}

interface CertificateRow {
    id: string;
    user_id: string;
    user_name: string;
    challenge_id: string;
    title: string;
    skill: string;
    category: string;
    commit_sha: string;
    verification_code: string;
    signature: string;
    commit_log: SimulatedCommit[];
    files_snapshot: Record<string, string>;
    issued_at: string;
}

function mapWorkspace(row: WorkspaceRow): WorkspaceState {
    return {
        challengeId: row.challenge_id,
        files: row.files ?? {},
        stagedFiles: row.staged_files ?? [],
        commits: (row.commits as SimulatedCommit[]) ?? [],
    };
}

function mapCertificate(row: CertificateRow): MicroCertificate {
    return {
        id: row.id,
        userId: row.user_id,
        userName: row.user_name,
        challengeId: row.challenge_id,
        title: row.title,
        skill: row.skill,
        category: row.category,
        commitSha: row.commit_sha,
        verificationCode: row.verification_code,
        signature: row.signature,
        commitLog: (row.commit_log as SimulatedCommit[]) ?? [],
        issuedAt: row.issued_at,
    };
}

export async function getOrCreateWorkspace(
    userId: string,
    challengeId: string
): Promise<WorkspaceState> {
    const challenge = getChallenge(challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const supabase = await createClient();
    const { data: existing } = await supabase
        .from("user_workspaces")
        .select("*")
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)
        .maybeSingle<WorkspaceRow>();

    if (existing) return mapWorkspace(existing);

    const { data: row, error } = await supabase
        .from("user_workspaces")
        .insert({
            user_id: userId,
            challenge_id: challengeId,
            files: challenge.starterFiles,
            staged_files: [],
            commits: [],
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return mapWorkspace(row as WorkspaceRow);
}

export async function saveWorkspace(
    userId: string,
    state: WorkspaceState
): Promise<WorkspaceState> {
    const supabase = await createClient();
    const { data: row, error } = await supabase
        .from("user_workspaces")
        .update({
            files: state.files,
            staged_files: state.stagedFiles,
            commits: state.commits,
            updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("challenge_id", state.challengeId)
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return mapWorkspace(row as WorkspaceRow);
}

export async function getCertificatesByUserId(userId: string): Promise<MicroCertificate[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("micro_certificates")
        .select("*")
        .eq("user_id", userId)
        .order("issued_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as CertificateRow[]).map(mapCertificate);
}

export async function getCertificateByCode(code: string): Promise<MicroCertificate | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_certificate_by_code", { p_code: code });

    if (error) throw new Error(error.message);
    if (!data) return null;
    return mapCertificate(data as CertificateRow);
}

export async function getCertificateForChallenge(
    userId: string,
    challengeId: string
): Promise<MicroCertificate | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("micro_certificates")
        .select("*")
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)
        .maybeSingle<CertificateRow>();

    return data ? mapCertificate(data) : null;
}

export async function issueCertificate(data: {
    userId: string;
    userName: string;
    challengeId: string;
    commits: SimulatedCommit[];
    files: Record<string, string>;
}): Promise<MicroCertificate> {
    const challenge = getChallenge(data.challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const existing = await getCertificateForChallenge(data.userId, data.challengeId);
    if (existing) return existing;

    const latest = data.commits[data.commits.length - 1];
    if (!latest) throw new Error("No commits to certify");

    const issuedAt = new Date().toISOString();
    const commitSha = latest.sha;
    const verificationCode = buildVerificationCode(commitSha, data.challengeId);
    const signature = signCredential(data.userId, data.challengeId, commitSha, issuedAt);

    const supabase = await createClient();
    const { data: row, error } = await supabase
        .from("micro_certificates")
        .insert({
            user_id: data.userId,
            user_name: data.userName,
            challenge_id: data.challengeId,
            title: challenge.title,
            skill: challenge.skill,
            category: challenge.category,
            commit_sha: commitSha,
            verification_code: verificationCode,
            signature,
            commit_log: data.commits,
            files_snapshot: data.files,
            issued_at: issuedAt,
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return mapCertificate(row as CertificateRow);
}

export function createSimulatedCommit(
    userId: string,
    challengeId: string,
    files: Record<string, string>,
    message: string
): SimulatedCommit {
    const timestamp = new Date().toISOString();
    const sha = buildCommitSha(userId, challengeId, files, message, timestamp);
    return { sha, message, files: { ...files }, timestamp };
}
