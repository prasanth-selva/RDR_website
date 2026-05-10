"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteBootSequence({ children }: { children: React.ReactNode }) {
  const [bootStage, setBootStage] = useState(0);

  useEffect(() => {
    // Sequence:
    // Stage 0: Initial black screen (wait 1s)
    // Stage 1: "Rockstar" style logo / Cyberbots Presents (lasts 2.5s)
    // Stage 2: "Loading Story Mode..." / Spinner (lasts 2s)
    // Stage 3: Complete, render children
    
    // In dev mode, this might run fast or double fire due to strict mode,
    // but in prod it gives a cool boot up sequence.
    const seq = async () => {
      await new Promise(r => setTimeout(r, 800));
      setBootStage(1);
      
      await new Promise(r => setTimeout(r, 2500));
      setBootStage(2);
      
      await new Promise(r => setTimeout(r, 2000));
      setBootStage(3);
    };
    
    seq();
  }, []);

  if (bootStage === 3) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center font-serif">
      <AnimatePresence mode="wait">
        {bootStage === 1 && (
          <motion.div
            key="stage1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* R* style logo parody */}
            <div className="w-24 h-24 mx-auto bg-[#cda873] text-black font-bold text-4xl flex items-center justify-center rounded-sm mb-6 drop-shadow-[0_0_20px_rgba(205,168,115,0.4)]">
              CB
            </div>
            <p className="text-xl tracking-[0.4em] text-white/80 font-sans uppercase">
              Cyberbots Studios
            </p>
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
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-sm font-sans tracking-widest uppercase text-white/60">
              Loading Story Mode...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
