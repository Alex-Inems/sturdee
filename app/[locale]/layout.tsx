import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { htmlLang, routing } from "@/i18n/routing";
import { AuthProvider } from "@/components/AuthContext";
import SiteShell from "@/components/SiteShell";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider deferAuth>
                <SiteShell lang={htmlLang[locale as keyof typeof htmlLang] ?? "en"}>{children}</SiteShell>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
