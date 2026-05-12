"use client";

import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const { playHover } = useGameSounds();

  const features = [
    {
      title: "AI Systems",
      description:
        "Computer vision pipelines, real-time threat detection, and ML-powered analytics. I build AI that works in the wild, not just in notebooks.",
      icon: "⚡",
      image: "https://www.transparenttextures.com/patterns/black-scales.png",
    },
    {
      title: "Mobile Apps",
      description:
        "Flutter-powered cross-platform apps deployed on iOS & Android. Designed for real users with clean UX, modern backends, and payment integrations.",
      icon: "📱",
      image: "https://www.transparenttextures.com/patterns/worn-dots.png",
    },
    {
      title: "Web Experiences",
      description:
        "Cinematic, scroll-driven web experiences powered by Next.js and Framer Motion. Like this portfolio — engineered to impress and perform.",
      icon: "🌐",
      image: "https://www.transparenttextures.com/patterns/stardust.png",
    },
  ];

  return (
    <section className="relative w-full bg-[#050505] border-t border-white/5 py-32 px-6 md:px-12 font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">What I Do</p>
          <h2 className="text-4xl md:text-6xl text-white font-bold">Built with Precision</h2>
          <div className="w-24 h-[2px] bg-[#cda873] mx-auto mt-8 opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-[1000px]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ rotateX: 20, y: 50, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
              onMouseEnter={playHover}
              className="group relative bg-[#0a0a0a] border border-white/5 p-8 transition-all duration-500 hover:border-[#cda873]/30 hover:bg-[#111] hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(205,168,115,0.08)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundImage: `url(${feature.image})` }}
              />
              <div style={{ transform: "translateZ(30px)" }}>
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl text-white mb-4 relative z-10 group-hover:text-[#cda873] transition-colors font-bold">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-sans leading-relaxed relative z-10 text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Bottom glow bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#cda873] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
