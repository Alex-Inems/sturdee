import { Award, Users, TrendingUp } from "lucide-react";
import SectionShell from "./SectionShell";

const Benefits = () => {
    const benefits = [
        {
            icon: Award,
            title: "Certification",
            desc: "Receive prestigious credentials recognized by industry leaders worldwide.",
            color: "bg-amber-100/60 text-amber-600",
        },
        {
            icon: Users,
            title: "Mentorship",
            desc: "One-on-one guidance from accomplished professionals in your field.",
            color: "bg-emerald-100/60 text-emerald-600",
        },
        {
            icon: TrendingUp,
            title: "Career Growth",
            desc: "Join an exclusive network of successful alumni and opportunities.",
            color: "bg-sky-100/60 text-sky-600",
        },
    ];

    return (
        <SectionShell>
            <div className="mb-12 text-center lg:text-left">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight">
                    Why Learn With Us
                </h2>
                <p className="text-base sm:text-lg text-gray-500 font-medium mt-4 max-w-lg mx-auto lg:mx-0">
                    Everything you need to grow, connect, and succeed
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/50 hover:translate-y-[-2px] transition-all duration-300"
                    >
                        <div className={`w-10 h-10 rounded-full ${benefit.color} flex items-center justify-center mb-6`}>
                            <benefit.icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
};

export default Benefits;
