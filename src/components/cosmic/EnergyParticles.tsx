"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  driftX: number;
  driftY: number;
};

type EnergyParticlesProps = {
  className?: string;
};

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    x: 4 + Math.random() * 92,
    y: 10 + Math.random() * 88,
    size: 1.4 + Math.random() * 3.4,
    delay: Math.random() * 6,
    duration: 7 + Math.random() * 8,
    opacity: 0.3 + Math.random() * 0.45,
    driftX: -14 + Math.random() * 28,
    driftY: -36 - Math.random() * 44,
  }));
}

export function EnergyParticles({ className }: EnergyParticlesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const particles = useMemo(
    () => buildParticles(prefersReducedMotion ? 20 : 64),
    [prefersReducedMotion],
  );

  return (
    <div
      className={`pointer-events-none absolute -inset-3 z-20 overflow-hidden rounded-[2.3rem] ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      <div className="energy-aura-ring" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`energy-particle ${prefersReducedMotion ? "energy-particle-static" : "energy-particle-fly energy-particle-twinkle"}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            ["--energy-drift-x" as string]: `${particle.driftX}px`,
            ["--energy-drift-y" as string]: `${particle.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}
