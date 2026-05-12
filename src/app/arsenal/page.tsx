"use client";

import CertCarousel from "@/components/CertCarousel";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#0a0800] to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-sans tracking-[0.4em] text-[#cda873] uppercase mb-4 font-bold">Verified & Badged</p>
          <h1 className="text-5xl md:text-7xl font-bold text-center text-white drop-shadow-md mb-4">
            CERTIFICATIONS
          </h1>
          <div className="w-24 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-60" />
          <p className="text-center text-white/50 font-sans tracking-[0.2em] uppercase text-sm">
            Recognized expertise across AI, web, and engineering.
          </p>
        </div>

        <CertCarousel />
      </div>
    </main>
  );
}
