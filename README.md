# Capital Property Care LLC Website

Modern, responsive website for Capital Property Care LLC, an interior painting business serving Albany, NY and the Capital Region.

## What's Included

- Responsive one-page marketing site
- Mobile hamburger menu
- Accessible quote request form with validation and error recovery
- Server-backed quote request API
- Resend email delivery support
- Google Analytics event hooks when configured
- SEO metadata, Open Graph, sitemap, robots, privacy policy, and terms page

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development or add these values in Vercel project settings.

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Capital Property Care <quotes@capitalpropertycare.com>"
QUOTE_TO_EMAIL=edwardjones@capitalpropertycare.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `QUOTE_TO_EMAIL` are required for online quote requests. `NEXT_PUBLIC_GA_ID` is optional and enables Google Analytics events.

## Quote Request Flow

The quote form posts to `app/api/quote/route.ts`.

The API:

- validates required fields on the server
- rejects invalid services
- includes a honeypot field for basic spam filtering
- rate limits repeated requests from the same forwarded IP
- sends the request through Resend
- returns a clear error so the UI can show phone and email fallback options

## Analytics Events

When `NEXT_PUBLIC_GA_ID` is configured, the frontend can emit these events:

- `navigation_click`
- `quote_form_start`
- `quote_service_toggle`
- `quote_validation_error`
- `quote_submit_attempt`
- `quote_submit_success`
- `quote_submit_error`
- `phone_click`
- `email_click`

## Deployment

Vercel is the recommended host.

1. Import the GitHub repository into Vercel.
2. Add the required environment variables.
3. Deploy.
4. Submit a test quote request and confirm it arrives at `QUOTE_TO_EMAIL`.

## Project Structure

```text
cpc-website/
+-- app/
|   +-- api/quote/route.ts
|   +-- lib/quote.ts
|   +-- layout.tsx
|   +-- page.tsx
|   +-- globals.css
+-- public/
+-- .env.example
+-- README.md
+-- package.json
```
