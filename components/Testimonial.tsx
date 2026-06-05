"use client";

import { Star } from "lucide-react";
import SectionShell from "./SectionShell";

const Testimonial = () => (
    <SectionShell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                </div>
                <span className="inline-flex mb-4 px-5 py-2.5 bg-[#FFE55E] rounded-full font-bold text-black text-xs shadow-md">
                    Student Story
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    &quot;Sturdee transformed my career trajectory. The depth of knowledge and personalized mentorship exceeded every expectation.&quot;
                </p>
            </div>
            <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100/50">
                    <p className="text-gray-500 font-medium leading-relaxed text-sm sm:text-base">
                        This is education at its finest — practical, inspiring, and built for ambitious learners who want to lead.
                    </p>
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="font-bold text-gray-900 text-sm">Alexandra Williams</p>
                        <p className="text-gray-500 text-xs font-medium mt-1">Chief Innovation Officer, Fortune 500</p>
                    </div>
                </div>
            </div>
        </div>
    </SectionShell>
);

export default Testimonial;
