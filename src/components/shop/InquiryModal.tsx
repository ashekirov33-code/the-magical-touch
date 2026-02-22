"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ShopModalLabels } from "@/content/siteContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { copyToClipboard } from "@/lib/clipboard";

type InquiryModalProps = {
  isOpen: boolean;
  categoryLabel: string;
  selectedItem: string;
  toEmail: string;
  labels: ShopModalLabels;
  onClose: () => void;
};

function buildEmailBody(
  name: string,
  email: string,
  item: string,
  note: string,
  labels: Pick<ShopModalLabels, "nameLabel" | "emailLabel" | "itemLabel" | "noteLabel">,
) {
  return `${labels.nameLabel}: ${name}\n${labels.emailLabel}: ${email}\n${labels.itemLabel}: ${item}\n\n${labels.noteLabel}:\n${note}`;
}

export function InquiryModal({
  isOpen,
  categoryLabel,
  selectedItem,
  toEmail,
  labels,
  onClose,
}: InquiryModalProps) {
  const titleId = "shop-inquiry-modal-title";
  const descriptionId = "shop-inquiry-modal-description";
  const prefersReducedMotion = usePrefersReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [item, setItem] = useState(selectedItem);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    const frame = window.requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialogNode = dialogRef.current;
      if (!dialogNode) {
        return;
      }

      const focusableElements = dialogNode.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const current = document.activeElement as HTMLElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeydown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const subject = useMemo(
    () => `${labels.subjectPrefix} — ${categoryLabel} — ${item}`,
    [categoryLabel, item, labels.subjectPrefix],
  );
  const body = useMemo(
    () =>
      buildEmailBody(name, email, item, note, {
        nameLabel: labels.nameLabel,
        emailLabel: labels.emailLabel,
        itemLabel: labels.itemLabel,
        noteLabel: labels.noteLabel,
      }),
    [email, item, labels.emailLabel, labels.itemLabel, labels.nameLabel, labels.noteLabel, name, note],
  );
  const mailtoHref = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleCopy = async () => {
    const copiedSuccessfully = await copyToClipboard(`Subject: ${subject}\n\n${body}`);
    if (!copiedSuccessfully) {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#06050bcc] px-4"
          onClick={onClose}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
            className="glass-panel w-full max-w-xl rounded-2xl p-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 id={titleId} className="text-xl font-medium text-accent-strong">
                {labels.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted transition hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              >
                {labels.closeLabel}
              </button>
            </div>

            <p id={descriptionId} className="mb-3 text-sm text-muted">
              {categoryLabel}
            </p>

            <form className="space-y-3">
              <label className="block text-sm text-muted">
                <span>{labels.nameLabel}</span>
                <input
                  id="shop-inquiry-name"
                  ref={firstInputRef}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                />
              </label>

              <label className="block text-sm text-muted">
                <span>{labels.emailLabel}</span>
                <input
                  id="shop-inquiry-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                />
              </label>

              <label className="block text-sm text-muted">
                <span>{labels.itemLabel}</span>
                <input
                  id="shop-inquiry-item"
                  value={item}
                  onChange={(event) => setItem(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                />
              </label>

              <label className="block text-sm text-muted">
                <span>{labels.noteLabel}</span>
                <textarea
                  id="shop-inquiry-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={4}
                  placeholder={labels.notePlaceholder}
                  className="mt-1 w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                />
              </label>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={mailtoHref}
                  className="cta-glow rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                >
                  {labels.sendEmailLabel}
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border border-border bg-surface/45 px-5 py-2 text-sm font-medium text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                >
                  {copied ? labels.copiedLabel : labels.copyEmailTextLabel}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}