import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import CharacterSelection from "@/components/CharacterSelection";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <ScrollytellingCanvas />
      
      {/* Game Interactive Selection */}
      <CharacterSelection />
      
      {/* Additional Game Features */}
      <FeaturesSection />

      {/* Cinematic Footer */}
      <footer className="py-24 text-center border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif text-white/40 mb-6 tracking-widest">CYBERBOTS</h2>
          <p className="text-[#cda873]/60 tracking-[0.2em] text-xs font-sans uppercase mb-8">
            Developed by Cyberbots | Founded by Prasanth
          </p>
          <p className="text-white/20 tracking-wider text-xs font-sans uppercase">
            &copy; {new Date().getFullYear()} Red Dead Redemption Experience. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
