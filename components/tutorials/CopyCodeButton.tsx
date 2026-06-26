"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyCodeButton({ code, className = "" }: { code: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = code;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                copied
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            } ${className}`}
        >
            {copied ? (
                <>
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Copied
                </>
            ) : (
                <>
                    <Copy className="h-3.5 w-3.5" aria-hidden />
                    Copy
                </>
            )}
        </button>
    );
}
