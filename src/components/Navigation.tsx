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
    { name: "The World", path: "/world" },
    { name: "Bounty Board", path: "/bounty-board" },
    { name: "Arsenal", path: "/arsenal" },
    { name: "Journal", path: "/journal" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 font-serif">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" onClick={playSelect} className="text-2xl font-bold tracking-widest text-[#cda873]">
          LUMINA
        </Link>
        
        <ul className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onMouseEnter={playHover}
                  onClick={playSelect}
                  className={`relative px-2 py-1 text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8b0000]"
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
