import { Users } from "lucide-react";

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
] ;

const rightTags: HeroTag[] = [
    { label: "React & Next.js", top: "14%", offset: "right-[-2%]", highlight: true },
    { label: "Solidity", top: "32%", offset: "right-[-6%]" },
    { label: "DeFi", top: "50%", offset: "right-[-4%]" },
    { label: "Blockchain", top: "68%", offset: "right-[-2%]" },
] ;

const tagClass = (highlight?: boolean) =>
    highlight
        ? "px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md"
        : "px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs sm:text-sm tracking-wide shadow-md";

const Hero = () => {
    return (
        <section className="relative min-h-screen bg-page-gradient font-jakarta overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 flex items-center">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
                    <div className="lg:col-span-5 flex flex-col justify-center text-left">
                        <h1 className="text-5xl sm:text-6xl xl:text-[76px] font-bold text-gray-900 leading-[1.08] tracking-tight font-jakarta">
                            Inspiring<br />
                            Education<br />
                            Exploration
                        </h1>

                        <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-8 font-jakarta">
                            Fostering curiosity and innovation through inspiring educational exploration and discovery journeys.
                        </p>

                        <div className="mt-12 bg-white rounded-2xl p-5 shadow-xl border border-gray-100/50 max-w-[270px]">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5 text-amber-600 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 text-sm leading-tight font-jakarta">
                                        Interactive Engagement
                                    </h2>
                                    <p className="text-gray-500 text-xs mt-2 font-medium leading-relaxed font-jakarta">
                                        Engaging participation enhances learning, fostering interactive collaboration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end py-10 lg:py-0">
                        <div className="relative w-full max-w-[500px] lg:max-w-[580px] aspect-[4/5] flex items-end justify-center select-none">
                            <div
                                className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] sm:w-[78%] aspect-square bg-amber-100/40 rounded-full blur-[2px] z-0 pointer-events-none"
                                aria-hidden
                            />

                            <img
                                src="/student.png"
                                alt="Smiling Student"
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
};

export default Hero;
