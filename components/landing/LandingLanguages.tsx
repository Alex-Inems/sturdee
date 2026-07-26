import { Link } from "@/i18n/navigation";
import SectionShell from "@/components/SectionShell";
import { TUTORIAL_LANGUAGES } from "@/lib/tutorials";

const FEATURED = ["html", "css", "javascript", "python", "typescript", "sql", "liquid", "java"] as const;

export default function LandingLanguages() {
    const languages = FEATURED.map((id) => TUTORIAL_LANGUAGES.find((l) => l.id === id)!).filter(Boolean);
    const total = TUTORIAL_LANGUAGES.length;

    return (
        <SectionShell>
            <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    Pick a language. Start today.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
                    {total} free tracks — from HTML and JavaScript to Python, SQL, and Shopify Liquid.
                </p>
            </div>

            <ul className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {languages.map((lang) => (
                    <li key={lang.id} className="landing-stagger">
                        <Link
                            href={`/tutorials/${lang.id}`}
                            className="group flex flex-col items-start gap-3 rounded-2xl bg-white/80 border border-gray-200/60 px-5 py-5 hover:border-emerald-300/80 hover:bg-white transition-colors duration-200"
                        >
                            <span className="text-2xl" aria-hidden="true">
                                {lang.icon}
                            </span>
                            <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                {lang.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-10">
                <Link
                    href="/tutorials"
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                    See all tutorials
                    <span aria-hidden>→</span>
                </Link>
            </div>
        </SectionShell>
    );
}
