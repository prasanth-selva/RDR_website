"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

export default function GameGate({ onEnter }: { onEnter: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const { playDrum, playRevolver, playWelcomeVoice } = useGameSounds();

  const handleEnter = () => {
    // Initial user interaction satisfies browser audio policies
    playRevolver();
    playWelcomeVoice();
    
    setTimeout(() => {
        playDrum();
    }, 400);
    
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center font-serif"
        >
          <div className="noise-overlay opacity-[0.03]" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center z-10"
          >
            <h1 className="text-4xl md:text-6xl text-white/90 mb-8 tracking-widest uppercase text-shadow-sm">
              Cyberbots <span className="text-[#cda873]">Studios</span>
            </h1>
            
            <button
              onClick={handleEnter}
              className="group relative px-8 py-3 text-lg text-white/70 uppercase tracking-[0.3em] transition-all hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-3">
                Press Start
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-[#cda873] rounded-full inline-block"
                />
              </span>
              <div className="absolute inset-0 border border-white/20 group-hover:border-[#cda873]/50 transition-colors" />
              <motion.div 
                 animate={{ opacity: [0.1, 0.2, 0.1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 bg-[#cda873]/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" 
              />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
