"use client";

import CertCarousel from "@/components/CertCarousel";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">Certifications</p>
          <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
            CERTIFICATIONS
          </h1>
          <div className="w-20 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-70" />
          <p className="text-center text-white/60 font-sans tracking-wide text-sm">
            Verified training and exams.
          </p>
        </div>

        <CertCarousel />
      </div>
    </main>
  );
}
