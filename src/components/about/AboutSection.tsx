import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

type AboutSectionProps = {
  title: string;
  body: string;
  delay?: number;
  className?: string;
};

export function AboutSection({ title, body, delay = 0, className }: AboutSectionProps) {
  return (
    <Reveal inView delay={delay} className={className}>
      <GlassCard className="rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-accent-strong md:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{body}</p>
      </GlassCard>
    </Reveal>
  );
}
