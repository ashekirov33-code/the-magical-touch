"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type LightboxModalProps = {
  isOpen: boolean;
  imageSrc: string | null;
  index: number | null;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function LightboxModal({
  isOpen,
  imageSrc,
  index,
  total,
  onClose,
  onNext,
  onPrevious,
}: LightboxModalProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    const frame = window.requestAnimationFrame(() => {
      const firstButton = dialogRef.current?.querySelector<HTMLElement>("button");
      firstButton?.focus();
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialogNode = dialogRef.current;
      if (!dialogNode) {
        return;
      }

      const focusableElements = dialogNode.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const current = document.activeElement as HTMLElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !imageSrc || index === null) {
    return null;
  }

  const titleId = "gallery-lightbox-title";
  const descriptionId = "gallery-lightbox-description";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#06050cd9] px-3 py-4 md:px-8 ${
        prefersReducedMotion ? "" : "transition-opacity duration-220"
      }`}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="glass-panel w-full max-w-6xl rounded-2xl p-3 md:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p id={titleId} className="text-sm font-medium tracking-wide text-accent-strong md:text-base">
            Gallery
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border bg-surface/45 px-3.5 py-1.5 text-sm text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            Close
          </button>
        </div>

        <p id={descriptionId} className="sr-only">
          Use left and right arrow keys to navigate images and escape to close.
        </p>

        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-surface/50">
          <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
            <img
              src={imageSrc}
              alt={`Gallery image ${index + 1}`}
              loading="eager"
              decoding="sync"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-full border border-border bg-surface/45 px-3.5 py-1.5 text-sm text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            Previous
          </button>
          <p className="text-xs text-muted md:text-sm">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full border border-border bg-surface/45 px-3.5 py-1.5 text-sm text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
