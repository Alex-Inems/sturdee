import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Free Coding Tutorials & Courses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
                            fontSize: 40,
                            fontWeight: 700,
                        }}
                    >
                        S
                    </div>
                    <div style={{ fontSize: 48, fontWeight: 700, color: "#111827" }}>{SITE_NAME}</div>
                </div>
                <div style={{ fontSize: 56, fontWeight: 700, color: "#111827", lineHeight: 1.15, maxWidth: 900 }}>
                    Free coding tutorials for every major language
                </div>
                <div style={{ fontSize: 28, color: "#4b5563", marginTop: 24, maxWidth: 820, lineHeight: 1.4 }}>
                    HTML, CSS, JavaScript, Python, Shopify Liquid, SQL, and 20+ more — interactive lessons with video and try-it-yourself code.
                </div>
            </div>
        ),
        { ...size }
    );
}
