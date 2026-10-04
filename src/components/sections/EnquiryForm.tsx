"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { celebrations, enquiryForm as copy, visit } from "@/content/site";
import { track } from "@/lib/track";
import { enquiryLink } from "@/lib/whatsapp";

type Values = {
  name: string;
  phone: string;
  occasion: string;
  date: string;
  guests: string;
  time: string;
  message: string;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", phone: "", occasion: "", date: "", guests: "", time: "", message: "" };
const FIELD_ORDER: Field[] = ["name", "phone", "occasion", "date", "guests", "time", "message"];
const OCCASIONS = [...celebrations.occasions.map((o) => o.name), ...copy.extraOccasions];

// 10 digit Indian mobile, optionally starting with +91, 91 or 0. Spaces and dashes are ignored.
const PHONE = /^(?:\+?91|0)?[6-9]\d{9}$/;

function todayIso() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const noSubscribe = () => () => {};

function validateField(field: Field, v: Values): string | undefined {
  switch (field) {
    case "name":
      return v.name.trim() ? undefined : copy.errors.name;
    case "phone":
      return PHONE.test(v.phone.replace(/[\s-]/g, "")) ? undefined : copy.errors.phone;
    case "occasion":
      return v.occasion ? undefined : copy.errors.occasion;
    case "date":
      if (!v.date) return copy.errors.date;
      return v.date < todayIso() ? copy.errors.datePast : undefined;
    case "guests": {
      if (!v.guests.trim()) return copy.errors.guests;
      const n = Number(v.guests);
      if (!Number.isInteger(n) || n < 1) return copy.errors.guestsMin;
      return n > copy.maxGuests ? copy.errors.guestsMax(copy.maxGuests) : undefined;
    }
    case "time":
      return v.time ? undefined : copy.errors.time;
    default:
      return undefined;
  }
}

function validateAll(v: Values): Errors {
  const errors: Errors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, v);
    if (error) errors[field] = error;
  }
  return errors;
}

