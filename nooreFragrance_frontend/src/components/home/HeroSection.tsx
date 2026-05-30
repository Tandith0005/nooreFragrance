// LuxuryPerfumeHero.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import Image from "next/image";
import {
  useElegantFloat,
  useFloatingPerfumeImages,
  useHeroAnimation,
  useTextFadeOnScroll,
} from "@/animations/HomeAnimation";

export default function LuxuryPerfumeHero() {
  // Create refs for animation targets
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const secondHeadingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Create refs for floating images (11 images total)
  const frontImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchbarRef = useRef<HTMLDivElement | null>(null);
  const backImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

   const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile;
  };
  const isMobile = useIsMobile();

  // Add this useEffect after your hooks in LuxuryPerfumeHero.tsx
useEffect(() => {
  if (isMobile) {
    // Force images to be visible on mobile by setting initial styles
    frontImageRefs.current.forEach((img) => {
      if (img) {
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
        img.style.visibility = 'visible';
      }
    });
  }
}, [isMobile]);

  // Apply animations
  useHeroAnimation({
    badgeRef,
    headingRef,
    secondHeadingRef,
    subtitleRef,
    buttonsRef,
  });
  useTextFadeOnScroll({ containerRef, textContainerRef, searchbarRef });

  useElegantFloat({
    refs: frontImageRefs,
    containerRef,
    disabled: isMobile,
  });

  // Apply floating image animations
  useFloatingPerfumeImages({
    frontImageRefs,
    backImageRefs,
    containerRef,
    disabled: isMobile,
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
  const mobileFrontImages = isMobile? frontImages.slice(0, 2) : frontImages;

  const backImages = [
    "/images/perfume (29).webp",
    "/images/perfume (15).webp",
    "/images/perfume (18).webp",
    "/images/perfume (19).webp",
    "/images/perfume (23).webp",
  ];
  const mobileBackImages = isMobile ? [] : backImages;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-visible px-4 sm:px-6 selection:bg-[#E9C176]/30 selection:text-[#5A554E]"
    >
      {/* ───────────── FLOATING PERFUME IMAGES LAYER ───────────── */}
      {/* Front Images Layer - Higher z-index, fully visible */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-visible">
        <div className="absolute top-[15%] left-0 right-0 z-[5] pointer-events-none">
          <div className="flex justify-center items-center gap-4 md:gap-8 px-4">
            {mobileFrontImages.map((src, index) => (
              <div
                key={`front-${index}`}
                ref={(el) => {
                  frontImageRefs.current[index] = el;
                }}
                className="flex-shrink-0 translate-y-0"
                style={{
                  filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px]">
                  <Image
                    src={src}
                    alt={`Luxury perfume ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    quality={90}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Images Layer - Behind everything */}
      <div className="absolute top-[60%] inset-0 pointer-events-none z-0">
        <div className="flex justify-center items-center gap-4 md:gap-8 px-4">
          {mobileBackImages.map((src, index) => (
            <div
              key={`back-${index}`}
              ref={(el) => {
                backImageRefs.current[index] = el;
              }}
              className="flex-shrink-0 "
              style={{
                filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.1))`,
                willChange: "transform, opacity",
              }}
            >
              <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[150px] md:h-[150px]">
                <Image
                  src={src}
                  alt={`Distant perfume ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 250px"
                  priority={false}
                  loading="lazy"
                  quality={70}
                />
              </div>
            </div>
          ))}
        </div>
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
      <div
        ref={textContainerRef}
        className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 sm:px-6"
      >
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
          <h2
            ref={secondHeadingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] bg-gradient-to-r from-[#B8943E] to-[#D4A85F] bg-clip-text text-transparent dark:from-[#D4A85F] dark:to-[#E9C176]"
          >
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

            <div className="flex flex-row justify-center items-center gap-2">
              Scroll Down
              <FaLevelDownAlt size={16} />
            </div>
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div
        ref={(el) => {
          searchbarRef.current = el;
        }}
        className={`fixed bottom-10  left-1/2 top-[40%] transform -translate-x-1/2 z-20
          
          `}
      >
        {/* ${showInput ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-20 invisible'} */}
        <div className="bg-white/90 backdrop-blur-md rounded-full p-1 shadow-2xl dark:bg-black/80">
          <input
            type="email"
            placeholder="Search for Perfume..."
            className="px-20 py-5 rounded-full bg-transparent text-[#5A554E] dark:text-[#B0A898] placeholder:text-[#5A554E]/50 dark:placeholder:text-[#B0A898]/50 focus:outline-none min-w-[280px] sm:min-w-[320px]"
          />
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#C9973E] to-[#D4A85F] text-white font-medium hover:shadow-lg transition-all duration-300">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
