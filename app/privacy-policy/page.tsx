import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Capital Property Care LLC",
  description: "Privacy Policy for Capital Property Care LLC interior painting quote requests and website visitors.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F2942]">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm font-semibold text-[#D97706] hover:text-[#B45309]">
          Back to Home
        </Link>
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E2E8F0] md:p-12">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#64748B]">Last updated July 8, 2026</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-1px] md:text-5xl">Privacy Policy</h1>

          <div className="mt-8 space-y-7 text-base leading-7 text-[#334155]">
            <p>
              Capital Property Care LLC respects the privacy of homeowners, prospects, and website visitors. This policy explains how information is collected, used, protected, and managed when you visit this website or request an interior painting quote.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Information We Collect</h2>
              <p className="mt-2">
                When you request a quote, we collect the information you choose to provide, including your name, phone number, email address, project zip code, requested services, and project details. We may also receive basic website data such as browser type, device type, pages viewed, and general usage information used to maintain website performance and reliability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">How We Use Information</h2>
              <p className="mt-2">
                Information is used to respond to quote requests, communicate about services, schedule project conversations, provide customer support, improve the website, maintain business records, and protect the website from misuse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Sharing Information</h2>
              <p className="mt-2">
                Capital Property Care LLC does not sell personal information. Information may be shared with service providers who support business operations, such as website hosting, email, scheduling, analytics, or security tools. Information may also be shared when required to comply with law, protect rights, prevent fraud, or complete a requested service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Cookies and Website Technology</h2>
              <p className="mt-2">
                The website may use cookies, analytics, and similar technologies to understand site performance, improve navigation, and support secure operation. Browser settings can be used to limit or block cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Data Security and Retention</h2>
              <p className="mt-2">
                Reasonable administrative, technical, and operational safeguards are used to protect information. Quote and communication records are retained for the period needed to respond to requests, manage customer relationships, complete business obligations, and maintain accurate records.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Your Choices</h2>
              <p className="mt-2">
                You may request access, correction, or deletion of personal information by contacting Capital Property Care LLC. You may also ask to stop receiving non-essential communications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0F2942]">Contact</h2>
              <p className="mt-2">
                For privacy questions, contact Capital Property Care LLC at{" "}
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
