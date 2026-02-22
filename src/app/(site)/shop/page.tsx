import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: siteContent.seo.shop.title,
  description: siteContent.seo.shop.description,
  path: "/shop",
});

export default function ShopPage() {
  return <ShopPageClient />;
}
