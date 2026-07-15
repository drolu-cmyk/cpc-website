export const SERVICES = [
  "Walls",
  "Ceilings",
  "Trim & Baseboards",
  "Crown Molding",
  "Doors",
  "Accent Walls",
  "Small Drywall Repair",
] as const;

export type ServiceName = (typeof SERVICES)[number];

export interface QuoteRequestPayload {
  fullName: string;
  phone: string;
  zipCode: string;
  email: string;
  services: string[];
  details: string;
  company?: string;
}

export function normalizeQuotePayload(payload: unknown): QuoteRequestPayload | null {
  if (!payload || typeof payload !== "object") return null;

  const input = payload as Partial<Record<keyof QuoteRequestPayload, unknown>>;

  return {
    fullName: typeof input.fullName === "string" ? input.fullName.trim() : "",
    phone: typeof input.phone === "string" ? input.phone.trim() : "",
    zipCode: typeof input.zipCode === "string" ? input.zipCode.trim() : "",
    email: typeof input.email === "string" ? input.email.trim() : "",
    services: Array.isArray(input.services)
      ? input.services.filter((service): service is string => typeof service === "string")
      : [],
    details: typeof input.details === "string" ? input.details.trim() : "",
    company: typeof input.company === "string" ? input.company.trim() : "",
  };
}

export function validateQuotePayload(payload: QuoteRequestPayload) {
  const errors: Partial<Record<keyof QuoteRequestPayload, string>> = {};

  if (!payload.fullName) errors.fullName = "Full name is required";
  if (!payload.phone) errors.phone = "Phone number is required";
  if (!payload.zipCode) {
    errors.zipCode = "Project zip code is required";
  } else if (!/^\d{5}$/.test(payload.zipCode)) {
    errors.zipCode = "Enter a 5-digit zip code";
  }
  if (!payload.email) {
    errors.email = "Email address is required";
  } else if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    errors.email = "Please enter a valid email";
  }
  if (payload.services.length === 0) {
    errors.services = "Please select at least one service";
  } else if (payload.services.some((service) => !SERVICES.includes(service as ServiceName))) {
    errors.services = "Select services from the list";
  }

  return errors;
}
