"use client";

import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const { playHover } = useGameSounds();

  const proofs = [
    {
      title: "RDR portfolio",
      metric: "120 frames",
      detail: "Hero sequence compressed to 26MB WebP.",
      image: "/images/hero-webp/ezgif-frame-060.webp",
    },
    {
      title: "Certifications",
      metric: "8 verified",
      detail: "Cisco + Google + professional certs.",
      image: "/images/certs/google.webp",
    },
    {
      title: "CTF rank",
      metric: "Top 50",
      detail: "Malla Reddy Univ. CTF 2026.",
    },
    {
      title: "Projects shipped",
      metric: "8",
      detail: "AI, security, web, and mobile builds.",
    },
  ];

  return (
    <section className="relative w-full bg-[#0b0b0b] border-t border-white/10 py-28 px-6 md:px-12 font-serif">

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-sans tracking-[0.3em] text-[#cda873] uppercase mb-4 font-bold">Proof</p>
          <h2 className="text-3xl md:text-5xl text-white font-bold">Real work, real numbers</h2>
          <div className="w-20 h-[2px] bg-[#cda873] mx-auto mt-6 opacity-70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofs.map((proof, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={playHover}
              className="group relative bg-[#111] border border-white/10 p-6 transition-colors duration-200 hover:border-[#cda873]/40"
            >
              {proof.image && (
                <div className="w-full h-36 bg-[#0d0d0d] border border-white/10 mb-5 overflow-hidden">
                  <img src={proof.image} alt={proof.title} className="w-full h-full object-contain" />
                </div>
              )}
              <p className="text-xs font-sans uppercase tracking-widest text-white/50 mb-2">{proof.title}</p>
              <p className="text-3xl font-black text-[#cda873] mb-2">{proof.metric}</p>
              <p className="text-white/70 font-sans text-sm leading-relaxed">{proof.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
