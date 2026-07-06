const services = [
  'Interior walls and ceilings',
  'Trim, baseboards, and doors',
  'Crown molding and detail work',
  'Rental turnovers and refreshes',
  'Pre-sale painting preparation',
  'Accent walls and touch-ups',
];

const steps = [
  ['01', 'Walk the space', 'We review the rooms, surfaces, timing, access, and finish expectations before work begins.'],
  ['02', 'Protect and prepare', 'Floors, furniture, trim, and edges are protected. Minor wall issues are addressed before paint goes on.'],
  ['03', 'Paint and review', 'Clean lines, steady communication, and a final walkthrough before the project is wrapped.'],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#172033]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Capital Property Care home">
            <img src="/logo-optimized.webp" alt="Capital Property Care LLC" className="h-11 w-11 object-contain" />
            <div className="leading-none">
              <div className="text-xl font-semibold tracking-tight text-[#0f2942]">CAPITAL</div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-[#0f2942]">PROPERTY CARE LLC</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="hover:text-[#0f2942]">Services</a>
            <a href="#process" className="hover:text-[#0f2942]">Process</a>
            <a href="#quote" className="hover:text-[#0f2942]">Quote</a>
          </nav>
          <a href="#quote" className="rounded-full bg-[#f59e0b] px-5 py-3 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-[#d97706] md:text-sm">
            REQUEST QUOTE
          </a>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d97706]">Interior Painting • Albany NY</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#0f2942] md:text-7xl">
            Adding Value to Your Home
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
            Capital Property Care LLC provides clean, reliable interior painting for homeowners, landlords, realtors, and property managers across Albany and the Capital Region.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className="rounded-full bg-[#f59e0b] px-7 py-4 text-center font-semibold text-white shadow-sm hover:bg-[#d97706]">Request a Painting Quote</a>
            <a href="tel:8383865620" className="rounded-full border border-[#0f2942]/20 bg-white px-7 py-4 text-center font-semibold text-[#0f2942] hover:border-[#0f2942]/40">Call (838) 386-5620</a>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-white p-4 shadow-sm"><strong className="block text-[#0f2942]">Insured</strong>Workmanship</div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><strong className="block text-[#0f2942]">Clean</strong>Job sites</div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><strong className="block text-[#0f2942]">Local</strong>Albany NY</div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-300/60">
          <img src="/hero-living-room.webp" alt="Freshly painted living room interior" className="h-[420px] w-full rounded-[1.5rem] object-cover md:h-[520px]" />
        </div>
      </section>

      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#d97706]">Services</p>
            <h2 className="text-4xl font-semibold tracking-tight text-[#0f2942] md:text-5xl">Clean work. Professional finish. No confusion.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div key={service} className="rounded-3xl border border-slate-200 bg-[#f7f9fc] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f2942] text-lg font-bold text-white">✓</div>
                <h3 className="text-lg font-semibold text-[#0f2942]">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] bg-white p-3 shadow-xl">
            <img src="/hero-living-room.webp" alt="Interior painting finish detail" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#d97706]">Process</p>
            <h2 className="mb-8 text-4xl font-semibold tracking-tight text-[#0f2942]">A clear process from first call to final walkthrough.</h2>
            <div className="space-y-4">
              {steps.map(([num, title, text]) => (
                <div key={num} className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="mb-2 text-sm font-bold text-[#d97706]">{num}</div>
                  <h3 className="mb-2 text-2xl font-semibold text-[#0f2942]">{title}</h3>
                  <p className="leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="bg-[#0f2942] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f59e0b]">Request a Quote</p>
            <h2 className="mb-5 text-4xl font-semibold tracking-tight md:text-5xl">Tell us what needs painting.</h2>
            <p className="max-w-lg text-lg leading-8 text-white/75">
              Share the rooms, timeline, zip code, and any details that matter. Edward will follow up to discuss the job and next steps.
            </p>
            <div className="mt-8 space-y-3 text-white/80">
              <p><strong className="text-white">Phone:</strong> <a href="tel:8383865620">(838) 386-5620</a></p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:edwardjones@capitalpropertycare.com">edwardjones@capitalpropertycare.com</a></p>
              <p><strong className="text-white">Area:</strong> Albany and the Capital Region, NY</p>
            </div>
          </div>
          <form action="mailto:edwardjones@capitalpropertycare.com" method="post" encType="text/plain" className="rounded-[2rem] bg-white p-6 text-[#172033] shadow-2xl md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Full name" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2942]" />
              <input name="phone" required placeholder="Phone" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2942]" />
              <input name="email" type="email" required placeholder="Email" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2942]" />
              <input name="zip" required placeholder="Project zip code" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2942]" />
            </div>
            <textarea name="details" rows={5} placeholder="Rooms, timeline, colors, and project details" className="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0f2942]" />
            <button className="mt-5 w-full rounded-full bg-[#f59e0b] px-8 py-4 font-semibold text-white hover:bg-[#d97706]">Submit Request</button>
            <p className="mt-4 text-center text-xs text-slate-500">A mail window will open so you can send the request directly.</p>
          </form>
        </div>
      </section>

      <footer className="bg-[#0a1f32] px-5 py-10 text-sm text-white/70 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-optimized.webp" alt="Capital Property Care" className="h-10 w-10 brightness-0 invert" />
            <div>
              <div className="font-semibold text-white">Capital Property Care LLC</div>
              <div>Interior Painting • Albany NY</div>
            </div>
          </div>
          <p>© 2026 Capital Property Care LLC. Fully insured. Albany County, NY.</p>
        </div>
      </footer>
    </main>
  );
}
