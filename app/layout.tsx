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
  title: "Capital Property Care LLC | Interior Painting Albany NY",
  description: "Reliable interior painting services for homeowners in Albany, NY and the Capital Region. Clean work, professional finishes that add value to your home.",
  icons: {
    icon: "/logo-optimized.webp",
  },
  openGraph: {
    title: "Capital Property Care LLC | Interior Painting Albany NY",
    description: "Adding value to your home with clean, professional interior painting. Request your free quote today.",
    images: [{ url: "/hero-living-room.webp" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
