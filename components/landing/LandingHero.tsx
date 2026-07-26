import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site-core";

type HeroTag = {
    label: string;
    top: string;
    offset: string;
    highlight?: boolean;
};

const leftTags: HeroTag[] = [
    { label: "Full-Stack Web", top: "14%", offset: "left-[-2%]", highlight: true },
    { label: "Python", top: "32%", offset: "left-[-6%]" },
    { label: "TypeScript", top: "50%", offset: "left-[-4%]" },
    { label: "System Design", top: "68%", offset: "left-[-2%]" },
];

const rightTags: HeroTag[] = [
    { label: "React & Next.js", top: "14%", offset: "right-[-2%]", highlight: true },
    { label: "Solidity", top: "32%", offset: "right-[-6%]" },
    { label: "DeFi", top: "50%", offset: "right-[-4%]" },
    { label: "Blockchain", top: "68%", offset: "right-[-2%]" },
];

const tagClass = (highlight?: boolean) =>
    highlight
        ? "px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md"
        : "px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs sm:text-sm tracking-wide shadow-md";

export default function LandingHero() {
    return (
        <section className="relative min-h-[100svh] overflow-hidden font-jakarta bg-landing-hero flex items-center pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none dot-pattern" aria-hidden />
            <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] landing-hero-glow pointer-events-none" aria-hidden />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center">
                    <div className="lg:col-span-5 landing-fade-up">
                        <p className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-none">
                            {SITE_NAME}
                        </p>
                        <h1 className="mt-6 text-3xl sm:text-4xl xl:text-[2.75rem] font-bold text-gray-900 leading-[1.15] tracking-tight max-w-md">
                            Learn to code by doing.
                        </h1>
                        <p className="mt-5 text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm">
                            Free, example-driven tutorials you can read, edit, and run in the browser.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <Link
                                href="/tutorials"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-[15px] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Start tutorials
                            </Link>
                            <Link
                                href="/tutorials/html"
                                className="inline-flex items-center justify-center px-7 py-3.5 text-gray-700 hover:text-gray-900 font-semibold text-[15px] transition-colors"
                            >
                                Begin with HTML →
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end py-6 lg:py-0 landing-fade-in">
                        <div className="relative w-full max-w-[500px] lg:max-w-[580px] aspect-[4/5] flex items-end justify-center select-none">
                            <div
                                className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] sm:w-[78%] aspect-square bg-amber-100/40 rounded-full blur-[2px] z-0 pointer-events-none landing-pulse"
                                aria-hidden
                            />

                            <img
                                src="/student.png"
                                alt="Student learning to code"
                                className="relative h-[108%] w-auto max-w-none object-contain z-10 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                            />

                            {leftTags.map((tag) => (
                                <div
                                    key={tag.label}
                                    className={`absolute z-20 ${tag.offset} ${tagClass(tag.highlight)}`}
                                    style={{ top: tag.top }}
                                >
                                    {tag.label}
                                </div>
                            ))}

                            {rightTags.map((tag) => (
                                <div
                                    key={tag.label}
                                    className={`absolute z-20 ${tag.offset} ${tagClass(tag.highlight)}`}
                                    style={{ top: tag.top }}
                                >
                                    {tag.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
