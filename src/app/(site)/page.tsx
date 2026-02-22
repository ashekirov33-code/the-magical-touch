import { HomePageClient } from "@/components/home/HomePageClient";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: siteContent.seo.home.title,
  description: siteContent.seo.home.description,
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
