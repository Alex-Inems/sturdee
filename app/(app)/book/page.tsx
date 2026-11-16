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
                highlight="Free live class"
                title="Book a live consultation"
                subtitle="Need a live consultation? Book a free class with me. Share your details and the skill you want to learn — I’ll place you in a session."
            />
            <SectionShell compact>
                <Suspense fallback={<SectionPlaceholder />}>
                    <BookingForm />
                </Suspense>
            </SectionShell>
        </div>
    );
}
