"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { useGameSounds } from "@/hooks/useGameSounds";

const PROJECTS = [
  {
    name: "Civic AIShield",
    category: "AI / Cybersecurity",
    description:
      "AI-powered CCTV monitoring system using computer vision for real-time public safety threat detection. Scalable architecture supporting continuous low-latency inference on live video streams.",
    stack: ["Python", "OpenCV", "Computer Vision", "React"],
    status: "DEPLOYED",
    statusColor: "text-[#4ade80]",
  },
  {
    name: "SOC Anomaly Dashboard",
    category: "Cybersecurity / ML",
    description:
      "Real-time SOC dashboard with custom ML anomaly-scoring engine. Monitors, visualises, and triages network threats — from raw packet ingestion through feature engineering to live alert generation.",
    stack: ["Python", "FastAPI", "React", "Scikit-learn"],
    status: "BUILT",
    statusColor: "text-[#4ade80]",
  },
  {
    name: "PII Masking Tool",
    category: "Cybersecurity / AI",
    description:
      "High-accuracy web tool that detects and redacts personally identifiable information from ID documents using EasyOCR. Secure upload/download with zero server-side storage.",
    stack: ["Python", "EasyOCR", "FastAPI", "Web Tech"],
    status: "BUILT",
    statusColor: "text-[#60a5fa]",
  },
  {
    name: "Porsche 3D Showcase",
    category: "3D Web / WebGL",
    description:
      "Scroll-driven 3D landing page with cinematic camera transitions and real-time WebGL model rendering. Optimised to sustain 60 fps on desktop and mobile with compressed asset pipelines.",
    stack: ["Three.js", "WebGL", "GSAP", "JavaScript"],
    status: "LIVE",
    statusColor: "text-[#f472b6]",
  },
  {
    name: "BMW 3D Interactive",
    category: "3D Web / WebGL",
    description:
      "Custom GLSL fragment and vertex shaders producing dramatic lighting and reflection effects entirely in-browser. Lazy loading and compressed assets for fast initial load without sacrificing quality.",
    stack: ["Three.js", "GLSL Shaders", "WebGL", "GSAP"],
    status: "LIVE",
    statusColor: "text-[#f472b6]",
  },
  {
    name: "Zenith & FusionX Sites",
    category: "Web Development",
    description:
      "Official inter-collegiate symposium websites for KGISL Institute of Technology. Both remain live: zenith-kite.netlify.app and fusionxkitex.netlify.app.",
    stack: ["Next.js", "JavaScript", "HTML5", "CSS3"],
    status: "LIVE",
    statusColor: "text-[#f472b6]",
  },
  {
    name: "RDR Portfolio Site",
    category: "3D Web Experience",
    description:
      "This cinematic scroll-driven portfolio. 120 WebP animation frames (from 333MB PNG → 26MB), Framer Motion overlays, 3D tilt cards, and Web Audio API game sounds.",
    stack: ["Next.js", "Framer Motion", "WebP", "TypeScript"],
    status: "LIVE",
    statusColor: "text-[#f472b6]",
  },
  {
    name: "Streakly / LifeOS",
    category: "Mobile App",
    description:
      "AI-powered habit tracking super-app with streak management, multi-metric analytics, calendar heatmaps, and a swipeable home screen dashboard.",
    stack: ["Flutter", "Firebase", "Dart"],
    status: "BUILT",
    statusColor: "text-[#60a5fa]",
  },
];

export default function ProjectsPage() {
  const { playHover, playSelect, playRevolver, playNotification, playPickup } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-sans tracking-[0.4em] text-[#cda873] uppercase mb-4 font-bold">What I&apos;ve Built</p>
          <h1
            className="text-5xl md:text-8xl font-black tracking-tight mb-4"
            style={{
              color: "#ffffff",
              WebkitTextStroke: "1px rgba(205,168,115,0.6)",
              textShadow: "0 0 30px rgba(205,168,115,0.3), 2px 4px 0 rgba(0,0,0,0.8)",
            }}
          >
            PROJECTS
          </h1>
          <div className="w-24 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-60" />
          <p className="text-white/50 font-sans tracking-[0.2em] uppercase text-sm">
            Real products. Real impact. Shipped in the wild.
          </p>
        </div>

        {/* Cybersecurity focus */}
        <div className="mb-12 text-center">
          <p className="text-xs font-sans tracking-[0.4em] text-[#4ade80] uppercase mb-4 font-bold">Cybersecurity Focus</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Civic AIShield", "SOC Anomaly Dashboard", "PII Masking Tool"].map((item) => (
              <button
                key={item}
                type="button"
                onMouseEnter={playHover}
                className="text-[11px] font-sans uppercase tracking-widest px-3 py-1.5 border border-[#4ade80]/30 text-[#4ade80] bg-[#0b120b]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1200px]">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              <TiltCard
                onHoverStart={() => { playHover(); if (i % 3 === 0) playRevolver(); if (i % 4 === 0) playNotification(); }}
                onClick={() => { playSelect(); if (i % 2 === 0) playPickup(); }}
                className="h-full min-h-[320px] bg-[#0d0d0d] border-white/10 p-6 flex flex-col group"
              >
                {/* Status badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-white/30 border border-white/10 px-2 py-0.5">
                    {project.category}
                  </span>
                  <span className={`text-[10px] font-sans font-bold tracking-wider uppercase ${project.statusColor}`}>
                    ● {project.status}
                  </span>
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#e5cc98] transition-colors leading-tight">
                  {project.name}
                </h2>

                {/* Description */}
                <p className="text-white/55 font-sans text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-sans font-medium uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/8 text-white/45 group-hover:border-[#cda873]/20 group-hover:text-white/60 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#cda873] transition-all duration-500 group-hover:w-full rounded-b-xl" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
