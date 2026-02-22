import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutSection } from "@/components/about/AboutSection";
import { KpiRow } from "@/components/about/KpiRow";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { galleryManifest } from "@/content/galleryManifest";
import { siteContent } from "@/content/siteContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteContent.seo.about.title,
  description: siteContent.seo.about.description,
  path: "/about",
});

export default function AboutPage() {
  const portrait = galleryManifest[0] ?? siteContent.hero.fallbackPortraitSrc;
  const [workSection, missionSection, creationSection] = siteContent.about.sections;

  return (
    <Container>
      <div className="space-y-8 md:space-y-10">
        <AboutHero
          title={siteContent.about.title}
          subtitle={siteContent.about.subtitle}
          intro={siteContent.about.intro}
          ctaBookLabel={siteContent.about.ctaBookLabel}
          ctaShopLabel={siteContent.about.ctaShopLabel}
          ctaBookHref={siteContent.about.ctaBookHref}
          ctaShopHref={siteContent.about.ctaShopHref}
          imageSrc={portrait}
          imageAlt={siteContent.hero.imageAlt}
        />

        {workSection && <AboutSection title={workSection.title} body={workSection.body} delay={0.06} />}

        {missionSection && <AboutSection title={missionSection.title} body={missionSection.body} delay={0.08} />}

        <Reveal inView delay={0.1}>
          <Section title={siteContent.about.kpiTitle}>
            <KpiRow items={siteContent.kpi} />
          </Section>
        </Reveal>

        {creationSection && <AboutSection title={creationSection.title} body={creationSection.body} delay={0.12} />}

        <Reveal inView delay={0.14}>
          <div className="border-t border-border/70 pt-6">
            <GlassCard className="rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-accent-strong md:text-2xl">{siteContent.about.disclaimerTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{siteContent.about.disclaimerText}</p>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
