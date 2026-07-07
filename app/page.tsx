"use client";
import { useState } from "react";

type FormData = { fullName: string; phone: string; zipCode: string; email: string; services: string[]; details: string };

const services = ["Walls", "Ceilings", "Trim & Baseboards", "Crown Molding", "Doors", "Accent Walls", "Small Drywall Repair"];
const cards = [
  ["Walls and ceilings", "Smooth coverage, clean cut lines, and a fresh finish for lived-in rooms."],
  ["Trim, doors, and baseboards", "Detailed work around the places that make a room feel finished."],
  ["Rental and pre-sale refresh", "Practical painting for turnovers, listings, and property value improvements."],
  ["Small drywall repair", "Minor patching and surface preparation before paint goes on."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({ fullName: "", phone: "", zipCode: "", email: "", services: [], details: "" });

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const toggle = (item: string) => {
    setForm((p) => ({ ...p, services: p.services.includes(item) ? p.services.filter((x) => x !== item) : [...p.services, item] }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.zipCode.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.services.length === 0) {
      setError("Please complete name, phone, email, zip code, and at least one service.");
      return;
    }
    const subject = encodeURIComponent(`Painting quote request from ${form.fullName}`);
    const body = encodeURIComponent(`Name: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nZip Code: ${form.zipCode}\nServices: ${form.services.join(", ")}\n\nProject Details:\n${form.details || "Not provided"}`);
    window.location.href = `mailto:edwardjones@capitalpropertycare.com?subject=${subject}&body=${body}`;
    setSent(true);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left" aria-label="Capital Property Care home">
            <img src="/logo-optimized.webp" alt="Capital Property Care LLC" className="h-11 w-11 object-contain" />
            <span>
              <span className="block text-xl font-semibold tracking-[-.5px] text-[#0F2942]">CAPITAL</span>
              <span className="block text-[10px] font-medium tracking-[1.5px] text-[#0F2942]">PROPERTY CARE LLC</span>
            </span>
          </button>
          <div className="hidden items-center gap-9 text-sm font-medium md:flex">
            <button onClick={() => go("services")} className="nav-link">Services</button>
            <button onClick={() => go("about")} className="nav-link">About</button>
            <button onClick={() => go("quote")} className="nav-link">Request Quote</button>
          </div>
          <button onClick={() => go("quote")} className="cta hidden rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#D97706] md:block">REQUEST A PAINTING QUOTE</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" aria-label="Toggle menu">{menuOpen ? "Close" : "Menu"}</button>
        </div>
        {menuOpen && (
          <div className="flex flex-col gap-4 border-t bg-white px-6 py-6 md:hidden">
            <button onClick={() => go("services")} className="text-left">Services</button>
            <button onClick={() => go("about")} className="text-left">About</button>
            <button onClick={() => go("quote")} className="rounded-full bg-[#F59E0B] py-3 font-semibold text-white">REQUEST A PAINTING QUOTE</button>
          </div>
        )}
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.24em] text-[#D97706]">Interior Painting • Albany NY</p>
          <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-[-1.5px] text-[#0F2942] md:text-[56px]">Adding Value<br />to Your Home</h1>
          <p className="mb-8 max-w-xl text-xl leading-relaxed text-[#475569]">Capital Property Care LLC provides reliable interior painting services for homeowners who want clean, professional results.</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={() => go("quote")} className="cta rounded-full bg-[#F59E0B] px-8 py-4 font-semibold text-white hover:bg-[#D97706]">REQUEST A PAINTING QUOTE</button>
            <button onClick={() => go("services")} className="rounded-full border border-[#CBD5E1] bg-white px-8 py-4 font-medium">Explore Services</button>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-sm font-medium text-[#0F2942]"><span>Reliable</span><span>Clean Work</span><span>Professional Finish</span></div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl md:h-[520px]">
          <img src="/hero-living-room.webp" alt="Freshly painted modern living room" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      <section id="services" className="border-y bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#0F2942]/70">Our Services</p>
          <h2 className="mb-4 text-4xl font-semibold text-[#0F2942]">Interior Painting Services</h2>
          <p className="mb-12 text-lg text-[#475569]">Clean, detailed interior painting for residential spaces.</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {services.map((s) => <div key={s} className="service-card rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F5F9] text-[#0F2942]">✓</div><div className="font-semibold text-[#0F2942]">{s}</div></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-xl"><img src="/hero-living-room.webp" alt="Interior paint finish detail" className="absolute inset-0 h-full w-full object-cover" /></div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#0F2942]/70">About Us</p>
          <h3 className="mb-6 text-4xl font-semibold leading-tight text-[#0F2942]">Reliable Interior<br />Painting Services</h3>
          <p className="text-lg leading-8 text-[#475569]">Capital Property Care LLC focuses on clean workmanship, dependable communication, and professional interior painting services designed to improve the appearance and value of your home.</p>
          <p className="mt-4 text-lg leading-8 text-[#475569]">We work carefully, respect your space, and aim to deliver smooth, consistent results on every project.</p>
          <button onClick={() => go("quote")} className="mt-8 font-semibold text-[#0F2942]">Start your project →</button>
        </div>
      </section>

      <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><div className="grid gap-6 md:grid-cols-4">{cards.map(([title, text]) => <article key={title} className="rounded-3xl bg-[#F8FAFC] p-6 shadow-sm"><h3 className="mb-3 text-xl font-semibold text-[#0F2942]">{title}</h3><p className="leading-7 text-[#64748B]">{text}</p></article>)}</div></div></section>

      <section id="quote" className="bg-[#0F2942] py-20 text-white">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center"><p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-white/70">Get Started</p><h2 className="mb-4 text-4xl font-semibold">Request a Painting Quote</h2><p className="mx-auto max-w-md text-lg text-white/80">Fill out the form and it will prepare an email to Edward with the project details.</p></div>
          {!sent ? <form onSubmit={submit} className="rounded-3xl bg-white p-8 text-[#1E293B] shadow-2xl"><div className="grid gap-5 md:grid-cols-2"><input className="form-input rounded-xl border px-4 py-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /><input className="form-input rounded-xl border px-4 py-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><input className="form-input rounded-xl border px-4 py-3" placeholder="Zip code" value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} /><input className="form-input rounded-xl border px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{services.map((s) => <label key={s} className="flex items-center gap-2 rounded-xl border p-3 text-sm"><input type="checkbox" checked={form.services.includes(s)} onChange={() => toggle(s)} />{s}</label>)}</div><textarea className="form-input mt-6 min-h-[110px] w-full rounded-2xl border px-4 py-3" placeholder="Project details" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<button className="mt-6 w-full rounded-2xl bg-[#F59E0B] py-4 font-semibold text-white">SUBMIT REQUEST</button><p className="mt-4 text-center text-xs text-[#64748B]">You can also call (838) 386-5620.</p></form> : <div className="rounded-3xl bg-white p-10 text-center text-[#1E293B]"><div className="mb-5 text-4xl text-green-600">✓</div><h3 className="text-3xl font-semibold text-[#0F2942]">Request prepared.</h3><p className="mt-3 text-[#475569]">Your email client should open with the quote request details.</p><button onClick={() => setSent(false)} className="mt-8 rounded-full border px-8 py-3 font-semibold text-[#0F2942]">Edit request</button></div>}
        </div>
      </section>

      <footer className="bg-[#0A1F32] px-6 py-12 text-sm text-white/80"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><div className="mb-4 flex items-center gap-3"><img src="/logo-optimized.webp" alt="Capital Property Care" className="h-9 w-9 brightness-0 invert" /><strong className="text-white">CAPITAL PROPERTY CARE LLC</strong></div><p>Professional interior painting with clean, reliable service across the Capital Region.</p></div><div><strong className="mb-3 block text-white">Contact</strong><a href="tel:8383865620" className="block">(838) 386-5620</a><a href="mailto:edwardjones@capitalpropertycare.com" className="block">edwardjones@capitalpropertycare.com</a></div><div><strong className="mb-3 block text-white">Trusted & Insured</strong><p>Fully Insured • Albany County, NY</p><p className="mt-4 text-white/50">© {new Date().getFullYear()} Capital Property Care LLC.</p></div></div></footer>
    </main>
  );
}
