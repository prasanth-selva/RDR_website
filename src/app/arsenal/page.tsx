"use client";

import WeaponCarousel from "@/components/WeaponCarousel";

export default function ArsenalPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-12 px-6 lg:px-12 relative font-serif overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#1a0505] to-transparent opacity-50 pointer-events-none"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-6xl md:text-7xl font-bold text-center text-[#cda873] drop-shadow-md mb-2">THE GUNSMITH</h1>
        <p className="text-center text-white/50 font-sans tracking-[0.3em] uppercase text-sm mb-16">
          Inspect your arsenal
        </p>

        <WeaponCarousel />
      </div>
    </main>
  );
}
