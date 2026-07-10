"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Clock, Code2, Eye, EyeOff, Play, RotateCcw, Send } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";
import {
    loadPracticeProgress,
    runPracticeTests,
    savePracticeProgress,
    type PracticeProblem,
    type PracticeRunSummary,
} from "@/lib/practice";

type Lang = "javascript" | "python";
type PanelTab = "description" | "solution";

interface CodingEnvironmentProps {
    problem: PracticeProblem;
}

export default function CodingEnvironment({ problem }: CodingEnvironmentProps) {
    const [lang, setLang] = useState<Lang>("javascript");
    const [code, setCode] = useState(problem.starterCode.javascript);
    const [panelTab, setPanelTab] = useState<PanelTab>("description");
    const [showSolution, setShowSolution] = useState(false);
    const [runResult, setRunResult] = useState<PracticeRunSummary | null>(null);
    const [submitResult, setSubmitResult] = useState<PracticeRunSummary | null>(null);
    const [busy, setBusy] = useState(false);
    const [solved, setSolved] = useState(false);

    useEffect(() => {
        const progress = loadPracticeProgress();
        if (progress[problem.slug] === "solved") setSolved(true);
    }, [problem.slug]);

    const switchLang = (next: Lang) => {
        setLang(next);
        setCode(next === "javascript" ? problem.starterCode.javascript : problem.starterCode.python);
        setRunResult(null);
        setSubmitResult(null);
    };

    const resetCode = () => {
        setCode(lang === "javascript" ? problem.starterCode.javascript : problem.starterCode.python);
        setRunResult(null);
        setSubmitResult(null);
    };

    const handleRun = useCallback(() => {
        if (lang !== "javascript") return;
        setBusy(true);
        savePracticeProgress(problem.slug, "attempted");
        try {
            const result = runPracticeTests(code, problem, { sampleOnly: true });
            setRunResult(result);
            setSubmitResult(null);
        } finally {
            setBusy(false);
        }
    }, [code, lang, problem]);

    const handleSubmit = useCallback(() => {
        if (lang !== "javascript") return;
        setBusy(true);
        savePracticeProgress(problem.slug, "attempted");
        try {
            const result = runPracticeTests(code, problem);
            setSubmitResult(result);
            setRunResult(null);
            if (result.allPassed) {
                setSolved(true);
                savePracticeProgress(problem.slug, "solved");
            }
        } finally {
            setBusy(false);
        }
    }, [code, lang, problem]);

    const activeResult = submitResult ?? runResult;
    const solutionCode = lang === "javascript" ? problem.solution.javascript : problem.solution.python;

    const resultColor = useMemo(() => {
        if (!activeResult) return "";
        if (activeResult.allPassed) return "text-emerald-600";
        if (activeResult.passed > 0) return "text-amber-600";
        return "text-rose-600";
    }, [activeResult]);

    return (
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-white font-jakarta">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-900 text-white">
                <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-gray-400">#{problem.number}</span>
                    <h1 className="text-sm font-bold truncate">{problem.title}</h1>
                    <DifficultyBadge difficulty={problem.difficulty} />
                    {solved && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={lang}
                        onChange={(e) => switchLang(e.target.value as Lang)}
                        className="text-xs bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 font-semibold"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 min-h-[560px]">
                {/* Left: problem panel */}
                <div className="border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
                    <div className="flex border-b border-gray-200">
                        {(["description", "solution"] as PanelTab[]).map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setPanelTab(tab)}
                                className={`px-4 py-2.5 text-xs font-bold capitalize transition-colors ${
                                    panelTab === tab
                                        ? "text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50"
                                        : "text-gray-500 hover:text-gray-800"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 text-sm text-gray-700 space-y-5 max-h-[480px]">
                        {panelTab === "description" ? (
                            <>
                                <p className="font-medium leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                                {problem.examples.map((ex, i) => (
                                    <div key={i} className="rounded-xl bg-gray-50 border border-gray-200 p-4 font-mono text-xs">
                                        <p className="font-bold text-gray-500 mb-2 not-italic font-sans">Example {i + 1}</p>
                                        <p>
                                            <span className="text-gray-400">Input: </span>
                                            {ex.input}
                                        </p>
                                        <p>
                                            <span className="text-gray-400">Output: </span>
                                            {ex.output}
                                        </p>
                                        {ex.explanation && (
                                            <p className="mt-2 text-gray-500 font-sans">{ex.explanation}</p>
                                        )}
                                    </div>
                                ))}
                                <div>
                                    <p className="font-bold text-gray-900 mb-2">Constraints</p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                                        {problem.constraints.map((c) => (
                                            <li key={c}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-xs text-gray-400">
                                    Acceptance: {problem.acceptanceRate}% · Topics: {problem.topics.join(", ")}
                                </p>
                            </>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs text-gray-500 font-medium">
                                        Reference solution — study after attempting.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setShowSolution((v) => !v)}
                                        className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                                    >
                                        {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        {showSolution ? "Hide" : "Reveal"}
                                    </button>
                                </div>
                                {showSolution ? (
                                    <pre className="rounded-xl bg-gray-900 text-emerald-300 p-4 text-xs overflow-x-auto leading-relaxed">
                                        {solutionCode}
                                    </pre>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">Click Reveal to view the answer.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: editor + results */}
                <div className="flex flex-col bg-[#1e1e1e]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-black/30">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                            <Code2 className="w-3.5 h-3.5" /> {problem.functionName}
                        </span>
                        <button
                            type="button"
                            onClick={resetCode}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        className="flex-1 w-full min-h-[280px] p-4 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm leading-relaxed resize-none outline-none"
                        aria-label="Code editor"
                    />
                    {lang === "python" && (
                        <p className="px-4 py-2 text-xs text-amber-400/90 bg-amber-950/30 border-t border-amber-900/30">
                            Live Run/Submit uses JavaScript. Switch to JavaScript to test, or study the Python solution tab.
                        </p>
                    )}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-t border-black/30">
                        <button
                            type="button"
                            onClick={handleRun}
                            disabled={busy || lang !== "javascript"}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white text-xs font-bold transition-colors"
                        >
                            <Play className="w-3.5 h-3.5" /> Run
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={busy || lang !== "javascript"}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold transition-colors"
                        >
                            <Send className="w-3.5 h-3.5" /> Submit
                        </button>
                        {activeResult && (
                            <span className={`ml-auto flex items-center gap-2 text-xs font-bold ${resultColor}`}>
                                <Clock className="w-3.5 h-3.5" />
                                {activeResult.passed}/{activeResult.total} passed · {activeResult.runtimeMs}ms
                            </span>
                        )}
                    </div>

                    {activeResult && (
                        <div className="max-h-48 overflow-y-auto bg-[#1a1a1a] border-t border-black/30 p-3 space-y-2">
                            {activeResult.allPassed && submitResult && (
                                <p className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> Accepted — all test cases passed!
                                </p>
                            )}
                            {activeResult.results.map((r) => (
                                <div
                                    key={r.index}
                                    className={`rounded-lg px-3 py-2 text-xs font-mono border ${
                                        r.pass
                                            ? "border-emerald-800/50 bg-emerald-950/30 text-emerald-300"
                                            : "border-rose-800/50 bg-rose-950/30 text-rose-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-2 font-sans font-bold mb-1">
                                        {r.pass ? (
                                            <ChevronUp className="w-3 h-3 text-emerald-400" />
                                        ) : (
                                            <ChevronDown className="w-3 h-3 text-rose-400" />
                                        )}
                                        Case {r.index + 1}
                                        {r.hidden && <span className="text-gray-500 font-normal">(hidden)</span>}
                                    </div>
                                    {!r.pass && (
                                        <>
                                            <p>Expected: {r.expected}</p>
                                            <p>Got: {r.actual}</p>
                                            {r.error && <p className="text-rose-400">Error: {r.error}</p>}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
