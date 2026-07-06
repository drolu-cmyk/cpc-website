const services = [
  'Interior walls and ceilings',
  'Trim, baseboards, and doors',
  'Rental turnovers and refreshes',
  'Pre-sale paint preparation',
  'Small drywall repair',
  'Accent walls and touch-ups',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo-optimized.webp" alt="Capital Property Care LLC" className="h-11 w-11 object-contain" />
            <div>
              <div className="text-xl font-semibold tracking-tight text-[#0F2942]">CAPITAL</div>
              <div className="-mt-1 text-[10px] font-medium tracking-[1.5px] text-[#0F2942]">PROPERTY CARE LLC</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#services" className="hover:text-[#0F2942]">Services</a>
            <a href="#process" className="hover:text-[#0F2942]">Process</a>
            <a href="#quote" className="hover:text-[#0F2942]">Request Quote</a>
          </nav>
          <a href="#quote" className="rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#D97706]">
            REQUEST A PAINTING QUOTE
          </a>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-[#F59E0B]">INTERIOR PAINTING · ALBANY NY</p>
          <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-[-1.5px] text-[#0F2942] md:text-6xl">
            Adding Value<br />to Your Home
          </h1>
          <p className="mb-8 max-w-xl text-xl leading-relaxed text-slate-600">
            Capital Property Care LLC provides reliable interior painting for homeowners, landlords, realtors, and property managers across Albany and the Capital Region.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className="rounded-full bg-[#F59E0B] px-8 py-4 text-center font-semibold text-white shadow-sm hover:bg-[#D97706]">Request a Quote</a>
            <a href="tel:8383865620" className="rounded-full border border-[#0F2942]/20 px-8 py-4 text-center font-semibold text-[#0F2942] hover:bg-white">Call (838) 386-5620</a>
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
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div key={service} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#0F2942] text-white">✓</div>
                <h3 className="text-lg font-semibold text-[#0F2942]">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ['01', 'Walkthrough', 'We review the rooms, surfaces, timeline, and finish expectations.'],
            ['02', 'Preparation', 'We protect floors and furniture, patch minor areas, and prepare surfaces properly.'],
            ['03', 'Finish', 'We paint clean lines, review the work, and leave the space ready to use.'],
          ].map(([num, title, text]) => (
            <div key={num} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-5 text-sm font-semibold text-[#F59E0B]">{num}</div>
              <h3 className="mb-3 text-2xl font-semibold text-[#0F2942]">{title}</h3>
              <p className="leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="bg-[#0F2942] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#F59E0B]">REQUEST A QUOTE</p>
            <h2 className="mb-5 text-4xl font-semibold tracking-tight">Tell us what needs painting.</h2>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/75">
              Share the rooms, timeline, and zip code. Edward will follow up to discuss the project and next steps.
            </p>
            <div className="space-y-2 text-white/80">
              <p><strong className="text-white">Phone:</strong> (838) 386-5620</p>
              <p><strong className="text-white">Email:</strong> edwardjones@capitalpropertycare.com</p>
              <p><strong className="text-white">Area:</strong> Albany and the Capital Region, NY</p>
            </div>
          </div>
          <form action="mailto:edwardjones@capitalpropertycare.com" method="post" encType="text/plain" className="rounded-3xl bg-white p-8 text-[#1E293B] shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Full name" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="phone" required placeholder="Phone" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="zip" required placeholder="Project zip code" className="rounded-xl border border-slate-300 px-4 py-3" />
            </div>
            <textarea name="details" rows={5} placeholder="Rooms, timeline, and project details" className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3" />
            <button className="mt-5 w-full rounded-full bg-[#F59E0B] px-8 py-4 font-semibold text-white hover:bg-[#D97706]">SUBMIT REQUEST</button>
          </form>
        </div>
      </section>

      <footer className="bg-[#0A1F32] px-6 py-10 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} Capital Property Care LLC. Fully insured. Albany County, NY.</p>
      </footer>
    </main>
  );
}
