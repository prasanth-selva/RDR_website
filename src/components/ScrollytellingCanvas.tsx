"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring, motion } from "framer-motion";
import Link from "next/link";
import { useGameSounds } from "@/hooks/useGameSounds";

const TOTAL_FRAMES = 120;

const pad = (n: number) => n.toString().padStart(3, "0");
const getSrc = (i: number) => `/images/hero-webp/ezgif-frame-${pad(i)}.webp`;

export default function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const sectionSoundRef = useRef({ hero: false, about: false, stats: false, cta: false });
  const { playDrum, playNotification, playPickup, playHover, playSelect, playWhistle } = useGameSounds();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Preload images in parallel batches
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      const batchSize = 10;
      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        const promises = [];
        for (let j = i; j < i + batchSize && j <= TOTAL_FRAMES; j++) {
          const promise = new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = getSrc(j);
            img.onload = () => {
              loadedCount++;
              setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              resolve(img);
            };
            img.onerror = () => {
              loadedCount++;
              setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              resolve(img);
            };
          });
          promises.push(promise);
        }
        const batchImages = await Promise.all(promises);
        loadedImages.push(...batchImages);
      }

      setImages(loadedImages);
      setLoaded(true);
    };

    loadImages();
  }, []);

  const drawImage = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = images[index - 1];
    if (!image || !image.width) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - image.width * ratio) / 2;
    const centerShift_y = (canvas.height - image.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
  };

  useEffect(() => {
    if (loaded) drawImage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    const handleResize = () => {
      if (loaded) drawImage(Math.round(frameIndex.get()));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      requestAnimationFrame(() => drawImage(Math.round(latest)));
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!sectionSoundRef.current.hero && latest >= 0.02) {
      sectionSoundRef.current.hero = true;
      playDrum();
    }
    if (!sectionSoundRef.current.about && latest >= 0.3) {
      sectionSoundRef.current.about = true;
      playWhistle();
    }
    if (!sectionSoundRef.current.stats && latest >= 0.58) {
      sectionSoundRef.current.stats = true;
      playNotification();
    }
    if (!sectionSoundRef.current.cta && latest >= 0.85) {
      sectionSoundRef.current.cta = true;
      playPickup();
    }
  });

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#050505]">
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-6">
            {/* Animated logo */}
            <div className="w-16 h-16 bg-[#cda873] text-black font-black text-2xl flex items-center justify-center animate-pulse">
              CB
            </div>
            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#cda873] to-white transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm font-sans tracking-widest text-white/50 uppercase">
              Loading Experience... {loadingProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-[5]" />

        {/* Overlay text sections */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center">
          <OverlayText scrollYProgress={smoothProgress} />
        </div>
      </div>
    </div>
  );
}

function OverlayText({ scrollYProgress }: { scrollYProgress: any }) {
  // 0–20%: Hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.22], [0, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -60]);

  // 28–48%: Section 1 — intro blurb
  const s1Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.44, 0.49], [0, 1, 1, 0]);
  const s1X = useTransform(scrollYProgress, [0.28, 0.49], [-60, 0]);

  // 55–75%: Section 2 — stats
  const s2Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.55, 0.75], [60, 0]);

  // 83–100%: CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.83, 0.88, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.83, 1], [60, 0]);

  const stats = [
    { value: "8+", label: "Projects Built" },
    { value: "5+", label: "Certifications" },
    { value: "15+", label: "Tools Mastered" },
  ];

  return (
    <div className="relative h-full w-full max-w-7xl mx-auto px-6 lg:px-16">

      {/* === HERO: 0% === */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <p className="text-[#cda873] tracking-[0.5em] text-xs uppercase mb-6 font-sans font-bold">
          Cyberbots Presents
        </p>
        <h1
          className="text-5xl md:text-8xl font-black tracking-tight font-serif"
          style={{
            color: "#ffffff",
            WebkitTextStroke: "2px rgba(205,168,115,0.8)",
            textShadow: "0 0 40px rgba(205,168,115,0.6), 0 0 80px rgba(0,0,0,0.9), 2px 4px 0px rgba(0,0,0,0.9), -2px -2px 0px rgba(0,0,0,0.8)",
            filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.95))",
          }}
        >
          PRASANTH S
        </h1>
        <div className="w-24 h-[2px] bg-[#cda873] mx-auto my-6 opacity-70" />
        <p
          className="text-lg md:text-2xl tracking-[0.25em] text-white/70 uppercase font-sans font-light"
          style={{
            WebkitTextStroke: "1px rgba(205,168,115,0.45)",
            textShadow: "0 0 25px rgba(205,168,115,0.35), 0 2px 6px rgba(0,0,0,0.85)",
          }}
        >
          AI Engineer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; Founder
        </p>
      </motion.div>

      {/* === SECTION 1: 30% — Who I am === */}
      <motion.div
        style={{ opacity: s1Opacity, x: s1X }}
        className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 md:px-16 w-full md:w-[55%]"
      >
        <p className="text-[#cda873] tracking-[0.3em] text-xs uppercase mb-4 font-sans font-bold">
          About Me
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 font-serif">
          I Build Things That Matter
        </h2>
        <p className="text-lg text-white/65 font-sans leading-relaxed">
          Founder of <span className="text-[#cda873] font-semibold">Cyberbots</span> — a startup at the intersection of AI, mobile, and web. I engineer intelligent products: from real-time threat detection systems to cinematic digital experiences.
        </p>
      </motion.div>

      {/* === SECTION 2: 60% — Stats === */}
      <motion.div
        style={{ opacity: s2Opacity, x: s2X }}
        className="absolute inset-y-0 right-0 flex flex-col justify-center text-right px-6 md:px-16 w-full md:w-[55%]"
      >
        <p className="text-[#cda873] tracking-[0.3em] text-xs uppercase mb-4 font-sans font-bold">
          The Numbers
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 font-serif">
          From Ideas to Products
        </h2>
        <div className="flex justify-end gap-8 md:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-end">
              <span className="text-4xl md:text-6xl font-black text-[#cda873] font-serif">{s.value}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest font-sans mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* === CTA: 90% === */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-serif mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="mt-2 text-lg text-white/60 font-sans mb-10">
          Explore my work, skills, and the story behind Cyberbots.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/world"
            onMouseEnter={playHover}
            onClick={() => { playSelect(); playPickup(); }}
            className="px-8 py-4 bg-[#cda873] text-black font-sans font-bold tracking-wider uppercase hover:bg-[#e5cc98] transition-all duration-300 hover:shadow-[0_0_20px_rgba(205,168,115,0.4)] hover:-translate-y-0.5"
          >
            View Projects
          </Link>
          <Link
            href="/journal"
            onMouseEnter={playHover}
            onClick={playSelect}
            className="px-8 py-4 border border-white/30 text-white font-sans font-bold tracking-wider uppercase hover:border-white/70 hover:bg-white/5 transition-all duration-300"
          >
            Contact Me
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
