interface PageHeroProps {
    title: string;
    subtitle: string;
    highlight?: string;
}

const PageHero = ({ title, subtitle, highlight }: PageHeroProps) => (
    <section className="relative bg-page-gradient font-jakarta overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none dot-pattern" aria-hidden />
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    {highlight && (
                        <span className="inline-flex w-fit mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs sm:text-sm tracking-wide shadow-md">
                            {highlight}
                        </span>
                    )}
                    <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                        {title}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mt-6">
                        {subtitle}
                    </p>
                </div>
                <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end py-8 lg:py-0">
                    <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] aspect-square bg-amber-100/30 rounded-full blur-[2px] pointer-events-none" />
                    <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100/50 max-w-sm w-full">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-4 py-2 bg-[#FFE55E] rounded-full font-bold text-black text-xs">Explore</span>
                            <span className="px-4 py-2 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-sm">Learn</span>
                            <span className="px-4 py-2 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-sm">Grow</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            Discover curated paths designed to help you build skills and reach your goals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default PageHero;
