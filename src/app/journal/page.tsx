"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const JOURNAL_PAGES = [
  {
    date: "May 14th, 1899",
    content: "We've been running for days. The snow up here in Ambarino is unforgiving, but it hides our tracks. Dutch says he has a plan. He always has a plan. I just hope this one doesn't end like Blackwater.",
    sketch: "https://www.transparenttextures.com/patterns/notebook.png" // placeholder for a sketch
  },
  {
    date: "June 2nd, 1899",
    content: "Set up camp near Valentine. The locals are simple folk, easy to part from their money. Met a man in the saloon today who looked at me funny. Had to remind him of his manners. The world is changing, and I don't think there's a place for us in it much longer.",
    sketch: "https://www.transparenttextures.com/patterns/notebook.png"
  },
  {
    date: "August 18th, 1899",
    content: "This heat in Lemoyne is driving everyone mad. The swamps smell like death. We are chasing ghosts down here, fighting a war that ain't ours. I look at the young ones in camp... what kind of life are we giving them?",
    sketch: "https://www.transparenttextures.com/patterns/notebook.png"
  }
];

export default function JournalPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const { playHover, playSelect } = useGameSounds();

  const nextPage = () => {
    if (pageIndex < JOURNAL_PAGES.length - 1) {
      playHover(); // simulate page turn
      setPageIndex(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (pageIndex > 0) {
      playHover();
      setPageIndex(prev => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1816] pt-32 pb-12 px-4 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-0 opacity-80"></div>
      
      {/* The Book */}
      <div className="relative z-10 w-full max-w-4xl aspect-[4/3] md:aspect-[3/2] bg-[#e6d8b8] shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-md border-8 border-[#3b2a1a] flex">
        {/* Book Spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/20 via-transparent to-black/20 shadow-inner z-20"></div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={pageIndex}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full flex"
            style={{ transformOrigin: "center" }}
          >
            {/* Left Page (Image/Sketch) */}
            <div className="w-1/2 h-full p-8 md:p-12 border-r border-black/10 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply opacity-50"></div>
              
              <div className="relative z-10 w-full h-full border-2 border-dashed border-black/20 flex items-center justify-center">
                 <p className="font-handwriting text-black/30 text-2xl rotate-[-5deg]">[Sketch of the landscape]</p>
              </div>
            </div>

            {/* Right Page (Text) */}
            <div className="w-1/2 h-full p-8 md:p-16 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="font-handwriting text-3xl md:text-5xl text-black/80 mb-8 border-b border-black/10 pb-4 inline-block">
                  {JOURNAL_PAGES[pageIndex].date}
                </h3>
                <p className="font-handwriting text-2xl md:text-3xl text-black/90 leading-[1.8] md:leading-[2]">
                  {JOURNAL_PAGES[pageIndex].content}
                </p>
              </div>

              {/* Page Number */}
              <div className="absolute bottom-6 right-8 font-serif text-black/40 text-sm">
                {pageIndex + 1}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Page Turn Controls overlaying the book */}
        <button 
          onClick={prevPage}
          disabled={pageIndex === 0}
          onMouseEnter={playSelect}
          className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white disabled:opacity-0 transition-opacity z-30"
        >
          <span className="text-5xl">&larr;</span>
        </button>
        <button 
          onClick={nextPage}
          disabled={pageIndex === JOURNAL_PAGES.length - 1}
          onMouseEnter={playSelect}
          className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white disabled:opacity-0 transition-opacity z-30"
        >
          <span className="text-5xl">&rarr;</span>
        </button>
      </div>

      <p className="relative z-10 mt-12 text-white/40 font-sans tracking-[0.3em] uppercase text-xs">
        Arthur's Journal
      </p>
    </main>
  );
}
