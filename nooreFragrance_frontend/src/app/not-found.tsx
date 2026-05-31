

import Link from "next/link";


export default function NotFound() {

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#0B0B0B] px-6">
      
      {/* Soft luxury glow background */}
      <div className="absolute w-[600px] h-[600px] bg-[#E9C176]/20 blur-[140px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[300px] h-[300px] bg-[#C9973E]/20 blur-[120px] rounded-full top-[30%] left-[30%]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl">
        
        {/* 404 number */}
        <h1 className="text-7xl sm:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#C9973E] to-[#E9C176] bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#5A554E] dark:text-[#EDEDED]">
          This scent doesn’t exist
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-[#5A554E]/70 dark:text-[#B0A898] leading-relaxed">
          The page you’re looking for has faded away like a luxury fragrance in the wind.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link href="/">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C9973E] to-[#D4A85F] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Small hint */}
        <p className="mt-6 text-xs text-[#5A554E]/50 dark:text-[#777]">
          “Even the finest fragrance needs the right direction.”
        </p>
      </div>
    </section>
  );
}