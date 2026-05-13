"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center w-6 h-6"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        rotate: isHovering ? 45 : 0,
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
      {/* Center dot */}
      <div className={`w-1 h-1 rounded-full transition-colors ${isHovering ? "bg-[#ff4444]" : "bg-[#cda873]"}`} />

      {/* Crosshair lines */}
      <motion.div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-2 transition-colors ${isHovering ? "bg-[#ff4444]" : "bg-[#cda873]"}`}
        animate={{ y: isHovering ? -2 : 0 }}
      />
      <motion.div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] h-2 transition-colors ${isHovering ? "bg-[#ff4444]" : "bg-[#cda873]"}`}
        animate={{ y: isHovering ? 2 : 0 }}
      />
      <motion.div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1.5px] transition-colors ${isHovering ? "bg-[#ff4444]" : "bg-[#cda873]"}`}
        animate={{ x: isHovering ? -2 : 0 }}
      />
      <motion.div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1.5px] transition-colors ${isHovering ? "bg-[#ff4444]" : "bg-[#cda873]"}`}
        animate={{ x: isHovering ? 2 : 0 }}
      />
    </motion.div>
  );
}
