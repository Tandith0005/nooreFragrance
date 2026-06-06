import React from "react";
import Image from "next/image";
import ShopFilter from "./shopFilter";

const ShopItems = () => {
  return (
    <div className="min-h-screen w-full  px-4 sm:px-6 lg:px-12 py-16">
      {/* Background Grid */}
      <div className="grid-bg absolute inset-0 pointer-events-none z-0" />

      {/* Soft luxury glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full top-10 left-10" />
        <div className="absolute w-[500px] h-[500px] bg-secondary/10 blur-[140px] rounded-full bottom-10 right-10" />
      </div>

     

      {/* CONTENT */}
      <div className="relative z-10 max-w-[90%] mx-auto">
        {/* ───── TOP TEXT ───── */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-medium tracking-wider uppercase backdrop-blur-sm mb-4">
            Luxury Collection
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-primary dark:text-primary leading-tight">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
              Signature Scent
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-secondary-light dark:text-secondary-light/80 text-sm sm:text-base leading-relaxed">
            Every fragrance tells a story. Explore our curated collection of
            premium perfumes designed to leave a lasting impression.
          </p>

          {/* Decorative divider */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="w-12 h-px bg-secondary/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary/60 font-light">
              Artisanal Fragrances
            </span>
            <div className="w-12 h-px bg-secondary/40" />
          </div>
        </div>

        {/* ───── GRID SECTION ───── */}
        {/* 
          RULE:
          - MAX 2 columns (so 8 items = 4 rows)
          - responsive: 1 col mobile, 2 col tablet+
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {/* PERFUME CARD */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="
                group relative rounded-2xl overflow-hidden
                bg-white/70 dark:bg-white/5
                backdrop-blur-md
                border border-[#D4A85F]/20 dark:border-white/10
                hover:border-secondary/40
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]
                transition-all duration-500
                "
            >
              {/* Image */}
              <div className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] overflow-hidden">
                <Image
                  src={`/images/perfume (${i + 10}).webp`}
                  alt={`Perfume ${i + 1}`}
                  width={1000}
                  height={500}
                  className=" scale-90 group-hover:scale-100 transition-transform duration-700"
                  quality={90}
                />
              </div>

              {/* Bottom info */}
              <div className="p-5 border-t border-secondary/10">
                <h3 className="text-primary font-heading text-lg">
                  Signature No. {i + 1}
                </h3>

                <p className="text-secondary-light text-sm mt-1">
                  Eau de Parfum · 50ml
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-secondary font-medium">$120</span>

                  <button className="text-sm px-4 py-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopItems;
