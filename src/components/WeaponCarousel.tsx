"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const WEAPONS = [
  {
    id: 1,
    name: "Cattleman Revolver",
    type: "Sidearm",
    stats: { damage: 40, fireRate: 70, reload: 60 },
    description: "A standard issue, reliable six-shooter. Balanced and true.",
  },
  {
    id: 2,
    name: "Lancaster Repeater",
    type: "Longarm",
    stats: { damage: 55, fireRate: 85, reload: 50 },
    description: "High capacity and quick firing rate. Perfect for multiple targets.",
  },
  {
    id: 3,
    name: "Pump-Action Shotgun",
    type: "Longarm",
    stats: { damage: 95, fireRate: 30, reload: 40 },
    description: "Devastating at close range. Will clear a room in seconds.",
  },
  {
    id: 4,
    name: "Carcano Rifle",
    type: "Sniper",
    stats: { damage: 85, fireRate: 20, reload: 30 },
    description: "Long-range precision rifle with a high-power scope.",
  }
];

export default function WeaponCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playHover, playSelect } = useGameSounds();

  const nextWeapon = () => {
    playHover(); // simulate metal clank
    setCurrentIndex((prev) => (prev + 1) % WEAPONS.length);
  };

  const prevWeapon = () => {
    playHover();
    setCurrentIndex((prev) => (prev - 1 + WEAPONS.length) % WEAPONS.length);
  };

  const current = WEAPONS[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* 3D Carousel Display Area */}
      <div className="w-full h-[400px] relative flex items-center justify-center perspective-[1200px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Placeholder for actual 3D weapon model - using a stylized card */}
            <div className="w-[600px] h-[200px] bg-gradient-to-r from-transparent via-[#cda873]/10 to-transparent border-y border-[#cda873]/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(205,168,115,0.1)]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 mix-blend-overlay"></div>
              
              {/* Silhouette Placeholder */}
              <div className="w-3/4 h-12 bg-black/80 rounded-sm blur-sm absolute transform translate-y-12 scale-y-50"></div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic relative z-10" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                {current.name.toUpperCase()}
              </h2>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button 
          onClick={prevWeapon} 
          onMouseEnter={playSelect}
          className="absolute left-0 md:left-12 p-4 text-white/50 hover:text-white transition-colors z-20"
        >
          <span className="text-4xl font-serif">&larr;</span>
        </button>
        <button 
          onClick={nextWeapon} 
          onMouseEnter={playSelect}
          className="absolute right-0 md:right-12 p-4 text-white/50 hover:text-white transition-colors z-20"
        >
          <span className="text-4xl font-serif">&rarr;</span>
        </button>
      </div>

      {/* Stats Area */}
      <div className="w-full max-w-2xl mt-12 bg-[#0a0a0a] border border-white/10 p-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#0a0a0a] border border-white/10 text-xs font-sans tracking-widest text-[#cda873] uppercase">
          {current.type}
        </div>

        <p className="text-center text-white/70 italic font-serif text-lg mb-8">{current.description}</p>

        <div className="space-y-6 font-sans">
          {Object.entries(current.stats).map(([statName, value]) => (
            <div key={statName}>
              <div className="flex justify-between text-xs tracking-widest text-white/50 mb-2 uppercase">
                <span>{statName}</span>
                <span>{value}/100</span>
              </div>
              <div className="w-full h-1.5 bg-black border border-white/5 relative overflow-hidden">
                <motion.div 
                  key={`${currentIndex}-${statName}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/20 to-white/80"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
