import type { TutorialVideo as TutorialVideoType } from "@/lib/tutorials";

function embedUrl(video: TutorialVideoType): string {
    const params = new URLSearchParams({
        rel: "0",
        modestbranding: "1",
    });
    if (video.start && video.start > 0) {
        params.set("start", String(video.start));
    }
    return `https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`;
}

function watchUrl(video: TutorialVideoType): string {
    const base = `https://www.youtube.com/watch?v=${video.id}`;
    return video.start && video.start > 0 ? `${base}&t=${video.start}s` : base;
}

export default function TutorialVideo({
    video,
    title,
}: {
    video: TutorialVideoType;
    title: string;
}) {
    return (
        <section className="my-8" aria-label={`Video tutorial: ${title}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-gray-900">Video lesson</h2>
                <a
                    href={watchUrl(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    Watch on YouTube ↗
                </a>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-900">
                <iframe
                    src={embedUrl(video)}
                    title={`${title} — video tutorial`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>
            {video.channel && (
                <p className="mt-2 text-xs text-gray-400 font-medium">Source: {video.channel}</p>
            )}
        </section>
    );
}
