"use client";

import { useState } from "react";
import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";

const CHARACTERS = [
  {
    id: "outlaw",
    name: "The Outlaw",
    role: "Gunslinger",
    description: "A seasoned veteran of the frontier, unmatched with a revolver and quick on the draw.",
    stats: { drawSpeed: 95, accuracy: 80, stamina: 70 },
  },
  {
    id: "bounty",
    name: "Bounty Hunter",
    role: "Tracker",
    description: "Cold, calculated, and relentless. Brings targets in dead or alive, but prefers dead.",
    stats: { drawSpeed: 75, accuracy: 95, stamina: 85 },
  },
  {
    id: "drifter",
    name: "The Drifter",
    role: "Survivalist",
    description: "A mysterious figure who knows the wilderness better than anyone. Excellent with a rifle.",
    stats: { drawSpeed: 60, accuracy: 90, stamina: 100 },
  },
];

export default function CharacterSelection() {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { playHover, playSelect } = useGameSounds();

  const handleHover = (id: string) => {
    if (hoveredId !== id) {
      setHoveredId(id);
      playHover();
    }
  };

  const handleSelect = (char: typeof CHARACTERS[0]) => {
    if (selectedChar.id !== char.id) {
      setSelectedChar(char);
      playSelect();
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] border-t border-[#4a0404] py-24 px-6 md:px-12 flex flex-col justify-center font-serif text-white">
      {/* Background Texture / Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Character List */}
        <div className="md:col-span-5 flex flex-col space-y-4">
          <h2 className="text-sm tracking-[0.3em] text-[#cda873] uppercase mb-4 font-sans font-bold">Select Loadout</h2>
          
          {CHARACTERS.map((char) => {
            const isSelected = selectedChar.id === char.id;
            return (
              <button
                key={char.id}
                onMouseEnter={() => handleHover(char.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelect(char)}
                className={`group relative w-full text-left p-6 transition-all duration-300 border backdrop-blur-sm ${
                  isSelected 
                    ? "bg-[#2a0808]/80 border-[#8b0000] shadow-[0_0_15px_rgba(139,0,0,0.4)] scale-[1.02]" 
                    : "bg-[#111] border-white/10 hover:border-[#cda873]/50 hover:bg-[#1a1a1a]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-2xl font-bold transition-colors ${isSelected ? "text-[#e5cc98]" : "text-white/80 group-hover:text-white"}`}>
                      {char.name}
                    </h3>
                    <p className={`text-sm mt-1 font-sans tracking-wider ${isSelected ? "text-white/90" : "text-white/40 group-hover:text-white/60"}`}>
                      {char.role}
                    </p>
                  </div>
                  {/* Selection Indicator */}
                  <div className={`w-3 h-3 rounded-full transition-all ${isSelected ? "bg-[#cda873] shadow-[0_0_10px_#cda873]" : "bg-transparent border border-white/20"}`}></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Character Details */}
        <div className="md:col-span-7 h-full flex flex-col justify-center">
          <motion.div
            key={selectedChar.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#111] border border-white/5 p-8 relative overflow-hidden"
          >
            {/* Subtle decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cda873]/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cda873]/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cda873]/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cda873]/40"></div>

            <h2 className="text-5xl font-bold text-white mb-2">{selectedChar.name}</h2>
            <p className="text-xl italic text-[#cda873] mb-6 border-b border-white/10 pb-6">{selectedChar.description}</p>
            
            <div className="space-y-6 font-sans">
              <div>
                <div className="flex justify-between text-sm tracking-widest text-white/60 mb-2 uppercase">
                  <span>Draw Speed</span>
                  <span>{selectedChar.stats.drawSpeed}/100</span>
                </div>
                <div className="w-full h-1 bg-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedChar.stats.drawSpeed}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-[#8b0000] to-[#ff4444]"
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm tracking-widest text-white/60 mb-2 uppercase">
                  <span>Accuracy</span>
                  <span>{selectedChar.stats.accuracy}/100</span>
                </div>
                <div className="w-full h-1 bg-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedChar.stats.accuracy}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#cda873] to-[#f4e2b8]"
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm tracking-widest text-white/60 mb-2 uppercase">
                  <span>Stamina</span>
                  <span>{selectedChar.stats.stamina}/100</span>
                </div>
                <div className="w-full h-1 bg-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedChar.stats.stamina}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-white/80"
                  ></motion.div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
              <button 
                onMouseEnter={playHover}
                onClick={playSelect}
                className="px-8 py-4 bg-[#8b0000] hover:bg-[#a50000] text-white font-sans font-bold tracking-[0.2em] uppercase transition-colors"
              >
                Confirm Selection
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
