"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function WorldPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax calculations
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // foreground

  return (
    <main className="bg-[#050505] min-h-screen text-white font-serif">
      {/* 3D Parallax Hero */}
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
          
          {/* Background Layer */}
          <motion.div 
            style={{ y: layer1Y }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-twine.png')] opacity-30"
          />

          {/* Typography Layer (Deep back) */}
          <motion.div 
            style={{ y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <h1 className="text-8xl md:text-[150px] font-bold tracking-tight text-[#8b0000] opacity-50 drop-shadow-2xl">
              THE FRONTIER
            </h1>
          </motion.div>

          {/* Mid Layer (Mountains/Landscape silhouette effect) */}
          <motion.div 
            style={{ y: layer2Y }}
            className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-[#111] to-transparent z-20"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] mix-blend-overlay opacity-50" />
            {/* Fake mountain ridges using borders/clip-paths or just gradients */}
            <div className="absolute bottom-0 w-full h-1/2 bg-[#0a0a0a] border-t border-white/5" style={{ clipPath: 'polygon(0% 100%, 0% 40%, 20% 10%, 40% 60%, 60% 20%, 80% 50%, 100% 30%, 100% 100%)' }}></div>
          </motion.div>

          {/* Foreground Layer */}
          <motion.div 
            style={{ y: layer3Y }}
            className="absolute bottom-0 left-0 w-full h-[30vh] bg-[#050505] z-30"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-50 mix-blend-overlay" />
            <div className="absolute -top-10 w-full h-10 bg-gradient-to-t from-[#050505] to-transparent"></div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative z-40 bg-[#050505] py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl text-[#cda873] font-bold mb-8">A Living, Breathing World</h2>
          <p className="text-xl text-white/60 font-sans leading-relaxed">
            Every town, every forest, and every swamp has a story. The frontier is unforgiving, but for those who brave it, the rewards are immense. Traverse the snowy peaks of the northern mountains to the dusty plains of the south.
          </p>
        </div>
      </section>
    </main>
  );
}
