"use client";

import TiltCard from "@/components/TiltCard";
import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";

const SKILLS = [
  {
    category: "AI & Machine Learning",
    level: "ADVANCED",
    levelColor: "text-[#4ade80] border-[#4ade80]/30",
    proficiency: 90,
    items: ["Python", "OpenCV", "YOLO", "TensorFlow", "Streamlit", "NumPy", "Pandas", "scikit-learn"],
    description: "Building intelligent systems from scratch — CV pipelines, threat detection, habit analysis, and real-time analytics.",
    image: "https://www.transparenttextures.com/patterns/dark-leather.png",
  },
  {
    category: "Mobile Development",
    level: "ADVANCED",
    levelColor: "text-[#cda873] border-[#cda873]/30",
    proficiency: 87,
    items: ["Flutter", "Dart", "Firebase", "Supabase", "Razorpay", "REST APIs", "Hive", "Provider"],
    description: "Cross-platform apps deployed to iOS & Android — from ordering systems to research lab tools.",
    image: "https://www.transparenttextures.com/patterns/black-scales.png",
  },
  {
    category: "Web Development",
    level: "PROFICIENT",
    levelColor: "text-[#60a5fa] border-[#60a5fa]/30",
    proficiency: 85,
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js", "CSS3", "HTML5"],
    description: "Premium web experiences — cinematic portfolios, enterprise portals, and product showcases.",
    image: "https://www.transparenttextures.com/patterns/black-felt.png",
  },
  {
    category: "Tools & DevOps",
    level: "PROFICIENT",
    levelColor: "text-[#f472b6] border-[#f472b6]/30",
    proficiency: 80,
    items: ["Git", "Linux", "ffmpeg", "ImageMagick", "Figma", "VS Code", "Postman", "SQLite"],
    description: "Comfortable across the full toolchain — from local dev to deployment, image processing to API testing.",
    image: "https://www.transparenttextures.com/patterns/black-twine.png",
  },
];

export default function SkillsPage() {
  const { playHover, playSelect } = useGameSounds();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-15 pointer-events-none mix-blend-overlay z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 mt-4">
          <p className="text-xs font-sans tracking-[0.4em] text-[#cda873] uppercase mb-4 font-bold">Tech Stack</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-lg mb-4">
            SKILLS
          </h1>
          <div className="w-24 h-[2px] bg-[#cda873] mx-auto mb-6 opacity-60" />
          <p className="text-white/50 font-sans tracking-[0.2em] uppercase text-sm">
            Tools of the trade. Sharpened in the field.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1200px]">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard
                onHoverStart={playHover}
                onClick={playSelect}
                className="h-full min-h-[500px] bg-[#0d0d0d] border-white/10 p-6 flex flex-col group"
              >
                {/* Texture bg */}
                <div
                  className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none rounded-xl"
                  style={{ backgroundImage: `url(${skill.image})` }}
                />

                <div className="flex flex-col h-full">
                  {/* Level badge */}
                  <div className="flex justify-between items-center mb-5">
                    <span className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase border px-2 py-1 ${skill.levelColor}`}>
                      {skill.level}
                    </span>
                    <span className="text-2xl font-black text-white/20 font-sans">{skill.proficiency}</span>
                  </div>

                  {/* Category */}
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#e5cc98] transition-colors leading-tight">
                    {skill.category}
                  </h2>
                  <p className="text-white/50 font-sans text-xs leading-relaxed mb-5">
                    {skill.description}
                  </p>

                  {/* Proficiency bar */}
                  <div className="mb-5">
                    <div className="w-full h-1 bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                        className="h-full bg-gradient-to-r from-[#cda873]/60 to-[#cda873]"
                      />
                    </div>
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-[9px] font-sans font-medium uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/8 text-white/50 group-hover:border-white/15 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
