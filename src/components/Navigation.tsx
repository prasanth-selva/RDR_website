"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGameSounds } from "@/hooks/useGameSounds";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const { playHover, playSelect } = useGameSounds();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Journey", path: "/story" },
    { name: "Projects", path: "/world" },
    { name: "Skills", path: "/bounty-board" },
    { name: "Certs", path: "/arsenal" },
    { name: "Contact", path: "/journal" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          onClick={playSelect}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-[#cda873] text-black font-black text-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(205,168,115,0.5)]">
            CB
          </div>
          <span className="text-lg font-bold tracking-widest text-white/90 group-hover:text-[#cda873] transition-colors duration-300 font-serif">
            PRASANTH S
          </span>
        </Link>

        <ul className="flex space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onMouseEnter={playHover}
                  onClick={playSelect}
                  className={`relative px-2 py-1 text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? "text-[#cda873]" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#cda873]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
