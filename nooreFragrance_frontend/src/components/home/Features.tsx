"use client";
import React, { useRef } from "react";
import Image from "next/image";
import {
  useFeaturesAnimation,
  useFeaturesParallax,
} from "@/animations/HomeAnimation";

const Features = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const perfumeImages = [
    {
      id: 21,
      src: `/images/perfume (21).webp`,
      alt: `Perfume 21`,
    },
    {
      id: 22,
      src: `/images/perfume (28).webp`,
      alt: `Perfume 22`,
    },
    {
      id: 23,
      src: `/images/perfume (23).webp`,
      alt: `Perfume 23`,
    },
    {
      id: 24,
      src: `/images/perfume (24).webp`,
      alt: `Perfume 24`,
    },
    {
      id: 25,
      src: `/images/perfume (25).webp`,
      alt: `Perfume 25`,
    },
    {
      id: 26,
      src: `/images/perfume (26).webp`,
      alt: `Perfume 26`,
    },
  ];

  useFeaturesAnimation({
    containerRef,
    itemRefs,
  });
  useFeaturesParallax({
    containerRef,
    itemRefs,
  });

  const gridItems = [
    { imageIndex: 0, className: "md:col-span-3 md:row-span-5" },
    { imageIndex: 1, className: "md:col-span-3 md:row-start-6" },
    {
      imageIndex: 2,
      className: "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-1",
    },
    {
      imageIndex: 3,
      className: "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-3",
    },
    {
      imageIndex: 4,
      className: "md:col-span-6 md:row-span-2 md:col-start-4 md:row-start-5",
    },
    {
      imageIndex: 5,
      className: "md:col-span-3 md:row-span-4 md:col-start-7 md:row-start-1",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32 px-4 sm:px-6"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#E9C176]/15 dark:bg-[#E9C176]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9C176]/10 text-[#8A703A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase backdrop-blur-sm dark:bg-[#E9C176]/15 dark:text-[#E9C176]">
            Artisan Collection
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-primary font-heading">
            Crafted For The
            <span className="block bg-gradient-to-r from-[#B8943E] to-[#E9C176] bg-clip-text text-transparent">
              Scent Obsessed
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-secondary-light max-w-2xl mx-auto font-body">
            Every fragrance is designed to feel luxurious, timeless, and deeply
            personal — a scent that becomes part of your identity long after you
            leave the room.
          </p>
        </div>

        {/* Grid */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2
            md:grid-cols-9 
            md:grid-rows-6
            gap-3 
            md:h-[850px]
          "
        >
          {gridItems.map((item, index) => (
            <div
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              key={item.imageIndex}
              className={`
                group
                relative
                overflow-hidden
                rounded-[28px]
                bg-white/40
                dark:bg-white/[0.03]
                border
                border-black/5
                dark:border-white/10
                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                backdrop-blur-sm
                min-h-[280px]
                sm:min-h-[320px]
                md:min-h-0
                ${item.className}
              `}
            >
              {/* Image */}
              <Image
                src={perfumeImages[item.imageIndex].src}
                alt={perfumeImages[item.imageIndex].alt}
                fill
                className="
                  object-cover
                  scale-100
                  group-hover:scale-110
                  transition-transform
                  duration-[1800ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                "
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Luxury Shine */}
              <div
                className="
                  absolute 
                  inset-0 
                  opacity-0 
                  group-hover:opacity-100
                  transition-opacity 
                  duration-1000
                  bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]
                  translate-x-[-120%]
                  group-hover:translate-x-[120%]
                  duration-[1800ms]
                "
              />

              {/* Bottom Text */}
              <div className="absolute bottom-0 left-0 p-5 sm:p-6 z-10">
                <p className="text-white/70 text-xs uppercase tracking-[0.25em]">
                  Luxury Essence
                </p>

                <h3 className="mt-2 text-white text-xl sm:text-2xl font-semibold font-heading">
                  Signature Blend
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
