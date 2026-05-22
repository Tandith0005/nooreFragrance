// LuxuryPerfumeHero.tsx
"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import {
  useHeroAnimation,
  useScrollHintBounce,
  useFloatingPerfumeImages,
} from "@/animations/HomeAnimation";
import Image from "next/image";

export default function LuxuryPerfumeHero() {
  // Create refs for animation targets
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const secondHeadingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Create refs for floating images (11 images total)
  const frontImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Apply animations
  useHeroAnimation({
    badgeRef,
    headingRef,
    secondHeadingRef,
    subtitleRef,
    buttonsRef,
    scrollHintRef,
  });

  // Apply continuous scroll hint bounce
  useScrollHintBounce(scrollHintRef);

  // Apply floating image animations
  useFloatingPerfumeImages({
    frontImageRefs,
    backImageRefs,
  });

  // Sample image paths - replace with your actual perfume bottle images
  const frontImages = [
    "/images/perfume (13).webp",
    "/images/perfume (10).webp",
    "/images/perfume (18).webp",
    "/images/perfume (16).webp",
    "/images/perfume (12).webp",
    "/images/perfume (20).webp",
  ];

  const backImages = [
    "/images/perfume (16).webp",
    "/images/perfume (17).webp",
    "/images/perfume (18).webp",
    "/images/perfume (19).webp",
    "/images/perfume (20).webp",
  ];

  // Front image positions (6 images) - NO SCALE, NO ROTATE
  const frontPositions = [
    // LEFT SIDE
    { top: "12%",   left: "15%",  hiddenOnMobile: true  }, // top-left      — hidden mobile
    { top: "42%",   left: "10%",  hiddenOnMobile: false }, // middle-left   — VISIBLE mobile
    { top: "68%",   left: "16%",  hiddenOnMobile: true  }, // lower-left    — hidden mobile
    // RIGHT SIDE
    { top: "8%",   right: "15%", hiddenOnMobile: true  }, // top-right     — hidden mobile
    { top: "34%",   right: "10%", hiddenOnMobile: false }, // middle-right  — VISIBLE mobile
    { bottom: "18%", right: "14%", hiddenOnMobile: true  }, // lower-right   — hidden mobile
  ];

  // Back image positions (5 images with depth) - NO SCALE, NO ROTATE, only positioning
  const backPositions = [
    { top: "5%", left: "-5%", opacity: 0.4, blur: "0px" },
    { top: "30%", right: "-8%", opacity: 0.3, blur: "12px" },
    { bottom: "-10%", left: "15%", opacity: 0.2, blur: "16px" },
    { top: "60%", left: "-12%", opacity: 0.35, blur: "10px" },
    { bottom: "20%", right: "-15%", opacity: 0.15, blur: "20px" },
  ];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 selection:bg-[#E9C176]/30 selection:text-[#5A554E]">
      {/* ───────────── FLOATING PERFUME IMAGES LAYER ───────────── */}
      {/* Front Images Layer - Higher z-index, fully visible */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {frontImages.map((src, index) => (
          <div
            key={`front-${index}`}
            ref={(el) => { frontImageRefs.current[index] = el; }}
            className="absolute will-change-transform"
            style={{
              ...frontPositions[index],
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
            }}
          >
            <div className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px]">
              <Image
                src={src}
                alt={`Luxury perfume ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 180px"
                priority={index < 3}
                quality={90}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Background Images Layer - Behind everything */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {backImages.map((src, index) => (
          <div
            key={`back-${index}`}
            ref={(el) => { backImageRefs.current[index] = el; }}
            className="absolute will-change-transform"
            style={{
              ...backPositions[index],
              opacity: backPositions[index].opacity,
              filter: `blur(${backPositions[index].blur}) drop-shadow(0 10px 20px rgba(0,0,0,0.1))`,
            }}
          >
            <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]">
              <Image
                src={src}
                alt={`Distant perfume ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 250px"
                priority={false}
                quality={70}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ───────────── SUBTLE GRID BACKGROUND (Global) ───────────── */}
      <div className="grid-bg absolute inset-0 pointer-events-none z-[1]" />

      {/* Soft radial amber wash for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,217,164,0.12),transparent_65%)] pointer-events-none dark:bg-[radial-gradient(circle_at_center,rgba(233,193,118,0.06),transparent_70%)] z-[1]" />

      {/* Massive Glow Behind Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <div className="absolute w-[400px] h-[200px] rounded-full bg-gradient-to-r from-[#F3D9A4]/30 via-[#E9C176]/40 to-[#C9973E]/30 blur-[100px] scale-[1.5] dark:from-[#E9C176]/20 dark:via-[#D4A85F]/25 dark:to-[#C9973E]/20" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#E9C176]/20 blur-[120px] scale-[1.8] dark:bg-[#E9C176]/10" />
        <div className="absolute w-[1000px] h-[300px] rounded-full bg-gradient-to-t from-[#D4A85F]/20 to-transparent blur-[100px] scale-[1.4] dark:from-[#D4A85F]/10" />
      </div>

      {/* Content Container - High z-index */}
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
        <div className="relative z-10 space-y-6 sm:space-y-8">
          {/* Luxury Badge */}
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9C176]/10 text-[#8A703A] text-xs sm:text-sm font-medium tracking-wider uppercase backdrop-blur-sm dark:bg-[#E9C176]/15 dark:text-[#E9C176]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A85F] dark:bg-[#E9C176]" />
            Bangladesh&apos;s Premium Fragrance House
          </span>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-primary dark:text-primary"
          >
            Perfume That Speaks
          </h1>
          <h2 ref={secondHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] bg-gradient-to-r from-[#B8943E] to-[#D4A85F] bg-clip-text text-transparent dark:from-[#D4A85F] dark:to-[#E9C176]">
            Before You Do
          </h2>

          {/* Supporting Paragraph */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light text-[#5A554E]/80 dark:text-[#B0A898]/80"
          >
            Crafted for those who understand that true elegance lingers.
            Discover a signature scent designed to leave an unforgettable
            impression.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col gap-6 justify-center items-center pt-2"
          >
            <Link href="/shop">
              <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9973E] to-[#D4A85F] text-white font-medium shadow-lg shadow-[#C9973E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9973E]/25 active:scale-[0.98] dark:from-[#D4A85F] dark:to-[#E9C176] dark:shadow-[#E9C176]/15">
                Explore Collection
              </button>
            </Link>

            <div
              ref={scrollHintRef}
              className="flex flex-row justify-center items-center gap-2"
            >
              Scroll Down
              <FaLevelDownAlt size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}