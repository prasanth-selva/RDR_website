"use client";

import { motion } from "framer-motion";

export default function GameHUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-serif">
      {/* Mini-map / Radar Overlay */}
      <div className="absolute bottom-6 left-6 w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 border-[4px] border-black rounded-full pointer-events-none"></div>
        {/* Radar grids */}
        <div className="w-full h-[1px] bg-white/10 absolute top-1/2"></div>
        <div className="h-full w-[1px] bg-white/10 absolute left-1/2"></div>
        
        {/* Player Blip */}
        <div className="w-2 h-2 bg-white rounded-full absolute shadow-[0_0_5px_white]"></div>
        
        {/* Objective Blip */}
        <motion.div 
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 bg-[#cda873] rotate-45 absolute top-[30%] right-[30%] shadow-[0_0_8px_#cda873]"
        ></motion.div>
      </div>

      {/* Honor Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 md:w-96 flex flex-col items-center">
        <div className="w-full flex justify-between text-xs tracking-[0.2em] uppercase text-white/50 mb-2 font-sans">
          <span className="text-[#8b0000]">Dishonorable</span>
          <span className="text-white/80">Honorable</span>
        </div>
        <div className="w-full h-2 bg-black/60 border border-white/20 relative rounded-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-[60%] bg-gradient-to-r from-[#8b0000] via-white/50 to-white/90"></div>
          {/* Slider indicator */}
          <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-white shadow-[0_0_5px_white]"></div>
        </div>
      </div>

      {/* Top Right "Mission" Objective */}
      <div className="absolute top-24 right-6 text-right max-w-[200px]">
        <h4 className="text-[#cda873] font-bold text-lg mb-1 tracking-wider drop-shadow-md">Explore Lumina</h4>
        <p className="text-white/60 text-xs font-sans uppercase tracking-widest bg-black/40 p-2 border border-white/5 rounded backdrop-blur-md">
          Discover the Arsenal and Journal.
        </p>
      </div>
    </div>
  );
}
