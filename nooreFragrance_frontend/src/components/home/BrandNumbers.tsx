"use client";

import { useBrandNumbersAnimation } from "@/animations/BrandNumbersAnimation";
import React, { useRef } from "react";


const BrandNumbers = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useBrandNumbersAnimation({
    containerRef,
    numberRefs,
  });

  const stats = [
    {
      label: "Happy Customers",
      suffix: "+",
    },
    {
      label: "Luxury Fragrances",
      suffix: "+",
    },
    {
      label: "Countries Served",
      suffix: "+",
    },
    {
      label: "Customer Satisfaction",
      suffix: "%",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
        {/* ───────────── SUBTLE GRID BACKGROUND (Global) ───────────── */}
      <div className="grid-bg absolute inset-0 pointer-events-none z-[1]" />


      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <div className="absolute w-[400px] h-[200px] rounded-full bg-gradient-to-r from-[#F3D9A4]/30 via-[#E9C176]/40 to-[#C9973E]/30 blur-[100px] scale-[1.5] dark:from-[#E9C176]/20 dark:via-[#D4A85F]/25 dark:to-[#C9973E]/20" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#E9C176]/20 blur-[120px] scale-[1.8] dark:bg-[#E9C176]/10" />
        <div className="absolute w-[1000px] h-[300px] rounded-full bg-gradient-to-t from-[#D4A85F]/20 to-transparent blur-[100px] scale-[1.4] dark:from-[#D4A85F]/10" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* small badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9C176]/10 text-[#8A703A] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase dark:text-[#E9C176]">
          Brand Impact
        </span>

        {/* heading */}
        <h2 className="mt-6 text-4xl sm:text-5xl font-semibold font-heading text-primary">
          Crafted With
          <span className="block bg-gradient-to-r from-[#B8943E] to-[#E9C176] bg-clip-text text-transparent">
            Precision & Passion
          </span>
        </h2>

        <p className="mt-6 text-secondary-light max-w-2xl mx-auto text-base sm:text-lg">
          Every number represents trust, emotion, and a growing global
          fragrance experience.
        </p>

        {/* stats grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <span
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
                className="text-4xl sm:text-5xl font-semibold text-primary font-heading"
              >
                0
              </span>

              <p className="mt-3 text-secondary-light text-sm sm:text-base tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandNumbers;