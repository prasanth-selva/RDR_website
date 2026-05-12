"use client";

import { useCallback, useEffect, useRef } from "react";

export function useGameSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);

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

  // ── Subtle metallic tick for hover ──────────────────────────────
  const playHover = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.04);
  }, []);

  // ── Heavy thud/click for selection ──────────────────────────────
  const playSelect = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.14);
  }, []);

  // ── Revolver hammer cock — sharp metallic snap ──────────────────
  const playRevolver = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    // Main snap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    // Metallic ring overlay
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(2800, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain); gain.connect(ctx.destination);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.06);
    osc2.start(); osc2.stop(ctx.currentTime + 0.08);
  }, []);

  // ── Gunshot — deep BOOM ──────────────────────────────────────────
  const playGunshot = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    // Low boom
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 180;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1.0, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    // Sharp crack
    const crack = ctx.createOscillator();
    const crackGain = ctx.createGain();
    crack.type = "sawtooth";
    crack.frequency.setValueAtTime(800, ctx.currentTime);
    crack.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
    crackGain.gain.setValueAtTime(0, ctx.currentTime);
    crackGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.002);
    crackGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    crack.connect(crackGain); crackGain.connect(ctx.destination);
    noise.start(); noise.stop(ctx.currentTime + 0.3);
    crack.start(); crack.stop(ctx.currentTime + 0.05);
  }, []);

  // ── Dramatic drum hit — cinematic tension ────────────────────────
  const playDrum = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.25);
  }, []);

  // ── Western whistle — eerie frontier tone ───────────────────────
  const playWhistle = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(650, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.22, ctx.currentTime + 0.4);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.5);
  }, []);

  // ── Spurs jingle — boot spur clink on interaction ───────────────
  const playSpurs = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    [0, 0.05, 0.1, 0.17].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 1800 + i * 300;
      gain.gain.setValueAtTime(0, ctx.currentTime + offset);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + offset + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.12);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.12);
    });
  }, []);

  // ── Reload clunk — lever-action mechanism ───────────────────────
  const playReload = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    // Thunk
    const thunk = ctx.createOscillator();
    const thunkGain = ctx.createGain();
    thunk.type = "square";
    thunk.frequency.setValueAtTime(200, ctx.currentTime);
    thunk.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.08);
    thunkGain.gain.setValueAtTime(0.45, ctx.currentTime);
    thunkGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    // Slide back
    const slide = ctx.createOscillator();
    const slideGain = ctx.createGain();
    slide.type = "sawtooth";
    slide.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
    slide.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
    slideGain.gain.setValueAtTime(0, ctx.currentTime + 0.1);
    slideGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.12);
    slideGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    thunk.connect(thunkGain); thunkGain.connect(ctx.destination);
    slide.connect(slideGain); slideGain.connect(ctx.destination);
    thunk.start(); thunk.stop(ctx.currentTime + 0.08);
    slide.start(ctx.currentTime + 0.1); slide.stop(ctx.currentTime + 0.2);
  }, []);

  // ── Mission notification — iconic game ping ──────────────────────
  const playNotification = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5 chord arpeggio
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.24, t + 0.02);
      gain.gain.setValueAtTime(0.24, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.35);
    });
  }, []);

  // ── Pickup — coin/badge collect chime ────────────────────────────
  const playPickup = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    [880, 1318.5, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.04;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.2);
    });
  }, []);

  // ── Horse gallop — rhythmic hoofbeats ────────────────────────────
  const playGallop = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    [0, 0.07, 0.13, 0.22].forEach((offset) => {
      const bufSize = Math.round(ctx.sampleRate * 0.04);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.55, ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.04);
      src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      src.start(ctx.currentTime + offset);
    });
  }, []);

  return {
    playHover,
    playSelect,
    playRevolver,
    playGunshot,
    playDrum,
    playWhistle,
    playSpurs,
    playReload,
    playNotification,
    playPickup,
    playGallop,
  };
}
