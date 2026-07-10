"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, GitBranch, Github, GitCommit, Play, Upload } from "lucide-react";
import type { OssTool, TestResult } from "@/lib/opensource/types";
import type { SimulatedCommit } from "@/lib/credentials/types";

interface IntegrationWorkspaceProps {
    tool: OssTool;
    initialFiles: Record<string, string>;
    initialCommits: SimulatedCommit[];
    initialStaged: string[];
    completed?: boolean;
    githubPushUrl?: string | null;
    pointsEarned?: number;
}

export default function IntegrationWorkspace({
    tool,
    initialFiles,
    initialCommits,
    initialStaged,
    completed = false,
    githubPushUrl,
    pointsEarned,
}: IntegrationWorkspaceProps) {
    const [files, setFiles] = useState(initialFiles);
    const [activeFile, setActiveFile] = useState(Object.keys(initialFiles)[0] ?? "");
    const [staged, setStaged] = useState(initialStaged);
    const [commits, setCommits] = useState(initialCommits);
    const [commitMessage, setCommitMessage] = useState(tool.commitMessage);
    const [terminal, setTerminal] = useState<string[]>([
        `$ git clone https://github.com/your-org/${tool.slug}-integration`,
        `Integrate ${tool.name} — complete the files, commit, push to GitHub for +${tool.points} pts.`,
    ]);
    const [tests, setTests] = useState<TestResult[]>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [repoInput, setRepoInput] = useState("");
    const [done, setDone] = useState(completed);
    const [pushUrl, setPushUrl] = useState(githubPushUrl ?? null);
    const [points, setPoints] = useState(pointsEarned ?? 0);

    const log = useCallback((line: string) => setTerminal((p) => [...p.slice(-50), line]), []);

    useEffect(() => {
        setFiles(initialFiles);
        setCommits(initialCommits);
        setStaged(initialStaged);
    }, [initialFiles, initialCommits, initialStaged]);

    const saveFiles = async (next: Record<string, string>) => {
        await fetch(`/api/integrations/${tool.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ files: next }),
        });
    };

    const handleStage = async (filename: string) => {
        setBusy(true);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/integrations/${tool.slug}/stage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ files: [filename] }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setStaged(data.stagedFiles);
            log(`$ git add ${filename}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Stage failed");
        } finally {
            setBusy(false);
        }
    };

    const handleCommit = async () => {
        if (!commitMessage.trim()) return;
        setBusy(true);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/integrations/${tool.slug}/commit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: commitMessage.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setCommits(data.commits);
            setStaged(data.stagedFiles);
            log(`$ git commit -m "${data.commit.message}"`);
            log(`[main ${data.commit.sha.slice(0, 7)}] ${data.commit.message}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Commit failed");
        } finally {
            setBusy(false);
        }
    };

    const handleTest = async () => {
        setBusy(true);
        setError(null);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/integrations/${tool.slug}/test`, { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setTests(data.tests);
            log(`$ npm run test:integration`);
            data.tests.forEach((t: TestResult) => log(t.pass ? `  ✓ ${t.label}` : `  ✗ ${t.label}`));
        } catch (e) {
            setError(e instanceof Error ? e.message : "Test failed");
        } finally {
            setBusy(false);
        }
    };

    const handleGithubPush = async () => {
        setBusy(true);
        setError(null);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/integrations/${tool.slug}/push`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repo: repoInput.trim() || undefined }),
            });
            const data = await res.json();
            if (data.tests) setTests(data.tests);
            if (!data.pass && !data.pushed) {
                setError(data.summary ?? data.error ?? data.message);
                log(`Push blocked: ${data.summary ?? data.message}`);
                return;
            }
            if (data.pushed || data.verified) {
                setDone(true);
                setPushUrl(data.commitUrl ?? data.githubPushUrl);
                setPoints(data.points ?? tool.points);
                log(`$ git push origin main`);
                log(`✓ +${data.points ?? tool.points} pts — ${data.message}`);
            } else if (data.requiresGitHub) {
                log(data.instructions);
                setError(data.message);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Push failed");
        } finally {
            setBusy(false);
        }
    };

    if (done) {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <GitCommit className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{tool.name} Integrated</h2>
                <p className="text-emerald-700 font-bold text-lg mb-2">+{points} points</p>
                {pushUrl && (
                    <a
                        href={pushUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline mb-4"
                    >
                        View on GitHub <ExternalLink className="w-4 h-4" />
                    </a>
                )}
                <div>
                    <Link
                        href="/opensource"
                        className="inline-flex px-6 py-3 bg-[#10B981] text-white font-semibold rounded-full text-sm"
                    >
                        Integrate another tool →
                    </Link>
                </div>
            </div>
        );
    }

    const fileList = Object.keys(files);

    return (
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-white">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-900 text-white">
                <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm font-bold">integrate/{tool.slug}</span>
                    <span className="text-xs bg-[#FFE55E] text-black px-2 py-0.5 rounded-full font-bold">
                        +{tool.points} pts
                    </span>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={handleTest} disabled={busy} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold disabled:opacity-50">
                        <Play className="w-3.5 h-3.5" /> Test
                    </button>
                    <button type="button" onClick={handleGithubPush} disabled={busy} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#10B981] text-xs font-semibold disabled:opacity-50">
                        <Upload className="w-3.5 h-3.5" /> Push to GitHub
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 min-h-[400px]">
                <div className="border-r border-gray-100 bg-gray-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 px-2">Files</p>
                    <ul className="space-y-1">
                        {fileList.map((f) => (
                            <li key={f}>
                                <button
                                    type="button"
                                    onClick={() => setActiveFile(f)}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-mono ${
                                        activeFile === f ? "bg-emerald-100 text-emerald-800 font-semibold" : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    {staged.includes(f) ? `+ ${f}` : f}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 px-2">
                        <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Steps</p>
                        <ol className="text-[11px] text-gray-500 space-y-1 list-decimal list-inside">
                            {tool.steps.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col">
                    <div className="px-4 py-2 border-b bg-gray-50 text-xs font-mono text-gray-500">{activeFile}</div>
                    <textarea
                        value={files[activeFile] ?? ""}
                        onChange={(e) => setFiles({ ...files, [activeFile]: e.target.value })}
                        spellCheck={false}
                        className="flex-1 min-h-[220px] p-4 font-mono text-sm text-gray-100 bg-[#1e293b] border-0 resize-none focus:outline-none"
                    />
                    <div className="border-t p-3 flex flex-wrap gap-2 items-center">
                        <button type="button" onClick={() => handleStage(activeFile)} disabled={busy} className="px-3 py-1.5 rounded-lg border text-xs font-semibold">
                            git add
                        </button>
                        <input
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                            className="flex-1 min-w-[140px] px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                        <button type="button" onClick={handleCommit} disabled={busy || !staged.length} className="px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold disabled:opacity-50">
                            git commit
                        </button>
                    </div>
                </div>

                <div className="border-l flex flex-col">
                    <div className="px-3 py-2 border-b bg-gray-50 text-[10px] font-bold uppercase text-gray-400">Terminal</div>
                    <pre className="flex-1 p-3 text-[10px] font-mono text-emerald-700 bg-gray-950 overflow-auto max-h-[180px]">{terminal.join("\n")}</pre>
                    {tests.length > 0 && (
                        <div className="border-t p-2 space-y-1 max-h-[100px] overflow-auto">
                            {tests.map((t) => (
                                <p key={t.id} className={`text-[10px] ${t.pass ? "text-emerald-600" : "text-red-600"}`}>
                                    {t.pass ? "✓" : "✗"} {t.label}
                                </p>
                            ))}
                        </div>
                    )}
                    <div className="border-t p-3 bg-slate-50">
                        <div className="flex items-center gap-1 mb-2">
                            <Github className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase text-gray-600">GitHub verify</span>
                        </div>
                        <input
                            value={repoInput}
                            onChange={(e) => setRepoInput(e.target.value)}
                            placeholder="owner/repo (optional if connected)"
                            className="w-full px-2 py-1.5 rounded border text-[11px] font-mono mb-2"
                        />
                        <p className="text-[10px] text-gray-400">
                            Connect GitHub to auto-push, or paste your repo URL after manual push.
                        </p>
                    </div>
                </div>
            </div>
            {error && <div className="px-5 py-3 bg-red-50 border-t text-sm text-red-700">{error}</div>}
        </div>
    );
}
