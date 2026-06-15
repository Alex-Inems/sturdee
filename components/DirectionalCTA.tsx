import Link from "next/link";
import SectionShell from "./SectionShell";

const DirectionalCTA = () => (
    <SectionShell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Education That Respects Your Ambition
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mt-6">
                    Join a learning institution built for those who lead, innovate, and shape industries.
                </p>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
                <Link
                    href="/book"
                    className="px-8 py-4 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Book a Session
                </Link>
            </div>
        </div>
    </SectionShell>
);

export default DirectionalCTA;
