import Image from "next/image";
import { CosmicBackground } from "@/components/cosmic/CosmicBackground";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { HaloFrame } from "@/components/ui/HaloFrame";

type AboutHeroProps = {
  title: string;
  subtitle: string;
  intro: string;
  ctaBookLabel: string;
  ctaShopLabel: string;
  ctaBookHref: string;
  ctaShopHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function AboutHero({
  title,
  subtitle,
  intro,
  ctaBookLabel,
  ctaShopLabel,
  ctaBookHref,
  ctaShopHref,
  imageSrc,
  imageAlt,
}: AboutHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl">
      <div className="absolute inset-0 opacity-70">
        <CosmicBackground intensity="calm" />
      </div>
      <Reveal className="relative z-10" duration={1}>
        <GlassCard className="grid gap-8 rounded-3xl p-7 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
            <p className="text-base text-accent-strong">{subtitle}</p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <GlowButton href={ctaBookHref} variant="primary">
                {ctaBookLabel}
              </GlowButton>
              <GlowButton href={ctaShopHref} variant="secondary">
                {ctaShopLabel}
              </GlowButton>
            </div>
          </div>

          <HaloFrame className="mx-auto w-full max-w-[380px]">
            <div className="relative aspect-[4/5] w-full">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority sizes="(max-width: 1024px) 80vw, 380px" />
            </div>
          </HaloFrame>
        </GlassCard>
      </Reveal>
    </section>
  );
}
