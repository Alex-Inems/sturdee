import { redirect, notFound } from "next/navigation";
import { getAllTutorialPages, getTutorialTrack } from "@/lib/tutorials";

interface Props {
    params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
    return [
        { lang: "html" },
        { lang: "css" },
        { lang: "javascript" },
        { lang: "typescript" },
        { lang: "python" },
        { lang: "sql" },
        { lang: "java" },
        { lang: "cpp" },
        { lang: "c" },
        { lang: "csharp" },
        { lang: "php" },
        { lang: "ruby" },
        { lang: "go" },
        { lang: "rust" },
        { lang: "swift" },
        { lang: "kotlin" },
        { lang: "r" },
        { lang: "bash" },
        { lang: "json" },
        { lang: "xml" },
        { lang: "nodejs" },
    ];
}

export default async function TutorialLanguagePage({ params }: Props) {
    const { lang } = await params;
    const track = getTutorialTrack(lang);
    if (!track) notFound();

    const first = getAllTutorialPages(lang)[0];
    if (first) redirect(`/tutorials/${lang}/${first.slug}`);
    notFound();
}
