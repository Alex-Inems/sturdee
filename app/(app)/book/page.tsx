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
                highlight="Register to learn"
                title="Join a skill cohort"
                subtitle="Share your details and the skill you want to learn. We'll place you in an available batch with a tutor — no scheduling required."
            />
            <SectionShell compact>
                <Suspense fallback={<SectionPlaceholder />}>
                    <BookingForm />
                </Suspense>
            </SectionShell>
        </div>
    );
}
