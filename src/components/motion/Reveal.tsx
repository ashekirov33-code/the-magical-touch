"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  inView?: boolean;
  staggerIndex?: number;
  staggerStep?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 10,
  duration = 0.9,
  className,
  inView = false,
  staggerIndex,
  staggerStep = 0.08,
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const safeDuration = Math.min(1.1, Math.max(0.7, duration));
  const resolvedDelay = delay + (typeof staggerIndex === "number" ? staggerIndex * staggerStep : 0);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (inView) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "-10% 0px" }}
        transition={{ duration: safeDuration, delay: resolvedDelay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: safeDuration, delay: resolvedDelay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}