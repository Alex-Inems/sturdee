import SectionShell from "@/components/SectionShell";

const STEPS = [
    {
        n: "01",
        title: "Browse free tutorials",
        body: "Start with interactive lessons — HTML, CSS, JavaScript, Python, and more — no account required to read.",
    },
    {
        n: "02",
        title: "Learn with AI Tutor",
        body: "Ask questions and practice exercises anytime. Sign in with email when you're ready for a cohort.",
    },
    {
        n: "03",
        title: "Join a live cohort",
        body: "Register with your goals — we'll match a skill path and place you with a tutor.",
    },
] as const;

export default function LandingMethod() {
    return (
        <SectionShell className="bg-page-deep/40">
            <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    How Sturdee teaches AI
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
                    Learn AI skills, and learn faster with AI — guided practice plus live cohorts with tutors.
                </p>
            </div>

            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                {STEPS.map((step) => (
                    <li key={step.n} className="relative">
                        <p className="text-sm font-bold tracking-widest text-emerald-600/90 mb-4">{step.n}</p>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                        <p className="mt-3 text-sm sm:text-[15px] text-gray-500 font-medium leading-relaxed">
                            {step.body}
                        </p>
                    </li>
                ))}
            </ol>
        </SectionShell>
    );
}
