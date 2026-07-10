"use client";

import { useCallback, useState } from "react";
import { Activity, Play, RotateCcw } from "lucide-react";
import CopyCodeButton from "./CopyCodeButton";
import { runSandboxCode, SANDBOX_LABELS, type SandboxId } from "@/lib/sandbox";
import type { NetworkTrace } from "@/lib/sandbox/types";

interface SandboxTryItPanelProps {
    language: string;
    code: string;
    sandbox: SandboxId;
    title?: string;
}

function statusColor(status: number): string {
    if (status === 0) return "text-gray-500";
    if (status >= 200 && status < 300) return "text-emerald-600";
    if (status >= 400 && status < 500) return "text-amber-600";
    return "text-red-600";
}

function TraceRow({ trace }: { trace: NetworkTrace }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden text-xs font-mono">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-left"
            >
                <span className={`font-bold ${statusColor(trace.status)}`}>
                    {trace.status || "ERR"} {trace.statusText}
                </span>
                <span className="text-gray-400 truncate flex-1">{trace.method} {trace.url}</span>
                <span className="text-gray-400 shrink-0">{trace.durationMs}ms</span>
            </button>
            {open && (
                <pre className="p-3 bg-gray-900 text-gray-300 overflow-auto max-h-40 text-[10px]">
                    {trace.error ? `Error: ${trace.error}\n\n` : ""}
                    {JSON.stringify(trace.responseBody, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default function SandboxTryItPanel({
    language,
    code,
    sandbox,
    title = "Try it Yourself",
}: SandboxTryItPanelProps) {
    const [editorCode, setEditorCode] = useState(code);
    const [logs, setLogs] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [traces, setTraces] = useState<NetworkTrace[]>([]);
    const [running, setRunning] = useState(false);

    const run = useCallback(async () => {
        setRunning(true);
        const result = await runSandboxCode(editorCode, sandbox);
        setLogs(result.logs);
        setErrors(result.errors);
        setTraces(result.traces);
        setRunning(false);
    }, [editorCode, sandbox]);

    const reset = () => {
        setEditorCode(code);
        setLogs([]);
        setErrors([]);
        setTraces([]);
    };

    const sandboxColor = sandbox === "spotify" ? "bg-[#1DB954]/20 text-[#1ed760]" : "bg-sky-100 text-sky-700";

    return (
        <div className="my-8 rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-900 text-white">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-bold truncate">{title}</span>
                    <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${sandboxColor}`}>
                        {SANDBOX_LABELS[sandbox]}
                    </span>
                </div>
                <div className="flex gap-2 shrink-0">
                    <CopyCodeButton code={editorCode} />
                    <button
                        type="button"
                        onClick={reset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                    <button
                        type="button"
                        onClick={run}
                        disabled={running}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0F9F72] text-xs font-semibold disabled:opacity-50"
                    >
                        <Play className="w-3.5 h-3.5" /> {running ? "Running…" : "Run"}
                    </button>
                </div>
            </div>

            <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[180px] p-5 font-mono text-sm text-gray-100 bg-[#1e293b] border-0 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Code editor"
            />

            <div className="border-t border-gray-200 bg-slate-50 p-4 space-y-4">
                {traces.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-gray-500" />
                            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600">
                                Network traces
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {traces.map((t) => (
                                <TraceRow key={t.id} trace={t} />
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">Console</h3>
                    <pre className="min-h-[80px] p-4 rounded-xl bg-gray-900 text-emerald-400 text-xs font-mono overflow-auto">
                        {logs.length === 0 && errors.length === 0
                            ? "// Click Run — watch API traces and console output"
                            : [...logs, ...errors.map((e) => `[error] ${e}`)].join("\n")}
                    </pre>
                </div>
            </div>
        </div>
    );
}
