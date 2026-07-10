import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";

export default function AppIntlProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextIntlClientProvider locale="en" messages={en}>
            {children}
        </NextIntlClientProvider>
    );
}
