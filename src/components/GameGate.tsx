"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const TOTAL_FRAMES = 120;

const pad = (n: number) => n.toString().padStart(3, "0");
const getSrc = (i: number) => `/images/hero-webp/ezgif-frame-${pad(i)}.webp`;

export default function GameGate({ onEnter }: { onEnter: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { playDrum, playRevolver, playWelcomeVoice } = useGameSounds();

  useEffect(() => {
    let cancelled = false;

    const preloadFrames = async () => {
      const batchSize = 12;
      let loadedCount = 0;

      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        const batch = [];

        for (let j = i; j < i + batchSize && j <= TOTAL_FRAMES; j++) {
          batch.push(
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = getSrc(j);
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
          );
        }

        await Promise.all(batch);
        loadedCount = Math.min(i + batchSize - 1, TOTAL_FRAMES);

        if (cancelled) {
          return;
        }

        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      }

      if (!cancelled) {
        setIsReady(true);
      }
    };

    preloadFrames();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleEnter = () => {
    if (!isReady) {
      return;
    }

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

            <div className="mb-8 space-y-3">
              <div className="w-72 max-w-[80vw] h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div
                  className="h-full bg-[#cda873] transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/45 font-sans">
                {isReady ? "Packages ready" : `Downloading packages... ${loadingProgress}%`}
              </p>
            </div>
            
            <button
              onClick={handleEnter}
              disabled={!isReady}
              className="group relative px-8 py-3 text-lg uppercase tracking-[0.3em] transition-all text-white/70 hover:text-white disabled:cursor-not-allowed disabled:text-white/25"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isReady ? "Press Start" : "Preparing entry"}
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
