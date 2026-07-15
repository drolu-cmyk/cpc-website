"use client";

import Image from "next/image";
import { useState } from "react";
import QuoteForm from "./components/QuoteForm";
import ServiceIcon from "./components/ServiceIcon";
import { SERVICES } from "./lib/quote";

type TrackingProperties = Record<string, string | number | boolean | undefined>;

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

function ServiceMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
      <rect x="5" y="7" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M11 17.5 14.5 21 24 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustBadge({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 text-[#0F2942]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#DCE5EC]">
        <ServiceMark />
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-[#64748B]">{text}</span>
      </span>
    </div>
  );
}

export default function CapitalPropertyCare() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string, source = "navigation") => {
    trackEvent("navigation_click", { target: id, source });
    const element = document.getElementById(id);

    if (element) {
      const offset = 80;
      const bodyTop = document.body.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;

      window.scrollTo({
        top: elementTop - bodyTop - offset,
        behavior: "smooth",
      });
    }

    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#1E293B]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
          <button
            type="button"
            className="flex items-center gap-3 text-left"
            onClick={() => {
              trackEvent("navigation_click", { target: "top", source: "logo" });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image src="/logo-optimized.png" alt="Capital Property Care LLC" width={44} height={44} className="h-11 w-11 object-contain" priority />
            <span>
              <span className="block text-xl font-semibold tracking-[-0.5px] text-[#0F2942]">CAPITAL</span>
              <span className="-mt-1 block text-[10px] font-medium tracking-[1.5px] text-[#0F2942]">PROPERTY CARE LLC</span>
            </span>
          </button>

          <div className="hidden items-center gap-9 text-sm font-medium md:flex">
            <button type="button" onClick={() => scrollToSection("services", "desktop-nav")} className="nav-link text-[#334155] hover:text-[#0F2942]">
              Services
            </button>
            <button type="button" onClick={() => scrollToSection("about", "desktop-nav")} className="nav-link text-[#334155] hover:text-[#0F2942]">
              About
            </button>
            <button type="button" onClick={() => scrollToSection("quote", "desktop-nav")} className="nav-link text-[#334155] hover:text-[#0F2942]">
              Request Quote
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("quote", "desktop-cta")}
            className="cta-button hidden rounded-full bg-[#F59E0B] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#D97706] md:block"
          >
            REQUEST A PAINTING QUOTE
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2 text-[#0F2942] md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="flex flex-col gap-4 border-t bg-white px-6 py-6 text-sm font-medium md:hidden">
            <button type="button" onClick={() => scrollToSection("services", "mobile-menu")} className="py-2 text-left text-[#334155]">
              Services
            </button>
            <button type="button" onClick={() => scrollToSection("about", "mobile-menu")} className="py-2 text-left text-[#334155]">
              About
            </button>
            <button type="button" onClick={() => scrollToSection("quote", "mobile-menu")} className="py-2 text-left text-[#334155]">
              Request Quote
            </button>
            <button type="button" onClick={() => scrollToSection("quote", "mobile-menu-cta")} className="cta-button mt-2 w-full rounded-full bg-[#F59E0B] py-3 font-semibold text-white">
              REQUEST A PAINTING QUOTE
            </button>
          </div>
        )}
      </nav>

      <main id="main-content">
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="max-w-[520px]">
              <h1 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-[-1.5px] text-[#0F2942] sm:text-5xl md:text-[56px]">
                Adding Value
                <br />
                to Your Home
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-[#475569] sm:text-xl">
                Capital Property Care LLC provides reliable interior painting services for homeowners who want clean, professional results.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("quote", "hero-cta")}
                className="cta-button inline-flex h-14 w-full items-center justify-center rounded-full bg-[#F59E0B] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#D97706] active:scale-[0.985] sm:w-auto sm:px-8 sm:text-base"
              >
                REQUEST A PAINTING QUOTE
              </button>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <TrustBadge title="Reliable" text="Clear follow-up" />
                <TrustBadge title="Clean Work" text="Respectful setup" />
                <TrustBadge title="Professional Finish" text="Careful details" />
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl shadow-[#0F2942]/10 md:h-[520px] md:aspect-auto">
              <Image
                src="/hero-living-room.jpg"
                alt="Sophisticated contemporary living room with smooth painted walls and detailed trim by Capital Property Care"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover object-[54%_50%]"
              />
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-[#E2E8F0] bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#0F2942]/70">OUR SERVICES</div>
              <h2 className="mb-4 text-3xl font-semibold tracking-[-1px] text-[#0F2942] sm:text-4xl">Interior Painting Services</h2>
              <p className="text-lg text-[#475569]">Clean, detailed interior painting for residential spaces.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {SERVICES.map((service) => (
                <div key={service} className="service-card flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-5 text-center hover:border-[#0F2942]/30">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F2942]">
                    <ServiceIcon service={service} className="h-10 w-10" />
                  </span>
                  <span className="text-[14px] font-bold leading-tight text-[#0F2942]">{service}</span>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-[#475569]">
              Need help with your next painting project?{" "}
              <button type="button" onClick={() => scrollToSection("quote", "services-inline-cta")} className="font-medium text-[#0F2942] underline underline-offset-4 hover:no-underline">
                Request a free quote today.
              </button>
            </p>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid items-center gap-x-12 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-[#0F2942]/10 md:h-[360px] md:aspect-auto">
                <Image
                  src="/staircase.jpg"
                  alt="Elegant interior staircase with white wainscoting and professional paint finish"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover object-[62%_50%]"
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#0F2942]/70">ABOUT US</div>
              <h3 className="mb-6 text-4xl font-semibold leading-tight tracking-[-0.8px] text-[#0F2942]">
                Reliable Interior
                <br />
                Painting Services
              </h3>
              <div className="max-w-[46ch] text-lg leading-relaxed text-[#475569]">
                <p>
                  Capital Property Care LLC focuses on clean workmanship, dependable communication, and professional interior painting services designed to improve the appearance and value of your home.
                </p>
                <p className="mt-4">We work carefully, respect your space, and aim to deliver smooth, consistent results on every project.</p>
              </div>
              <button type="button" onClick={() => scrollToSection("quote", "about-inline-cta")} className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#0F2942]">
                Start your project <span className="transition group-hover:translate-x-0.5">-&gt;</span>
              </button>
            </div>
          </div>
        </section>

        <section id="quote" className="bg-[#0F2942] py-16 text-white md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[2.5px] text-white/70">GET STARTED</div>
              <h2 className="text-4xl font-semibold tracking-[-1px] md:text-5xl">Request a Painting Quote</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-white/80">Fill out the form and we&apos;ll respond as soon as possible to discuss your project.</p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#0A1F32] pb-10 pt-14 text-sm text-white/90">
        <div className="mx-auto grid max-w-7xl gap-y-12 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo-footer.png" alt="Capital Property Care" width={36} height={36} className="h-9 w-9 object-contain brightness-0 invert opacity-85" />
              <div>
                <div className="text-lg font-semibold tracking-tight text-white">CAPITAL PROPERTY CARE LLC</div>
                <div className="-mt-0.5 text-[10px] tracking-widest text-white/50">INTERIOR PAINTING | ALBANY NY</div>
              </div>
            </div>
            <p className="max-w-xs leading-relaxed text-white/70">Professional interior painting with clean, reliable service. Adding value to homes across the Capital Region.</p>
          </div>

          <div className="text-sm md:col-span-4">
            <div className="mb-4 text-xs font-semibold tracking-wider text-white">CONTACT</div>
            <div className="space-y-2 text-white/80">
              <a href="tel:8383865620" onClick={() => trackEvent("phone_click", { location: "footer" })} className="block transition hover:text-white">
                (838) 386-5620
              </a>
              <a href="mailto:edwardjones@capitalpropertycare.com" onClick={() => trackEvent("email_click", { location: "footer" })} className="block transition hover:text-white">
                edwardjones@capitalpropertycare.com
              </a>
              <div className="pt-1">Serving Albany &amp; the Capital Region, NY</div>
            </div>
          </div>

          <div className="text-sm md:col-span-3">
            <div className="mb-4 text-xs font-semibold tracking-wider text-white">TRUSTED &amp; INSURED</div>
            <div className="space-y-1.5 text-white/70">
              <div>Fully Insured</div>
              <div>Albany County, NY</div>
              <div>Professional Workmanship Guaranteed</div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 px-6 pt-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-xs text-white/55 md:flex-row md:text-left">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <Image src="/logo-footer.png" alt="Capital Property Care LLC" width={24} height={24} className="h-6 w-6 object-contain brightness-0 invert opacity-70" />
              </span>
              <span>&copy; {new Date().getFullYear()} Capital Property Care LLC. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
