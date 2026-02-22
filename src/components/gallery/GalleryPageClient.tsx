"use client";

import { useMemo } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import { useGalleryLightbox } from "@/components/gallery/useGalleryLightbox";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Section } from "@/components/ui/Section";
import { galleryManifest } from "@/content/galleryManifest";

type GalleryPageClientProps = {
  initialIndex: number | null;
};

function toGallery1Path(imagePath: string) {
  if (imagePath.startsWith("/gallery/gallery1/")) {
    return imagePath;
  }

  if (imagePath.startsWith("/gallery/gallery/")) {
    return imagePath.replace("/gallery/gallery/", "/gallery/gallery1/");
  }

  if (imagePath.startsWith("/gallery/")) {
    return imagePath.replace("/gallery/", "/gallery/gallery1/");
  }

  return imagePath;
}

export function GalleryPageClient({ initialIndex }: GalleryPageClientProps) {
  const galleryImages = useMemo(() => {
    const normalized = galleryManifest
      .map((imagePath) => toGallery1Path(imagePath))
      .filter((imagePath) => imagePath.startsWith("/gallery/gallery1/"));

    return Array.from(new Set(normalized));
  }, []);

  const { activeIndex, isOpen, openAt, close, next, previous } = useGalleryLightbox({
    totalItems: galleryImages.length,
    initialIndex,
  });

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] ?? null : null;

  return (
    <Container>
      <div className="space-y-8 md:space-y-10">
        <GlassCard className="rounded-3xl p-7 md:p-10">
          <h1 className="text-4xl font-semibold tracking-[-0.015em] text-accent-strong md:text-5xl">Gallery</h1>
          <p className="mt-3 max-w-3xl text-sm leading-[1.78] text-muted md:text-base">
            Потопи се в спокойна космическа галерия с енергия, детайл и меко сияние.
          </p>
          <div className="mt-5">
            <GlowButton href="/" variant="secondary">
              Back to Home
            </GlowButton>
          </div>
        </GlassCard>

        <Section>
          {galleryImages.length > 0 ? (
            <GalleryGrid images={galleryImages} onOpen={openAt} />
          ) : (
            <GlassCard className="rounded-2xl p-6">
              <p className="text-sm text-muted">No gallery images were found in gallery1.</p>
            </GlassCard>
          )}
        </Section>
      </div>

      <LightboxModal
        isOpen={isOpen}
        imageSrc={activeImage}
        index={activeIndex}
        total={galleryImages.length}
        onClose={close}
        onNext={next}
        onPrevious={previous}
      />
    </Container>
  );
}
