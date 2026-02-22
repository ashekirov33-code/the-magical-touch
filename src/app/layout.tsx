import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: siteContent.seo.home.title,
  description: siteContent.seo.home.description,
};

export const viewport: Viewport = {
  themeColor: "#090711",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
