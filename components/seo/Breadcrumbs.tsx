import Link from "next/link";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-gray-500">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                            {index > 0 && <span aria-hidden className="text-gray-300">/</span>}
                            {item.href && !isLast ? (
                                <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? "text-gray-900" : undefined} aria-current={isLast ? "page" : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
