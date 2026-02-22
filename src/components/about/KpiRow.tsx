import { KpiCard } from "@/components/ui/KpiCard";

type KpiRowProps = {
  items: string[];
  className?: string;
};

const kpiIcons = [
  <svg key="sessions" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8Z" />
    <path d="M12 7v5l3 2" />
  </svg>,
  <svg key="events" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 10h16" />
  </svg>,
  <svg key="location" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>,
];

export function KpiRow({ items, className }: KpiRowProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className ?? ""}`.trim()}>
      {items.map((item, index) => (
        <KpiCard key={item} value={item} icon={kpiIcons[index % kpiIcons.length]} />
      ))}
    </div>
  );
}
