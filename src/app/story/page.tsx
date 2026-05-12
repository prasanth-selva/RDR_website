"use client";

import { motion } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const JOURNEY_MILESTONES = [
  {
    year: "2022",
    title: "The Spark",
    description:
      "Started with Python and fell in love with code. Began building AI experiments, dissecting computer vision algorithms, and understanding the raw power of machine learning on real datasets.",
    tag: "Origin Story",
  },
  {
    year: "2023",
    title: "Founded Cyberbots",
    description:
      "Established Cyberbots — a startup at the intersection of AI, mobile, and web. Began taking on real-world projects for clients, institutions, and research labs. The mission: build things that actually work.",
    tag: "Entrepreneurship",
  },
  {
    year: "2023",
    title: "AI & Computer Vision",
    description:
      "Built SafeWatch — a real-time CCTV threat detection system using YOLO and OpenCV, capable of identifying fights, falls, and harassment. Integrated the Civic AI Shield pipeline with Streamlit dashboards and alert systems.",
    tag: "AI / ML",
  },
  {
    year: "2024",
    title: "Going Mobile",
    description:
      "Expanded deep into Flutter mobile development. Delivered Mudra (print ordering platform with Razorpay payments), Seshadri Lab App for a university research lab, Streakly habit tracker, and HABIT Monitor — all to real users.",
    tag: "Mobile Dev",
  },
  {
    year: "2025",
    title: "Web & Cinematic Experiences",
    description:
      "Built premium web experiences: the Koenigsegg hypercar site, HENNGE enterprise portal, a 3D premium agency site, and this cinematic scroll-driven portfolio. Earned certifications from Google and CISCP along the way.",
    tag: "Web / Design",
  },
  {
    year: "Now",
    title: "Building the Future",
    description:
      "Open to full-time engineering roles, freelance collaboration, and startup partnerships. Currently deepening expertise in AI at the edge, multimodal systems, and cross-platform product engineering.",
    tag: "Open to Work",
  },
];

export default function JourneyPage() {
  const { playHover } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-xs font-sans tracking-[0.4em] text-[#cda873] uppercase mb-4 font-bold">My Story</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg mb-4">
            THE JOURNEY
          </h1>
          <div className="w-16 h-[2px] bg-[#cda873] mx-auto mb-4 opacity-60" />
          <p className="text-xl tracking-[0.2em] uppercase text-white/50 font-sans text-sm">
            Building with Purpose
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
              onMouseEnter={playHover}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-4 w-5 h-5 bg-[#050505] border-4 border-[#cda873] rounded-full shadow-[0_0_12px_rgba(205,168,115,0.5)]" />

              <div className="group relative bg-[#0a0a0a] border border-white/8 p-8 hover:border-[#cda873]/30 transition-colors duration-500 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#cda873] transition-all duration-500 group-hover:w-full" />

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
