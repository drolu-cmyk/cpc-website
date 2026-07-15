"use client";

import { useRef, useState } from "react";
import { SERVICES, type QuoteRequestPayload, validateQuotePayload } from "../lib/quote";

type QuoteFormData = Omit<QuoteRequestPayload, "company">;
type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;
type TextFieldName = Exclude<keyof QuoteFormData, "services">;
type TrackingProperties = Record<string, string | number | boolean | undefined>;

const emptyForm: QuoteFormData = {
  fullName: "",
  phone: "",
  zipCode: "",
  email: "",
  services: [],
  details: "",
};

function trackEvent(name: string, properties: TrackingProperties = {}) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, properties?: TrackingProperties) => void;
  };

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", name, properties);
    return;
  }

  analyticsWindow.dataLayer?.push({ event: name, ...properties });
}

function serviceInputId(service: string) {
  return `quote-service-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function buildQuoteMailtoHref(data: QuoteFormData) {
  const subject = encodeURIComponent(`Painting quote request from ${data.fullName || "website visitor"}`);
  const body = encodeURIComponent(
    [
      "Capital Property Care LLC Quote Request",
      "",
      `Full Name: ${data.fullName || "Not provided"}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Email: ${data.email || "Not provided"}`,
      `Project Zip Code: ${data.zipCode || "Not provided"}`,
      `Services Needed: ${data.services.length > 0 ? data.services.join(", ") : "Not selected"}`,
      "",
      "Project Details:",
      data.details.trim() || "Not provided",
    ].join("\n"),
  );

  return `mailto:edwardjones@capitalpropertycare.com?subject=${subject}&body=${body}`;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>(emptyForm);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const fieldRefs = useRef<Partial<Record<TextFieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const servicesRef = useRef<HTMLFieldSetElement | null>(null);

  const markFormStarted = () => {
    if (hasStartedForm) return;
    setHasStartedForm(true);
    trackEvent("quote_form_start");
  };

  const focusFirstError = (newErrors: QuoteFormErrors) => {
    const firstError = Object.keys(newErrors)[0] as keyof QuoteFormData | undefined;
    if (!firstError) return;

    window.requestAnimationFrame(() => {
      if (firstError === "services") {
        servicesRef.current?.focus();
        return;
      }

      fieldRefs.current[firstError as TextFieldName]?.focus();
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    markFormStarted();
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitError("");

    if (errors[name as keyof QuoteFormData]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleServiceToggle = (service: string) => {
    markFormStarted();
    setFormData((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((selectedService) => selectedService !== service)
        : [...current.services, service],
    }));

    if (errors.services) {
      setErrors((current) => ({ ...current, services: undefined }));
    }

    setSubmitError("");
    trackEvent("quote_service_toggle", { service });
  };

  const validateForm = () => {
    const newErrors = validateQuotePayload(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      focusFirstError(newErrors);
      trackEvent("quote_validation_error", { fields: Object.keys(newErrors).join(",") });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError("");
    trackEvent("quote_submit_attempt");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, company: "" }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "We could not send your quote request right now.");
      }

      setIsSuccess(true);
      trackEvent("quote_submit_success", { services: formData.services.join(",") });
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not send your quote request right now.";
      setSubmitError(`${message} You can still call or email Capital Property Care directly.`);
      trackEvent("quote_submit_error", { message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setErrors({});
    setIsSuccess(false);
    setSubmitError("");
    setHasStartedForm(false);
  };

  if (isSuccess) {
    return (
      <div className="success-card rounded-3xl bg-white p-10 text-center text-[#1E293B] shadow-2xl md:p-14">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-3 text-3xl font-semibold tracking-tight text-[#0F2942]">Quote request sent</h3>
        <p className="mx-auto max-w-sm text-lg text-[#475569]">Thanks for reaching out. Capital Property Care LLC received your request and will follow up as soon as possible.</p>
        <button type="button" onClick={resetForm} className="mt-8 h-12 rounded-full border border-[#0F2942]/20 px-8 font-medium text-[#0F2942] transition hover:bg-[#F8FAFC]">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-8 text-[#1E293B] shadow-2xl md:p-10">
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Please correct the highlighted fields before sending your quote request.
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-company">Company</label>
        <input id="quote-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="quote-full-name" className="mb-1.5 block text-sm font-semibold text-[#334155]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-full-name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            ref={(node) => {
              fieldRefs.current.fullName = node;
            }}
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "quote-full-name-error" : undefined}
            className={`form-input h-12 w-full rounded-xl border px-4 ${errors.fullName ? "border-red-400" : "border-[#CBD5E1]"} bg-white`}
            placeholder="Jane Doe"
          />
          {errors.fullName && <p id="quote-full-name-error" className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-semibold text-[#334155]">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            ref={(node) => {
              fieldRefs.current.phone = node;
            }}
            required
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            className={`form-input h-12 w-full rounded-xl border px-4 ${errors.phone ? "border-red-400" : "border-[#CBD5E1]"} bg-white`}
            placeholder="(518) 555-0123"
          />
          {errors.phone && <p id="quote-phone-error" className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="quote-zip-code" className="mb-1.5 block text-sm font-semibold text-[#334155]">
            Project Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-zip-code"
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            ref={(node) => {
              fieldRefs.current.zipCode = node;
            }}
            required
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            aria-invalid={Boolean(errors.zipCode)}
            aria-describedby={errors.zipCode ? "quote-zip-code-error" : undefined}
            className={`form-input h-12 w-full rounded-xl border px-4 ${errors.zipCode ? "border-red-400" : "border-[#CBD5E1]"} bg-white`}
            placeholder="12203"
          />
          {errors.zipCode && <p id="quote-zip-code-error" className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}
        </div>

        <div>
          <label htmlFor="quote-email" className="mb-1.5 block text-sm font-semibold text-[#334155]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            ref={(node) => {
              fieldRefs.current.email = node;
            }}
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            className={`form-input h-12 w-full rounded-xl border px-4 ${errors.email ? "border-red-400" : "border-[#CBD5E1]"} bg-white`}
            placeholder="you@email.com"
          />
          {errors.email && <p id="quote-email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <fieldset
        ref={servicesRef}
        tabIndex={-1}
        className="mt-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2942] focus-visible:ring-offset-4"
        aria-invalid={Boolean(errors.services)}
        aria-describedby={errors.services ? "quote-services-error" : "quote-services-hint"}
      >
        <legend className="mb-3 block text-sm font-semibold text-[#334155]">
          Services Needed <span className="text-red-500">*</span> <span id="quote-services-hint" className="font-normal text-[#64748B]">(select all that apply)</span>
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SERVICES.map((service) => {
            const inputId = serviceInputId(service);
            const isSelected = formData.services.includes(service);

            return (
              <label
                key={service}
                htmlFor={inputId}
                className={`checkbox-label flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-[13px] transition-all ${isSelected ? "border-[#0F2942] bg-[#F0F4F8]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleServiceToggle(service)}
                  aria-describedby={errors.services ? "quote-services-error" : undefined}
                  className="h-4 w-4 rounded accent-[#0F2942]"
                />
                <span className="select-none text-sm font-medium">{service}</span>
              </label>
            );
          })}
        </div>
        {errors.services && <p id="quote-services-error" className="mt-1.5 text-xs text-red-500">{errors.services}</p>}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="quote-details" className="mb-1.5 block text-sm font-semibold text-[#334155]">
          Project Details <span className="text-[#94A3B8]">(optional)</span>
        </label>
        <textarea
          id="quote-details"
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          ref={(node) => {
            fieldRefs.current.details = node;
          }}
          rows={4}
          className="form-input min-h-[110px] w-full resize-y rounded-2xl border border-[#CBD5E1] px-4 py-3"
          placeholder="Tell us about your project - e.g. number of rooms, timeline, colors, or any specific concerns..."
        />
      </div>

      {submitError && (
        <div role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          <p>{submitError}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={buildQuoteMailtoHref(formData)} className="font-semibold underline underline-offset-4">
              Email this request instead
            </a>
            <a href="tel:8383865620" className="font-semibold underline underline-offset-4">
              Call (838) 386-5620
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] text-base font-semibold text-white shadow-sm transition-all hover:bg-[#D97706] active:scale-[0.985] disabled:bg-[#F59E0B]/70"
      >
        {isSubmitting ? "SENDING REQUEST..." : "SEND QUOTE REQUEST"}
      </button>
    </form>
  );
}
