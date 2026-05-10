"use client";

import TiltCard from "@/components/TiltCard";
import { useGameSounds } from "@/hooks/useGameSounds";

export default function BountyBoard() {
  const { playHover, playSelect } = useGameSounds();

  const bounties = [
    {
      name: "Arthur Morgan",
      reward: "$5,000",
      status: "WANTED: DEAD OR ALIVE",
      crimes: "Murder, Robbery, Train Heist",
      image: "https://www.transparenttextures.com/patterns/dark-leather.png"
    },
    {
      name: "Dutch van der Linde",
      reward: "$10,000",
      status: "WANTED: DEAD OR ALIVE",
      crimes: "Treason, Murder, Conspiracy",
      image: "https://www.transparenttextures.com/patterns/black-scales.png"
    },
    {
      name: "Micah Bell",
      reward: "$2,500",
      status: "WANTED",
      crimes: "Murder, Extortion",
      image: "https://www.transparenttextures.com/patterns/black-felt.png"
    },
    {
      name: "Sadie Adler",
      reward: "$1,500",
      status: "WANTED",
      crimes: "Bounty Hunting Violations",
      image: "https://www.transparenttextures.com/patterns/black-twine.png"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 lg:px-12 relative font-serif">
      {/* Texture background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#cda873] drop-shadow-lg">BOUNTY BOARD</h1>
          <div className="w-48 h-1 bg-[#8b0000] mx-auto mt-6 opacity-80"></div>
          <p className="mt-6 text-xl tracking-widest uppercase text-white/60 font-sans">High value targets. Approach with caution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
          {bounties.map((bounty, i) => (
            <TiltCard 
              key={i} 
              onHoverStart={playHover} 
              onClick={playSelect}
              className="h-[450px] bg-[#111] border-[#cda873]/30 p-6 flex flex-col group relative"
            >
              {/* Background texture for the card */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url(${bounty.image})` }}
              ></div>
              
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-[#cda873]/40 p-4">
                <h2 className="text-[#8b0000] text-xl font-bold tracking-widest text-center mb-4">{bounty.status}</h2>
                <div className="w-full aspect-square bg-[#050505] border border-white/10 mb-6 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5"></div>
                  <span className="text-white/20 font-sans tracking-widest uppercase text-sm">NO PHOTO</span>
                </div>
                <h3 className="text-3xl font-bold text-center text-[#e5cc98] leading-tight">{bounty.name}</h3>
                <p className="text-center text-[#cda873] font-sans font-bold text-xl mt-4">{bounty.reward}</p>
                <p className="text-center text-white/50 text-xs font-sans mt-4 uppercase tracking-wider">{bounty.crimes}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </main>
  );
}
