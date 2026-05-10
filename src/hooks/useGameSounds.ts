"use client";

import { useCallback, useEffect, useRef } from "react";

export function useGameSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener("click", initAudio, { once: true });
    window.addEventListener("keydown", initAudio, { once: true });

    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  const playHover = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Create a subtle metallic tick for hover
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  const playSelect = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Create a heavier, resonant "thud/click" for selection
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, []);

  return { playHover, playSelect };
}
