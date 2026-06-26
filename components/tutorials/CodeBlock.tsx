"use client";

import CopyCodeButton from "./CopyCodeButton";

interface CodeBlockProps {
    language: string;
    code: string;
    title?: string;
}

export default function CodeBlock({ language, code, title }: CodeBlockProps) {
    return (
        <div className="my-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-2 bg-gray-900 text-white">
                <span className="text-xs font-bold truncate">
                    {title ?? language.toUpperCase()}
                </span>
                <CopyCodeButton code={code} />
            </div>
            <pre className="p-5 overflow-x-auto bg-[#1e293b] text-gray-100 text-sm font-mono leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}
