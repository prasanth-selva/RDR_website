"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { useGameSounds } from "@/hooks/useGameSounds";

const PROJECTS = [
  {
    name: "SafeWatch AI",
    category: "AI / Computer Vision",
    description:
      "Real-time CCTV threat detection using YOLO and OpenCV. Identifies fights, falls, and harassment with a live Streamlit dashboard and snapshot alerting pipeline.",
    stack: ["Python", "OpenCV", "YOLO", "Streamlit"],
    status: "BUILT",
    statusColor: "text-[#4ade80]",
  },
  {
    name: "Mudra",
    category: "Mobile App",
    description:
      "Print-ordering platform for students. Role-based Flutter app with Supabase backend, Razorpay payment gateway, and real-time order tracking.",
    stack: ["Flutter", "Supabase", "Razorpay", "Dart"],
    status: "DEPLOYED",
    statusColor: "text-[#cda873]",
  },
  {
    name: "Seshadri Lab App",
    category: "Mobile App",
    description:
      "University research lab mobile app featuring teaching content, team profiles, course galleries, and publication listings.",
    stack: ["Flutter", "Firebase", "Dart"],
    status: "DEPLOYED",
    statusColor: "text-[#cda873]",
  },
  {
    name: "Streakly / LifeOS",
    category: "Mobile App",
    description:
      "AI-powered habit tracking super-app with streak management, multi-metric analytics, calendar heatmaps, and swipeable dashboards.",
    stack: ["Flutter", "Firebase", "Dart"],
    status: "BUILT",
    statusColor: "text-[#60a5fa]",
  },
  {
    name: "RDR Portfolio",
    category: "Web Experience",
    description:
      "This cinematic scroll-driven portfolio. 120 WebP animation frames, framer-motion overlays, 3D tilt cards, Web Audio API sound effects.",
    stack: ["Next.js", "Framer Motion", "TypeScript"],
    status: "LIVE",
    statusColor: "text-[#f472b6]",
  },
  {
    name: "Koenigsegg Site",
    category: "Web Experience",
    description:
      "Ultra-premium hypercar brand website with cinematic parallax, immersive product presentations, and smooth scroll animations.",
    stack: ["Next.js", "GSAP", "TypeScript", "CSS"],
    status: "BUILT",
    statusColor: "text-[#60a5fa]",
  },
  {
    name: "Civic AI Shield",
    category: "AI / Analytics",
    description:
      "SafeWatch's parent module — a modular civic threat intelligence platform integrating multiple detection pipelines with a unified alerting system.",
    stack: ["Python", "Streamlit", "OpenCV", "NumPy"],
    status: "BUILT",
    statusColor: "text-[#60a5fa]",
  },
  {
    name: "HENNGE Portal",
    category: "Web",
    description:
      "Enterprise-grade web portal with modern authentication, responsive multi-role UI, and clean design system.",
    stack: ["React", "TypeScript", "CSS"],
    status: "BUILT",
    statusColor: "text-[#60a5fa]",
  },
];

export default function ProjectsPage() {
  const { playHover, playSelect } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-sans tracking-[0.4em] text-[#cda873] uppercase mb-4 font-bold">What I've Built</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-lg mb-4">
            PROJECTS
          </h1>
          <div className="w-24 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-60" />
          <p className="text-white/50 font-sans tracking-[0.2em] uppercase text-sm">
            Real products. Real users. Real impact.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1200px]">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <TiltCard
                onHoverStart={playHover}
                onClick={playSelect}
                className="h-full min-h-[320px] bg-[#0d0d0d] border-white/10 p-6 flex flex-col group"
              >
                {/* Status badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-white/30 border border-white/10 px-2 py-0.5">
                    {project.category}
                  </span>
                  <span className={`text-[10px] font-sans font-bold tracking-wider uppercase ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#e5cc98] transition-colors">
                  {project.name}
                </h2>

                {/* Description */}
                <p className="text-white/55 font-sans text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
