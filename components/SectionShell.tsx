"use client";

interface SectionShellProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    compact?: boolean;
}

const SectionShell = ({ children, id, className = "", compact }: SectionShellProps) => (
    <section
        id={id}
        className={`relative bg-white font-jakarta overflow-hidden ${compact ? "py-16 md:py-20" : "py-20 md:py-28"} ${className}`}
    >
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none dot-pattern" aria-hidden />
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">{children}</div>
    </section>
);

export default SectionShell;
