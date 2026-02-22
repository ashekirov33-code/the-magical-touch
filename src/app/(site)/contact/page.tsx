import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { CosmicBackground } from "@/components/cosmic/CosmicBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteContent.seo.contact.title,
  description: siteContent.seo.contact.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container>
      <div className="space-y-8 md:space-y-10">
        <Reveal>
          <section className="relative isolate overflow-hidden rounded-3xl">
            <div className="absolute inset-0 opacity-70">
              <CosmicBackground intensity="calm" />
            </div>
            <GlassCard className="relative z-10 rounded-3xl p-8 md:p-11">
              <h1 className="text-4xl font-semibold md:text-5xl">{siteContent.contact.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">{siteContent.contact.subtitle}</p>
            </GlassCard>
          </section>
        </Reveal>

        <Reveal inView delay={0.05}>
          <Section>
            <GlassCard className="rounded-3xl p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start">
                <div className="space-y-3">
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="inline-block text-sm text-accent transition hover:text-accent-strong md:text-base"
                  >
                    {siteContent.contact.email}
                  </a>
                  <p className="text-sm text-muted md:text-base">{siteContent.contact.company}</p>
                  <SocialLinks className="pt-1" />
                </div>

                <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#d8c89d52] bg-surface/40 p-1">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0f0c1f]">
                    <Image
                      src="/gallery/magic1%20(1).png"
                      alt="Contact visual"
                      fill
                      sizes="(max-width: 768px) 80vw, 320px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </Section>
        </Reveal>

        <Reveal inView delay={0.08}>
          <Section>
            <ContactForm />
          </Section>
        </Reveal>

        <Reveal inView delay={0.1}>
          <GlassCard className="rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-accent-strong md:text-2xl">{siteContent.contact.disclaimerTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{siteContent.contact.disclaimerText}</p>
          </GlassCard>
        </Reveal>

        <Reveal inView delay={0.12}>
          <div className="flex flex-wrap gap-3">
            <GlowButton href={siteContent.contact.ctaBookHref} variant="primary">
              {siteContent.contact.ctaBookLabel}
            </GlowButton>
            <GlowButton href={siteContent.contact.ctaShopHref} variant="secondary">
              {siteContent.contact.ctaShopLabel}
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
