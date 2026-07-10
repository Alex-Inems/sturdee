import type { OssTool } from "@/lib/opensource/types";

export interface GithubVerifyResult {
    verified: boolean;
    commitSha?: string;
    commitUrl?: string;
    message: string;
}

export interface GithubPushResult {
    pushed: boolean;
    repo: string;
    commitSha?: string;
    commitUrl?: string;
    message: string;
}

function parseRepo(input: string): { owner: string; repo: string } | null {
    const trimmed = input.trim().replace(/\/$/, "");
    const match = trimmed.match(/github\.com\/([^/]+)\/([^/]+)/i) ?? trimmed.match(/^([^/]+)\/([^/]+)$/);
    if (!match) return null;
    return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

function authHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
        Accept: "application/vnd.github+json",
        "User-Agent": "Sturdee-OpenSource-Hub",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
}

/** Verify a GitHub repo contains the Sturdee integration marker for a tool. */
export async function verifyGithubIntegration(
    repoInput: string,
    tool: OssTool,
    githubToken?: string
): Promise<GithubVerifyResult> {
    const parsed = parseRepo(repoInput);
    if (!parsed) {
        return { verified: false, message: "Invalid repo format. Use owner/repo or full GitHub URL." };
    }

    const { owner, repo } = parsed;
    const headers = authHeaders(githubToken);

    const markerRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${tool.markerFile}`,
        { headers, next: { revalidate: 0 } }
    );

    if (markerRes.status === 404) {
        return {
            verified: false,
            message: `Push ${tool.markerFile} to the repo first, then verify again.`,
        };
    }

    if (!markerRes.ok) {
        return { verified: false, message: `GitHub API error: ${markerRes.status}` };
    }

    const markerData = await markerRes.json();
    const content = Buffer.from(markerData.content, "base64").toString("utf8");
    let slug: string | undefined;
    try {
        slug = JSON.parse(content).sturdee_integration;
    } catch {
        return { verified: false, message: "Invalid sturdee.integrations.json format." };
    }

    if (slug !== tool.slug) {
        return { verified: false, message: `Marker is for "${slug}", expected "${tool.slug}".` };
    }

    const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`,
        { headers, next: { revalidate: 0 } }
    );

    if (!commitsRes.ok) {
        return { verified: true, message: "Marker found. Could not fetch commit history." };
    }

    const commits = await commitsRes.json();
    const match = commits.find(
        (c: { commit: { message: string } }) =>
            c.commit.message.toLowerCase().includes("[sturdee]") ||
            c.commit.message.toLowerCase().includes(tool.slug)
    );

    if (!match) {
        return {
            verified: false,
            message: `Marker found but no commit with message containing "[sturdee]" or "${tool.slug}". Push with: ${tool.commitMessage}`,
        };
    }

    return {
        verified: true,
        commitSha: match.sha,
        commitUrl: match.html_url,
        message: "GitHub push verified — integration points awarded.",
    };
}

/** Push integration files to GitHub via OAuth provider token. */
export async function pushToGithub(
    tool: OssTool,
    files: Record<string, string>,
    githubToken: string,
    githubUsername: string
): Promise<GithubPushResult> {
    const repoName = `sturdee-${tool.slug}-integration`;
    const headers = authHeaders(githubToken);

    const createRes = await fetch(`https://api.github.com/user/repos`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
            name: repoName,
            description: `Sturdee open-source integration: ${tool.name}`,
            private: false,
            auto_init: false,
        }),
    });

    if (createRes.status !== 201 && createRes.status !== 422) {
        const err = await createRes.text();
        return { pushed: false, repo: "", message: `Failed to create repo: ${createRes.status} ${err}` };
    }

    const repoFull = `${githubUsername}/${repoName}`;
    let lastSha: string | undefined;
    let lastUrl: string | undefined;

    for (const [path, content] of Object.entries(files)) {
        const putRes = await fetch(
            `https://api.github.com/repos/${repoFull}/contents/${path}`,
            {
                method: "PUT",
                headers: { ...headers, "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: tool.commitMessage,
                    content: Buffer.from(content).toString("base64"),
                }),
            }
        );

        if (!putRes.ok) {
            const err = await putRes.text();
            return { pushed: false, repo: repoFull, message: `Failed to push ${path}: ${putRes.status} ${err}` };
        }

        const data = await putRes.json();
        lastSha = data.commit?.sha;
        lastUrl = data.commit?.html_url;
    }

    return {
        pushed: true,
        repo: repoFull,
        commitSha: lastSha,
        commitUrl: lastUrl,
        message: `Pushed to https://github.com/${repoFull}`,
    };
}

export function getGithubUsernameFromMetadata(metadata: Record<string, unknown> | undefined): string | null {
    if (!metadata) return null;
    return (
        (metadata.user_name as string) ||
        (metadata.preferred_username as string) ||
        (metadata.login as string) ||
        null
    );
}
