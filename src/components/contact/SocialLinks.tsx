"use client";

import { siteContent } from "@/content/siteContent";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`.trim()}>
      {siteContent.contact.socials.map((social) => {
        const isDisabled = social.href === "#";

        return (
          <a
            key={social.key}
            href={social.href}
            aria-disabled={isDisabled}
            onClick={(event) => {
              if (isDisabled) {
                event.preventDefault();
              }
            }}
            className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong ${
              isDisabled
                ? "cursor-default border-border/70 bg-surface/30 text-muted/80"
                : "border-border bg-surface/45 text-muted hover:border-accent hover:text-accent-strong"
            }`}
          >
            {social.label}
          </a>
        );
      })}
    </div>
  );
}
