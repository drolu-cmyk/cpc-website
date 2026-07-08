import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cpc-website-rho.vercel.app"),
  title: "Capital Property Care LLC | Interior Painting Albany NY",
  description: "Professional interior painting services in Albany, NY and Capital Region. Clean workmanship, reliable communication, and premium finishes that add value to your home. Request a free quote today.",
  icons: {
    icon: "/logo-optimized.png",
  },
  openGraph: {
    title: "Capital Property Care LLC | Interior Painting Albany NY",
    description: "Adding value to your home with clean, professional interior painting. Serving Albany and the Capital Region.",
    images: [{ url: "/hero-living-room.jpg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capital Property Care LLC | Interior Painting Albany NY",
    description: "Professional interior painting in Albany, NY. Clean work. Reliable results.",
  },
  alternates: {
    canonical: "https://cpc-website-rho.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital Property Care LLC",
    "description": "Professional interior painting services in Albany, NY and the Capital Region. Clean workmanship and reliable results.",
    "url": "https://cpc-website-rho.vercel.app",
    "telephone": "(838) 386-5620",
    "email": "edwardjones@capitalpropertycare.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Albany",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "areaServed": ["Albany", "Capital Region", "Schenectady", "Troy", "Latham"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Painting Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Wall Painting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceiling Painting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trim and Baseboards" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Crown Molding Painting" } }
      ]
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
