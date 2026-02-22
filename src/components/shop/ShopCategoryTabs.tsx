"use client";

import { useEffect, useMemo } from "react";
import type { KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { siteContent, type ShopCategory } from "@/content/siteContent";

type ShopCategoryTabsProps = {
  selectedKey: ShopCategory["key"];
  onCategoryChange: (key: ShopCategory["key"]) => void;
  className?: string;
};

export function ShopCategoryTabs({ selectedKey, onCategoryChange, className }: ShopCategoryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categories = siteContent.shop.categories;

  const validKeys = useMemo(() => new Set<string>(categories.map((category) => category.key)), [categories]);

  useEffect(() => {
    const queryKey = searchParams.get("cat");
    const fallbackKey = siteContent.shop.defaultCategoryKey;
    const normalizedKey =
      queryKey && validKeys.has(queryKey) ? (queryKey as ShopCategory["key"]) : fallbackKey;

    if (normalizedKey !== selectedKey) {
      onCategoryChange(normalizedKey);
    }

    if (queryKey !== normalizedKey) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cat", normalizedKey);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [onCategoryChange, pathname, router, searchParams, selectedKey, validKeys]);

  const setCategory = (key: ShopCategory["key"]) => {
    onCategoryChange(key);
    const params = new URLSearchParams(searchParams.toString());
    params.set("cat", key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const targetIndex = (currentIndex + delta + categories.length) % categories.length;
    const targetKey = categories[targetIndex]?.key;
    if (!targetKey) {
      return;
    }
    setCategory(targetKey);

    const nextButton = document.getElementById(`shop-tab-${targetKey}`);
    nextButton?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={siteContent.shop.tabsAriaLabel} className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const isSelected = selectedKey === category.key;
          return (
            <button
              key={category.key}
              id={`shop-tab-${category.key}`}
              role="tab"
              type="button"
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected}
              aria-controls={`shop-panel-${category.key}`}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => setCategory(category.key)}
              className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong ${
                isSelected
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-surface/45 text-muted hover:border-accent hover:text-accent-strong"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}