export function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [summary, setSummary] = useState("");
  const [sentLink, setSentLink] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);

  // read on the client only, so the date limit uses the visitor's own day
  const minDate = useSyncExternalStore(noSubscribe, todayIso, () => undefined);

  useEffect(() => {
    if (sentLink) confirmRef.current?.focus();
  }, [sentLink]);

  const fieldId = (f: Field) => `${id}-${f}`;
  const errorId = (f: Field) => `${id}-${f}-error`;

  const set = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // once a field has shown an error, re-check it as the visitor fixes it
    if (touched[field] || errors[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, next) }));
    }
  };

  const blur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values) }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    const invalid = FIELD_ORDER.filter((f) => found[f]);
    if (invalid.length > 0) {
      setSummary(copy.errors.summary(invalid.length));
      const first = formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`);
      first?.focus();
      return;
    }
    setSummary("");
    const link = enquiryLink({ ...values, guests: Number(values.guests) });
    window.open(link, "_blank", "noopener,noreferrer");
    track("enquiry_submit", { occasion: values.occasion, guests: Number(values.guests), time: values.time });
    setSentLink(link);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setSentLink(null);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus());
  };

  const inputClass = (field: Field) =>
    clsx(
      "block w-full rounded-[2px] border bg-parchment-light px-4 text-[1.0625rem] text-ink-espresso placeholder:text-ink-terracotta/60",
      "transition-colors focus:border-velvet-red focus:outline-2 focus:outline-offset-2 focus:outline-velvet-red",
      errors[field] ? "border-velvet-red" : "border-ink-terracotta/45 hover:border-ink-terracotta",
    );

  const describedBy = (field: Field, hint?: string) =>
    [hint, errors[field] ? errorId(field) : null].filter(Boolean).join(" ") || undefined;

  if (sentLink) {
    return (
      <div className="theme-parchment paper-grain rounded-[2px] bg-parchment px-6 py-12 text-center text-ink-espresso sm:px-10">
        <h3
          ref={confirmRef}
          tabIndex={-1}
          className="font-display text-2xl text-ink-terracotta focus:outline-none"
        >
          {copy.confirmationHeading}
        </h3>
        <p role="status" className="mx-auto mt-4 max-w-[36ch]">
          {copy.confirmation}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href={sentLink} target="_blank" rel="noopener noreferrer">
            {copy.reopen}
          </Button>
          <Button variant="secondary" onClick={reset}>
            {copy.again}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${id}-title`}
      className="theme-parchment paper-grain rounded-[2px] bg-parchment px-5 py-9 text-ink-espresso [--focus:var(--color-velvet-red)] sm:px-9 sm:py-11"
    >
      <h3 id={`${id}-title`} className="font-display text-2xl text-ink-terracotta">
        {copy.heading}
      </h3>
      <p className="mt-2 text-ink-espresso">{copy.intro}</p>
      <p className="mt-1 text-sm text-ink-terracotta">{copy.requiredNote}</p>

      <p role="alert" className={clsx("text-velvet-red", summary ? "mt-5 font-medium" : "sr-only")}>
        {summary}
      </p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <FieldShell
          className="sm:col-span-2"
          label={copy.fields.name.label}
          htmlFor={fieldId("name")}
          required
          error={errors.name}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete={copy.fields.name.autoComplete}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={clsx(inputClass("name"), "h-12")}
          />
        </FieldShell>

        <FieldShell
          label={copy.fields.phone.label}
          htmlFor={fieldId("phone")}
          required
          hint={copy.fields.phone.hint}
          hintId={`${fieldId("phone")}-hint`}
          error={errors.phone}
          errorId={errorId("phone")}
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete={copy.fields.phone.autoComplete}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", `${fieldId("phone")}-hint`)}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={clsx(inputClass("phone"), "h-12")}
          />
        </FieldShell>

        <FieldShell
          label={copy.fields.occasion.label}
          htmlFor={fieldId("occasion")}
          required
          error={errors.occasion}
          errorId={errorId("occasion")}
        >
          <div className="relative">
            <select
              id={fieldId("occasion")}
              name="occasion"
              required
              aria-invalid={Boolean(errors.occasion)}
              aria-describedby={describedBy("occasion")}
              value={values.occasion}
              onChange={(e) => set("occasion", e.target.value)}
              onBlur={() => blur("occasion")}
              className={clsx(inputClass("occasion"), "h-12 appearance-none pr-10")}
            >
              <option value="" disabled>
                {copy.fields.occasion.placeholder}
              </option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-terracotta"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M6 9.5 12 15.5 18 9.5" />
            </svg>
          </div>
        </FieldShell>

        <FieldShell
          label={copy.fields.date.label}
          htmlFor={fieldId("date")}
          required
          error={errors.date}
          errorId={errorId("date")}
        >
          <input
            id={fieldId("date")}
            name="date"
            type="date"
            min={minDate}
            required
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date")}
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            onBlur={() => blur("date")}
            className={clsx(inputClass("date"), "h-12 [color-scheme:light]")}
          />
        </FieldShell>

        <FieldShell
          label={copy.fields.guests.label}
          htmlFor={fieldId("guests")}
          required
          error={errors.guests}
          errorId={errorId("guests")}
        >
          <input
            id={fieldId("guests")}
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={copy.maxGuests}
            step={1}
            required
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={describedBy("guests")}
            value={values.guests}
            onChange={(e) => set("guests", e.target.value)}
            onBlur={() => blur("guests")}
            className={clsx(inputClass("guests"), "h-12")}
          />
        </FieldShell>

        <fieldset className="sm:col-span-2" aria-describedby={describedBy("time")}>
          <legend className="text-[0.9375rem] font-medium text-ink-espresso">
            {copy.fields.time.label}
            <RequiredMark />
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {copy.fields.time.options.map((option) => (
              <label
                key={option}
                className={clsx(
                  "flex h-12 cursor-pointer items-center justify-center rounded-[2px] border text-[1.0625rem] transition-colors",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-velvet-red",
                  values.time === option
                    ? "border-ink-terracotta bg-ink-terracotta text-parchment"
                    : errors.time
                      ? "border-velvet-red bg-parchment-light"
                      : "border-ink-terracotta/45 bg-parchment-light hover:border-ink-terracotta",
                )}
              >
                <input
                  type="radio"
                  name="time"
                  value={option}
                  required
                  checked={values.time === option}
                  onChange={(e) => {
                    set("time", e.target.value);
                    setErrors((er) => ({ ...er, time: undefined }));
                  }}
                  onBlur={() => blur("time")}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
          <ErrorText id={errorId("time")} error={errors.time} />
        </fieldset>

        <FieldShell
          className="sm:col-span-2"
          label={copy.fields.message.label}
          optional={copy.fields.message.optional}
          htmlFor={fieldId("message")}
        >
          <textarea
            id={fieldId("message")}
            name="message"
            rows={3}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={clsx(inputClass("message"), "resize-y py-3")}
          />
        </FieldShell>
      </div>

      <div className="mt-8 space-y-4">
        <Button type="submit" className="min-h-13 w-full gap-3 sm:w-auto">
          <WhatsAppIcon className="size-5" />
          {copy.submit}
        </Button>
        <p className="text-ink-espresso">
          {visit.callLine.lead}{" "}
          <TrackedLink
            href={visit.callLine.href}
            event="call_click"
            className="rounded-[2px] font-medium text-ink-terracotta underline decoration-ink-terracotta/50 underline-offset-4 hover:decoration-ink-terracotta"
          >
            {visit.callLine.label}
          </TrackedLink>
        </p>
      </div>
    </form>
  );
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="ml-0.5 text-velvet-red">
      *
    </span>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return (
    <p id={id} aria-live="polite" className={clsx("text-[0.9375rem] text-velvet-red", error ? "mt-2" : "sr-only")}>
      {error}
    </p>
  );
}

function FieldShell({
  label,
  htmlFor,
  required,
  optional,
  hint,
  hintId,
  error,
  errorId,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-[0.9375rem] font-medium text-ink-espresso">
        {label}
        {required ? <RequiredMark /> : null}
        {optional ? <span className="ml-2 font-normal text-ink-terracotta">{optional}</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-0.5 text-sm text-ink-terracotta">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {errorId ? <ErrorText id={errorId} error={error} /> : null}
    </div>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
    </svg>
  );
}
