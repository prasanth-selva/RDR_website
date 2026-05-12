"use client";

import { motion } from "framer-motion";

export default function GameHUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-serif">
      {/* Mini-map / Radar Overlay — repurposed as a "status radar" */}
      <div className="absolute bottom-6 left-6 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 border-[4px] border-black rounded-full pointer-events-none" />
        {/* Grid lines */}
        <div className="w-full h-[1px] bg-white/10 absolute top-1/2" />
        <div className="h-full w-[1px] bg-white/10 absolute left-1/2" />

        {/* Center blip — "me" */}
        <div className="w-2 h-2 bg-white rounded-full absolute shadow-[0_0_5px_white]" />

        {/* Animated objective blips — represent active projects/goals */}
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.1, repeat: Infinity }}
          className="w-2.5 h-2.5 bg-[#cda873] rotate-45 absolute top-[28%] right-[28%] shadow-[0_0_8px_#cda873]"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="w-1.5 h-1.5 bg-white/50 rounded-full absolute bottom-[30%] left-[35%]"
        />
      </div>

      {/* Top-right mission objective — portfolio teaser */}
      <div className="absolute top-24 right-6 text-right max-w-[200px]">
        <h4 className="text-[#cda873] font-bold text-base mb-1 tracking-wider drop-shadow-md">
          Open to Opportunities
        </h4>
        <p className="text-white/60 text-xs font-sans uppercase tracking-widest bg-black/40 p-2 border border-white/5 rounded backdrop-blur-md">
          Explore Projects & Skills
        </p>
      </div>
    </div>
  );
}
