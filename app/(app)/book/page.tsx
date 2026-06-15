import dynamic from "next/dynamic";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import SectionPlaceholder from "@/components/SectionPlaceholder";

const BookingForm = dynamic(() => import("@/components/booking/BookingForm"), {
    loading: () => <SectionPlaceholder />,
});

export default function BookPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Book a Session"
                title="Schedule Your Consultation"
                subtitle="Book a personalized session with our team — consultations, tours, admissions, and tutoring."
            />
            <SectionShell compact>
                <BookingForm />
            </SectionShell>
        </div>
    );
}
