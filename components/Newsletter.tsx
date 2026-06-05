"use client";

import { useState } from "react";
import SectionShell from "./SectionShell";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    return (
        <SectionShell>
            <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] aspect-square bg-amber-100/30 rounded-full blur-[2px] pointer-events-none" />
                <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100/50 max-w-2xl mx-auto text-center">
                    <span className="inline-flex mb-6 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs shadow-md">
                        Stay Updated
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                        Begin Your Journey
                    </h2>
                    <p className="text-gray-500 font-medium mt-4 mb-8">
                        Receive exclusive course updates and learning resources
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 text-gray-900 placeholder-gray-400 font-medium text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        <button className="px-8 py-3.5 bg-[#10B981] hover:bg-[#0F9F72] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </SectionShell>
    );
};

export default Newsletter;
