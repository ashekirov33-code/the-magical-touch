import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  contentClassName?: string;
};

export function Section({ children, title, subtitle, id, className, contentClassName }: SectionProps) {
  return (
    <section id={id} className={className}>
      {(title || subtitle) && (
        <header className="mb-5 space-y-2">
          {title && <h2 className="text-3xl font-semibold leading-[1.16] tracking-[-0.012em] md:text-4xl">{title}</h2>}
          {subtitle && <p className="max-w-3xl text-sm leading-[1.78] text-muted md:text-base">{subtitle}</p>}
        </header>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}