type InquiryListProps = {
  choices: string[];
  requestLabel: string;
  onRequest: (item: string) => void;
  className?: string;
};

export function InquiryList({ choices, requestLabel, onRequest, className }: InquiryListProps) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 xl:grid-cols-3 ${className ?? ""}`.trim()}>
      {choices.map((choice) => (
        <article key={choice} className="glass-panel rounded-2xl p-5">
          <p className="text-sm leading-relaxed text-accent-strong">{choice}</p>
          <button
            type="button"
            onClick={() => onRequest(choice)}
            className="cta-glow mt-4 rounded-full border border-border bg-surface/35 px-4 py-2 text-sm text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            {requestLabel}
          </button>
        </article>
      ))}
    </div>
  );
}