"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsFilters } from "@/components/testimonials/TestimonialsFilters";
import { TestimonialsGrid } from "@/components/testimonials/TestimonialsGrid";
import { TestimonialsSearch } from "@/components/testimonials/TestimonialsSearch";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { siteContent, type TestimonialCountryKey } from "@/content/siteContent";

export function TestimonialsPageClient() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<TestimonialCountryKey | "All">("All");

  const filteredItems = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return siteContent.testimonials.filter((item) => {
      const countryMatch = selectedFilter === "All" || item.countryKey === selectedFilter;
      if (!countryMatch) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchBlob = `${item.name} ${item.location} ${item.excerpt}`.toLowerCase();
      return searchBlob.includes(query);
    });
  }, [searchValue, selectedFilter]);

  return (
    <Container>
      <div className="space-y-8 md:space-y-10">
        <Reveal>
          <GlassCard className="rounded-3xl p-8 md:p-11">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h1 className="text-4xl font-semibold md:text-5xl">{siteContent.testimonialsPage.title}</h1>
                <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">{siteContent.testimonialsPage.subtitle}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <GlowButton href={siteContent.testimonialsPage.ctaBookHref} variant="primary">
                    {siteContent.testimonialsPage.ctaBookLabel}
                  </GlowButton>
                  <GlowButton href={siteContent.testimonialsPage.ctaContactHref} variant="secondary">
                    {siteContent.testimonialsPage.ctaContactLabel}
                  </GlowButton>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#d8c89d52] bg-surface/40 p-1">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0f0c1f]">
                  <Image
                    src="/gallery/magic12.png"
                    alt="Testimonials visual"
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal inView delay={0.05}>
          <GlassCard className="rounded-3xl p-5 md:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <TestimonialsSearch
                value={searchValue}
                onChange={setSearchValue}
                placeholder={siteContent.testimonialsPage.searchPlaceholder}
              />
              <TestimonialsFilters
                selectedKey={selectedFilter}
                onSelect={setSelectedFilter}
                filters={siteContent.testimonialsPage.filters}
                allLabel={siteContent.testimonialsPage.filterAllLabel}
              />
            </div>
          </GlassCard>
        </Reveal>

        <Reveal inView delay={0.08}>
          <p className="text-sm text-muted">
            {filteredItems.length} {siteContent.testimonialsPage.resultsLabel}
          </p>

          {filteredItems.length > 0 ? (
            <TestimonialsGrid items={filteredItems} className="mt-4" />
          ) : (
            <GlassCard className="mt-4 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-medium text-accent-strong">{siteContent.testimonialsPage.emptyTitle}</h2>
              <p className="mt-2 text-sm text-muted">{siteContent.testimonialsPage.emptyText}</p>
            </GlassCard>
          )}
        </Reveal>
      </div>
    </Container>
  );
}
