import SectionShell from "@/components/SectionShell";

const STEPS = [
    {
        n: "01",
        title: "Read the lesson",
        body: "Short, focused explanations with real examples — no fluff.",
    },
    {
        n: "02",
        title: "Edit the code",
        body: "Open the try-it editor and change anything. Break it. Fix it.",
    },
    {
        n: "03",
        title: "Run it yourself",
        body: "See the result immediately so the concept sticks.",
    },
] as const;

export default function LandingMethod() {
    return (
        <SectionShell className="bg-page-deep/40">
            <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    How Sturdee teaches
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
                    Learning sticks when you write code, not when you watch someone else write it.
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
