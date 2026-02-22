type CustomOrderPanelProps = {
  description: string;
  ctaLabel: string;
  onRequest: () => void;
  className?: string;
};

export function CustomOrderPanel({ description, ctaLabel, onRequest, className }: CustomOrderPanelProps) {
  return (
    <section className={`glass-panel rounded-2xl p-6 md:p-8 ${className ?? ""}`.trim()}>
      <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{description}</p>
      <button
        type="button"
        onClick={onRequest}
        className="cta-glow mt-5 rounded-full border border-accent bg-accent px-6 py-2.5 text-sm font-medium text-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
      >
        {ctaLabel}
      </button>
    </section>
  );
}