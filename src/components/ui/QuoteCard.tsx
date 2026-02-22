import { GlassCard } from "@/components/ui/GlassCard";

type QuoteCardProps = {
  name: string;
  location: string;
  excerpt: string;
  className?: string;
};

export function QuoteCard({ name, location, excerpt, className }: QuoteCardProps) {
  return (
    <GlassCard className={`h-full ${className ?? ""}`}>
      <figure className="space-y-3">
        <blockquote className="text-sm leading-relaxed text-muted">{excerpt}</blockquote>
        <figcaption className="space-y-1">
          <p className="text-base font-medium text-accent-strong">{name}</p>
          <p className="text-xs uppercase tracking-wide text-accent">{location}</p>
        </figcaption>
      </figure>
    </GlassCard>
  );
}