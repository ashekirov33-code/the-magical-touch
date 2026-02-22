"use client";

import { useCallback, useEffect, useState } from "react";

type ToastItem = {
  id: number;
  message: string;
};

export function useToast(timeoutMs = 2600) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((current) => [...current, { id, message }]);

      window.setTimeout(() => {
        dismissToast(id);
      }, timeoutMs);
    },
    [dismissToast, timeoutMs],
  );

  return { toasts, showToast, dismissToast };
}

type ToastViewportProps = {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
  closeLabel: string;
};

export function ToastViewport({ toasts, onDismiss, closeLabel }: ToastViewportProps) {
  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }
  }, [toasts]);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] space-y-2" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto glass-panel flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-foreground shadow-lg">
          <p>{toast.message}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="rounded-md border border-border px-2 py-1 text-xs text-muted transition hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            {closeLabel}
          </button>
        </div>
      ))}
    </div>
  );
}