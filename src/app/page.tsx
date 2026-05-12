import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import TechDomainSelector from "@/components/CharacterSelection";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      {/* Cinematic scrollytelling hero */}
      <ScrollytellingCanvas />

      {/* Tech domain interactive selector */}
      <TechDomainSelector />

      {/* "What I Build" features */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="py-24 text-center border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <div className="w-12 h-12 bg-[#cda873] text-black font-black text-lg flex items-center justify-center mx-auto mb-6">
            CB
          </div>
          <h2 className="text-2xl font-serif text-white/50 mb-3 tracking-widest">CYBERBOTS</h2>
          <p className="text-[#cda873]/70 tracking-[0.2em] text-xs font-sans uppercase mb-6">
            Founded by Prasanth
          </p>
          <p className="text-white/20 tracking-wider text-xs font-sans uppercase">
            &copy; {new Date().getFullYear()} Prasanth S. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
