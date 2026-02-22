import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

type KpiCardProps = {
  value: string;
  icon?: ReactNode;
  className?: string;
};

export function KpiCard({ value, icon, className }: KpiCardProps) {
  return (
    <GlassCard className={`h-full ${className ?? ""}`}>
      <div className="flex items-center gap-3">
        {icon && <span className="text-accent" aria-hidden="true">{icon}</span>}
        <p className="text-sm font-medium text-accent-strong md:text-base">{value}</p>
      </div>
    </GlassCard>
  );
}