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
              <button 
                onClick={() => scrollToSection('services')}
                className="inline-flex w-full sm:w-auto items-center justify-center px-5 sm:px-8 h-14 border border-[#CBD5E1] hover:bg-white font-medium text-[#334155] rounded-full transition-all"
              >
                Explore Services
              </button>
            </div>

            {/* Trust Bar */}
            <div className="mt-10 grid gap-4 text-sm sm:flex sm:flex-wrap sm:gap-x-8">
              <div className="flex items-center gap-2 text-[#0F2942]">
                <div className="w-5 h-5 rounded-full bg-[#0F2942] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7" />
                  </svg>
                </div>
                <span className="font-medium">Reliable</span>
              </div>
              <div className="flex items-center gap-2 text-[#0F2942]">
                <div className="w-5 h-5 rounded-full bg-[#0F2942] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2 2 2 0 012 2v2" />
                  </svg>
                </div>
                <span className="font-medium">Clean Work</span>
              </div>
              <div className="flex items-center gap-2 text-[#0F2942]">
                <div className="w-5 h-5 rounded-full bg-[#0F2942] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 8.945 11.922" />
                  </svg>
                </div>
                <span className="font-medium">Professional Finish</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0F2942]/10 aspect-[16/10] md:aspect-auto md:h-[520px]">
            <Image
              src="/hero-living-room.jpg"
              alt="Beautifully painted modern living room interior by Capital Property Care" 
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2942]/10 via-transparent to-transparent" />
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
            {servicesList.map((service, index) => (
              <div 
                key={index} 
                className="service-card group flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#0F2942]/30"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#0F2942]/5 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#0F2942]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div className="font-semibold text-[#0F2942] text-[15px] leading-tight">{service}</div>
              </div>
            ))}
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
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#0F2942]/10 aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src="/staircase.jpg"
                alt="Elegant interior staircase with white wainscoting and professional paint finish" 
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover"
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
                OPEN EMAIL REQUEST
              </button>

              <p className="text-center text-xs text-[#64748B] mt-4">
                This opens a prefilled email to Capital Property Care LLC so you can review and send your request.
              </p>
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
                Review the prefilled email to Capital Property Care LLC, then send it from your email app to request your quote.
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
              <Image src="/logo-optimized.png" alt="Capital Property Care" width={36} height={36} className="h-9 w-9 brightness-0 invert opacity-90" />
              <div>
                <div className="font-semibold tracking-tight text-lg text-white">CAPITAL PROPERTY CARE LLC</div>
                <div className="text-[10px] text-white/50 -mt-0.5 tracking-widest">INTERIOR PAINTING • ALBANY NY</div>
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

          {/* Legal / Trust */}
          <div className="md:col-span-3 text-sm">
            <div className="font-semibold text-white mb-4 tracking-wider text-xs">TRUSTED &amp; INSURED</div>
            <div className="text-white/70 space-y-1.5">
              <div>Fully Insured</div>
              <div>Albany County, NY</div>
              <div className="pt-3 text-[12px] text-white/50">© {new Date().getFullYear()} Capital Property Care LLC.<br />All Rights Reserved.</div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 text-center text-xs text-white/50 max-w-7xl mx-auto px-6">
          Privacy Policy • Terms of Service • Professional Workmanship Guaranteed
        </div>
      </footer>
    </div>
  );
}
