import SectionShell from "./SectionShell";

const Accreditation = () => (
    <SectionShell compact>
        <div className="text-center">
            <span className="inline-flex mb-8 px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-700 text-xs shadow-md">
                Trusted Worldwide
            </span>
            <p className="text-sm font-medium text-gray-500 mb-10">
                Accredited & recognized by
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {["ISO Certified", "Global Education Council", "Executive Learning Board", "International Faculty Network"].map(
                    (name) => (
                        <span
                            key={name}
                            className="px-5 py-2.5 bg-white border border-gray-100 rounded-full font-semibold text-gray-600 text-xs sm:text-sm shadow-sm"
                        >
                            {name}
                        </span>
                    )
                )}
            </div>
        </div>
    </SectionShell>
);

export default Accreditation;
