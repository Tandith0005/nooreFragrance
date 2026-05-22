// app/components/Navbar.tsx or components/Navbar.tsx
"use client";

import { navAuthLinks, navLinks } from "@/constants/NavLinks";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineShoppingBag,
  HiOutlineSearch,
} from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Nav Left - Logo */}
            <div className="flex items-center">
              <Link href="/" className="group">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-light font-serif">
                  Nooré<span className="text-secondary">Fragrance</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-[#707070] tracking-wider hidden sm:block">
                  PREMIUM PERFUMES & ATTARS
                </p>
              </Link>
            </div>

            {/* Nav Middle - Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm lg:text-base font-medium text-primary hover:border border-transparent border-b-amber-200 dark:hover:text-[#707070] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Nav Right - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {navAuthLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm lg:text-base font-medium text-text-white dark:[#1A1A1A] hover:text-[#707070] dark:hover:text-[#707070] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
              <Link href="/cart">
                <button className="relative p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300">
                  <HiOutlineShoppingBag className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
                  <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <Link href="/cart" className="relative">
                <HiOutlineShoppingBag className="w-6 h-6 text-[#1A1A1A] dark:text-white" />
                <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <HiOutlineX className="w-6 h-6 text-[#1A1A1A] dark:text-white" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6 text-[#1A1A1A] dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Using dynamic links */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-3 bg-white/30 dark:bg-black/30 backdrop-blur-md border-t border-white/20">
            {/* Main Navigation Links */}
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </MobileNavLink>
            ))}

            {/* Divider */}
            <div className="border-t border-white/20 my-2" />

            {/* Auth Links */}
            {navAuthLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </MobileNavLink>
            ))}

            {/* Search Bar in Mobile */}
            <div className="relative pt-4">
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full px-4 py-2 rounded-full bg-white/50 dark:bg-black/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] pl-10 text-[#1A1A1A] dark:text-white placeholder:text-[#707070]"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#707070]" />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

// Mobile Nav Link Component
const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-[#1A1A1A] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all duration-300"
    >
      {children}
    </Link>
  );
};

export default Navbar;