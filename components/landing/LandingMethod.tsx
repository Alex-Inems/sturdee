import SectionShell from "@/components/SectionShell";

const STEPS = [
    {
        n: "01",
        title: "Pick a skill",
        body: "Choose a path — web, AI, project, product, or virtual assistant — and see every topic you’ll cover.",
    },
    {
        n: "02",
        title: "Register to learn",
        body: "Share your goals and we'll place you in an available cohort with a tutor for that skill.",
    },
    {
        n: "03",
        title: "Practice & apply",
        body: "Leave with clear next steps you can use at work the same week — not just notes.",
    },
] as const;

export default function LandingMethod() {
    return (
        <SectionShell className="bg-page-deep/40">
            <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    How Sturdee teaches skills
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
                    Skills stick when you practice with guidance — not when you only watch someone else work.
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
