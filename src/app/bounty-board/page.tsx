"use client";

import TiltCard from "@/components/TiltCard";
import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";

const SKILLS = [
  {
    category: "Cybersecurity",
    level: "ADVANCED",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 88,
    items: ["Network Security", "SOC Operations", "SIEM", "Log Analysis", "Anomaly Detection", "Ethical Hacking", "CTF", "Pen Testing"],
    description: "Top 50 in the 2026 CTF at Malla Reddy Univ. Cybersecurity Dept. association president. Google and Cisco certified.",
    image: "",
    accentColor: "#cda873",
  },
  {
    category: "AI & Machine Learning",
    level: "ADVANCED",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 90,
    items: ["Python", "OpenCV", "YOLO", "Scikit-learn", "Streamlit", "EasyOCR", "NumPy", "Pandas"],
    description: "Computer vision pipelines, threat detection, and ML scoring.",
    image: "",
    accentColor: "#cda873",
  },
  {
    category: "3D Web & Graphics",
    level: "PROFICIENT",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 85,
    items: ["Three.js", "WebGL", "GLSL Shaders", "GSAP", "React", "Next.js", "HTML5", "CSS3"],
    description: "3D web experiences with WebGL and custom shaders.",
    image: "",
    accentColor: "#cda873",
  },
  {
    category: "Full-Stack & APIs",
    level: "PROFICIENT",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 85,
    items: ["FastAPI", "REST APIs", "Node.js", "TypeScript", "Supabase", "Firebase", "Python", "Full-Stack"],
    description: "REST APIs and FastAPI services for security analytics.",
    image: "",
    accentColor: "#cda873",
  },
  {
    category: "Mobile Development",
    level: "PROFICIENT",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 82,
    items: ["Flutter", "Dart", "Firebase", "Supabase", "Hive", "Provider", "REST APIs", "Cross-Platform"],
    description: "Flutter apps built for real users and production use.",
    image: "",
    accentColor: "#cda873",
  },
  {
    category: "Tools & Languages",
    level: "PROFICIENT",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 80,
    items: ["Python", "JavaScript", "Java", "C", "Bash", "Git", "Linux", "Figma"],
    description: "Daily tools across coding, scripting, and deployment.",
    image: "",
    accentColor: "#cda873",
  },
];

export default function SkillsPage() {
  const { playHover, playSelect, playSpurs, playPickup } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 mt-4">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">Skills</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
            SKILLS
          </h1>
          <div className="w-20 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-70" />
          <p className="text-white/60 font-sans tracking-wide text-sm">
            Focused areas and daily tools.
          </p>
        </div>

        {/* Skills grid — 3 columns on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1200px]">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard
                onHoverStart={() => { playHover(); if (i % 2 === 0) playSpurs(); }}
                onClick={() => { playSelect(); playPickup(); }}
                className="h-full min-h-[380px] bg-[#111] border-white/10 p-6 flex flex-col group"
              >
                <div className="flex flex-col h-full">
                  {/* Level badge + proficiency number */}
                  <div className="flex justify-between items-center mb-5">
                    <span className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase border px-2 py-1 ${skill.levelColor}`}>
                      {skill.level}
                    </span>
                    <span
                      className="text-2xl font-black font-sans opacity-30"
                      style={{ color: skill.accentColor }}
                    >
                      {skill.proficiency}
                    </span>
                  </div>

                  {/* Category */}
                  <h2
                    className="text-xl font-bold mb-2 group-hover:opacity-100 transition-all leading-tight"
                    style={{ color: "#ffffff" }}
                  >
                    {skill.category}
                  </h2>
                  <p className="text-white/65 font-sans text-sm leading-relaxed mb-5">
                    {skill.description}
                  </p>

                  {/* Proficiency bar */}
                  <div className="mb-5">
                    <div className="w-full h-[2px] bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1 + 0.3 }}
                        className="h-full"
                        style={{ background: skill.accentColor }}
                      />
                    </div>
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-[9px] font-sans font-medium uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/8 text-white/45 group-hover:text-white/65 transition-colors"
                        style={{ borderColor: `${skill.accentColor}15` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full rounded-b-xl"
                  style={{ background: skill.accentColor }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
