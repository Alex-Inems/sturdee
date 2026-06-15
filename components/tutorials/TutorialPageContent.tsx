import type { TutorialBlock } from "@/lib/tutorials";
import TryItPanel from "./TryItPanel";

function CodeBlock({ language, code, title }: { language: string; code: string; title?: string }) {
    return (
        <div className="my-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            {title && (
                <div className="px-4 py-2 bg-gray-900 text-white text-xs font-bold">{title}</div>
            )}
            <pre className="p-5 overflow-x-auto bg-[#1e293b] text-gray-100 text-sm font-mono leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default function TutorialPageContent({ sections }: { sections: TutorialBlock[] }) {
    return (
        <article className="prose prose-gray max-w-none">
            {sections.map((block, i) => {
                switch (block.type) {
                    case "h2":
                        return (
                            <h2 key={i} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">
                                {block.text}
                            </h2>
                        );
                    case "h3":
                        return (
                            <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">
                                {block.text}
                            </h3>
                        );
                    case "p":
                        return (
                            <p key={i} className="text-gray-600 font-medium leading-relaxed mb-4">
                                {block.text}
                            </p>
                        );
                    case "list":
                        return (
                            <ul key={i} className="list-disc pl-6 mb-6 space-y-2 text-gray-600 font-medium">
                                {block.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        );
                    case "note":
                        return (
                            <div
                                key={i}
                                className="my-6 px-5 py-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-sm font-medium"
                            >
                                <strong className="font-bold">Note: </strong>
                                {block.text}
                            </div>
                        );
                    case "code":
                        return <CodeBlock key={i} language={block.language} code={block.code} title={block.title} />;
                    case "tryit":
                        return (
                            <TryItPanel
                                key={i}
                                language={block.language}
                                code={block.code}
                                title={block.title}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </article>
    );
}
