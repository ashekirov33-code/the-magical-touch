import type { Metadata } from "next";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
};

function resolveBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
}

export function buildMetadata({ title, description, path }: BuildMetadataArgs): Metadata {
  const baseUrl = resolveBaseUrl();
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const ogImageUrl = `${baseUrl}/og`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "The Magical Touch",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
