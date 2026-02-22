import Link from "next/link";
import { siteContent } from "@/content/siteContent";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-accent-strong">
          {siteContent.brand.name}
        </Link>
        <nav>
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-muted">
            {siteContent.nav.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="transition-colors hover:text-accent-strong">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}