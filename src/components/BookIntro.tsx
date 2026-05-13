"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGameSounds } from "@/hooks/useGameSounds";

type Page = {
  title: string;
  body: string;
  highlights?: string[];
};

const PAGES: Page[] = [
  {
    title: "Summary",
    body: "Cybersecurity analyst and full-stack developer focused on ML security systems and 3D web. Top 50 CTF at Malla Reddy University (Mar 2026).",
    highlights: ["Google Cybersecurity", "Cisco Ethical Hacking", "Top 50 CTF 2026"],
  },
  {
    title: "Experience",
    body: "Cybersecurity Researcher and Full-Stack Developer at Metazord (Oct 2025 - Present, part-time). Built ML anomaly detection, SOC dashboards, and FastAPI services.",
    highlights: ["ML anomaly detection", "SOC dashboards", "FastAPI microservices"],
  },
  {
    title: "Education",
    body: "B.E. CSE (Cybersecurity), KGISL Institute of Technology (2024-2028 expected). Association President, Cybersecurity Department.",
    highlights: ["CTF events", "Workshops", "Student mentorship"],
  },
];

export default function BookIntro() {
  const [pageIndex, setPageIndex] = useState(0);
  const { playHover, playSelect } = useGameSounds();
  const page = PAGES[pageIndex];

  const nextPage = () => {
    playSelect();
    setPageIndex((prev) => (prev + 1) % PAGES.length);
  };

  const prevPage = () => {
    playSelect();
    setPageIndex((prev) => (prev - 1 + PAGES.length) % PAGES.length);
  };

  return (
    <section className="bg-[#0b0b0b] text-white border-t border-white/10 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#cda873] font-bold">Introduction</p>
          <h2 className="text-3xl md:text-5xl font-black mt-3">A quick read</h2>
          <div className="w-20 h-[2px] bg-[#cda873] mx-auto mt-6 opacity-70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left page: image */}
          <div className="bg-[#111] border border-white/10 p-6 flex flex-col gap-5">
            <div className="text-xs uppercase tracking-widest text-white/50">Profile</div>
            <div className="relative w-full h-64 md:h-80 bg-[#0d0d0d] border border-white/10">
              <Image
                src="/images/intro.jpeg"
                alt="Intro visual"
                fill
                className="object-cover object-[50%_15%]"
                priority
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#cda873]/40">
                <Image src="/images/profile.png" alt="Prasanth" fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold">Prasanth S</p>
                <p className="text-xs text-white/60">AI / Cybersecurity / Web</p>
              </div>
            </div>
          </div>

          {/* Right page: text with page flip */}
          <div className="bg-[#111] border border-white/10 p-6 flex flex-col justify-between">
            <motion.div
              key={pageIndex}
              initial={{ opacity: 0, rotateY: -35 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: "left center" }}
              className="min-h-[220px]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-white/50">Page {pageIndex + 1}</span>
                <span className="text-xs uppercase tracking-widest text-[#cda873]">{page.title}</span>
              </div>
              <p className="text-lg leading-relaxed text-white/80">{page.body}</p>
              {page.highlights && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {page.highlights.map((item) => (
                    <span key={item} className="text-[11px] uppercase tracking-widest px-2 py-1 border border-[#cda873]/40 text-[#cda873]">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={prevPage}
                onMouseEnter={playHover}
                className="px-4 py-2 border border-white/20 text-white/70 text-xs uppercase tracking-widest hover:border-[#cda873]/60 hover:text-[#cda873] transition-colors"
              >
                Prev
              </button>
              <span className="text-xs text-white/40 uppercase tracking-widest">Tap to flip</span>
              <button
                type="button"
                onClick={nextPage}
                onMouseEnter={playHover}
                className="px-4 py-2 border border-white/20 text-white/70 text-xs uppercase tracking-widest hover:border-[#cda873]/60 hover:text-[#cda873] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
