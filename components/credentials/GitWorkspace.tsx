"use client";

import { useCallback, useEffect, useState } from "react";
import { GitBranch, GitCommit, Play, TreePine, Upload } from "lucide-react";
import ExecutionVisualizer from "@/components/tutorials/ExecutionVisualizer";
import { canTraceLanguage } from "@/lib/execution";
import type { ChallengeMeta, SimulatedCommit, TestResult } from "@/lib/credentials/types";

interface GitWorkspaceProps {
    challenge: ChallengeMeta;
    initialFiles: Record<string, string>;
    initialCommits: SimulatedCommit[];
    initialStaged: string[];
    existingCertCode?: string | null;
}

export default function GitWorkspace({
    challenge,
    initialFiles,
    initialCommits,
    initialStaged,
    existingCertCode,
}: GitWorkspaceProps) {
    const [files, setFiles] = useState(initialFiles);
    const [activeFile, setActiveFile] = useState(Object.keys(initialFiles)[0] ?? "");
    const [staged, setStaged] = useState<string[]>(initialStaged);
    const [commits, setCommits] = useState<SimulatedCommit[]>(initialCommits);
    const [commitMessage, setCommitMessage] = useState("");
    const [terminal, setTerminal] = useState<string[]>([
        `$ git clone sturdee://workspace/${challenge.slug}`,
        `Cloning into '${challenge.slug}'...`,
        `Ready. Edit files, commit, and push to earn your micro-certificate.`,
    ]);
    const [tests, setTests] = useState<TestResult[]>([]);
    const [busy, setBusy] = useState(false);
    const [certCode, setCertCode] = useState(existingCertCode ?? null);
    const [error, setError] = useState<string | null>(null);
    const [showExecution, setShowExecution] = useState(false);

    const log = useCallback((line: string) => {
        setTerminal((prev) => [...prev.slice(-40), line]);
    }, []);

    useEffect(() => {
        setFiles(initialFiles);
        setCommits(initialCommits);
        setStaged(initialStaged);
    }, [initialFiles, initialCommits, initialStaged]);

    const fileList = Object.keys(files);
    const canExplainFile = activeFile.endsWith(".js") && canTraceLanguage("javascript");

    const saveFiles = async (nextFiles: Record<string, string>) => {
        await fetch(`/api/workspaces/${challenge.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ files: nextFiles }),
        });
    };

    const handleFileChange = (content: string) => {
        const next = { ...files, [activeFile]: content };
        setFiles(next);
    };

    const handleStage = async (filename: string) => {
        setBusy(true);
        setError(null);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/workspaces/${challenge.id}/stage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ files: [filename] }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Stage failed");
            setStaged(data.stagedFiles);
            log(`$ git add ${filename}`);
            log(`Staged ${filename}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Stage failed");
        } finally {
            setBusy(false);
        }
    };

    const handleCommit = async () => {
        if (!commitMessage.trim()) {
            setError("Write a commit message describing your changes.");
            return;
        }
        setBusy(true);
        setError(null);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/workspaces/${challenge.id}/commit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: commitMessage.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Commit failed");
            setCommits(data.commits);
            setStaged(data.stagedFiles);
            setCommitMessage("");
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
            const res = await fetch(`/api/workspaces/${challenge.id}/test`, { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Test failed");
            setTests(data.tests);
            log(`$ npm test`);
            data.tests.forEach((t: TestResult) => {
                log(t.pass ? `  ✓ ${t.label}` : `  ✗ ${t.label} — ${t.detail}`);
            });
            log(data.summary);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Test failed");
        } finally {
            setBusy(false);
        }
    };

    const handlePush = async () => {
        setBusy(true);
        setError(null);
        try {
            await saveFiles(files);
            const res = await fetch(`/api/workspaces/${challenge.id}/push`, { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Push failed");
            if (data.tests) setTests(data.tests);
            if (!data.pass) {
                log(`$ git push origin main`);
                log(`Push rejected: ${data.summary}`);
                setError(data.summary);
                return;
            }
            setCertCode(data.certificate.verificationCode);
            log(`$ git push origin main`);
            log(`Enumerating objects: ${commits.length + 1}, done.`);
            log(`✓ Micro-certificate issued: ${data.certificate.verificationCode}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Push failed");
        } finally {
            setBusy(false);
        }
    };

    if (certCode) {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <GitCommit className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Micro-Certificate Earned</h2>
                <p className="text-gray-600 mb-4">
                    {challenge.title} — verified by {commits.length} commit{commits.length !== 1 ? "s" : ""}
                </p>
                <p className="font-mono text-sm bg-white border border-emerald-200 rounded-lg px-4 py-2 inline-block mb-6">
                    {certCode}
                </p>
                <div>
                    <a
                        href={`/verify/${certCode}`}
                        className="inline-flex px-6 py-3 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        View & Share Credential →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-white">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-900 text-white">
                <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm font-bold">sturdee/{challenge.slug}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleTest}
                        disabled={busy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold disabled:opacity-50"
                    >
                        <Play className="w-3.5 h-3.5" /> Run Tests
                    </button>
                    <button
                        type="button"
                        onClick={handlePush}
                        disabled={busy}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0F9F72] text-xs font-semibold disabled:opacity-50"
                    >
                        <Upload className="w-3.5 h-3.5" /> Push
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 min-h-[420px]">
                <div className="border-r border-gray-100 bg-gray-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2 px-2">Files</p>
                    <ul className="space-y-1">
                        {fileList.map((f) => (
                            <li key={f}>
                                <button
                                    type="button"
                                    onClick={() => setActiveFile(f)}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-mono ${
                                        activeFile === f
                                            ? "bg-emerald-100 text-emerald-800 font-semibold"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    {staged.includes(f) ? `+ ${f}` : f}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-2 flex flex-col">
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 text-xs font-mono text-gray-500">
                        {activeFile}
                    </div>
                    <textarea
                        value={files[activeFile] ?? ""}
                        onChange={(e) => handleFileChange(e.target.value)}
                        spellCheck={false}
                        className="flex-1 min-h-[200px] p-4 font-mono text-sm text-gray-100 bg-[#1e293b] border-0 resize-none focus:outline-none"
                    />
                    <div className="border-t border-gray-100 p-3 flex flex-wrap gap-2 items-center">
                        {canExplainFile && (
                            <button
                                type="button"
                                onClick={() => setShowExecution((v) => !v)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                                    showExecution
                                        ? "bg-violet-500 text-white"
                                        : "border border-violet-200 text-violet-700 hover:bg-violet-50"
                                }`}
                            >
                                <TreePine className="w-3.5 h-3.5" /> Explain Execution
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => activeFile && handleStage(activeFile)}
                            disabled={busy || !activeFile}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            git add {activeFile}
                        </button>
                        <input
                            type="text"
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                            placeholder="Commit message…"
                            className="flex-1 min-w-[160px] px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-mono"
                        />
                        <button
                            type="button"
                            onClick={handleCommit}
                            disabled={busy || staged.length === 0}
                            className="px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold disabled:opacity-50"
                        >
                            git commit
                        </button>
                    </div>
                    {showExecution && canExplainFile && (
                        <ExecutionVisualizer
                            key={files[activeFile]}
                            code={files[activeFile] ?? ""}
                            language="javascript"
                            onClose={() => setShowExecution(false)}
                        />
                    )}
                </div>

                <div className="border-l border-gray-100 flex flex-col">
                    <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                        Terminal
                    </div>
                    <pre className="flex-1 p-3 text-[11px] font-mono text-emerald-700 bg-gray-950 overflow-auto max-h-[200px]">
                        {terminal.join("\n")}
                    </pre>
                    {tests.length > 0 && (
                        <div className="border-t border-gray-100 p-3 space-y-1 max-h-[120px] overflow-auto">
                            {tests.map((t) => (
                                <p key={t.id} className={`text-[11px] ${t.pass ? "text-emerald-600" : "text-red-600"}`}>
                                    {t.pass ? "✓" : "✗"} {t.label}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="px-5 py-3 bg-red-50 border-t border-red-100 text-sm text-red-700">{error}</div>
            )}
        </div>
    );
}
