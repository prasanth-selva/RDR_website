"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { useGameSounds } from "@/hooks/useGameSounds";

const PROJECTS = [
  {
    name: "AI-Based Network Traffic Monitoring Dashboard",
    category: "Cybersecurity / ML",
    description:
      "Real-time SOC dashboard with ML anomaly scoring and threat triage.",
    stack: ["Python", "FastAPI", "React", "Scikit-learn"],
    status: "BUILT",
    statusColor: "text-[#cda873]",
  },
  {
    name: "Civic AIShield",
    category: "AI / Computer Vision",
    description:
      "CCTV monitoring app that detects suspicious activity on live video streams.",
    stack: ["Python", "OpenCV", "Computer Vision", "React"],
    status: "BUILT",
    statusColor: "text-[#cda873]",
  },
  {
    name: "Personal Information Masking Tool",
    category: "Cybersecurity / AI",
    description:
      "Detects and redacts PII from ID documents using EasyOCR with secure upload/download.",
    stack: ["Python", "EasyOCR", "Web Tech"],
    status: "BUILT",
    statusColor: "text-[#cda873]",
  },
  {
    name: "Porsche 3D Animated Brand Showcase",
    category: "3D Web / WebGL",
    description:
      "Scroll-driven 3D landing page with cinematic camera transitions and WebGL rendering.",
    stack: ["JavaScript", "Three.js", "WebGL", "GSAP"],
    status: "LIVE",
    statusColor: "text-[#cda873]",
  },
  {
    name: "BMW 3D Interactive Experience",
    category: "3D Web / WebGL",
    description:
      "Custom GLSL shaders for lighting and reflections with optimized loading.",
    stack: ["JavaScript", "Three.js", "WebGL", "GLSL"],
    status: "LIVE",
    statusColor: "text-[#cda873]",
  },
  {
    name: "Zenith & FusionX Symposium Websites",
    category: "Web Development",
    description:
      "Next.js sites for KGISL Institute of Technology. Live at zenith-kite.netlify.app and fusionxkitex.netlify.app.",
    stack: ["Next.js", "JavaScript", "HTML5", "CSS3"],
    status: "LIVE",
    statusColor: "text-[#cda873]",
  },
];

export default function ProjectsPage() {
  const { playHover, playSelect, playRevolver, playNotification, playPickup } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">Projects</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
            PROJECTS
          </h1>
          <div className="w-20 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-70" />
          <p className="text-white/60 font-sans tracking-wide text-sm">
            Shipped work across security, ML, and 3D web.
          </p>
        </div>

        {/* Cybersecurity focus */}
        <div className="mb-12 text-center">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">Cybersecurity focus</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "AI-Based Network Traffic Monitoring Dashboard",
              "Civic AIShield",
              "Personal Information Masking Tool",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onMouseEnter={playHover}
                className="text-[11px] font-sans uppercase tracking-widest px-3 py-1.5 border border-[#cda873]/40 text-[#cda873] bg-[#111]"
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
                className="h-full min-h-[320px] bg-[#111] border-white/10 p-6 flex flex-col group"
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
