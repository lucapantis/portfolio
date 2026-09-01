import { ImageResponse } from "next/og";

// Repository-native Open Graph card, generated at build time from the same
// palette and "LP" mark used across the portfolio. No external assets.
export const alt =
  "Luca Pantis — Junior Full-Stack Developer. React, Next.js, TypeScript, Node.js and PostgreSQL.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(1200px 480px at 15% -10%, rgba(37,99,235,0.28), transparent), #09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              border: "2px solid #3f3f46",
              background: "#17171a",
              color: "#60a5fa",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            LP
          </div>
          <div style={{ fontSize: 26, color: "#a1a1aa" }}>Portfolio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -1 }}>
            Luca Pantis
          </div>
          <div style={{ fontSize: 40, color: "#d4d4d8" }}>
            Junior Full-Stack Developer
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#60a5fa" }}>
          React · Next.js · TypeScript · Node.js · PostgreSQL
        </div>
      </div>
    ),
    { ...size },
  );
}
