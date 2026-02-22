import { siteContent } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-8 text-sm text-muted">
      <div className="container-shell flex flex-col gap-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
          {siteContent.contact.socials.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent-strong"
            >
              {social.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteContent.contact.company}</p>
        <a href={`mailto:${siteContent.contact.email}`} className="transition-colors hover:text-accent-strong">
          {siteContent.contact.email}
        </a>
        <p>{siteContent.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}