"use client";

const AdmissionsProcess = () => (
    <section className="py-32 bg-linear-to-br from-amber-50 via-white to-red-50">
        <div className="max-w-300 mx-auto px-8">
            <div className="text-center mb-24">
                <h2 className="text-5xl font-light text-gray-900 mb-6">
                    Selective Admissions
                </h2>
                <div className="w-24 h-px bg-burgundy mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-12 text-center">
                {[
                    "Application Review",
                    "Academic Assessment",
                    "Faculty Interview",
                    "Final Admission",
                ].map((step, i) => (
                    <div key={i}>
                        <div className="text-burgundy text-3xl font-light mb-4">
                            0{i + 1}
                        </div>
                        <p className="text-gray-700 tracking-wide">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default AdmissionsProcess;
