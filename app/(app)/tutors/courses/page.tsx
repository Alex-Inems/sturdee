import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import CourseManager from "@/components/tutors/CourseManager";

export default function TutorCoursesPage() {
    return (
        <div className="font-jakarta bg-page min-h-screen">
            <PageHero
                highlight="Tutor Tools"
                title="Manage Your Courses"
                subtitle="Create and publish courses after your tutor profile is live."
            />
            <SectionShell compact>
                <CourseManager />
            </SectionShell>
        </div>
    );
}
