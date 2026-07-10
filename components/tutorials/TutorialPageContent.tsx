import type { TutorialBlock } from "@/lib/tutorials";
import CodeBlock from "./CodeBlock";
import SandboxTryItPanel from "./SandboxTryItPanel";
import TryItPanel from "./TryItPanel";

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
                    case "steps":
                        return (
                            <ol key={i} className="list-decimal pl-6 mb-6 space-y-3 text-gray-600 font-medium">
                                {block.items.map((item) => (
                                    <li key={item} className="leading-relaxed">{item}</li>
                                ))}
                            </ol>
                        );
                    case "tip":
                        return (
                            <div
                                key={i}
                                className="my-6 px-5 py-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-sm font-medium leading-relaxed"
                            >
                                <strong className="font-bold">Tip: </strong>
                                {block.text}
                            </div>
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
                    case "faq":
                        return (
                            <div key={i} className="my-8 space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
                                {block.items.map((item) => (
                                    <details
                                        key={item.question}
                                        className="group rounded-xl border border-gray-200 bg-gray-50/50 open:bg-white open:shadow-sm"
                                    >
                                        <summary className="cursor-pointer px-5 py-4 font-semibold text-gray-900 list-none flex justify-between items-center">
                                            {item.question}
                                            <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                                        </summary>
                                        <p className="px-5 pb-4 text-gray-600 font-medium leading-relaxed">{item.answer}</p>
                                    </details>
                                ))}
                            </div>
                        );
                    case "code":
                        return <CodeBlock key={i} language={block.language} code={block.code} title={block.title} />;
                    case "tryit":
                        return block.sandbox ? (
                            <SandboxTryItPanel
                                key={i}
                                language={block.language}
                                code={block.code}
                                sandbox={block.sandbox}
                                title={block.title}
                            />
                        ) : (
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
