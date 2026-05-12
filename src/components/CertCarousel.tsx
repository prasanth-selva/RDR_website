"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";
import Image from "next/image";

const CERTIFICATIONS = [
  {
    id: 1,
    name: "CISCP Certification",
    issuer: "Cisco",
    year: "2024",
    image: "/images/certs/ciscp.webp",
    color: "#cda873",
  },
  {
    id: 2,
    name: "Google Certification",
    issuer: "Google",
    year: "2024",
    image: "/images/certs/google.webp",
    color: "#cda873",
  },
  {
    id: 3,
    name: "Professional Certificate",
    issuer: "LinkedIn Learning",
    year: "2025",
    image: "/images/certs/1743751160681.webp",
    color: "#cda873",
  },
  {
    id: 4,
    name: "Achievement Certificate",
    issuer: "Online Platform",
    year: "2025",
    image: "/images/certs/1769664711406.webp",
    color: "#cda873",
  },
  {
    id: 5,
    name: "Completion Certificate",
    issuer: "Online Platform",
    year: "2025",
    image: "/images/certs/1769962098794.webp",
    color: "#cda873",
  },
  {
    id: 6,
    name: "Merit Certificate",
    issuer: "Online Platform",
    year: "2025",
    image: "/images/certs/pasted file.webp",
    color: "#cda873",
  },
  {
    id: 7,
    name: "Technical Achievement",
    issuer: "Online Platform",
    year: "2025",
    image: "/images/certs/1771907905062.webp",
    color: "#cda873",
  },
  {
    id: 8,
    name: "Skill Certificate",
    issuer: "Online Platform",
    year: "2025",
    image: "/images/certs/1773199084635.webp",
    color: "#cda873",
  },
];

export default function CertCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playHover, playSelect } = useGameSounds();
  const current = CERTIFICATIONS[currentIndex];

  const next = () => {
    playHover();
    setCurrentIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
  };

  const prev = () => {
    playHover();
    setCurrentIndex((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Main display */}
      <div className="w-full h-[420px] relative flex items-center justify-center perspective-[1200px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: 90, scale: 0.85 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="absolute w-full max-w-2xl h-[380px] flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Cert image card */}
            <div
              className="relative w-full h-full rounded-sm overflow-hidden border border-white/10"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-contain p-4"
                    onError={(e) => {
                      // Show fallback pattern if image fails
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    unoptimized
                  />
                </div>
                {/* Fallback if no image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none"
                  id={`cert-fallback-${currentIndex}`}>
                  <div className="w-24 h-24 border-4 rounded-full flex items-center justify-center mb-4"
                    style={{ borderColor: current.color }}>
                    <span className="text-4xl">🏆</span>
                  </div>
                  <p className="text-white/60 font-sans text-sm tracking-widest uppercase">{current.name}</p>
                </div>
              </div>

              {/* Badge */}
              <div
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: `${current.color}20`, border: `2px solid ${current.color}60`, color: current.color }}
              >
                ✓
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          onMouseEnter={playSelect}
          className="absolute left-0 p-4 text-white/40 hover:text-white transition-colors z-20 group"
        >
          <span className="text-4xl font-serif group-hover:text-[#cda873]">←</span>
        </button>
        <button
          onClick={next}
          onMouseEnter={playSelect}
          className="absolute right-0 p-4 text-white/40 hover:text-white transition-colors z-20 group"
        >
          <span className="text-4xl font-serif group-hover:text-[#cda873]">→</span>
        </button>
      </div>

      {/* Cert info */}
      <motion.div
        key={`info-${currentIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl mt-8 bg-[#0a0a0a] border border-white/8 p-6 relative"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#0a0a0a] border border-white/10 text-xs font-sans tracking-widest uppercase"
          style={{ color: current.color }}
        >
          {current.issuer}
        </div>

        <div className="text-center pt-2">
          <h3 className="text-xl font-bold text-white mb-1">{current.name}</h3>
          <p className="text-white/40 font-sans text-sm tracking-widest">{current.year}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {CERTIFICATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); playSelect(); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-[#cda873] scale-125" : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
