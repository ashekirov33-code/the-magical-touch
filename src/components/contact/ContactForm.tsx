"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteContent } from "@/content/siteContent";
import { copyToClipboard } from "@/lib/clipboard";
import { buildMailto } from "@/lib/mailto";

type ContactFormState = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const formContent = siteContent.contact.form;
  const preparedStatusId = "contact-prepared-status";

  const [form, setForm] = useState<ContactFormState>({
    fullName: "",
    email: "",
    subject: formContent.defaultSubject,
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = (state: ContactFormState) => {
    const nextErrors: ContactFormErrors = {};

    if (!state.fullName.trim()) {
      nextErrors.fullName = formContent.errors.fullNameRequired;
    } else if (state.fullName.trim().length < 2) {
      nextErrors.fullName = formContent.errors.fullNameMin;
    }

    if (!state.email.trim()) {
      nextErrors.email = formContent.errors.emailRequired;
    } else if (!emailPattern.test(state.email.trim())) {
      nextErrors.email = formContent.errors.emailInvalid;
    }

    if (!state.subject.trim()) {
      nextErrors.subject = formContent.errors.subjectRequired;
    } else if (state.subject.trim().length < 3) {
      nextErrors.subject = formContent.errors.subjectMin;
    }

    if (!state.message.trim()) {
      nextErrors.message = formContent.errors.messageRequired;
    } else if (state.message.trim().length < 10) {
      nextErrors.message = formContent.errors.messageMin;
    } else if (state.message.length > 1500) {
      nextErrors.message = formContent.errors.messageMax;
    }

    return nextErrors;
  };

  const mailBody = useMemo(() => {
    return [
      `${formContent.mailBodyLabels.name}: ${form.fullName}`,
      `${formContent.mailBodyLabels.email}: ${form.email}`,
      `${formContent.mailBodyLabels.subject}: ${form.subject}`,
      "",
      `${formContent.mailBodyLabels.message}:`,
      form.message,
      "",
      `${formContent.mailBodyLabels.page}: ${formContent.pageValue}`,
    ].join("\n");
  }, [form, formContent.mailBodyLabels, formContent.pageValue]);

  const mailtoHref = useMemo(
    () =>
      buildMailto({
        to: siteContent.contact.email,
        subject: form.subject,
        body: mailBody,
      }),
    [form.subject, mailBody],
  );

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setIsPrepared(Object.keys(nextErrors).length === 0);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(mailBody);
    if (!ok) {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} noValidate className="glass-panel rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-accent-strong md:text-2xl">{formContent.title}</h2>

        <div className="mt-4 grid gap-4">
          <label className="text-sm text-muted">
            <span id="contact-fullname-label">{formContent.labels.fullName}</span>
            <input
              id="contact-fullname"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder={formContent.placeholders.fullName}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.fullName)}
              aria-labelledby="contact-fullname-label"
              aria-describedby={errors.fullName ? "contact-fullname-error" : undefined}
            />
            {errors.fullName && (
              <p id="contact-fullname-error" className="mt-1 text-xs text-accent">
                {errors.fullName}
              </p>
            )}
          </label>

          <label className="text-sm text-muted">
            <span id="contact-email-label">{formContent.labels.email}</span>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={formContent.placeholders.email}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.email)}
              aria-labelledby="contact-email-label"
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1 text-xs text-accent">
                {errors.email}
              </p>
            )}
          </label>

          <label className="text-sm text-muted">
            <span id="contact-subject-label">{formContent.labels.subject}</span>
            <input
              id="contact-subject"
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              placeholder={formContent.placeholders.subject}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.subject)}
              aria-labelledby="contact-subject-label"
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            />
            {errors.subject && (
              <p id="contact-subject-error" className="mt-1 text-xs text-accent">
                {errors.subject}
              </p>
            )}
          </label>

          <label className="text-sm text-muted">
            <span id="contact-message-label">{formContent.labels.message}</span>
            <textarea
              id="contact-message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder={formContent.placeholders.message}
              rows={6}
              maxLength={1500}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.message)}
              aria-labelledby="contact-message-label"
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-xs text-accent">
                {errors.message}
              </p>
            )}
          </label>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="cta-glow rounded-full border border-accent bg-accent px-6 py-2.5 text-sm font-medium text-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            {formContent.submitLabel}
          </button>
        </div>
      </form>

      {isPrepared && (
        <GlassCard className="rounded-2xl p-6" aria-live="polite" aria-atomic="true">
          <h3 className="text-lg font-medium text-accent-strong">{formContent.successTitle}</h3>
          <p id={preparedStatusId} className="mt-2 text-sm text-muted">
            {formContent.successText}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mailtoHref}
              aria-describedby={preparedStatusId}
              className="cta-glow rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
            >
              {formContent.submitLabel}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full border border-border bg-surface/45 px-5 py-2 text-sm font-medium text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
            >
              {copied ? formContent.copiedLabel : formContent.copyLabel}
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
