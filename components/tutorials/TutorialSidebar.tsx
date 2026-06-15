"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TutorialTrack } from "@/lib/tutorials";

interface TutorialSidebarProps {
    track: TutorialTrack;
    currentSlug: string;
}

export default function TutorialSidebar({ track, currentSlug }: TutorialSidebarProps) {
    const pathname = usePathname();
    const base = `/tutorials/${track.language.id}`;
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        Object.fromEntries(track.sections.map((s) => [s.title, true]))
    );

    const toggle = (title: string) =>
        setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                <div className={`px-4 py-4 border-b border-gray-100 ${track.language.color}`}>
                    <Link href={base} className="block">
                        <span className="text-2xl">{track.language.icon}</span>
                        <h2 className="text-lg font-bold mt-1">{track.language.name} Tutorial</h2>
                    </Link>
                </div>
                <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto py-2">
                    {track.sections.map((sec) => (
                        <div key={sec.title} className="border-b border-gray-50 last:border-0">
                            <button
                                type="button"
                                onClick={() => toggle(sec.title)}
                                className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500 hover:bg-page transition-colors"
                            >
                                {sec.title}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${openSections[sec.title] ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openSections[sec.title] && (
                                <ul className="pb-2">
                                    {sec.pages.map((p) => {
                                        const href = `${base}/${p.slug}`;
                                        const active = currentSlug === p.slug || pathname === href;
                                        return (
                                            <li key={p.slug}>
                                                <Link
                                                    href={href}
                                                    className={`block px-4 py-2 text-sm font-medium transition-colors border-l-2 ${
                                                        active
                                                            ? "border-emerald-500 bg-emerald-50/80 text-emerald-800"
                                                            : "border-transparent text-gray-600 hover:bg-page hover:text-gray-900"
                                                    }`}
                                                >
                                                    {p.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
