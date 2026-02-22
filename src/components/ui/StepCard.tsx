import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

type StepCardProps = {
  title: string;
  text: string;
  icon?: ReactNode;
  className?: string;
};

export function StepCard({ title, text, icon, className }: StepCardProps) {
  return (
    <GlassCard className={className}>
      <div className="space-y-3">
        {icon && <div className="text-accent" aria-hidden="true">{icon}</div>}
        <h3 className="text-lg font-medium text-accent-strong">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </GlassCard>
  );
}