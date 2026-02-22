"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteContent } from "@/content/siteContent";
import { copyToClipboard } from "@/lib/clipboard";
import { buildMailto } from "@/lib/mailto";

type BookingFormProps = {
  preselectedType?: string;
  className?: string;
};

type BookingFormState = {
  fullName: string;
  email: string;
  sessionType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type BookingErrors = Partial<Record<keyof BookingFormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookingForm({ preselectedType, className }: BookingFormProps) {
  const booking = siteContent.sessions.booking;
  const statusMessageId = "booking-status-message";

  const sessionOptions = useMemo(
    () => [
      { value: "group", label: booking.sessionTypeGroupLabel },
      ...siteContent.sessions.individual.packages.map((pkg) => ({ value: pkg.id, label: pkg.title })),
    ],
    [booking.sessionTypeGroupLabel],
  );

  const initialSessionType =
    preselectedType && sessionOptions.some((option) => option.value === preselectedType)
      ? preselectedType
      : "";

  const [form, setForm] = useState<BookingFormState>({
    fullName: "",
    email: "",
    sessionType: initialSessionType,
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<BookingErrors>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const mailBody = useMemo(() => {
    const bodyLabels = booking.mailBodyLabels;
    const normalizedMessage = form.message.trim() || booking.emptyValue;
    const selectedOption = sessionOptions.find((option) => option.value === form.sessionType);

    return [
      `${bodyLabels.fullName}: ${form.fullName}`,
      `${bodyLabels.email}: ${form.email}`,
      `${bodyLabels.sessionType}: ${selectedOption?.label ?? form.sessionType}`,
      `${bodyLabels.preferredDate}: ${form.preferredDate || booking.emptyValue}`,
      `${bodyLabels.preferredTime}: ${form.preferredTime || booking.emptyValue}`,
      "",
      `${bodyLabels.message}:`,
      normalizedMessage || booking.emptyValue,
    ].join("\n");
  }, [booking.emptyValue, booking.mailBodyLabels, form, sessionOptions]);

  const mailtoHref = useMemo(
    () =>
      buildMailto({
        to: siteContent.contact.email,
        subject: `${booking.mailSubjectPrefix} — ${form.sessionType || booking.sessionTypeGroupLabel}`,
        body: mailBody,
      }),
    [booking.mailSubjectPrefix, booking.sessionTypeGroupLabel, form.sessionType, mailBody],
  );

  const validate = () => {
    const nextErrors: BookingErrors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = booking.validation.fullNameRequired;
    } else if (form.fullName.trim().length < 2) {
      nextErrors.fullName = booking.validation.fullNameMin;
    }

    if (!form.email.trim()) {
      nextErrors.email = booking.validation.emailRequired;
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = booking.validation.emailInvalid;
    }

    if (!form.sessionType.trim()) {
      nextErrors.sessionType = booking.validation.sessionTypeRequired;
    }

    if (form.message.length > 1000) {
      nextErrors.message = booking.validation.messageTooLong;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handlePrepare = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      setIsPrepared(false);
      return;
    }

    setIsPrepared(true);
  };

  const copyPreparedText = async () => {
    const copiedSuccessfully = await copyToClipboard(mailBody);
    if (!copiedSuccessfully) {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={className}>
      <form onSubmit={handlePrepare} noValidate className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-muted">
            <span id="booking-fullname-label">{booking.formLabels.fullName}</span>
            <input
              id="booking-fullname"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder={booking.placeholders.fullName}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.fullName)}
              aria-labelledby="booking-fullname-label"
              aria-describedby={errors.fullName ? "booking-fullname-error" : undefined}
            />
            {errors.fullName && (
              <p id="booking-fullname-error" className="mt-1 text-xs text-accent">
                {errors.fullName}
              </p>
            )}
          </label>

          <label className="text-sm text-muted">
            <span id="booking-email-label">{booking.formLabels.email}</span>
            <input
              id="booking-email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={booking.placeholders.email}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.email)}
              aria-labelledby="booking-email-label"
              aria-describedby={errors.email ? "booking-email-error" : undefined}
            />
            {errors.email && (
              <p id="booking-email-error" className="mt-1 text-xs text-accent">
                {errors.email}
              </p>
            )}
          </label>

          <label className="text-sm text-muted md:col-span-2">
            <span id="booking-type-label">{booking.formLabels.sessionType}</span>
            <select
              id="booking-session-type"
              value={form.sessionType}
              onChange={(event) => updateField("sessionType", event.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.sessionType)}
              aria-labelledby="booking-type-label"
              aria-describedby={errors.sessionType ? "booking-type-error" : undefined}
            >
              <option value="">{booking.placeholders.sessionType}</option>
              {sessionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.sessionType && (
              <p id="booking-type-error" className="mt-1 text-xs text-accent">
                {errors.sessionType}
              </p>
            )}
          </label>

          <label className="text-sm text-muted">
            <span id="booking-date-label">{booking.formLabels.preferredDate}</span>
            <input
              id="booking-date"
              type="date"
              value={form.preferredDate}
              onChange={(event) => updateField("preferredDate", event.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-labelledby="booking-date-label"
            />
          </label>

          <label className="text-sm text-muted">
            <span id="booking-time-label">{booking.formLabels.preferredTime}</span>
            <input
              id="booking-time"
              type="time"
              value={form.preferredTime}
              onChange={(event) => updateField("preferredTime", event.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-labelledby="booking-time-label"
            />
          </label>

          <label className="text-sm text-muted md:col-span-2">
            <span id="booking-message-label">{booking.formLabels.message}</span>
            <textarea
              id="booking-message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              maxLength={1000}
              placeholder={booking.placeholders.message}
              className="mt-1 w-full rounded-lg border border-border bg-surface/45 px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
              aria-invalid={Boolean(errors.message)}
              aria-labelledby="booking-message-label"
              aria-describedby={errors.message ? "booking-message-error" : undefined}
            />
            {errors.message && (
              <p id="booking-message-error" className="mt-1 text-xs text-accent">
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
            {booking.submitLabel}
          </button>
        </div>
      </form>

      {isPrepared && (
        <GlassCard className="mt-4 rounded-2xl" aria-live="polite" aria-atomic="true">
          <h3 className="text-lg font-medium text-accent-strong">{booking.successTitle}</h3>
          <p id={statusMessageId} className="mt-2 text-sm text-muted">
            {booking.successText}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mailtoHref}
              aria-describedby={statusMessageId}
              className="cta-glow rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
            >
              {booking.openEmailLabel}
            </a>
            <button
              type="button"
              onClick={copyPreparedText}
              className="rounded-full border border-border bg-surface/45 px-5 py-2 text-sm font-medium text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
            >
              {copied ? booking.copiedLabel : booking.copyEmailTextLabel}
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}