import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

type SessionCardProps = {
  title: string;
  price?: string;
  bullets: string[];
  badges?: string[];
  ctaLabel: string;
  ctaHref: string;
  className?: string;
};

export function SessionCard({ title, price, bullets, badges, ctaLabel, ctaHref, className }: SessionCardProps) {
  return (
    <GlassCard className={`h-full ${className ?? ""}`}>
      <div className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-accent-strong">{title}</h3>
          {price && <p className="text-2xl font-semibold text-foreground">{price}</p>}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full border border-[#c9b78980] bg-[#c9b78924] px-3 py-1 text-xs text-accent-strong">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <ul className="space-y-2 text-sm text-muted">
          {bullets.map((item) => (
            <li key={item} className="rounded-lg border border-border/80 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-1">
          <GlowButton href={ctaHref} variant="secondary" className="w-full">
            {ctaLabel}
          </GlowButton>
        </div>
      </div>
    </GlassCard>
  );
}