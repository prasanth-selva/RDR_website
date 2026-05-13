"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameGate from "./GameGate";

export default function SiteBootSequence({ children }: { children: React.ReactNode }) {
  const [bootStage, setBootStage] = useState(-1); // -1: GameGate, 0: Pre-boot, 1: Logo, 2: Loading, 3: Done

  useEffect(() => {
    if (bootStage === 0) {
      const seq = async () => {
        await new Promise(r => setTimeout(r, 600));
        setBootStage(1);

        await new Promise(r => setTimeout(r, 2500));
        setBootStage(2);

        await new Promise(r => setTimeout(r, 1800));
        setBootStage(3);
      };
      seq();
    }
  }, [bootStage]);

  const handleGateEnter = () => {
    setBootStage(0);
  };

  if (bootStage === 3) {
    return <>{children}</>;
  }

  return (
    <>
      {bootStage === -1 && <GameGate onEnter={handleGateEnter} />}

      {bootStage >= 0 && bootStage < 3 && (
        <div className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center font-serif">
          <AnimatePresence mode="wait">
            {bootStage === 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                {/* Cyberbots logo */}
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-24 h-24 mx-auto bg-[#cda873] text-black font-black text-4xl flex items-center justify-center mb-6 drop-shadow-[0_0_30px_rgba(205,168,115,0.5)]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  CB
                </motion.div>
                <p className="text-xl tracking-[0.4em] text-white/80 font-sans uppercase mb-2">
                  Cyberbots Studios
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-[#cda873]/70 tracking-[0.3em] text-sm font-sans uppercase"
                >
                  Prasanth · Portfolio
                </motion.p>
              </motion.div>
            )}

            {bootStage === 2 && (
              <motion.div
                key="stage2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-12 right-12 flex items-center space-x-4"
              >
                <div className="w-6 h-6 border-2 border-white/20 border-t-[#cda873] rounded-full animate-spin" />
                <p className="text-sm font-sans tracking-widest uppercase text-white/60">
                  Initializing Portfolio...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
