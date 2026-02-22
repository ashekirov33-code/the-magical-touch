import type { Metadata } from "next";
import { SessionsPageClient } from "@/components/sessions/SessionsPageClient";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

type SessionsPageProps = {
  searchParams: Promise<{
    type?: string | string[];
  }>;
};

export const metadata: Metadata = buildMetadata({
  title: siteContent.seo.sessions.title,
  description: siteContent.seo.sessions.description,
  path: "/sessions",
});

export default async function SessionsPage({ searchParams }: SessionsPageProps) {
  const resolvedSearchParams = await searchParams;
  const typeValue = resolvedSearchParams.type;
  const preselectedType = Array.isArray(typeValue) ? typeValue[0] : typeValue;

  return <SessionsPageClient preselectedType={preselectedType} />;
}
