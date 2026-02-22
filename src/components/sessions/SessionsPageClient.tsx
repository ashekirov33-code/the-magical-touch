"use client";

import Image from "next/image";
import { CosmicBackground } from "@/components/cosmic/CosmicBackground";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/sessions/BookingForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Section } from "@/components/ui/Section";
import { SessionCard } from "@/components/ui/SessionCard";
import { siteContent } from "@/content/siteContent";

type SessionsPageClientProps = {
  preselectedType?: string;
};

export function SessionsPageClient({ preselectedType }: SessionsPageClientProps) {
  const sessions = siteContent.sessions;

  const isValidPreselect =
    preselectedType === "group" ||
    sessions.individual.packages.some((pkg) => pkg.id === preselectedType);

  const normalizedType = isValidPreselect ? preselectedType : undefined;

  return (
    <div className="space-y-8 md:space-y-10">
      <Reveal>
        <section className="relative isolate overflow-hidden rounded-3xl">
          <CosmicBackground intensity="calm" />
          <GlassCard className="relative z-10 grid gap-6 rounded-3xl p-8 md:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-semibold md:text-5xl">{sessions.title}</h1>
              <p className="mt-3 text-base text-accent-strong">{sessions.subtitle}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">{sessions.intro}</p>
            </div>

            <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#d8c89d52] bg-surface/40 p-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0f0c1f]">
                <Image
                  src="/gallery/magic3.png"
                  alt="Session example visual"
                  fill
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </GlassCard>
        </section>
      </Reveal>

      <Reveal inView delay={0.06}>
        <Section>
          <GlassCard className="rounded-3xl p-7 md:p-9">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-accent-strong md:text-3xl">{sessions.group.title}</h2>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
                  <span className="rounded-full border border-border px-3 py-1">{sessions.group.duration}</span>
                  <span className="rounded-full border border-border px-3 py-1">{sessions.group.location}</span>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{sessions.group.description}</p>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {sessions.group.highlights.map((item) => (
                    <li key={item} className="rounded-lg border border-border/80 px-3 py-2 text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <GlowButton href="/sessions#book" variant="secondary">
                    {sessions.group.bookCtaLabel}
                  </GlowButton>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#d8c89d52] bg-surface/40 p-1">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0f0c1f]">
                  <Image
                    src="/gallery/magic222.png"
                    alt="Group crystal sessions visual"
                    fill
                    sizes="(max-width: 1024px) 90vw, 30vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </Section>
      </Reveal>

      <Reveal inView delay={0.08}>
        <Section title={sessions.individual.title} subtitle={sessions.individual.description}>
          <div className="grid gap-4 md:grid-cols-3">
            {sessions.individual.packages.map((pkg) => (
              <SessionCard
                key={pkg.id}
                title={pkg.title}
                price={pkg.price}
                bullets={pkg.includes}
                badges={[pkg.bonus, pkg.special].filter(Boolean) as string[]}
                ctaLabel={sessions.individual.bookPackageLabel}
                ctaHref={`/sessions?type=${encodeURIComponent(pkg.id)}#book`}
              />
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal inView delay={0.1}>
        <Section title={sessions.experienceTitle}>
          <GlassCard className="rounded-3xl p-6 md:p-8">
            <ul className="grid gap-3 md:grid-cols-2">
              {sessions.experienceList.map((item) => (
                <li key={item} className="rounded-lg border border-border/80 px-4 py-3 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Section>
      </Reveal>

      <Reveal inView delay={0.12}>
        <Section id="book" title={sessions.booking.title} subtitle={sessions.booking.subtitle}>
          <BookingForm preselectedType={normalizedType} />
          <GlassCard className="mt-4 rounded-2xl p-5">
            <h3 className="text-base font-medium text-accent-strong">{sessions.booking.disclaimerTitle}</h3>
            <p className="mt-2 text-sm text-muted">{sessions.booking.disclaimerText}</p>
          </GlassCard>
        </Section>
      </Reveal>
    </div>
  );
}
