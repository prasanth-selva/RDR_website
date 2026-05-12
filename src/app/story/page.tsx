"use client";

import { motion } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const JOURNEY_MILESTONES = [
  {
    year: "2024",
    title: "B.E. CSE (Cybersecurity)",
    description:
      "KGISL Institute of Technology. 2024-2028 (expected). Specialization in cybersecurity.",
    tag: "Education",
  },
  {
    year: "2024-2025",
    title: "Zenith & FusionX",
    description:
      "Built symposium websites for KGISL Institute of Technology using Next.js. Both remain live.",
    tag: "Web",
  },
  {
    year: "Jan 2025",
    title: "SOC Dashboard",
    description:
      "AI-based network traffic monitoring dashboard with ML anomaly scoring and threat triage.",
    tag: "Cybersecurity",
  },
  {
    year: "Jan 2025",
    title: "Civic AIShield + PII Masking",
    description:
      "CCTV threat detection for public safety and a PII masking tool using EasyOCR.",
    tag: "AI / Security",
  },
  {
    year: "Oct 2025",
    title: "Metazord",
    description:
      "Cybersecurity Researcher and Full-Stack Developer. Built ML pipelines, SOC dashboards, and FastAPI services.",
    tag: "Work",
  },
  {
    year: "Mar 2026",
    title: "Top 50 CTF",
    description:
      "Top 50 nationally at Malla Reddy University CTF. Participated in Breach Point 24-hour CTF.",
    tag: "Achievements",
  },
];

export default function JourneyPage() {
  const { playHover, playSpurs } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">Story</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            THE JOURNEY
          </h1>
          <div className="w-16 h-[2px] bg-[#cda873] mx-auto mb-4 opacity-60" />
          <p className="text-sm tracking-[0.2em] uppercase text-white/60 font-sans">
            Clear milestones
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative border-l-2 border-[#cda873]/20 ml-4 md:ml-8 space-y-20">
          {JOURNEY_MILESTONES.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              className="relative pl-8 md:pl-16"
              onMouseEnter={() => { playHover(); if (index % 2 === 0) playSpurs(); }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-4 w-5 h-5 bg-[#0b0b0b] border-4 border-[#cda873] rounded-full" />

              <div className="group relative bg-[#111] border border-white/10 p-8 hover:border-[#cda873]/40 transition-colors duration-200">
                {/* Hover glow */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#cda873] transition-all duration-200 group-hover:w-full" />

                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[#cda873] font-black text-2xl font-sans">{milestone.year}</span>
                  <span className="text-xs font-sans tracking-widest uppercase text-white/30 border border-white/10 px-3 py-1">
                    {milestone.tag}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#e5cc98] transition-colors">
                  {milestone.title}
                </h2>
                <p className="text-white/65 font-sans leading-relaxed text-base">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
