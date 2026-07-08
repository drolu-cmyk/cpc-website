"use client";

import Image from 'next/image';
import React, { useState } from 'react';

// Type for form data
interface FormData {
  fullName: string;
  phone: string;
  zipCode: string;
  email: string;
  services: string[];
  details: string;
}

const servicesList = [
  "Walls",
  "Ceilings", 
  "Trim & Baseboards",
  "Crown Molding",
  "Doors",
  "Accent Walls",
  "Small Drywall Repair"
];

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="18" {...iconStroke} />
      <path d="m16 24.5 5.2 5.2L32.5 18" {...iconStroke} />
    </svg>
  );
}

function PaintRollerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="11" y="10" width="24" height="8" rx="2" {...iconStroke} />
      <path d="M35 14h4a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H26a3 3 0 0 0-3 3v4" {...iconStroke} />
      <rect x="18" y="30" width="10" height="12" rx="2" {...iconStroke} />
      <path d="M13 20h18" {...iconStroke} />
    </svg>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M24 6 39 11v11c0 9.5-5.9 16.6-15 20-9.1-3.4-15-10.5-15-20V11L24 6Z" {...iconStroke} />
      <path d="m17 24 4.5 4.5L31 18.5" {...iconStroke} />
    </svg>
  );
}

function WallsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="9" y="9" width="30" height="24" rx="2" {...iconStroke} />
      <path d="M9 19h30M19 9v24M29 9v24" {...iconStroke} />
      <path d="M15 39h18" {...iconStroke} />
    </svg>
  );
}

function CeilingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M8 12h32M12 18h24" {...iconStroke} />
      <path d="M15 29h16a4 4 0 0 0 4-4v-1" {...iconStroke} />
      <rect x="11" y="26" width="18" height="7" rx="2" {...iconStroke} />
      <path d="M20 33v8" {...iconStroke} />
    </svg>
  );
}

function TrimBaseboardsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M13 9v28h25" {...iconStroke} />
      <path d="M18 14v18h19M13 37h26M19 31l-6 6" {...iconStroke} />
      <path d="M24 37v-5M31 37v-5" {...iconStroke} />
    </svg>
  );
}

function CrownMoldingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M8 13h32M11 18h26M15 23h18" {...iconStroke} />
      <path d="M15 23 31 39M23 23l14 14M32 23l7 7" {...iconStroke} />
    </svg>
  );
}

function DoorsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path d="M15 41V8h20v33" {...iconStroke} />
      <path d="M20 41V13h11v28M15 41h22" {...iconStroke} />
      <circle cx="29" cy="26" r="1.4" fill="currentColor" />
    </svg>
  );
}

function AccentWallsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="9" y="9" width="22" height="30" rx="2" {...iconStroke} />
      <path d="M31 17h5a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H24a3 3 0 0 0-3 3v3" {...iconStroke} />
      <rect x="17" y="33" width="8" height="8" rx="2" {...iconStroke} />
      <path d="M14 15h12M14 21h12" {...iconStroke} />
    </svg>
  );
}

function DrywallRepairIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect x="9" y="10" width="18" height="20" rx="2" {...iconStroke} />
      <path d="M14 17h8M14 23h5" {...iconStroke} />
      <path d="m28 32 9-9 4 4-9 9-7 2 3-6Z" {...iconStroke} />
      <path d="m35 25 4 4" {...iconStroke} />
    </svg>
  );
}

const serviceIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "Walls": WallsIcon,
  "Ceilings": CeilingsIcon,
  "Trim & Baseboards": TrimBaseboardsIcon,
  "Crown Molding": CrownMoldingIcon,
  "Doors": DoorsIcon,
  "Accent Walls": AccentWallsIcon,
  "Small Drywall Repair": DrywallRepairIcon
};

