"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const footerLinks = {
  Shop: [
    { name: "All Perfumes", href: "/shop" },
    { name: "New Arrivals", href: "/shop/new" },
    { name: "Best Sellers", href: "/shop/best-sellers" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    
  ],
  Support: [
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  {
    icon: <FaInstagram />,
    href: "https://instagram.com",
  },
  {
    icon: <FaFacebookF />,
    href: "https://facebook.com",
  },
  {
    icon: <FaTwitter />,
    href: "https://twitter.com",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-black/5 dark:border-white/10 mt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#E9C176]/10 dark:bg-[#E9C176]/5 blur-[140px] rounded-full" />
      </div>

      {/* Grid Background */}
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 pb-16 border-b border-black/5 dark:border-white/10">
          {/* Brand */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9C176]/10 text-[#8A703A] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase dark:text-[#E9C176]">
              Luxury Fragrance House
            </span>

            <h2 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight font-heading text-primary">
              Perfume That
              <span className="block bg-gradient-to-r from-[#B8943E] to-[#E9C176] bg-clip-text text-transparent">
                Leaves A Memory
              </span>
            </h2>

            <p className="mt-6 text-secondary-light leading-relaxed text-base sm:text-lg">
              Crafted for those who understand elegance, identity, and timeless
              presence. Discover fragrances designed to stay long after you
              leave.
            </p>

            {/* Newsletter */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1
                  px-5
                  py-4
                  rounded-full
                  bg-black/[0.03]
                  dark:bg-white/[0.04]
                  border
                  border-black/5
                  dark:border-white/10
                  text-primary
                  placeholder:text-secondary-light
                  outline-none
                  focus:border-[#D4A85F]
                  transition-colors
                "
              />

              <button
                className="
                  px-7
                  py-4
                  rounded-full
                  bg-gradient-to-r
                  from-[#C9973E]
                  to-[#E9C176]
                  text-white
                  font-medium
                  shadow-lg
                  shadow-[#D4A85F]/20
                  hover:scale-[1.03]
                  active:scale-[0.98]
                  transition-all
                  duration-500
                "
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-primary font-semibold text-lg mb-5 font-heading">
                  {title}
                </h3>

                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="
                          text-secondary-light
                          hover:text-[#D4A85F]
                          transition-colors
                          duration-300
                        "
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-secondary-light text-center md:text-left">
            © {new Date().getFullYear()} Perfumance. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-11
                  h-11
                  rounded-full
                  flex
                  items-center
                  justify-center
                  bg-black/[0.03]
                  dark:bg-white/[0.04]
                  border
                  border-black/5
                  dark:border-white/10
                  text-primary
                  hover:bg-[#D4A85F]
                  hover:text-white
                  hover:border-[#D4A85F]
                  transition-all
                  duration-500
                "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;