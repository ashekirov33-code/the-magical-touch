"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type StardustParallaxProps = {
  children: ReactNode;
  className?: string;
};

export function StardustParallax({ children, className }: StardustParallaxProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nebulaLayerRef = useRef<HTMLDivElement | null>(null);
  const dustLayerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) {
      return;
    }

    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
      return;
    }

    const animate = () => {
      frameRef.current = null;
      const normalizedX = pointerRef.current.x * 2 - 1;
      const normalizedY = pointerRef.current.y * 2 - 1;

      const nebulaX = normalizedX * 7;
      const nebulaY = normalizedY * 7;
      const dustX = normalizedX * 10;
      const dustY = normalizedY * 10;

      if (nebulaLayerRef.current) {
        nebulaLayerRef.current.style.transform = `translate3d(${nebulaX}px, ${nebulaY}px, 0)`;
      }
      if (dustLayerRef.current) {
        dustLayerRef.current.style.transform = `translate3d(${dustX}px, ${dustY}px, 0)`;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) {
        return;
      }

      pointerRef.current = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const reset = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (nebulaLayerRef.current) {
        nebulaLayerRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      if (dustLayerRef.current) {
        dustLayerRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", reset, { passive: true });

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef} className={`stardust-parallax relative overflow-hidden ${className ?? ""}`.trim()}>
      <div ref={nebulaLayerRef} className="stardust-layer stardust-nebula" aria-hidden="true" />
      <div ref={dustLayerRef} className="stardust-layer stardust-dust" aria-hidden="true" />
      <div className="stardust-content relative z-10">
        {children}
      </div>
    </div>
  );
}
