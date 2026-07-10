"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, GitBranch, MemoryStick, X } from "lucide-react";
import { canTraceLanguage, traceJavaScript } from "@/lib/execution";
import type { ExecutionStep, ExecutionTrace, ExecutionTreeNode } from "@/lib/execution/types";

interface ExecutionVisualizerProps {
    code: string;
    language: string;
    onClose: () => void;
}

function findNode(tree: ExecutionTreeNode, id: string): ExecutionTreeNode | null {
    if (tree.id === id) return tree;
    for (const child of tree.children) {
        const found = findNode(child, id);
        if (found) return found;
    }
    return null;
}

function TreeBranch({
    node,
    activeId,
    depth = 0,
}: {
    node: ExecutionTreeNode;
    activeId: string;
    depth?: number;
}) {
    const active = node.id === activeId;
    const onPath =
        active ||
        node.children.some((c) => findNode(c, activeId) !== null);

    return (
        <li className="list-none">
            <div
                className={`flex items-center gap-2 py-1 px-2 rounded-md text-xs font-medium ${
                    active
                        ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300"
                        : onPath
                          ? "text-emerald-700"
                          : "text-gray-500"
                }`}
                style={{ marginLeft: depth * 12 }}
            >
                <GitBranch className="w-3 h-3 shrink-0 opacity-60" />
                <span>{node.label}</span>
                {node.line != null && <span className="text-[10px] opacity-60">L{node.line}</span>}
            </div>
            {node.children.length > 0 && (
                <ul className="mt-0.5 border-l border-gray-200 ml-3">
                    {node.children.map((child) => (
                        <TreeBranch key={child.id} node={child} activeId={activeId} depth={depth + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function ExecutionVisualizer({ code, language, onClose }: ExecutionVisualizerProps) {
    const trace: ExecutionTrace | null = useMemo(() => {
        if (!canTraceLanguage(language)) return null;
        return traceJavaScript(code);
    }, [code, language]);

    const [stepIndex, setStepIndex] = useState(0);

    const steps = trace?.steps ?? [];
    const step: ExecutionStep | undefined = steps[stepIndex];
    const sourceLines = trace?.source.split("\n") ?? [];

    const go = useCallback(
        (index: number) => {
            if (steps.length === 0) return;
            setStepIndex(Math.max(0, Math.min(steps.length - 1, index)));
        },
        [steps.length]
    );

    if (!trace) {
        return (
            <div className="border-t border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
                Execution stepping is available for JavaScript and TypeScript snippets.
            </div>
        );
    }

    if (trace.error && steps.length === 0) {
        return (
            <div className="border-t border-gray-200 bg-red-50 p-6">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-red-800">Could not trace execution</p>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm text-red-700">{trace.error}</p>
            </div>
        );
    }

    return (
        <div className="border-t border-gray-200 bg-slate-50">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white">
                <span className="text-xs font-bold uppercase tracking-wide">Explain Execution</span>
                <button type="button" onClick={onClose} className="text-white/70 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 border-b border-gray-200">
                {/* Code + highlight */}
                <div className="border-r border-gray-200 bg-[#1e293b] overflow-auto max-h-[220px]">
                    <pre className="p-4 text-xs font-mono leading-relaxed">
                        {sourceLines.map((line, i) => {
                            const lineNum = i + 1;
                            const isActive = step?.line === lineNum;
                            return (
                                <div
                                    key={lineNum}
                                    className={`flex gap-3 ${isActive ? "bg-amber-500/20 -mx-4 px-4 border-l-2 border-amber-400" : ""}`}
                                >
                                    <span className="select-none text-gray-500 w-6 text-right shrink-0">{lineNum}</span>
                                    <code className={`${isActive ? "text-amber-100" : "text-gray-300"}`}>{line || " "}</code>
                                </div>
                            );
                        })}
                    </pre>
                </div>

                {/* Memory */}
                <div className="p-4 overflow-auto max-h-[220px]">
                    <div className="flex items-center gap-2 mb-3">
                        <MemoryStick className="w-4 h-4 text-violet-600" />
                        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-700">Memory</h3>
                    </div>
                    {step?.heap.length === 0 ? (
                        <p className="text-xs text-gray-400 font-medium">No variables in scope yet.</p>
                    ) : (
                        <div className="grid gap-2">
                            {step.heap.map((cell) => (
                                <div
                                    key={cell.name}
                                    className="rounded-lg border border-violet-100 bg-white px-3 py-2 shadow-sm"
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className="font-mono text-xs font-bold text-violet-700">{cell.name}</span>
                                        <span className="text-[10px] uppercase font-bold text-gray-400">{cell.type}</span>
                                    </div>
                                    <p className="font-mono text-xs text-gray-700 break-all">{cell.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {step && step.output.length > 0 && (
                        <div className="mt-4">
                            <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Console output</p>
                            <pre className="text-xs font-mono text-gray-600 bg-gray-100 rounded-lg p-2">
                                {step.output.join("\n")}
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
                {/* Execution tree */}
                <div className="p-4 border-r border-gray-200 overflow-auto max-h-[160px]">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Execution tree</p>
                    <ul>
                        <TreeBranch node={trace.tree} activeId={step?.treeNodeId ?? "root"} />
                    </ul>
                </div>

                {/* Step info + controls */}
                <div className="p-4 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-emerald-700 mb-1">{step?.label}</p>
                        <p className="text-[11px] font-mono text-gray-500 mb-2 line-clamp-2">{step?.code}</p>
                        {step && step.callStack.length > 1 && (
                            <p className="text-[10px] text-gray-400">
                                Call stack: {step.callStack.join(" → ")}
                            </p>
                        )}
                        {trace.error && (
                            <p className="text-xs text-amber-700 mt-2">Stopped: {trace.error}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-4">
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => go(0)}
                                disabled={stepIndex === 0}
                                className="p-2 rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
                                aria-label="First step"
                            >
                                <ChevronFirst className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(stepIndex - 1)}
                                disabled={stepIndex === 0}
                                className="p-2 rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
                                aria-label="Previous step"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(stepIndex + 1)}
                                disabled={stepIndex >= steps.length - 1}
                                className="p-2 rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
                                aria-label="Next step"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(steps.length - 1)}
                                disabled={stepIndex >= steps.length - 1}
                                className="p-2 rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
                                aria-label="Last step"
                            >
                                <ChevronLast className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">
                            Step {steps.length === 0 ? 0 : stepIndex + 1} / {steps.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
