import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Capital Property Care LLC",
  description: "Terms of Service for Capital Property Care LLC website use and interior painting quote requests.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F2942]">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm font-semibold text-[#D97706] hover:text-[#B45309]">
          Back to Home
        </Link>
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E2E8F0] md:p-12">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#64748B]">Last updated July 8, 2026</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-1px] md:text-5xl">Terms of Service</h1>

          <div className="mt-8 space-y-7 text-base leading-7 text-[#334155]">
            <p>
              These Terms of Service govern use of the Capital Property Care LLC website and the submission of interior painting quote requests. By using this website, you agree to these terms.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Website Use</h2>
              <p className="mt-2">
                This website provides information about Capital Property Care LLC interior painting services and allows visitors to request project communication. You agree to use the website only for lawful purposes and to provide accurate information when submitting a quote request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Quote Requests</h2>
              <p className="mt-2">
                Submitting a quote request does not create a service agreement, appointment, or guarantee of availability. Project scope, scheduling, pricing, payment terms, and service details are confirmed separately in writing or direct communication with Capital Property Care LLC.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Service Information</h2>
              <p className="mt-2">
                Website content is intended to describe available interior painting services in general terms. Images, descriptions, and examples are used to communicate service quality and style; final project results depend on the property condition, preparation needs, selected materials, colors, surfaces, and agreed project scope.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Intellectual Property</h2>
              <p className="mt-2">
                Website text, layout, branding, graphics, and other content are owned by or licensed to Capital Property Care LLC and may not be copied, reproduced, or reused for commercial purposes without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Website Availability</h2>
              <p className="mt-2">
                Capital Property Care LLC may update, modify, suspend, or discontinue any part of the website at any time. The website is provided for business information and communication, and availability may vary due to maintenance, updates, or technical conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Limitation of Liability</h2>
              <p className="mt-2">
                To the fullest extent permitted by law, Capital Property Care LLC is not responsible for indirect, incidental, consequential, or punitive damages arising from use of the website or reliance on website content. This limitation does not alter obligations under a separate written service agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Contact</h2>
              <p className="mt-2">
                For questions about these terms, contact Capital Property Care LLC at{" "}
                <a href="mailto:edwardjones@capitalpropertycare.com" className="font-semibold text-[#0F2942] underline underline-offset-4">
                  edwardjones@capitalpropertycare.com
                </a>{" "}
                or <a href="tel:8383865620" className="font-semibold text-[#0F2942] underline underline-offset-4">(838) 386-5620</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
