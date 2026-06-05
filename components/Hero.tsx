"use client";

import { Users } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-screen bg-white font-jakarta overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 flex items-center">
            {/* Extremely subtle minimal background pattern */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

                    {/* LEFT COLUMN: Clean Minimal Headline & Subheadline */}
                    <div className="lg:col-span-5 flex flex-col justify-center text-left">
                        <h1 className="text-5xl sm:text-6xl xl:text-[76px] font-bold text-gray-900 leading-[1.08] tracking-tight font-jakarta">
                            Inspiring<br />
                            Education<br />
                            Exploration
                        </h1>

                        {/* Subtext - Clean, minimal spacing and styling */}
                        <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-sm mt-8 font-jakarta">
                            Fostering curiosity and innovation through inspiring educational exploration and discovery journeys.
                        </p>

                        {/* Minimal floating card nested at bottom-left */}
                        <div className="mt-12 bg-white rounded-2xl p-5 shadow-xl border border-gray-100/50 max-w-[270px] hover:translate-y-[-2px] transition-all duration-300">
                            <div className="flex items-start gap-4">
                                {/* Minimal Soft Pastel Icon Circle */}
                                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5 text-amber-600 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight font-jakarta">
                                        Interactive Engagement
                                    </h4>
                                    <p className="text-gray-500 text-xs mt-2 font-medium leading-relaxed font-jakarta">
                                        Engaging participation enhances learning, fostering interactive collaboration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Significantly Bigger Image & Minimal Floating Tags */}
                    <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end py-10 lg:py-0">

                        {/* Huge Elegant Circular Backdrop */}
                        <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[560px] aspect-square bg-amber-100/30 rounded-full blur-[2px] -z-10 pointer-events-none"></div>

                        {/* Outer container for the big image and floating items */}
                        <div className="relative w-full max-w-[500px] lg:max-w-[580px] aspect-[4/5] flex items-end justify-center select-none">

                            {/* Bigger Student Portrait */}
                            <img
                                src="/student.png"
                                alt="Smiling Student"
                                className="h-[108%] w-auto max-w-none object-contain z-10 pointer-events-none mix-blend-multiply"
                            />

                            {/* Minimal Tag: Graphic Design (Top Right) */}
                            <div className="absolute top-[16%] right-[-4%] z-20 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md hover:translate-y-[-1px] transition-transform duration-200 cursor-pointer">
                                Graphic Design
                            </div>

                            {/* Minimal Tag: UI/UX Design (Right Middle) */}
                            <div className="absolute top-[34%] right-[-10%] z-20 px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 hover:text-black text-xs sm:text-sm tracking-wide shadow-md hover:translate-y-[-1px] hover:border-gray-200 transition-all duration-200 cursor-pointer">
                                UI/UX Design
                            </div>

                            {/* Minimal Tag: Animation (Right Lower) */}
                            <div className="absolute top-[52%] right-[-8%] z-20 px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 hover:text-black text-xs sm:text-sm tracking-wide shadow-md hover:translate-y-[-1px] hover:border-gray-200 transition-all duration-200 cursor-pointer">
                                Animation
                            </div>

                            {/* Minimal Tag: Prototyping (Bottom Right) */}
                            <div className="absolute top-[70%] right-[-4%] z-20 px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 hover:text-black text-xs sm:text-sm tracking-wide shadow-md hover:translate-y-[-1px] hover:border-gray-200 transition-all duration-200 cursor-pointer">
                                Prototyping
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
