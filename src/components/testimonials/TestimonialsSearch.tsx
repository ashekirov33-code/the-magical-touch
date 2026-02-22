type TestimonialsSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
};

export function TestimonialsSearch({ value, onChange, placeholder, className }: TestimonialsSearchProps) {
  return (
    <label className={`block ${className ?? ""}`.trim()}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-border bg-surface/45 px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
      />
    </label>
  );
}
