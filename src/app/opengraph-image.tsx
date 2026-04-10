import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MonVTC — Votre site VTC professionnel en 24h";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090B",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: 14,
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 900, color: "white",
            }}
          >
            V
          </div>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 800, color: "#FFFFFF" }}>
            Mon<span style={{ color: "#3B82F6" }}>VTC</span>
          </div>
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF", textAlign: "center", marginBottom: 16 }}>
          Votre site VTC professionnel
        </div>
        <div
          style={{
            fontSize: 36, fontWeight: 700,
            background: "linear-gradient(135deg, #60A5FA, #3B82F6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          en 24 heures
        </div>
        <div style={{ fontSize: 20, color: "#666", marginTop: 24 }}>
          199€ setup + 29€/mois — tout inclus
        </div>
      </div>
    ),
    { ...size }
  );
}
