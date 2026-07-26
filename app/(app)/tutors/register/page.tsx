import TutorOnboardingWizard from "@/components/tutors/TutorOnboardingWizard";
import { assertFeatureEnabled } from "@/lib/features";

export default function TutorRegisterPage() {
    assertFeatureEnabled("tutors");

    return <TutorOnboardingWizard />;
}
