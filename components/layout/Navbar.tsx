"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { GlobalSettings } from "@/lib/wordpress";

const NAV_LINKS = [
  { name: "Capybara Experience", href: "/capybara-experience" },
  { name: "Stay", href: "/stay" },
  { name: "Cafe & Dining", href: "/cafe" },
  { name: "Families & Safety", href: "/families-safety" },
  { name: "Plan Your Visit & FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Galleries", href: "/gallery" },
];

export default function Navbar({ settings }: { settings: GlobalSettings }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // Trigger initially in case page is loaded already scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => setLang(lang === "EN" ? "KH" : "EN");

  return (
    <nav 
      className={`fixed top-0 z-50 w-full text-[#FAF7F2] transition-all duration-500 ${
        isScrolled 
          ? "bg-[#1B5E20] shadow-lg border-b border-[#2E7D32] py-0" 
          : "bg-transparent py-4 bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mr-6">
            <Link href="/" className="flex items-center gap-3 group">
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  // alt={settings.siteTitle}
                  className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              )}

            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-5 2xl:space-x-7 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-[#F8BBD0] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#F8BBD0] hover:after:w-full after:transition-all after:duration-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-6 ml-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium hover:text-[#F8BBD0] transition-colors"
            >
              {lang === "EN" ? "Khmer" : "English"}
            </button>

            {/* Book Now Button */}
            <Link
              href="/capybara-experience#book"
              className="bg-[#E65100] text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_4px_14px_0_rgba(230,81,0,0.39)] hover:shadow-[0_6px_20px_rgba(230,81,0,0.23)] hover:bg-[#F57C00] hover:-translate-y-0.5 transition-all duration-300 transform flex items-center gap-2 group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center gap-4">
            <Link
              href="/capybara-experience#book"
              className="bg-[#E65100] text-white px-4 py-1.5 text-sm rounded-full font-semibold shadow-md lg:hidden hover:bg-[#F57C00] transition-colors"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#FAF7F2] hover:text-[#F8BBD0] focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#2E7D32] border-t border-[#1B5E20] animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner max-h-[calc(100vh-5rem)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium hover:bg-[#1B5E20] hover:text-[#F8BBD0] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-6 pt-6 border-t border-[#1B5E20] space-y-4 px-3">
              <button
                onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                className="text-base font-medium text-[#FAF7F2] hover:text-[#F8BBD0] flex w-full justify-between items-center"
              >
                Language
                <span className="bg-[#1B5E20] px-3 py-1 rounded-md text-[#E65100]">
                  {lang === "EN" ? "Khmer" : "English"}
                </span>
              </button>

              <Link
                href="/capybara-experience#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex w-full justify-center items-center gap-2 bg-[#E65100] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#F57C00] transition-colors"
              >
                <Sparkles size={18} />
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
