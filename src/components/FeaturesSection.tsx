"use client";

import { useGameSounds } from "@/hooks/useGameSounds";

export default function FeaturesSection() {
  const { playHover } = useGameSounds();

  const features = [
    {
      title: "Dead Eye Targeting",
      description: "Slow down time and paint your targets. Precision is the difference between life and death on the frontier.",
      image: "https://www.transparenttextures.com/patterns/black-scales.png", // Texture placeholder
    },
    {
      title: "A Living World",
      description: "From the snow-capped peaks of Ambarino to the swamps of Lemoyne, the world reacts to your every action.",
      image: "https://www.transparenttextures.com/patterns/worn-dots.png",
    },
    {
      title: "Honor System",
      description: "Will you be a ruthless outlaw or a noble gunslinger? Your choices shape how the world perceives you.",
      image: "https://www.transparenttextures.com/patterns/stardust.png",
    }
  ];

  return (
    <section className="relative w-full bg-[#050505] border-t border-white/5 py-32 px-6 md:px-12 font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans tracking-[0.3em] text-[#8b0000] uppercase mb-4 font-bold">The Experience</h2>
          <h3 className="text-4xl md:text-6xl text-white font-bold">Forged in the Wild</h3>
          <div className="w-24 h-1 bg-[#cda873] mx-auto mt-8 opacity-60"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <div 
              key={i}
              onMouseEnter={playHover}
              className="group relative bg-[#0a0a0a] border border-white/5 p-8 transition-all duration-500 hover:border-[#cda873]/30 hover:bg-[#111]"
            >
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>
              <h4 className="text-2xl text-white mb-4 relative z-10 group-hover:text-[#cda873] transition-colors">{feature.title}</h4>
              <p className="text-white/60 font-sans leading-relaxed relative z-10">{feature.description}</p>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#8b0000] transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
