import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capital Property Care LLC | Interior Painting Albany NY",
  description: "Professional interior painting services in Albany, NY and the Capital Region. Clean workmanship, reliable communication, and polished finishes that add value to your home.",
  icons: { icon: "/logo-optimized.webp" },
  alternates: { canonical: "https://cpc-website-rho.vercel.app" },
  openGraph: {
    title: "Capital Property Care LLC | Interior Painting Albany NY",
    description: "Clean, professional interior painting for homeowners, landlords, realtors, and property managers across Albany and the Capital Region.",
    url: "https://cpc-website-rho.vercel.app",
    siteName: "Capital Property Care LLC",
    images: [{ url: "/hero-living-room.webp" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capital Property Care LLC | Interior Painting Albany NY",
    description: "Professional interior painting in Albany, NY. Clean work. Reliable results.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Capital Property Care LLC",
    url: "https://cpc-website-rho.vercel.app",
    telephone: "(838) 386-5620",
    email: "edwardjones@capitalpropertycare.com",
    address: { "@type": "PostalAddress", addressLocality: "Albany", addressRegion: "NY", addressCountry: "US" },
    areaServed: ["Albany", "Capital Region", "Schenectady", "Troy", "Latham"],
    description: "Professional interior painting services in Albany, NY and the Capital Region.",
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
