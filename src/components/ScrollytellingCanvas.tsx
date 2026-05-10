"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 240;

const pad = (n: number) => n.toString().padStart(3, "0");
const getSrc = (i: number) => `/images/hero/ezgif-frame-${pad(i)}.png`;

export default function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Scroll logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index (1-240)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      // To speed up loading, we can load them in parallel batches, 
      // but sequential is safer for ordering. Let's do parallel batches of 10.
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
              resolve(img); // Resolve anyway to not break Promise.all
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

  // Draw image to canvas
  const drawImage = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use 1-based index but arrays are 0-indexed
    const image = images[index - 1];
    if (!image || !image.width) return; // check if image is valid

    // Set canvas dimensions to match window size for full bleed
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate aspect ratio to fit image while covering the area (or containing it)
    // The prompt asked for "contain fit" - meaning we see the whole product.
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.min(hRatio, vRatio); // Use min for contain, max for cover

    const centerShift_x = (canvas.width - image.width * ratio) / 2;
    const centerShift_y = (canvas.height - image.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      centerShift_x,
      centerShift_y,
      image.width * ratio,
      image.height * ratio
    );
  };

  // Initial draw when loaded
  useEffect(() => {
    if (loaded) {
      drawImage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  // Redraw on window resize
  useEffect(() => {
    const handleResize = () => {
      if (loaded) {
        drawImage(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      // Use requestAnimationFrame to ensure smooth drawing without stutter
      requestAnimationFrame(() => {
        drawImage(Math.round(latest));
      });
    }
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white"></div>
            <p className="mt-4 text-sm font-medium tracking-widest text-white/60">
              INITIALIZING EXPERIENCE... {loadingProgress}%
            </p>
          </div>
        </div>
      )}
      
      {/* Sticky container for the canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* We can place the canvas in an absolute div with gradient edges to hide seams if the image isn't perfectly solid */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center">
          <OverlayText scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}

// Separate component for text overlays so we can use useTransform without cluttering the main component
function OverlayText({ scrollYProgress }: { scrollYProgress: any }) {
  const { motion } = require("framer-motion");

  // Define opacity and transform for each section
  // 0% - 10%: Hero Headline
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // 25% - 40%: Feature #1
  const f1Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const f1X = useTransform(scrollYProgress, [0.25, 0.45], [-50, 0]);

  // 50% - 75%: Feature #2
  const f2Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const f2X = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);

  // 85% - 100%: CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

  return (
    <div className="relative h-full w-full max-w-7xl mx-auto px-6 lg:px-12">
      {/* 0% Scroll */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90">
          LUMINA
        </h1>
        <p className="mt-4 text-lg tracking-widest text-white/60 max-w-xl uppercase">
          The future of holographic displays.
        </p>
      </motion.div>

      {/* 30% Scroll */}
      <motion.div
        style={{ opacity: f1Opacity, x: f1X }}
        className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 md:px-12 w-full md:w-1/2"
      >
        <h2 className="text-4xl font-bold tracking-tight text-white/90">
          Precision Engineering
        </h2>
        <p className="mt-4 text-lg text-white/60">
          Every component is meticulously designed to create an immersive visual
          experience. Watch it separate into its core elements.
        </p>
      </motion.div>

      {/* 60% Scroll */}
      <motion.div
        style={{ opacity: f2Opacity, x: f2X }}
        className="absolute inset-y-0 right-0 flex flex-col justify-center text-right px-6 md:px-12 w-full md:w-1/2"
      >
        <h2 className="text-4xl font-bold tracking-tight text-white/90">
          Inner Complexity
        </h2>
        <p className="mt-4 text-lg text-white/60 ml-auto">
          Beneath the sleek exterior lies a complex array of optics and sensors, 
          working in perfect harmony to project light into thin air.
        </p>
      </motion.div>

      {/* 90% Scroll */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-5xl font-bold tracking-tight text-white/90">
          Pre-order Lumina Today
        </h2>
        <p className="mt-4 text-lg text-white/60 mb-8">
          Reassembling the future, available this fall.
        </p>
        <button className="px-8 py-4 bg-white text-black font-semibold tracking-wider uppercase hover:bg-white/90 transition-colors rounded-full">
          Reserve Now
        </button>
      </motion.div>
    </div>
  );
}
