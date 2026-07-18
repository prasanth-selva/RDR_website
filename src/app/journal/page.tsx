"use client";

import { useState } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useGameSounds } from "@/hooks/useGameSounds";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "@prasanth-selva",
    href: "https://github.com/prasanth-selva",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    color: "#cda873",
  },
  {
    name: "LinkedIn",
    handle: "Prasanth Selva",
    href: "https://www.linkedin.com/in/prasanth-selva-1810aa315/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#cda873",
  },
  {
    name: "Instagram",
    handle: "@pr4santh.3x3",
    href: "https://www.instagram.com/pr4s4nth.3x3/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M7.5 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm9 2A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4zm-4.5 2.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 2A3.25 3.25 0 1 1 9.75 11.5 3.25 3.25 0 0 1 12 8.25zm5.4-1.15a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" />
      </svg>
    ),
    color: "#cda873",
  },
  {
    name: "Email",
    handle: "prasanthselvaraj1511@gmail.com",
    href: "mailto:prasanthselvaraj1511@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    color: "#cda873",
  },
  {
    name: "Phone",
    handle: "+91 9629365093",
    href: "tel:+919629365093",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.6 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.17a2 2 0 0 1 2.11-.45c.83.28 1.7.48 2.6.6a2 2 0 0 1 1.72 2.03z" />
      </svg>
    ),
    color: "#cda873",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const { playSelect, playHover } = useGameSounds();

  const copyEmail = () => {
    navigator.clipboard.writeText("prasanthselvaraj1511@gmail.com").then(() => {
      setCopied(true);
      playSelect();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white pt-32 pb-24 px-6 lg:px-12 relative font-serif flex items-center justify-center">

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-[#cda873] tracking-[0.3em] text-xs uppercase font-sans font-bold">
              Contact
            </span>
          </motion.div>

          {/* Hero heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-none"
          >
            LET&apos;S TALK
          </motion.h1>
          <motion.div variants={itemVariants} className="w-24 h-[2px] bg-[#cda873] mb-8 opacity-70" />

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/70 font-sans leading-relaxed mb-4 max-w-xl"
          >
            Open to full-time roles and freelance work. Share the role or project details and I will reply.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-sm text-white/60 font-sans tracking-wide mb-10"
          >
            Coimbatore, India | +91 9629365093
          </motion.p>

          {/* Social links */}
          <motion.div variants={itemVariants} className="w-full flex flex-col gap-4 mb-12">
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                whileHover={{ scale: 1.02, x: 4 }}
                className="group flex items-center gap-5 p-5 bg-[#111] border border-white/10 hover:border-[#cda873]/40 transition-all duration-200 text-left"
                style={{ "--link-color": link.color } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ color: link.color, backgroundColor: "#0f0f0f", border: `1px solid ${link.color}40` }}
                >
                  {link.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs font-sans tracking-widest uppercase mb-1">{link.name}</p>
                  <p className="text-white font-sans font-medium text-lg group-hover:text-[#cda873] transition-colors">
                    {link.handle}
                  </p>
                </div>
                <span className="text-white/20 group-hover:text-white/60 transition-colors text-2xl">→</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copy email button */}
          <motion.div variants={itemVariants} className="w-full mb-12">
            <button
              onClick={copyEmail}
              onMouseEnter={playHover}
              className="w-full p-4 border border-dashed border-white/20 text-white/60 font-sans text-sm tracking-widest uppercase hover:border-[#cda873]/50 hover:text-[#cda873] transition-all duration-200"
            >
              {copied ? "✓ Email Copied to Clipboard!" : "Click to Copy Email Address"}
            </button>
          </motion.div>

          {/* Resume download */}
          <motion.div variants={itemVariants}>
            <a
              href="/Prasanth_S_Resume.pdf"
              download
              onMouseEnter={playHover}
              onClick={playSelect}
              className="inline-flex items-center gap-3 px-10 py-3 bg-[#cda873] text-black font-sans font-bold tracking-widest uppercase transition-all duration-200 hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </motion.div>

          {/* Cyberbots signature */}
          <motion.div variants={itemVariants} className="mt-16 pt-6 border-t border-white/10 w-full text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#cda873] text-black font-black text-xs flex items-center justify-center">
                CB
              </div>
              <span className="text-white/40 font-sans text-sm tracking-widest uppercase">Cyberbots</span>
            </div>
            <p className="text-white/30 text-xs font-sans tracking-wider uppercase">
              Founded by Prasanth
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
