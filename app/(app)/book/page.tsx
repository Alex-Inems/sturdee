import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import { assertFeatureEnabled } from "@/lib/features";

const BookingForm = dynamic(() => import("@/components/booking/BookingForm"), {
    loading: () => <SectionPlaceholder />,
});

export default function BookPage() {
    assertFeatureEnabled("booking");

    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Book a Session"
                title="Schedule Your Consultation"
                subtitle="Book a personalized session with our team — consultations, tours, admissions, and tutoring."
            />
            <SectionShell compact>
                <Suspense fallback={<SectionPlaceholder />}>
                    <BookingForm />
                </Suspense>
            </SectionShell>
        </div>
    );
}
