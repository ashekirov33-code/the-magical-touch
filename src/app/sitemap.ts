import type { MetadataRoute } from "next";

const ROUTES = ["/", "/sessions", "/shop", "/gallery", "/about", "/testimonials", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
    lastModified: new Date(),
  }));
}
