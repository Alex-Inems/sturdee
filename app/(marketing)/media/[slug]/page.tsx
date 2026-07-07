import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { MEDIA_ASSETS, getMediaAsset } from "@/lib/media";
import { breadcrumbJsonLd, imageObjectJsonLd, mediaMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return MEDIA_ASSETS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const asset = getMediaAsset(slug);
    if (!asset) return {};
    return mediaMetadata(asset);
}

export default async function MediaAssetPage({ params }: Props) {
    const { slug } = await params;
    const asset = getMediaAsset(slug);
    if (!asset) notFound();

    return (
        <div className="font-jakarta bg-page min-h-screen pt-28 pb-20">
            <JsonLd
                data={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Media", path: "/media" },
                        { name: asset.title, path: `/media/${asset.slug}` },
                    ]),
                    imageObjectJsonLd(asset),
                ]}
            />
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Media", href: "/media" },
                        { label: asset.title },
                    ]}
                />
                <article className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden mt-6">
                    <div className="relative aspect-[16/10]">
                        <Image
                            src={asset.path}
                            alt={asset.alt}
                            fill
                            sizes="(max-width: 896px) 100vw, 896px"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="p-6 md:p-10">
                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 mb-2 capitalize">
                            {asset.category}
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{asset.title}</h1>
                        <p className="text-gray-600 font-medium leading-relaxed mb-6">{asset.description}</p>
                        <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-8">
                            <div>
                                <dt className="text-gray-400 font-medium">Dimensions</dt>
                                <dd className="font-semibold text-gray-900">{asset.width} × {asset.height}px</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 font-medium">Format</dt>
                                <dd className="font-semibold text-gray-900">WebP (optimized)</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-gray-400 font-medium">Direct URL</dt>
                                <dd className="font-mono text-xs text-gray-700 break-all">{SITE_URL}{asset.path}</dd>
                            </div>
                        </dl>
                        {asset.usedOn.length > 0 && (
                            <>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Used On</h2>
                                <div className="flex flex-wrap gap-2">
                                    {asset.usedOn.map((path) => (
                                        <Link
                                            key={path}
                                            href={path}
                                            className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                        >
                                            {path}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}
