"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type UseGalleryLightboxArgs = {
  totalItems: number;
  initialIndex: number | null;
};

function normalizeIndex(index: number | null, totalItems: number) {
  if (index === null || Number.isNaN(index) || totalItems <= 0) {
    return null;
  }

  if (index < 0 || index >= totalItems) {
    return null;
  }

  return index;
}

function readIndexFromLocation(totalItems: number) {
  if (typeof window === "undefined") {
    return null;
  }

  let value: string | null = null;
  try {
    value = new URLSearchParams(window.location.search).get("i");
  } catch {
    return null;
  }

  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return normalizeIndex(parsed, totalItems);
}

export function useGalleryLightbox({ totalItems, initialIndex }: UseGalleryLightboxArgs) {
  const router = useRouter();
  const pathname = usePathname();

  const normalizedInitialIndex = useMemo(
    () => normalizeIndex(initialIndex, totalItems),
    [initialIndex, totalItems],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(normalizedInitialIndex);

  const syncUrl = useCallback(
    (index: number | null, mode: "push" | "replace") => {
      if (typeof window === "undefined") {
        return;
      }

      try {
        const params = new URLSearchParams(window.location.search);
        if (index === null) {
          params.delete("i");
        } else {
          params.set("i", String(index));
        }

        const safePathname = pathname || "/gallery";
        const queryString = params.toString();
        const nextUrl = queryString ? `${safePathname}?${queryString}` : safePathname;

        if (mode === "push") {
          router.push(nextUrl, { scroll: false });
          return;
        }

        router.replace(nextUrl, { scroll: false });
      } catch {
        return;
      }
    },
    [pathname, router],
  );

  const openAt = useCallback(
    (index: number) => {
      const normalized = normalizeIndex(index, totalItems);
      if (normalized === null) {
        return;
      }

      setActiveIndex(normalized);
      syncUrl(normalized, "push");
    },
    [syncUrl, totalItems],
  );

  const close = useCallback(() => {
    setActiveIndex(null);
    syncUrl(null, "replace");
  }, [syncUrl]);

  const next = useCallback(() => {
    if (activeIndex === null || totalItems === 0) {
      return;
    }

    const nextIndex = (activeIndex + 1) % totalItems;
    setActiveIndex(nextIndex);
    syncUrl(nextIndex, "replace");
  }, [activeIndex, syncUrl, totalItems]);

  const previous = useCallback(() => {
    if (activeIndex === null || totalItems === 0) {
      return;
    }

    const previousIndex = (activeIndex - 1 + totalItems) % totalItems;
    setActiveIndex(previousIndex);
    syncUrl(previousIndex, "replace");
  }, [activeIndex, syncUrl, totalItems]);

  useEffect(() => {
    const onPopState = () => {
      setActiveIndex(readIndexFromLocation(totalItems));
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [totalItems]);

  return {
    activeIndex,
    isOpen: activeIndex !== null,
    openAt,
    close,
    next,
    previous,
  };
}
