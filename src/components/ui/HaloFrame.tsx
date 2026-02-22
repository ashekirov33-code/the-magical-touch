"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type HaloFrameProps = {
  children: ReactNode;
  className?: string;
  sizeVariant?: "sm" | "md" | "lg";
  showShimmer?: boolean;
  glowIntensity?: "soft" | "medium";
};

const sizeClassMap = {
  sm: "rounded-[1.55rem]",
  md: "rounded-[2rem]",
  lg: "rounded-[2.25rem]",
} as const;

const ringRadiusMap = {
  sm: "rounded-[1.55rem]",
  md: "rounded-[2rem]",
  lg: "rounded-[2.25rem]",
} as const;

const outerGlowMap = {
  sm: "-inset-3 rounded-[1.75rem]",
  md: "-inset-4 rounded-[2.3rem]",
  lg: "-inset-5 rounded-[2.6rem]",
} as const;

const glowClassMap = {
  soft: "opacity-75",
  medium: "opacity-100",
} as const;

export function HaloFrame({
  children,
  className,
  sizeVariant = "md",
  showShimmer = true,
  glowIntensity = "soft",
}: HaloFrameProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowShimmer = showShimmer && !prefersReducedMotion;
  const sizeClass = sizeClassMap[sizeVariant];
  const ringClass = ringRadiusMap[sizeVariant];
  const outerGlowClass = outerGlowMap[sizeVariant];
  const glowClass = glowClassMap[glowIntensity];

  return (
    <div
      className={`relative overflow-hidden border border-[#cfc2a47a] bg-[#151128cc] shadow-[0_20px_60px_rgba(8,6,18,0.65),0_0_0_1px_rgba(238,220,178,0.22)] ${sizeClass} ${className ?? ""}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${ringClass} ring-1 ring-[#f4e7c755]`}
        style={{
          background:
            "linear-gradient(142deg, rgba(208,188,140,0.12) 0%, rgba(183,158,216,0.11) 58%, rgba(201,188,149,0.08) 100%)",
        }}
      />
      <div
        className={`pointer-events-none absolute ${outerGlowClass} blur-xl ${glowClass}`}
        style={{
          background:
            "radial-gradient(circle at 28% 28%, rgba(218,198,153,0.2) 0%, rgba(171,141,214,0.12) 46%, transparent 74%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-3 top-3 h-18 w-24 rounded-full blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.12,
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgba(255,255,255,0.35) 1px, transparent 1.2px), radial-gradient(circle at 88% 18%, rgba(242,229,255,0.28) 1px, transparent 1.2px), radial-gradient(circle at 22% 84%, rgba(236,220,195,0.26) 1px, transparent 1.2px)",
          backgroundSize: "120px 120px, 150px 150px, 170px 170px",
          mixBlendMode: "screen",
        }}
      />

      {allowShimmer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[#fff8dd26] to-transparent"
          animate={{ x: ["0%", "290%"] }}
          transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatDelay: 3.5 }}
        />
      )}

      <div className="relative">{children}</div>
    </div>
  );
}