"use client";

import { useState } from "react";
import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";
import Link from "next/link";

const TECH_DOMAINS = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    role: "Python · OpenCV · YOLO · Streamlit",
    description:
      "Building intelligent systems that see, learn, and act. From real-time threat detection to habit analysis — I turn raw data into smart products.",
    stats: { proficiency: 90, projects: 80, experience: 78 },
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    role: "SOC · SIEM · Threat Hunting",
    description:
      "Defensive security from SOC workflows to anomaly detection and incident triage. Building tools that surface threats early and reduce noise.",
    stats: { proficiency: 88, projects: 82, experience: 76 },
  },
  {
    id: "mobile",
    name: "Mobile Development",
    role: "Flutter · Dart · Firebase · Supabase",
    description:
      "Cross-platform apps that feel native. From university research lab tools to habit tracking platforms — built for real users, deployed in production.",
    stats: { proficiency: 87, projects: 95, experience: 72 },
  },
  {
    id: "web",
    name: "Web Development",
    role: "Next.js · React · TypeScript · Framer Motion",
    description:
      "Premium, cinematic web experiences powered by modern frameworks. This very portfolio is an example of what I build.",
    stats: { proficiency: 88, projects: 85, experience: 75 },
  },
];

export default function TechDomainSelector() {
  const [selected, setSelected] = useState(TECH_DOMAINS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { playHover, playSelect, playPickup } = useGameSounds();

  const handleHover = (id: string) => {
    if (hoveredId !== id) {
      setHoveredId(id);
      playHover();
    }
  };

  const handleSelect = (domain: typeof TECH_DOMAINS[0]) => {
    if (selected.id !== domain.id) {
      setSelected(domain);
      playSelect();
    }
  };

  const statLabels: Record<string, string> = {
    proficiency: "Proficiency",
    projects: "Project Depth",
    experience: "Experience",
  };

  const statColors: Record<string, string> = {
    proficiency: "from-[#cda873] to-[#f4e2b8]",
    projects: "from-[#8b0000] to-[#ff4444]",
    experience: "from-white/40 to-white/80",
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] border-t border-[#2a1a00]/60 py-24 px-6 md:px-12 flex flex-col justify-center font-serif text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none z-0 mix-blend-overlay" />

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left: Domain List */}
        <div className="md:col-span-5 flex flex-col space-y-4">
          <div className="mb-2">
            <p className="text-xs tracking-[0.3em] text-[#cda873] uppercase font-sans font-bold mb-1">Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Tech Domains</h2>
          </div>

          {TECH_DOMAINS.map((domain) => {
            const isSelected = selected.id === domain.id;
            return (
              <button
                key={domain.id}
                onMouseEnter={() => handleHover(domain.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelect(domain)}
                className={`group relative w-full text-left p-5 transition-all duration-300 border backdrop-blur-sm ${
                  isSelected
                    ? "bg-[#1a1000]/80 border-[#cda873]/60 shadow-[0_0_20px_rgba(205,168,115,0.2)] scale-[1.02]"
                    : "bg-[#111] border-white/10 hover:border-[#cda873]/30 hover:bg-[#151209]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-xl font-bold transition-colors ${isSelected ? "text-[#e5cc98]" : "text-white/80 group-hover:text-white"}`}>
                      {domain.name}
                    </h3>
                    <p className={`text-xs mt-1 font-sans tracking-wider ${isSelected ? "text-[#cda873]/80" : "text-white/40 group-hover:text-white/60"}`}>
                      {domain.role}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full transition-all flex-shrink-0 ml-4 ${isSelected ? "bg-[#cda873] shadow-[0_0_10px_#cda873]" : "bg-transparent border border-white/20"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Domain Details */}
        <div className="md:col-span-7 h-full flex flex-col justify-center">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#0d0d0d] border border-white/5 p-8 relative overflow-hidden"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cda873]/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#cda873]/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#cda873]/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cda873]/40" />

            <h2 className="text-4xl font-bold text-white mb-2">{selected.name}</h2>
            <p className="text-sm text-[#cda873] font-sans tracking-widest mb-6 border-b border-white/10 pb-6">
              {selected.role}
            </p>
            <p className="text-white/65 font-sans leading-relaxed mb-8">{selected.description}</p>

            <div className="space-y-5 font-sans">
              {(Object.entries(selected.stats) as [keyof typeof selected.stats, number][]).map(([stat, val], i) => (
                <div key={stat}>
                  <div className="flex justify-between text-xs tracking-widest text-white/50 mb-2 uppercase">
                    <span>{statLabels[stat]}</span>
                    <span>{val}/100</span>
                  </div>
                  <div className="w-full h-1 bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${statColors[stat]}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
              <Link
                href="/world"
                onMouseEnter={playHover}
                onClick={() => { playSelect(); playPickup(); }}
                className="px-8 py-3 bg-[#cda873] text-black font-sans font-bold tracking-[0.15em] uppercase transition-all hover:bg-[#e5cc98] hover:shadow-[0_0_15px_rgba(205,168,115,0.3)] hover:-translate-y-0.5 inline-block"
              >
                View Projects →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
