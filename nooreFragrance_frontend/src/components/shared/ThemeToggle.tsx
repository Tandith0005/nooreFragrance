"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        className="p-2 rounded-full w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full backdrop-blur-md transition-all duration-300 
                 hover:scale-110 active:scale-95 border border-white/20
                 hover:border-[#E9C176]/30"
      style={{
        background: "var(--card-bg, rgba(255, 255, 255, 0.08))",
        color: "var(--secondary, #D4A85F)",
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="w-5 h-5" />
      ) : (
        <MdOutlineDarkMode className="w-5 h-5" />
      )}
    </button>
  );
}