"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GlobalSettings } from "@/lib/wordpress";

interface NavbarProps {
  settings?: GlobalSettings;
}

const navLinks = [
  { name: "Home", href: "/", icon: "🏡" },
  { name: "Stay", href: "/stay", icon: "🛏️" },
  { name: "Capybara Experience", href: "/capybara-experience", icon: "🐾" },
  { name: "Café & Dining", href: "/cafe-dining", icon: "☕" },
  { name: "Gallery", href: "/gallery", icon: "📸" },
  { name: "Plan Your Visit", href: "/plan-your-visit", icon: "🗺️" },
  { name: "Contact", href: "/contact", icon: "✉️" },
];

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const isKhmer = pathname.startsWith("/kh");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  };

  // Detect scroll state for fluid glass transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const siteTitle = settings?.siteTitle || "Casa de Capybara";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-xl shadow-lg shadow-[#1B5E20]/5 border-b border-[#1B5E20]/15 py-2.5"
          : "bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#1B5E20]/10 py-3.5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo with Soft Hover Halo */}
          <Link
            href={isKhmer ? "/kh" : "/"}
            onClick={closeAllMenus}
            className="group relative flex items-center shrink-0 py-0.5"
            aria-label="Casa de Capybara Home"
          >
            {/* Ambient hover glow behind logo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1B5E20]/10 to-[#E65100]/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <Image
              src={settings?.logoUrl || "/logo.png"}
              alt={siteTitle}
              width={220}
              height={75}
              className="relative h-12 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links with Animated Underlines */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeAllMenus}
                  className={`group relative px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#1B5E20] font-bold bg-[#1B5E20]/10 shadow-xs ring-1 ring-[#1B5E20]/20"
                      : "text-gray-700 hover:text-[#1B5E20] hover:bg-black/5"
                  }`}
                >
                  <span>{link.name}</span>

                  {/* Animated sliding underline indicator on hover */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#E65100] transition-all duration-300 ${
                      isActive
                        ? "w-1/2 opacity-100"
                        : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher + Shimmer Book CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="group flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-xs hover:shadow-sm border border-black/10 hover:border-[#1B5E20]/40 transition-all duration-200 cursor-pointer"
                aria-label="Select language"
                aria-expanded={langDropdownOpen}
              >
                <span className="text-base group-hover:scale-110 transition-transform">
                  {isKhmer ? "🇰🇭" : "🇬🇧"}
                </span>
                <span className="tracking-wide">
                  {isKhmer ? "ភាសាខ្មែរ" : "English"}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 group-hover:text-[#1B5E20] transition-transform duration-200 ${
                    langDropdownOpen ? "rotate-180 text-[#1B5E20]" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-44 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl shadow-black/10 border border-black/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Select Language
                  </div>

                  <Link
                    href="/"
                    onClick={closeAllMenus}
                    className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors rounded-xl mx-1.5 ${
                      !isKhmer
                        ? "bg-[#1B5E20]/10 text-[#1B5E20] font-bold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇬🇧</span>
                      <span>English (EN)</span>
                    </span>
                    {!isKhmer && <span className="text-[#1B5E20] font-bold">✓</span>}
                  </Link>

                  <Link
                    href="/kh"
                    onClick={closeAllMenus}
                    className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors rounded-xl mx-1.5 ${
                      isKhmer
                        ? "bg-[#1B5E20]/10 text-[#1B5E20] font-bold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇰🇭</span>
                      <span>ភាសាខ្មែរ (KH)</span>
                    </span>
                    {isKhmer && <span className="text-[#1B5E20] font-bold">✓</span>}
                  </Link>
                </div>
              )}
            </div>

            {/* Primary CTA with Animated Shimmer Light Sweep */}
            <Link
              href="/capybara-experience"
              onClick={closeAllMenus}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white rounded-full overflow-hidden bg-gradient-to-r from-[#E65100] via-[#F57C00] to-[#E65100] bg-[length:200%_auto] shadow-md shadow-orange-950/20 hover:shadow-lg hover:shadow-orange-950/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {/* Shimmer Light Reflection */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 group-hover:animate-shimmer pointer-events-none" />

              <span className="relative flex items-center gap-1.5">
                <span className="inline-block transform group-hover:rotate-12 transition-transform duration-300">
                  🐾
                </span>
                <span>Book Encounter</span>
              </span>
            </Link>
          </div>

          {/* Mobile Actions: Language Pill + Animated Morphing Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Compact Language Toggle Pill */}
            <Link
              href={isKhmer ? "/" : "/kh"}
              onClick={closeAllMenus}
              className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/80 border border-black/10 text-gray-700 sm:hidden shadow-xs flex items-center gap-1"
            >
              <span>{isKhmer ? "🇬🇧 EN" : "🇰🇭 KH"}</span>
            </Link>

            {/* Animated Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 rounded-xl bg-white/80 border border-black/10 flex flex-col items-center justify-center gap-1.5 text-gray-800 shadow-xs hover:bg-white hover:text-[#1B5E20] transition-colors focus:outline-hidden"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Mobile Menu Drawer with Frosted Glass & Quick Actions */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="lg:hidden fixed inset-0 top-[68px] bg-black/40 backdrop-blur-xs z-30 animate-in fade-in duration-200"
            onClick={closeAllMenus}
          />

          {/* Drawer content */}
          <div className="lg:hidden absolute inset-x-0 top-full bg-[#FAF7F2]/95 backdrop-blur-2xl border-b border-[#1B5E20]/20 shadow-2xl z-40 max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-4 duration-250">
            <div className="container mx-auto px-5 py-6 flex flex-col gap-5">
              {/* Navigation Links Grid */}
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeAllMenus}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#1B5E20] text-white shadow-md shadow-green-950/20"
                          : "text-gray-800 bg-white/60 hover:bg-[#1B5E20]/10 hover:text-[#1B5E20] border border-black/5"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.name}</span>
                      </span>

                      <svg
                        className={`w-4 h-4 ${
                          isActive ? "text-white/80" : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>

              {/* Language Switcher Bar */}
              <div className="p-4 rounded-2xl bg-white/80 border border-black/5 flex items-center justify-between shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Language / ភាសា
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    onClick={closeAllMenus}
                    className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${
                      !isKhmer
                        ? "bg-[#1B5E20] text-white border-[#1B5E20] font-bold shadow-xs"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    🇬🇧 English
                  </Link>
                  <Link
                    href="/kh"
                    onClick={closeAllMenus}
                    className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${
                      isKhmer
                        ? "bg-[#1B5E20] text-white border-[#1B5E20] font-bold shadow-xs"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    🇰🇭 ភាសាខ្មែរ
                  </Link>
                </div>
              </div>

              {/* Mobile CTA Button */}
              <Link
                href="/capybara-experience"
                onClick={closeAllMenus}
                className="flex items-center justify-center gap-2 w-full py-4 text-center font-bold text-white rounded-2xl bg-gradient-to-r from-[#E65100] via-[#F57C00] to-[#E65100] shadow-lg shadow-orange-950/25 active:scale-95 transition-all text-base"
              >
                <span>🐾</span>
                <span>Book Capybara Encounter</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
