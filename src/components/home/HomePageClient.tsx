"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { CosmicBackground } from "@/components/cosmic/CosmicBackground";
import { EnergyParticles } from "@/components/cosmic/EnergyParticles";
import { StardustParallax } from "@/components/cosmic/StardustParallax";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Container } from "@/components/ui/Container";
import { CosmicDivider } from "@/components/ui/CosmicDivider";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { HaloFrame } from "@/components/ui/HaloFrame";
import { KpiCard } from "@/components/ui/KpiCard";
import { QuoteCard } from "@/components/ui/QuoteCard";
import { Section } from "@/components/ui/Section";
import { SessionCard } from "@/components/ui/SessionCard";
import { StepCard } from "@/components/ui/StepCard";
import { galleryManifest } from "@/content/galleryManifest";
import { siteContent } from "@/content/siteContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function categoryToHref(categoryKey: string) {
  return `/shop?cat=${encodeURIComponent(categoryKey)}`;
}

const kpiIcons = [
  <svg key="sessions" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8Z" />
    <path d="M12 7v5l3 2" />
  </svg>,
  <svg key="events" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 10h16" />
  </svg>,
  <svg key="location" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>,
];

export function HomePageClient() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroImage = "/gallery/magic11.png";
  const aboutImage = "/gallery/magic3-1.png";
  const testimonialsImages = ["/gallery/magic12.png", "/gallery/magic121.png", "/gallery/magic122.png"];
  const shopPreviewImages = [galleryManifest[1], galleryManifest[2]];
  const testimonialsPreview = siteContent.testimonials.slice(0, 3);
  const missionExcerpt = siteContent.mission.statement.split(".")[0]?.trim();
  const missionLine = missionExcerpt ? `${missionExcerpt}.` : siteContent.mission.statement;

  const groupBullets = [
    siteContent.sessions.group.duration,
    siteContent.sessions.group.location,
    ...siteContent.sessions.experienceList.slice(0, 2),
  ];

  return (
    <Container>
      <div className="relative isolate space-y-6 overflow-hidden rounded-[2rem] pb-2 pt-4 md:space-y-8 md:py-8">
        <CosmicBackground intensity="calm" />
        <div className="light-sweep pointer-events-none absolute inset-0 z-10" aria-hidden="true" />

        <Reveal className="relative z-20" duration={1.05} y={10}>
          <Section>
            <StardustParallax className="rounded-[2rem]">
              <GlassCard className="grid gap-8 rounded-[2rem] p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-5">
                <p className="text-lg font-semibold tracking-wide text-accent-strong">{siteContent.brand.name}</p>
                <p className="text-xs tracking-[0.2em] text-accent">{siteContent.brand.person}</p>
                <h1 className="hero-heading text-4xl font-semibold leading-[1.1] tracking-[-0.018em] md:text-5xl">
                  {siteContent.hero.heading}
                </h1>
                <p className="max-w-2xl text-base leading-[1.78] text-muted">{siteContent.hero.subtext}</p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <GlowButton href={siteContent.hero.primaryCta.href} variant="primary">
                    {siteContent.hero.primaryCta.label}
                  </GlowButton>
                  <GlowButton href={siteContent.hero.secondaryCta.href} variant="secondary">
                    {siteContent.hero.secondaryCta.label}
                  </GlowButton>
                </div>
                </div>

                <div className="relative mx-auto w-full max-w-[420px]">
                  <EnergyParticles />
                  <HaloFrame sizeVariant="lg" showShimmer glowIntensity="medium">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={heroImage}
                        alt={siteContent.hero.imageAlt}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 80vw, 420px"
                      />
                    </div>
                  </HaloFrame>
                </div>
              </GlassCard>
            </StardustParallax>
          </Section>
        </Reveal>

        <Reveal inView delay={0.04} className="relative z-20">
          <Section>
            <div className="grid gap-4 md:grid-cols-3">
              {siteContent.kpi.map((entry, index) => (
                <Reveal key={entry} inView duration={0.82} staggerIndex={index} staggerStep={0.1}>
                  <KpiCard value={entry} icon={kpiIcons[index]} />
                </Reveal>
              ))}
            </div>
          </Section>
        </Reveal>
        <CosmicDivider />

        <Reveal inView delay={0.08} className="relative z-20">
          <Section title={siteContent.home.howItWorksTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {siteContent.home.howItWorksSteps.map((step, index) => (
                <Reveal key={step.title} inView duration={0.84} staggerIndex={index} staggerStep={0.11}>
                  <StepCard
                    title={step.title}
                    text={step.text}
                    icon={
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M9 12.5l2 2 4-5" />
                      </svg>
                    }
                    className={index === 1 ? "md:-translate-y-0.5" : undefined}
                  />
                </Reveal>
              ))}
            </div>
          </Section>
        </Reveal>
        <CosmicDivider />

        <Reveal inView delay={0.1} className="relative z-20">
          <Section title={siteContent.home.sessionsTitle}>
            <div className="space-y-4">
              <SessionCard
                title={siteContent.sessions.group.title}
                bullets={groupBullets}
                ctaLabel={siteContent.home.groupSessionCtaLabel}
                ctaHref="/sessions"
              />

              <div className="grid gap-4 md:grid-cols-3">
                {siteContent.sessions.individual.packages.map((pkg) => {
                  const packageBullets = [
                    ...siteContent.sessions.experienceList.slice(0, 2),
                    ...(pkg.bonus ? [pkg.bonus] : []),
                    ...(pkg.special ? [pkg.special] : []),
                  ];

                  return (
                    <SessionCard
                      key={pkg.title}
                      title={pkg.title}
                      price={pkg.price}
                      bullets={packageBullets}
                      ctaLabel={siteContent.home.individualSessionCtaLabel}
                      ctaHref={siteContent.hero.primaryCta.href}
                    />
                  );
                })}
              </div>
            </div>
          </Section>
        </Reveal>
        <CosmicDivider />

        <Reveal inView delay={0.12} className="relative z-20">
          <Section title={siteContent.home.shopTitle}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {siteContent.shop.categories.map((category, index) => (
                <Reveal key={category.key} inView duration={0.82} staggerIndex={index} staggerStep={0.07}>
                  <CategoryCard
                    title={category.label}
                    href={categoryToHref(category.key)}
                    imageSrc={index < 2 ? shopPreviewImages[index] : undefined}
                    imageAlt={siteContent.hero.imageAlt}
                  />
                </Reveal>
              ))}
            </div>
          </Section>
        </Reveal>
        <CosmicDivider />

        <Reveal inView delay={0.14} className="relative z-20">
          <Section title={siteContent.home.aboutTitle}>
            <GlassCard className="grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted">{siteContent.bio.short}</p>
                <p className="text-sm leading-relaxed text-muted">{missionLine}</p>
                <GlowButton href="/about" variant="secondary">
                  {siteContent.home.readMoreLabel}
                </GlowButton>
              </div>

              <HaloFrame className="mx-auto w-full max-w-[260px]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={aboutImage}
                    alt={siteContent.hero.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 65vw, 260px"
                  />
                </div>
              </HaloFrame>
            </GlassCard>
          </Section>
        </Reveal>
        <CosmicDivider />

        <Reveal inView delay={0.16} className="relative z-20">
          <Section title={siteContent.home.testimonialsTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonialsPreview.map((item, index) => {
                if (prefersReducedMotion) {
                  return (
                    <Reveal key={`${item.name}-${item.location}`} inView duration={0.85} staggerIndex={index} staggerStep={0.1}>
                      <QuoteCard name={item.name} location={item.location} excerpt={item.excerpt} />
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={`${item.name}-${item.location}`} inView duration={0.85} staggerIndex={index} staggerStep={0.1}>
                    <motion.div
                      animate={{ y: [0, -1, 1, 0] }}
                      transition={{
                        duration: 8 + index * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                    >
                      <QuoteCard name={item.name} location={item.location} excerpt={item.excerpt} />
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonialsImages.map((imageSrc, imageIndex) => (
                <HaloFrame key={imageSrc} className="mx-auto w-full max-w-[260px]" sizeVariant="sm" showShimmer>
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={imageSrc}
                      alt={`Testimonials visual ${imageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 70vw, 260px"
                    />
                  </div>
                </HaloFrame>
              ))}
            </div>
            <div className="mt-5">
              <GlowButton href="/testimonials" variant="secondary">
                {siteContent.home.viewAllTestimonialsLabel}
              </GlowButton>
            </div>
          </Section>
        </Reveal>

        <Reveal inView delay={0.18} className="relative z-20 pb-1">
          <Section>
            <GlassCard className="rounded-[1.7rem] p-6 md:p-8">
              <div className="space-y-5">
                <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{siteContent.home.finalCtaTitle}</h2>
                <div className="flex flex-wrap gap-3">
                  <GlowButton href={siteContent.hero.primaryCta.href} variant="primary">
                    {siteContent.hero.primaryCta.label}
                  </GlowButton>
                  <GlowButton href="/contact" variant="secondary">
                    {siteContent.home.contactLabel}
                  </GlowButton>
                </div>
                <a href={`mailto:${siteContent.contact.email}`} className="text-sm text-accent transition hover:text-accent-strong">
                  {siteContent.contact.email}
                </a>
              </div>
            </GlassCard>
          </Section>
        </Reveal>
      </div>
    </Container>
  );
}
