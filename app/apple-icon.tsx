import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0F766E",
                    borderRadius: 40,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontSize: 108,
                        fontWeight: 700,
                        color: "#ffffff",
                        fontFamily: "Georgia, serif",
                        letterSpacing: "-0.06em",
                    }}
                >
                    S
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 28,
                        right: 32,
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        background: "#FDE047",
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
