import { ImageResponse } from "next/og";
import { localeNames, type Locale } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/site-core";

export const alt = `${SITE_NAME} — Free Coding Tutorials & Courses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const lang = localeNames[locale as Locale] ?? "English";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "72px",
                    background: "linear-gradient(165deg, #f2f4f8 0%, #e8ebf0 48%, #dfe4ec 100%)",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 18,
                            background: "#10B981",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 36,
                            fontWeight: 700,
                        }}
                    >
                        S
                    </div>
                    <span style={{ fontSize: 48, fontWeight: 700, color: "#111827" }}>{SITE_NAME}</span>
                </div>
                <p style={{ fontSize: 36, fontWeight: 600, color: "#374151", maxWidth: 900, lineHeight: 1.3 }}>
                    Free Coding Tutorials, Courses & Study Resources
                </p>
                <p style={{ fontSize: 22, color: "#6B7280", marginTop: 24 }}>{lang}</p>
            </div>
        ),
        { ...size }
    );
}
