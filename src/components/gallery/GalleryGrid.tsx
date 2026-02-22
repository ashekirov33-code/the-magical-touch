"use client";

import { GlassCard } from "@/components/ui/GlassCard";

type GalleryGridProps = {
  images: string[];
  onOpen: (index: number) => void;
};

export function GalleryGrid({ images, onOpen }: GalleryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((imageSrc, index) => (
        <button
          key={imageSrc}
          type="button"
          onClick={() => onOpen(index)}
          className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Open gallery image ${index + 1}`}
        >
          <GlassCard className="rounded-2xl p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border/70 bg-surface/40">
              <img
                src={imageSrc}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.012]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0907117d]" />
              <span className="absolute bottom-2 right-2 rounded-full border border-[#d8c89d66] bg-[#1a1632b8] px-2.5 py-1 text-[11px] font-medium text-accent-strong">
                {index + 1}
              </span>
            </div>
          </GlassCard>
        </button>
      ))}
    </div>
  );
}
