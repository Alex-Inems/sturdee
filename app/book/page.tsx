import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import BookingForm from "@/components/booking/BookingForm";

export default function BookPage() {
    return (
        <div className="font-jakarta bg-white min-h-screen">
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
