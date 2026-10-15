import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";

export default function LandingCTA() {
    return (
        <SectionShell>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gray-900 px-8 py-14 sm:px-12 sm:py-16 md:px-16">
                <div
                    className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
                    aria-hidden
                />
                <div
                    className="absolute -bottom-28 -left-10 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"
                    aria-hidden
                />
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                        Tutorials, AI Tutor, or a live cohort
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-400 font-medium leading-relaxed">
                        Everything is open with email sign-in — browse free tutorials, chat with AI Tutor, or register
                        for a skill cohort.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link
                            href="/learn/ai"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-[15px] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            Learn AI free
                        </Link>
                        <Link
                            href="/tutorials"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white hover:bg-white/10 font-semibold text-[15px] rounded-full transition-colors"
                        >
                            Free coding tutorials
                        </Link>
                    </div>
                </div>
            </div>
        </SectionShell>
    );
}
