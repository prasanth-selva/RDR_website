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
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#0b0b0b]">
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0b]">
          <div className="flex flex-col items-center gap-6">
            {/* Animated logo */}
            <div className="w-16 h-16 bg-[#cda873] text-black font-black text-2xl flex items-center justify-center animate-pulse">
              CB
            </div>
            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#cda873] transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm font-sans tracking-widest text-white/50 uppercase">
              Loading... {loadingProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        {/* Flat overlay for readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-[5]" />

        {/* Overlay text sections */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center">
          <OverlayText
            scrollYProgress={smoothProgress}
            ctaHover={playHover}
            ctaPrimaryClick={() => { playSelect(); playPickup(); }}
            ctaSecondaryClick={playSelect}
          />
        </div>
      </div>
    </div>
  );
}

function OverlayText({
  scrollYProgress,
  ctaHover,
  ctaPrimaryClick,
  ctaSecondaryClick,
}: {
  scrollYProgress: any;
  ctaHover: () => void;
  ctaPrimaryClick: () => void;
  ctaSecondaryClick: () => void;
}) {
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
    { value: "8", label: "Projects" },
    { value: "8", label: "Certificates" },
    { value: "Top 50", label: "CTF Rank" },
  ];

  return (
    <div className="relative h-full w-full max-w-7xl mx-auto px-6 lg:px-16">

      {/* === HERO: 0% === */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <p className="text-[#cda873] tracking-[0.3em] text-xs uppercase mb-6 font-sans font-bold">
          Portfolio
        </p>
        <h1
          className="text-5xl md:text-7xl font-black tracking-tight font-serif text-white"
        >
          PRASANTH S
        </h1>
        <div className="w-24 h-[2px] bg-[#cda873] mx-auto my-6 opacity-70" />
        <p className="text-base md:text-lg tracking-wide text-white/80 font-sans">
          AI engineer, cybersecurity, and web developer.
        </p>
      </motion.div>

      {/* === SECTION 1: 30% — Who I am === */}
      <motion.div
        style={{ opacity: s1Opacity, x: s1X }}
        className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 md:px-16 w-full md:w-[55%]"
      >
        <p className="text-[#cda873] tracking-[0.2em] text-xs uppercase mb-4 font-sans font-bold">
          About
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 font-serif">
          I build AI and security tools.
        </h2>
        <p className="text-lg text-white/70 font-sans leading-relaxed">
          Founder of Cyberbots. I build threat detection tools, SOC dashboards, and fast web apps for real use.
        </p>
      </motion.div>

      {/* === SECTION 2: 60% — Stats === */}
      <motion.div
        style={{ opacity: s2Opacity, x: s2X }}
        className="absolute inset-y-0 right-0 flex flex-col justify-center text-right px-6 md:px-16 w-full md:w-[55%]"
      >
        <p className="text-[#cda873] tracking-[0.2em] text-xs uppercase mb-4 font-sans font-bold">
          Facts
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 font-serif">
          Work to date
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
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif mb-4">
          Projects and contact
        </h2>
        <p className="mt-2 text-lg text-white/70 font-sans mb-10">
          See projects, skills, and how to reach me.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/world"
            onMouseEnter={ctaHover}
            onClick={ctaPrimaryClick}
            className="px-8 py-3 bg-[#cda873] text-black font-sans font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-90"
          >
            Projects
          </Link>
          <Link
            href="/journal"
            onMouseEnter={ctaHover}
            onClick={ctaSecondaryClick}
            className="px-8 py-3 border border-white/30 text-white font-sans font-bold tracking-wider uppercase transition-all duration-200 hover:border-white/60"
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