export default function CapitalPropertyCare() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    zipCode: '',
    email: '',
    services: [],
    details: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const currentServices = prev.services;
      const newServices = currentServices.includes(service)
        ? currentServices.filter(s => s !== service)
        : [...currentServices, service];
      
      return { ...prev, services: newServices };
    });
    
    // Clear services error if any selected
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Project zip code is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const subject = encodeURIComponent(`Painting quote request from ${formData.fullName}`);
    const body = encodeURIComponent(
      [
        "Capital Property Care LLC Quote Request",
        "",
        `Full Name: ${formData.fullName}`,
        `Phone: ${formData.phone}`,
        `Email: ${formData.email}`,
        `Project Zip Code: ${formData.zipCode}`,
        `Services Needed: ${formData.services.join(", ")}`,
        "",
        "Project Details:",
        formData.details.trim() || "Not provided"
      ].join("\n")
    );

    window.location.href = `mailto:edwardjones@capitalpropertycare.com?subject=${subject}&body=${body}`;
    setIsSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      zipCode: '',
      email: '',
      services: [],
      details: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Image
              src="/logo-optimized.png"
              alt="Capital Property Care LLC" 
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
            <div>
              <div className="font-semibold text-xl tracking-[-0.5px] text-[#0F2942]">CAPITAL</div>
              <div className="text-[10px] font-medium text-[#0F2942] -mt-1 tracking-[1.5px]">PROPERTY CARE LLC</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9 text-sm font-medium">
            <button onClick={() => scrollToSection('services')} className="nav-link text-[#334155] hover:text-[#0F2942]">Services</button>
            <button onClick={() => scrollToSection('about')} className="nav-link text-[#334155] hover:text-[#0F2942]">About</button>
            <button onClick={() => scrollToSection('quote')} className="nav-link text-[#334155] hover:text-[#0F2942]">Request Quote</button>
          </div>

          {/* Desktop CTA */}
          <button 
            onClick={() => scrollToSection('quote')}
            className="hidden md:block cta-button px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-full shadow-sm"
          >
            REQUEST A PAINTING QUOTE
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#0F2942]"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white px-6 py-6 flex flex-col gap-4 text-sm font-medium">
            <button onClick={() => scrollToSection('services')} className="text-left py-2 text-[#334155]">Services</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2 text-[#334155]">About</button>
            <button onClick={() => scrollToSection('quote')} className="text-left py-2 text-[#334155]">Request Quote</button>
            <button 
              onClick={() => scrollToSection('quote')}
              className="mt-2 w-full cta-button py-3 bg-[#F59E0B] text-white font-semibold rounded-full"
            >
              REQUEST A PAINTING QUOTE
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-[520px] min-w-0">
            <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-[1.05] font-semibold tracking-[-1.5px] text-[#0F2942] mb-6">
              Adding Value<br />to Your Home
            </h1>
            <p className="text-lg sm:text-xl text-[#475569] mb-8 leading-relaxed">
              Capital Property Care LLC provides reliable interior painting services for homeowners who want clean, professional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('quote')}
                className="cta-button inline-flex w-full sm:w-auto items-center justify-center px-5 sm:px-8 h-14 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-sm sm:text-base rounded-full shadow-sm active:scale-[0.985] transition-all"
              >
                REQUEST A PAINTING QUOTE
              </button>
            </div>

            {/* Trust Bar */}
            <div className="mt-10 grid gap-4 text-sm sm:flex sm:flex-wrap sm:gap-x-8">
              <div className="flex items-center gap-2 text-[#0F2942]">
                <CheckCircleIcon className="h-8 w-8 flex-shrink-0" />
                <span className="font-semibold">Reliable</span>
              </div>
              <div className="flex items-center gap-2 text-[#0F2942]">
                <PaintRollerIcon className="h-8 w-8 flex-shrink-0" />
                <span className="font-semibold">Clean Work</span>
              </div>
              <div className="flex items-center gap-2 text-[#0F2942]">
                <ShieldCheckIcon className="h-8 w-8 flex-shrink-0" />
                <span className="font-semibold">Professional Finish</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0F2942]/10 aspect-[16/10] md:aspect-auto md:h-[520px]">
            <Image
              src="/hero-living-room.jpg"
              alt="Sophisticated contemporary living room with smooth painted walls and detailed trim by Capital Property Care" 
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="absolute inset-0 h-full w-full object-cover object-[54%_50%]"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white py-20 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-12">
            <div className="uppercase tracking-[2px] text-xs font-semibold text-[#0F2942]/70 mb-3">OUR SERVICES</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-1px] text-[#0F2942] mb-4">Interior Painting Services</h2>
            <p className="text-lg text-[#475569]">Clean, detailed interior painting for residential spaces.</p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {servicesList.map((service, index) => {
              const ServiceIcon = serviceIcons[service];
              return (
                <div 
                  key={index} 
                  className="service-card group flex min-h-[150px] flex-col items-center justify-center text-center p-5 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#0F2942]/30"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F2942] transition-colors group-hover:bg-[#EEF4F8]">
                    <ServiceIcon className="h-10 w-10" />
                  </div>
                  <div className="font-bold text-[#0F2942] text-[14px] leading-tight">{service}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#475569]">
              Need help with your next painting project?{" "}
              <button onClick={() => scrollToSection('quote')} className="font-medium text-[#0F2942] underline underline-offset-4 hover:no-underline">
                Request a free quote today.
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-10 items-center">
          {/* Left: Staircase image matching mockup */}
          <div className="md:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#0F2942]/10 aspect-[4/3] md:aspect-auto md:h-[360px]">
              <Image
                src="/staircase.jpg"
                alt="Elegant interior staircase with white wainscoting and professional paint finish" 
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover object-[62%_50%]"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-7">
            <div className="uppercase tracking-[2px] text-xs font-semibold text-[#0F2942]/70 mb-3">ABOUT US</div>
            <h3 className="text-4xl font-semibold tracking-[-0.8px] text-[#0F2942] mb-6 leading-tight">
              Reliable Interior<br />Painting Services
            </h3>
            
            <div className="prose prose-lg text-[#475569] max-w-[46ch]">
              <p>
                Capital Property Care LLC focuses on clean workmanship, dependable communication, 
                and professional interior painting services designed to improve the appearance and value of your home.
              </p>
              <p className="mt-4">
                We work carefully, respect your space, and aim to deliver smooth, consistent results on every project.
              </p>
            </div>

            <button 
              onClick={() => scrollToSection('quote')}
              className="mt-8 inline-flex items-center gap-2 text-[#0F2942] font-semibold group"
            >
              Start your project 
              <span className="group-hover:translate-x-0.5 transition">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="bg-[#0F2942] py-16 md:py-20 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="uppercase tracking-[2.5px] text-xs font-semibold text-white/70 mb-3">GET STARTED</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-1px]">Request a Painting Quote</h2>
            <p className="mt-4 text-lg text-white/80 max-w-md mx-auto">
              Fill out the form and we&apos;ll respond as soon as possible to discuss your project.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl text-[#1E293B]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-[#334155]">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`form-input w-full h-12 px-4 rounded-xl border ${errors.fullName ? 'border-red-400' : 'border-[#CBD5E1]'} bg-white`}
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-[#334155]">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input w-full h-12 px-4 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-[#CBD5E1]'} bg-white`}
                    placeholder="(518) 555-0123"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-[#334155]">Project Zip Code <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`form-input w-full h-12 px-4 rounded-xl border ${errors.zipCode ? 'border-red-400' : 'border-[#CBD5E1]'} bg-white`}
                    placeholder="12203"
                    maxLength={5}
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-[#334155]">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input w-full h-12 px-4 rounded-xl border ${errors.email ? 'border-red-400' : 'border-[#CBD5E1]'} bg-white`}
                    placeholder="you@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Services Checkboxes - Improved UX */}
              <div className="mt-6">
                <label className="block text-sm font-semibold mb-3 text-[#334155]">
                  Services Needed <span className="text-red-500">*</span> <span className="font-normal text-[#64748B]">(select all that apply)</span>
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {servicesList.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <label 
                        key={service}
                        className={`checkbox-label flex items-center gap-3 px-4 py-[13px] rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-[#0F2942] bg-[#F0F4F8]' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 accent-[#0F2942] rounded"
                        />
                        <span className="text-sm font-medium select-none">{service}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.services && <p className="text-red-500 text-xs mt-1.5">{errors.services}</p>}
              </div>

              {/* Project Details */}
              <div className="mt-6">
                <label className="block text-sm font-semibold mb-1.5 text-[#334155]">Project Details <span className="text-[#94A3B8]">(optional)</span></label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input w-full px-4 py-3 rounded-2xl border border-[#CBD5E1] resize-y min-h-[110px]"
                  placeholder="Tell us about your project — e.g. number of rooms, timeline, colors, or any specific concerns..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-8 w-full h-14 bg-[#F59E0B] hover:bg-[#D97706] disabled:bg-[#F59E0B]/70 text-white font-semibold text-base rounded-2xl flex items-center justify-center gap-2 active:scale-[0.985] transition-all shadow-sm"
              >
                EMAIL QUOTE REQUEST
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="success-card bg-white rounded-3xl p-10 md:p-14 text-center shadow-2xl">
              <div className="mx-auto w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-[#0F2942] tracking-tight mb-3">Email draft opened</h3>
              <p className="text-[#475569] text-lg max-w-sm mx-auto">
                Your quote request email is addressed to Capital Property Care LLC. Send it from your email app to complete your request.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={resetForm}
                  className="px-8 h-12 rounded-full border border-[#0F2942]/20 text-[#0F2942] font-medium hover:bg-[#F8FAFC] transition"
                >
                  Submit Another Request
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 h-12 rounded-full bg-[#0F2942] text-white font-medium"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A1F32] text-white/90 pt-14 pb-10 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-y-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo-footer.png" alt="Capital Property Care" width={36} height={36} className="h-9 w-9 object-contain brightness-0 invert opacity-85" />
              <div>
                <div className="font-semibold tracking-tight text-lg text-white">CAPITAL PROPERTY CARE LLC</div>
                <div className="text-[10px] text-white/50 -mt-0.5 tracking-widest">INTERIOR PAINTING | ALBANY NY</div>
              </div>
            </div>
            <p className="max-w-xs text-white/70 leading-relaxed">
              Professional interior painting with clean, reliable service. Adding value to homes across the Capital Region.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 text-sm">
            <div className="font-semibold text-white mb-4 tracking-wider text-xs">CONTACT</div>
            <div className="space-y-2 text-white/80">
              <a href="tel:8383865620" className="block hover:text-white transition">(838) 386-5620</a>
              <a href="mailto:edwardjones@capitalpropertycare.com" className="block hover:text-white transition">edwardjones@capitalpropertycare.com</a>
              <div className="pt-1">Serving Albany &amp; the Capital Region, NY</div>
            </div>
          </div>

          {/* Trust */}
          <div className="md:col-span-3 text-sm">
            <div className="font-semibold text-white mb-4 tracking-wider text-xs">TRUSTED &amp; INSURED</div>
            <div className="text-white/70 space-y-1.5">
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
              <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
