"use client";

import { useMemo, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import type { AiPageContext } from "@/lib/ai/context";
import { useAuth } from "@/components/AuthContext";
import { isProEntitled } from "@/lib/billing";
import ProUpgradeCard from "@/components/billing/ProUpgradeCard";

function messageText(message: UIMessage): string {
    return message.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("");
}

type Props = {
    context?: AiPageContext;
    embedded?: boolean;
    defaultOpen?: boolean;
};

export default function AiTutorChat({ context, embedded = false, defaultOpen = false }: Props) {
    const { user, isAuthenticated } = useAuth();
    const isPro = Boolean(user && isAuthenticated && isProEntitled(user));
    const [open, setOpen] = useState(embedded || defaultOpen);
    const [input, setInput] = useState("");

    const transport = useMemo(
        () =>
            new DefaultChatTransport({
                api: "/api/ai/chat",
                body: { context },
            }),
        [context]
    );

    const { messages, sendMessage, status, error, clearError } = useChat({ transport });
    const busy = status === "submitted" || status === "streaming";

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPro) return;
        const text = input.trim();
        if (!text || busy) return;
        clearError();
        setInput("");
        void sendMessage({ text });
    };

    const panel = (
        <div
            className={`flex flex-col bg-white border border-gray-200 shadow-2xl overflow-hidden ${
                embedded
                    ? "rounded-2xl h-[min(70vh,560px)]"
                    : "rounded-2xl w-[min(100vw-2rem,380px)] h-[min(70vh,520px)]"
            }`}
        >
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 text-white">
                <div className="flex items-center gap-2 min-w-0">
                    <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-sm font-bold truncate">Sturdee AI Tutor</p>
                        <p className="text-[11px] text-gray-400 truncate">
                            {isPro
                                ? context?.pageTitle || context?.skillSlug || "Ask anything about your lesson"
                                : "Pro feature — $20/month"}
                        </p>
                    </div>
                </div>
                {!embedded && (
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-1.5 hover:bg-white/10"
                        aria-label="Close chat"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {!isPro ? (
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <ProUpgradeCard featureLabel="AI Tutor" />
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                        {messages.length === 0 && (
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Ask about prompts, agents, automation, or this page.
                            </p>
                        )}
                        {messages.map((m) => {
                            const text = messageText(m);
                            if (!text) return null;
                            const isUser = m.role === "user";
                            return (
                                <div
                                    key={m.id}
                                    className={`rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                                        isUser
                                            ? "ml-6 bg-emerald-600 text-white"
                                            : "mr-6 bg-white border border-gray-200 text-gray-800"
                                    }`}
                                >
                                    {text}
                                </div>
                            );
                        })}
                        {busy && (
                            <p className="text-xs font-semibold text-gray-400 animate-pulse">Thinking…</p>
                        )}
                        {error && (
                            <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                {error.message || "Something went wrong"}
                            </p>
                        )}
                    </div>

                    <form onSubmit={onSubmit} className="border-t border-gray-200 p-3 flex gap-2 bg-white">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask the AI tutor…"
                            disabled={busy}
                            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                            type="submit"
                            disabled={busy || !input.trim()}
                            className="rounded-xl bg-[#10B981] hover:bg-[#0F9F72] disabled:opacity-50 px-3 py-2 text-white"
                            aria-label="Send"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </>
            )}
        </div>
    );

    if (embedded) return panel;

    return (
        <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
            {open && panel}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-gray-900 hover:bg-black text-white px-5 py-3 text-sm font-semibold shadow-lg"
            >
                <MessageCircle className="h-4 w-4" />
                {open ? "Close" : "AI Tutor"}
            </button>
        </div>
    );
}
