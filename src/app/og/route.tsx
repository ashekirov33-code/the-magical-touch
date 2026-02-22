import { ImageResponse } from "next/og";
import { siteContent } from "@/content/siteContent";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#efe9ff",
          background:
            "radial-gradient(1000px 520px at 5% 0%, rgba(72,48,129,0.55), transparent 58%), radial-gradient(800px 440px at 95% 0%, rgba(100,62,155,0.45), transparent 62%), linear-gradient(180deg, #090711 0%, #080611 100%)",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.9, letterSpacing: 1 }}>{siteContent.brand.name}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{siteContent.hero.heading}</div>
          <div style={{ fontSize: 28, opacity: 0.88, maxWidth: 980 }}>{siteContent.brand.person}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
