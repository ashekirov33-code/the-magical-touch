import type { Metadata } from "next";
import { TestimonialsPageClient } from "@/components/testimonials/TestimonialsPageClient";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteContent.seo.testimonials.title,
  description: siteContent.seo.testimonials.description,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
