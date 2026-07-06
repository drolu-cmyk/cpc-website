"use client";

import { useState } from "react";

type FormData = {
  fullName: string;
  phone: string;
  zipCode: string;
  email: string;
  details: string;
  services: string[];
};

const services = ["Walls", "Ceilings", "Trim & Baseboards", "Crown Molding", "Doors", "Accent Walls", "Small Drywall Repair"];
const serviceCards = [
  ["Interior walls and ceilings", "Clean coverage, smooth edges, and a finish that makes the room feel renewed."],
  ["Trim, doors, and baseboards", "Sharper lines around the details that buyers, tenants, and guests notice first."],
  ["Rental and pre-sale refresh", "Fast, practical painting for turnovers, listings, and property value improvements."],
  ["Small drywall repair", "Minor patching and preparation before paint so the final result looks complete."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({ fullName: "", phone: "", zipCode: "", email: "", details: "", services: [] });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service) ? prev.services.filter((item) => item !== service) : [...prev.services, service],
    }));
    setErrors((prev) => ({ ...prev, services: undefined }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!formData.zipCode.trim()) nextErrors.zipCode = "Project zip code is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = "A valid email is required";
    if (formData.services.length === 0) nextErrors.services = "Select at least one service";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Quote request", formData);
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button onClick={() => scrollTo("top")} className="flex items-center gap-3 text-left" aria-label="Go to homepage">
            <img src="/logo-optimized.webp" alt="Capital Property Care LLC" className="h-11 w-11 object-contain" />
            <span>
              <span className="block text-xl font-semibold tracking-tight text-[#0F2942]">CAPITAL</span>
              <span className="-mt-1 block text-[10px] font-medium tracking-[1.5px] text-[#0F2942]">PROPERTY CARE LLC</span>
            </span>
          </button>

          <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
            <button onClick={() => scrollTo("services")} className="nav-link text-slate-700">Services</button>
            <button onClick={() => scrollTo("about")} className="nav-link text-slate-700">About</button>
            <button onClick={() => scrollTo("quote")} className="nav-link text-slate-700">Request Quote</button>
          </nav>

          <button onClick={() => scrollTo("quote")} className="hidden rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D97706] md:block">
            REQUEST A PAINTING QUOTE
          </button>

          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 text-[#0F2942] md:hidden" aria-label="Open navigation menu">
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-left text-sm font-semibold text-slate-700">
              <button onClick={() => scrollTo("services")} className="text-left">Services</button>
              <button onClick={() => scrollTo("about")} className="text-left">About</button>
              <button onClick={() => scrollTo("quote")} className="rounded-full bg-[#F59E0B] px-6 py-3 text-white">Request Quote</button>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-[#F59E0B]">INTERIOR PAINTING · ALBANY NY</p>
          <h1 className="mb-6 text-5xl font-semibold leading-[1.04] tracking-[-1.5px] text-[#0F2942] md:text-6xl">Adding Value<br />to Your Home</h1>
          <p className="mb-8 max-w-xl text-xl leading-relaxed text-slate-600">Capital Property Care LLC provides reliable interior painting for homeowners, landlords, realtors, and property managers across Albany and the Capital Region.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollTo("quote")} className="rounded-full bg-[#F59E0B] px-8 py-4 text-center font-semibold text-white shadow-sm transition hover:bg-[#D97706]">Request a Quote</button>
            <a href="tel:8383865620" className="rounded-full border border-[#0F2942]/20 px-8 py-4 text-center font-semibold text-[#0F2942] transition hover:bg-white">Call (838) 386-5620</a>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-3 shadow-xl">
          <img src="/hero-living-room.webp" alt="Freshly painted living room" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
        </div>
      </section>

      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#F59E0B]">SERVICES</p>
            <h2 className="text-4xl font-semibold tracking-tight text-[#0F2942]">Clean work. Professional finish. No drama.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {serviceCards.map(([title, text]) => (
              <article key={title} className="card-hover rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#0F2942] text-white">✓</div>
                <h3 className="mb-2 text-lg font-semibold text-[#0F2942]">{title}</h3>
                <p className="text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-3 shadow-xl">
          <img src="/hero-living-room.webp" alt="Interior staircase and trim painting" className="h-[440px] w-full rounded-[1.5rem] object-cover" />
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#F59E0B]">ABOUT CPC</p>
          <h2 className="mb-5 text-4xl font-semibold tracking-tight text-[#0F2942]">Built for homeowners who care about the final detail.</h2>
          <p className="mb-5 text-lg leading-8 text-slate-600">Painting is not just color on a wall. It changes how a room feels, how a property shows, and how much confidence people have in the space.</p>
          <p className="text-lg leading-8 text-slate-600">Capital Property Care LLC focuses on clean preparation, careful edges, responsible communication, and a finish that looks professional after the tools are packed away.</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#F59E0B]">PROCESS</p>
            <h2 className="text-4xl font-semibold tracking-tight text-[#0F2942]">A simple process that keeps the job clear.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[["01", "Walkthrough", "We review the rooms, surfaces, timeline, and finish expectations."], ["02", "Preparation", "We protect floors and furniture, patch minor areas, and prepare surfaces properly."], ["03", "Finish", "We paint clean lines, review the work, and leave the space ready to use."]].map(([num, title, text]) => (
              <article key={num} className="rounded-3xl bg-[#F8FAFC] p-8 shadow-sm">
                <p className="mb-5 text-sm font-semibold text-[#F59E0B]">{num}</p>
                <h3 className="mb-3 text-2xl font-semibold text-[#0F2942]">{title}</h3>
                <p className="leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-[#0F2942] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#F59E0B]">REQUEST A QUOTE</p>
            <h2 className="mb-5 text-4xl font-semibold tracking-tight">Tell us what needs painting.</h2>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/75">Share the rooms, timeline, and zip code. Edward will follow up to discuss the project and next steps.</p>
            <div className="space-y-2 text-white/80">
              <p><strong className="text-white">Phone:</strong> (838) 386-5620</p>
              <p><strong className="text-white">Email:</strong> edwardjones@capitalpropertycare.com</p>
              <p><strong className="text-white">Area:</strong> Albany and the Capital Region, NY</p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-3xl bg-white p-10 text-center text-[#1E293B] shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div>
              <h3 className="mb-3 text-3xl font-semibold text-[#0F2942]">Request received.</h3>
              <p className="mx-auto max-w-sm text-slate-600">Thank you. We will contact you within 24 hours to discuss the painting project.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 rounded-full border border-slate-300 px-6 py-3 font-semibold text-[#0F2942]">Send another request</button>
            </div>
          ) : (
            <form onSubmit={submitForm} className="rounded-3xl bg-white p-8 text-[#1E293B] shadow-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1 block text-sm font-semibold">Full name</span><input value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="input w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
                <label className="block"><span className="mb-1 block text-sm font-semibold">Phone</span><input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="input w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
                <label className="block"><span className="mb-1 block text-sm font-semibold">Email</span><input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="input w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
                <label className="block"><span className="mb-1 block text-sm font-semibold">Project zip code</span><input value={formData.zipCode} onChange={(e) => updateField("zipCode", e.target.value)} className="input w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
              </div>

              <fieldset className="mt-5">
                <legend className="mb-3 text-sm font-semibold">Services needed</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {services.map((service) => (
                    <label key={service} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm hover:border-[#0F2942]/40">
                      <input type="checkbox" checked={formData.services.includes(service)} onChange={() => toggleService(service)} className="h-4 w-4" />
                      {service}
                    </label>
                  ))}
                </div>
                {errors.services && <p className="mt-2 text-sm text-red-600">{errors.services}</p>}
              </fieldset>

              <label className="mt-5 block"><span className="mb-1 block text-sm font-semibold">Project details</span><textarea rows={5} value={formData.details} onChange={(e) => updateField("details", e.target.value)} placeholder="Rooms, timeline, and details" className="input w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
              {(errors.fullName || errors.phone || errors.email || errors.zipCode) && <p className="mt-4 text-sm text-red-600">Please complete name, phone, email, and zip code.</p>}
              <button type="submit" className="mt-6 w-full rounded-2xl bg-[#F59E0B] px-8 py-4 font-semibold text-white transition hover:bg-[#D97706]">SUBMIT REQUEST</button>
              <p className="mt-4 text-center text-xs text-slate-500">We typically respond within 24 hours.</p>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#0A1F32] px-6 py-12 text-white/75">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3"><img src="/logo-optimized.webp" alt="Capital Property Care" className="h-10 w-10 brightness-0 invert" /><strong className="text-white">CAPITAL PROPERTY CARE LLC</strong></div>
            <p className="max-w-sm leading-7">Professional interior painting with clean, reliable service across the Capital Region.</p>
          </div>
          <div><strong className="mb-3 block text-white">Contact</strong><a href="tel:8383865620" className="block hover:text-white">(838) 386-5620</a><a href="mailto:edwardjones@capitalpropertycare.com" className="block hover:text-white">edwardjones@capitalpropertycare.com</a></div>
          <div><strong className="mb-3 block text-white">Service Area</strong><p>Albany, Schenectady, Troy, Latham, and the Capital Region.</p><p className="mt-4 text-sm text-white/50">© {new Date().getFullYear()} Capital Property Care LLC. Fully insured.</p></div>
        </div>
      </footer>
    </main>
  );
}
