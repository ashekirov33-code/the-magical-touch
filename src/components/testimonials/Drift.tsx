"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type DriftProps = {
  children: ReactNode;
  index: number;
  className?: string;
};

export function Drift({ children, index, className }: DriftProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = (index % 2 === 0 ? 1 : -1) * (1 + (index % 2));
  const duration = 10 + (index % 5);

  return (
    <motion.div
      className={className}
      animate={{ y: [0, offset, 0] }}
      transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
