"use client";

import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      {/* ───────────────── BACKGROUND GLOW ───────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#E9C176]/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-[#D4A85F]/10 blur-[120px]" />
      </div>

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E9C176]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#8A703A] backdrop-blur-sm dark:bg-[#E9C176]/15 dark:text-[#E9C176]">
            Contact Perfumance
          </span>

          <h1 className="mt-8 font-heading text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
            Let&apos;s Create
            <span className="mt-2 block bg-gradient-to-r from-[#B8943E] to-[#E9C176] bg-clip-text text-transparent">
              Your Signature Presence
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-secondary-light sm:text-lg">
            Whether you have a question about fragrances, collaborations, or
            your order — our team is here to help you experience luxury without
            compromise.
          </p>
        </div>
      </section>

      {/* ───────────────── CONTACT SECTION ───────────────── */}
      <section className="relative px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* ───────────────── LEFT INFO ───────────────── */}
          <div className="space-y-6">
            {/* CARD */}
            <div
              className="
                rounded-[32px]
                border
                border-black/5
                bg-white/40
                p-8
                shadow-[0_10px_50px_rgba(0,0,0,0.05)]
                backdrop-blur-sm
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              <span className="text-sm uppercase tracking-[0.3em] text-[#B8943E]">
                Contact Information
              </span>

              <h2 className="mt-4 font-heading text-3xl font-semibold text-primary">
                We&apos;d Love To Hear From You
              </h2>

              <p className="mt-5 leading-relaxed text-secondary-light">
                Reach out for product inquiries, support, partnerships, or
                fragrance recommendations.
              </p>

              {/* INFO ITEMS */}
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9C176]/15 text-[#B8943E]">
                    <MdOutlineEmail size={22} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary-light">
                      Email
                    </p>

                    <p className="mt-1 text-lg text-primary">
                      support@perfumance.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9C176]/15 text-[#B8943E]">
                    <FiPhone size={22} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary-light">
                      Phone
                    </p>

                    <p className="mt-1 text-lg text-primary">
                      +880 1XXX-XXXXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9C176]/15 text-[#B8943E]">
                    <IoLocationOutline size={22} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary-light">
                      Location
                    </p>

                    <p className="mt-1 text-lg text-primary">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* SOCIALS */}
              <div className="mt-10 flex items-center gap-4">
                <button
                  className="
                    flex h-12 w-12 items-center justify-center rounded-2xl
                    border border-black/5 bg-white/60
                    transition-all duration-500
                    hover:-translate-y-1 hover:bg-[#E9C176]/20
                    dark:border-white/10 dark:bg-white/[0.04]
                  "
                >
                  <FaInstagram size={20} />
                </button>

                <button
                  className="
                    flex h-12 w-12 items-center justify-center rounded-2xl
                    border border-black/5 bg-white/60
                    transition-all duration-500
                    hover:-translate-y-1 hover:bg-[#E9C176]/20
                    dark:border-white/10 dark:bg-white/[0.04]
                  "
                >
                  <FaFacebook size={20} />
                </button>
              </div>
            </div>

            {/* SMALL QUOTE */}
            <div
              className="
                overflow-hidden
                rounded-[32px]
                border
                border-black/5
                bg-gradient-to-br
                from-[#1E1B16]
                via-[#26221D]
                to-[#13110E]
                p-8
                dark:border-white/10
              "
            >
              <p className="font-heading text-3xl leading-relaxed text-white">
                “Luxury begins
                <span className="block text-[#E9C176]">
                  with the details.”
                </span>
              </p>
            </div>
          </div>

          {/* ───────────────── FORM ───────────────── */}
          <div
            className="
              rounded-[32px]
              border
              border-black/5
              bg-white/40
              p-8
              shadow-[0_10px_50px_rgba(0,0,0,0.05)]
              backdrop-blur-sm
              dark:border-white/10
              dark:bg-white/[0.03]
              sm:p-10
            "
          >
            <span className="text-sm uppercase tracking-[0.3em] text-[#B8943E]">
              Send Message
            </span>

            <h2 className="mt-4 font-heading text-4xl font-semibold text-primary">
              Start The Conversation
            </h2>

            {/* FORM */}
            <form className="mt-10 space-y-6">
              {/* NAME */}
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-secondary-light">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                    w-full rounded-2xl border border-black/5
                    bg-white/60 px-5 py-4 text-primary
                    outline-none transition-all duration-300
                    placeholder:text-secondary-light
                    focus:border-[#D4A85F]/50
                    focus:ring-2 focus:ring-[#E9C176]/20
                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-secondary-light">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full rounded-2xl border border-black/5
                    bg-white/60 px-5 py-4 text-primary
                    outline-none transition-all duration-300
                    placeholder:text-secondary-light
                    focus:border-[#D4A85F]/50
                    focus:ring-2 focus:ring-[#E9C176]/20
                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-secondary-light">
                  Your Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="
                    w-full resize-none rounded-2xl border border-black/5
                    bg-white/60 px-5 py-4 text-primary
                    outline-none transition-all duration-300
                    placeholder:text-secondary-light
                    focus:border-[#D4A85F]/50
                    focus:ring-2 focus:ring-[#E9C176]/20
                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  group
                  flex items-center gap-2 rounded-full
                  bg-gradient-to-r from-[#C9973E] to-[#D4A85F]
                  px-8 py-4 font-medium text-white
                  shadow-lg shadow-[#C9973E]/20
                  transition-all duration-500
                  hover:scale-[1.02]
                  hover:shadow-xl hover:shadow-[#C9973E]/30
                "
              >
                Send Message

                <IoArrowForwardOutline
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}