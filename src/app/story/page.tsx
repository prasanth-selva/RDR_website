"use client";

import { motion } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const STORY_CHAPTERS = [
  {
    chapter: "Chapter 1",
    title: "Colter",
    description: "After a botched ferry heist in Blackwater, the Van der Linde gang is forced to flee into the snowy mountains of Ambarino. Freezing and starving, they must survive the harsh winter and rival gangs.",
    image: "https://www.transparenttextures.com/patterns/black-twine.png"
  },
  {
    chapter: "Chapter 2",
    title: "Horseshoe Overlook",
    description: "The gang descends from the mountains and establishes a new camp near the livestock town of Valentine. Arthur Morgan begins collecting debts and causing trouble, while Dutch plots their next big score.",
    image: "https://www.transparenttextures.com/patterns/worn-dots.png"
  },
  {
    chapter: "Chapter 3",
    title: "Clemens Point",
    description: "Moving south to Lemoyne, the gang sets up camp near Rhodes. They attempt to play two rival plantation families—the Grays and the Braithwaites—against each other, but the plan goes horribly wrong.",
    image: "https://www.transparenttextures.com/patterns/dark-leather.png"
  },
  {
    chapter: "Chapter 4",
    title: "Saint Denis",
    description: "The gang relocates to the swampy outskirts of the bustling industrial city of Saint Denis. Dutch's desperate attempts to secure enough money to flee the country lead to a disastrous bank robbery.",
    image: "https://www.transparenttextures.com/patterns/black-scales.png"
  },
  {
    chapter: "Chapter 5",
    title: "Guarma",
    description: "Following the failed bank heist, Arthur, Dutch, and a few others are shipwrecked on the tropical island of Guarma. They must fight alongside local rebels to secure a way back to America.",
    image: "https://www.transparenttextures.com/patterns/dust.png"
  },
  {
    chapter: "Chapter 6",
    title: "Beaver Hollow",
    description: "Reunited but broken, the gang makes their final stand in Roanoke Ridge. Dutch's paranoia grows, Micah's influence takes hold, and Arthur faces his own mortality as the gang tears itself apart.",
    image: "https://www.transparenttextures.com/patterns/stardust.png"
  }
];

export default function StoryPage() {
  const { playHover } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">
      {/* Background Texture */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none mix-blend-overlay z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#8b0000] drop-shadow-lg mb-4">THE SAGA</h1>
          <p className="text-xl tracking-[0.3em] uppercase text-[#cda873] font-sans">Outlaws to the End</p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#8b0000]/30 ml-4 md:ml-8 space-y-24">
          
          {STORY_CHAPTERS.map((chapter, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative pl-8 md:pl-16"
              onMouseEnter={playHover}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-2 w-5 h-5 bg-[#050505] border-4 border-[#8b0000] rounded-full shadow-[0_0_10px_#8b0000]"></div>
              
              <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-[#cda873]/40 transition-colors duration-500 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: `url(${chapter.image})` }}
                ></div>
                
                <h3 className="text-[#cda873] font-sans tracking-widest text-sm uppercase mb-2">
                  {chapter.chapter}
                </h3>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-[#e5cc98] transition-colors">
                  {chapter.title}
                </h2>
                <p className="text-white/70 font-sans leading-relaxed text-lg">
                  {chapter.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </main>
  );
}
