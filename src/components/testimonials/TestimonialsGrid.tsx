import { Drift } from "@/components/testimonials/Drift";
import { QuoteCard } from "@/components/ui/QuoteCard";
import type { Testimonial } from "@/content/siteContent";

type TestimonialsGridProps = {
  items: Testimonial[];
  className?: string;
};

export function TestimonialsGrid({ items, className }: TestimonialsGridProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-3 ${className ?? ""}`.trim()}>
      {items.map((item, index) => (
        <Drift key={item.id} index={index}>
          <QuoteCard
            name={item.name}
            location={item.location}
            excerpt={item.excerpt}
            className={item.highlight ? "border-[#c9b78985] ring-1 ring-[#c9b78955]" : undefined}
          />
        </Drift>
      ))}
    </div>
  );
}
