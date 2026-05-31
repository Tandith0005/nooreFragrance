// src/app/about/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { IoSparklesSharp } from "react-icons/io5";
import { GiDiamondRing } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function AboutPage() {
  const values = [
    {
      icon: IoSparklesSharp,
      title: "Refined Luxury",
      desc: "Designed for those who appreciate elegance in its quietest form.",
    },
    {
      icon: GiDiamondRing,
      title: "Premium Ingredients",
      desc: "Crafted using rich aromatic blends with long-lasting depth.",
    },
    {
      icon: FaShieldAlt,
      title: "Signature Identity",
      desc: "Every scent is made to become part of your personal presence.",
    },
    {
      icon: MdOutlineAccessTime,
      title: "Timeless Impression",
      desc: "A fragrance that lingers long after you leave the room.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      {/* ───────────────── BACKGROUND GLOWS ───────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#E9C176]/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#D4A85F]/10 blur-[120px]" />
      </div>

      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="relative px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E9C176]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#8A703A] backdrop-blur-sm dark:bg-[#E9C176]/15 dark:text-[#E9C176]">
                About Noore Fragrance
              </span>

              <h1 className="mt-8 font-heading text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
                Fragrance That
                <span className="mt-2 block bg-gradient-to-r from-[#B8943E] to-[#E9C176] bg-clip-text text-transparent">
                  Defines Presence
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-secondary-light sm:text-lg">
                Noore Fragrance was created for individuals who believe luxury should
                feel personal, unforgettable, and timeless. Every fragrance is
                carefully designed to leave a quiet yet powerful impression.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link href="/shop">
                  <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9973E] to-[#D4A85F] px-7 py-3.5 font-medium text-white shadow-lg shadow-[#C9973E]/20 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#C9973E]/30">
                    Explore Collection
                    <IoArrowForwardOutline
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-12 bg-[#D4A85F]/50" />
                  <p className="text-sm uppercase tracking-[0.25em] text-secondary-light">
                    Luxury Crafted
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#E9C176]/20 to-transparent blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-black/5 bg-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="relative h-[500px] sm:h-[650px]">
                  <Image
                    src="/images/perfume (21).webp"
                    alt="Luxury Perfume"
                    fill
                    priority
                    className="object-cover transition-transform duration-[2500ms] hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── BRAND STORY ───────────────── */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#E9C176]/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px]">
              <div className="relative h-[400px] sm:h-[550px]">
                <Image
                  src="/images/perfume (24).webp"
                  alt="Perfume Bottle"
                  fill
                  className="object-cover transition-transform duration-[2200ms] hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#B8943E]">
              Our Story
            </span>

            <h2 className="mt-5 font-heading text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              Inspired By Elegance,
              <span className="block text-secondary">
                Crafted With Emotion
              </span>
            </h2>

            <p className="mt-8 text-base leading-relaxed text-secondary-light sm:text-lg">
              We believe fragrance is more than a scent — it is memory,
              confidence, and identity. Fragrance blends luxurious inspiration
              with modern sophistication to create perfumes that feel deeply
              personal and effortlessly timeless.
            </p>

            <p className="mt-6 text-base leading-relaxed text-secondary-light sm:text-lg">
              Every bottle is designed to evoke emotion, turning ordinary
              moments into unforgettable impressions.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── VALUES SECTION ───────────────── */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-[#B8943E]">
              Why Noore Fragrance
            </span>

            <h2 className="mt-5 font-heading text-4xl font-semibold text-primary sm:text-5xl">
              Luxury In Every Detail
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-black/5
                    bg-white/40
                    p-8
                    shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E9C176]/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9C176]/15 text-[#B8943E]">
                      <Icon size={26} />
                    </div>

                    <h3 className="mt-7 font-heading text-2xl font-semibold text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-relaxed text-secondary-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── PHILOSOPHY ───────────────── */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E9C176]/10 blur-[100px]" />

            <p className="relative font-heading text-4xl font-semibold leading-[1.4] text-primary sm:text-5xl lg:text-6xl">
              “Luxury should never shout.
              <span className="block bg-gradient-to-r from-[#B8943E] to-[#E9C176] bg-clip-text text-transparent">
                It should linger.”
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA SECTION ───────────────── */}
      <section className="relative px-4 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-black/5 bg-gradient-to-br from-[#1E1B16] via-[#26221D] to-[#13110E] px-8 py-20 text-center shadow-[0_20px_100px_rgba(0,0,0,0.25)] dark:border-white/10 sm:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(233,193,118,0.22),transparent_60%)]" />

          <div className="relative z-10">
            <span className="text-sm uppercase tracking-[0.3em] text-[#E9C176]">
              Discover Your Signature
            </span>

            <h2 className="mt-5 font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              A Fragrance That
              <span className="block text-[#E9C176]">
                Speaks Before You Do
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Explore luxurious fragrances crafted to create unforgettable
              impressions and timeless presence.
            </p>

            <Link href="/shop">
              <button className="mt-10 rounded-full bg-gradient-to-r from-[#C9973E] to-[#E9C176] px-8 py-4 font-medium text-white shadow-xl shadow-[#E9C176]/20 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#E9C176]/30">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}