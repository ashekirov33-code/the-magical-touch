import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

type GalleryPageProps = {
  searchParams: Promise<{
    i?: string | string[];
  }>;
};

function parseIndex(value: string | string[] | undefined) {
  const firstValue = Array.isArray(value) ? value[0] : value;
  if (!firstValue) {
    return null;
  }

  const parsed = Number.parseInt(firstValue, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export const metadata: Metadata = buildMetadata({
  title: siteContent.seo.gallery.title,
  description: siteContent.seo.gallery.description,
  path: "/gallery",
});

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialIndex = parseIndex(resolvedSearchParams.i);

  return <GalleryPageClient initialIndex={initialIndex} />;
}
