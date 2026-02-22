import Link from "next/link";
import type { ReactNode } from "react";

type GlowButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function GlowButton({ href, children, variant = "primary", className }: GlowButtonProps) {
  const baseClassName =
    "cta-glow inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-sm font-medium transition-[transform,box-shadow,border-color,background-color] duration-220 ease-out motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variantClassName =
    variant === "primary"
      ? "border-accent bg-accent text-background"
      : "border-border bg-surface/35 text-foreground";

  return (
    <Link href={href} className={`${baseClassName} ${variantClassName} ${className ?? ""}`.trim()}>
      {children}
    </Link>
  );
}