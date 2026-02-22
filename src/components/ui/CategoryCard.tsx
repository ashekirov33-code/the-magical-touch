"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CategoryCardProps = {
  title: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export function CategoryCard({ title, href, imageSrc, imageAlt, className }: CategoryCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const node = linkRef.current;
    if (
      !node ||
      prefersReducedMotion ||
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine) and (hover: hover)").matches
    ) {
      return;
    }

    const updateSpotlight = () => {
      frameRef.current = null;
      node.style.setProperty("--spotlight-x", `${pointerRef.current.x}%`);
      node.style.setProperty("--spotlight-y", `${pointerRef.current.y}%`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) {
        return;
      }

      pointerRef.current = {
        x: ((event.clientX - bounds.left) / bounds.width) * 100,
        y: ((event.clientY - bounds.top) / bounds.height) * 100,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateSpotlight);
      }
    };

    const onLeave = () => {
      pointerRef.current = { x: 50, y: 50 };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateSpotlight);
      }
    };

    node.addEventListener("pointermove", onPointerMove, { passive: true });
    node.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <Link
      ref={linkRef}
      href={href}
      className={`group category-spotlight glass-panel relative block min-h-32 overflow-hidden rounded-2xl p-5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className ?? ""}`.trim()}
    >
      {imageSrc && (
        <div className="absolute inset-0">
          <Image src={imageSrc} alt={imageAlt ?? title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-30 transition duration-500 group-hover:opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/55 to-surface/85" />
        </div>
      )}
      {!imageSrc && (
        <div className="absolute inset-0 bg-[radial-gradient(60%_65%_at_25%_20%,rgba(142,114,217,0.2)_0%,transparent_72%),linear-gradient(180deg,rgba(26,21,51,0.92)_0%,rgba(17,14,36,0.92)_100%)]" />
      )}

      <div className="relative z-10">
        <h3 className="text-lg font-medium text-accent-strong transition group-hover:text-foreground">{title}</h3>
      </div>
    </Link>
  );
}