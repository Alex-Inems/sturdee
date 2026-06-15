import Link from "next/link";
import { SITE_NAME, POLICY_URLS } from "@/lib/site";

const Footer = () => (
    <footer className="relative bg-page-deep font-jakarta border-t border-gray-200/70 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none dot-pattern" aria-hidden />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div>
                    <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
                        Sturdee
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mt-4">
                        Elevating developers through rigorous, industry-aligned education
                    </p>
                </div>

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-5">Programs</h3>
                    <ul className="space-y-3 text-sm">
                        {["Web Development", "Programming", "Cryptocurrency", "Blockchain"].map((item) => (
                            <li key={item}>
                                <Link href="/programs" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-5">Resources</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            { label: "Tutorials", href: "/tutorials" },
                            { label: "Book a Session", href: "/book" },
                            { label: "Course Catalog", href: "/courses" },
                            { label: "Learning Paths", href: "/programs" },
                            { label: "Certifications", href: "#" },
                            { label: "Career Services", href: "#" },
                        ].map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-5">Company</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            { label: "About Us", href: "/" },
                            { label: "Instructors", href: "/instructors" },
                            { label: "Alumni Network", href: "#" },
                            { label: "Contact", href: "#" },
                        ].map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm font-medium">© 2026 {SITE_NAME}. All rights reserved.</p>
                <div className="flex gap-6 text-sm">
                    {[
                        { label: "Privacy", href: POLICY_URLS.privacy },
                        { label: "Terms", href: POLICY_URLS.terms },
                        { label: "Legal", href: POLICY_URLS.legal },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-gray-400 hover:text-gray-900 font-medium transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
