import { NextRequest, NextResponse } from "next/server";
import { normalizeQuotePayload, validateQuotePayload } from "@/app/lib/quote";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const recent = (requestLog.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientKey, recent);
    return true;
  }

  requestLog.set(clientKey, [...recent, now]);
  return false;
}

function formatQuoteText(payload: NonNullable<ReturnType<typeof normalizeQuotePayload>>) {
  return [
    "Capital Property Care LLC Quote Request",
    "",
    `Full Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Project Zip Code: ${payload.zipCode}`,
    `Services Needed: ${payload.services.join(", ")}`,
    "",
    "Project Details:",
    payload.details || "Not provided",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid quote request." }, { status: 400 });
  }

  const payload = normalizeQuotePayload(body);

  if (!payload) {
    return NextResponse.json({ error: "Invalid quote request." }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many quote requests. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  const errors = validateQuotePayload(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Quote request email is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and QUOTE_TO_EMAIL.");
    return NextResponse.json(
      { error: "Online quote requests are temporarily unavailable." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `New CPC painting quote request - ${payload.zipCode}`,
      text: formatQuoteText(payload),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend quote request failed", {
      status: response.status,
      body: errorText.slice(0, 500),
    });

    return NextResponse.json(
      { error: "We could not send your quote request right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
