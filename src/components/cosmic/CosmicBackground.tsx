"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CosmicBackgroundProps = {
  intensity?: "calm";
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CosmicBackground({ intensity = "calm" }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const parallaxFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const opacityMultiplier = intensity === "calm" ? 0.92 : 1;

  const maxParallax = 8;

  const baseParticleCount = useMemo(() => {
    if (typeof window === "undefined") {
      return 100;
    }
    const area = window.innerWidth * window.innerHeight;
    const normalized = Math.round(area / 12000);
    return clamp(normalized, 80, 160);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const setupParticles = (width: number, height: number) => {
      const scaledCount = clamp(Math.round((width * height) / 12000), 80, 160);
      const particleCount = clamp(Math.max(baseParticleCount, scaledCount), 80, 180);

      particlesRef.current = new Array(particleCount).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 2.2,
        alpha: 0.08 + Math.random() * 0.27,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
      }));
    };

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) {
        return;
      }
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      setupParticles(width, height);
    };

    const drawFrame = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        context.beginPath();
        context.fillStyle = `rgba(226, 214, 255, ${particle.alpha * opacityMultiplier})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      for (const particle of particlesRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.y > height + 4) particle.y = -4;
      }

      drawFrame();
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const startAnimation = () => {
      if (prefersReducedMotion || document.hidden || animationFrameRef.current !== null) {
        return;
      }
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }
      drawFrame();
      startAnimation();
    };

    const onResize = () => {
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }
      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeCanvas();
        drawFrame();
      });
    };

    resizeCanvas();
    drawFrame();

    startAnimation();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAnimation();
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }
    };
  }, [baseParticleCount, intensity, opacityMultiplier, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;

      if (parallaxFrameRef.current !== null) {
        return;
      }

      parallaxFrameRef.current = window.requestAnimationFrame(() => {
        parallaxFrameRef.current = null;
        const normalizedX = pointerRef.current.x / window.innerWidth - 0.5;
        const normalizedY = pointerRef.current.y / window.innerHeight - 0.5;
        setParallaxOffset({
          x: normalizedX * maxParallax,
          y: normalizedY * maxParallax,
        });
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (parallaxFrameRef.current !== null) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${prefersReducedMotion ? 0 : parallaxOffset.x}px, ${prefersReducedMotion ? 0 : parallaxOffset.y}px, 0)`,
          transition: prefersReducedMotion ? "none" : "transform 1.3s ease-out",
          background:
            "radial-gradient(50% 40% at 16% 28%, rgba(90, 62, 147, 0.38), transparent 70%), radial-gradient(35% 30% at 82% 18%, rgba(68, 42, 126, 0.32), transparent 74%), radial-gradient(60% 54% at 60% 90%, rgba(35, 24, 73, 0.44), transparent 72%), linear-gradient(180deg, rgba(10, 8, 19, 0.72) 0%, rgba(8, 6, 16, 0.8) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 12%, rgba(255, 255, 255, 0.03), transparent 56%), radial-gradient(95% 110% at 50% 100%, rgba(0, 0, 0, 0.35), transparent 72%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: 0.045,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)",
          backgroundSize: "3px 3px",
          mixBlendMode: "screen",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}