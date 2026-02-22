import type { TestimonialCountryKey } from "@/content/siteContent";

type FilterItem = {
  key: TestimonialCountryKey;
  label: string;
};

type TestimonialsFiltersProps = {
  selectedKey: TestimonialCountryKey | "All";
  onSelect: (key: TestimonialCountryKey | "All") => void;
  filters: FilterItem[];
  allLabel: string;
  className?: string;
};

export function TestimonialsFilters({
  selectedKey,
  onSelect,
  filters,
  allLabel,
  className,
}: TestimonialsFiltersProps) {
  const allFilters: Array<{ key: TestimonialCountryKey | "All"; label: string }> = [
    { key: "All", label: allLabel },
    ...filters,
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`.trim()}>
      {allFilters.map((filter) => {
        const active = filter.key === selectedKey;
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onSelect(filter.key)}
            className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong ${
              active
                ? "border-accent bg-accent text-background"
                : "border-border bg-surface/45 text-muted hover:border-accent hover:text-accent-strong"
            }`}
            aria-pressed={active}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
