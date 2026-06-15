"use client";

import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

interface TryItPanelProps {
    language: string;
    code: string;
    title?: string;
}

function buildPreview(language: string, code: string): string {
    const lang = language.toLowerCase();
    if (lang === "html" || lang === "xml") {
        return code.includes("<!DOCTYPE") || code.includes("<html") ? code : `<!DOCTYPE html><html><body>${code}</body></html>`;
    }
    if (lang === "css") {
        return `<!DOCTYPE html><html><head><style>${code}</style></head><body><h1>Preview</h1><p>Sample paragraph for styling.</p><button>Button</button></body></html>`;
    }
    if (["javascript", "typescript", "nodejs"].includes(lang)) {
        return `<!DOCTYPE html><html><body><pre id="out" style="font-family:monospace;padding:1rem;background:#111827;color:#e5e7eb;border-radius:8px;min-height:60px;"></pre><script>
const log = (...args) => { document.getElementById('out').textContent += args.join(' ') + '\\n'; };
console.log = log;
console.error = log;
try { ${code} } catch (e) { log('Error:', e.message); }
</script></body></html>`;
    }
    return "";
}

const runnable = (language: string) =>
    ["html", "css", "javascript", "typescript", "nodejs", "xml"].includes(language.toLowerCase());

export default function TryItPanel({ language, code, title = "Try it Yourself" }: TryItPanelProps) {
    const [editorCode, setEditorCode] = useState(code);
    const [preview, setPreview] = useState(buildPreview(language, code));
    const canRun = runnable(language);

    const run = () => setPreview(buildPreview(language, editorCode));
    const reset = () => {
        setEditorCode(code);
        setPreview(buildPreview(language, code));
    };

    return (
        <div className="my-8 rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-900 text-white">
                <span className="text-sm font-bold">{title}</span>
                {canRun && (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={reset}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button
                            type="button"
                            onClick={run}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0F9F72] text-xs font-semibold transition-colors"
                        >
                            <Play className="w-3.5 h-3.5" /> Run
                        </button>
                    </div>
                )}
            </div>
            <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[140px] p-5 font-mono text-sm text-gray-100 bg-[#1e293b] border-0 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Code editor"
            />
            {canRun ? (
                <iframe
                    title="Try it result"
                    srcDoc={preview}
                    sandbox="allow-scripts"
                    className="w-full min-h-[120px] border-t border-gray-200 bg-white"
                />
            ) : (
                <div className="px-5 py-4 bg-page border-t border-gray-200 text-sm text-gray-500 font-medium">
                    Run this {language.toUpperCase()} example in your local environment or course sandbox.
                </div>
            )}
        </div>
    );
}
