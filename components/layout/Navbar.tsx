"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, MapPin, Sun } from "lucide-react";
import { GlobalSettings } from "@/lib/wordpress";

const NAV_LINKS = [
  { name: "Capybara Experience", href: "/capybara-experience" },
  { name: "Stay", href: "/stay" },
  { name: "Cafe & Dining", href: "/cafe" },
  { name: "Families & Safety", href: "/families" },
  { name: "Plan Your Visit & FAQ", href: "/plan-your-visit" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Galleries", href: "/gallery" },
];

export default function Navbar({ settings }: { settings: GlobalSettings }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-transform duration-500 ${isScrolled ? '-translate-y-9' : 'translate-y-0'}`}>
        {/* Topbar */}
        <div className="h-9 bg-[#123E15] text-[#FAF7F2]/80 text-xs sm:text-sm flex items-center w-full">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#FF9800]" />
                Ring Road, Siem Reap
              </span>
              <span className="flex items-center gap-1.5">
                <Sun size={14} className="text-[#FF9800]" />
                28°C / 82°F
              </span>
            </div>
            <div className="flex items-center">
              <Link href={pathname === '/kh' ? '/' : '/kh'} className="flex items-center gap-1.5 hover:text-white transition-colors font-medium">
                {pathname === '/kh' ? (
                  <><span className="text-base">🇬🇧</span> English</>
                ) : (
                  <><span className="text-base">🇰🇭</span> Khmer</>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`w-full text-[#FAF7F2] transition-all duration-500 ${isScrolled
            ? "bg-[#1B5E20]/95 backdrop-blur-md shadow-lg border-b border-[#2E7D32]/50 py-1"
            : "bg-transparent py-4 bg-gradient-to-b from-black/70 via-black/40 to-transparent"
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
                      alt={settings.siteTitle}
                      className="w-14 h-14 object-contain group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 drop-shadow-md"
                    />
                  )}
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden xl:flex items-center space-x-1 2xl:space-x-3 flex-1 justify-center">
                {NAV_LINKS.filter(l => l.name !== "Galleries").map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm 2xl:text-base font-medium text-[#FAF7F2]/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Galleries at the end */}
                {NAV_LINKS.filter(l => l.name === "Galleries").map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm 2xl:text-base font-medium text-[#FAF7F2]/90 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="hidden xl:flex items-center space-x-6 ml-4">
                {/* Book Now Button */}
                <Link
                  href="/capybara-experience#book"
                  className="bg-gradient-to-r from-[#E65100] to-[#F57C00] text-white px-7 py-2.5 rounded-full font-semibold shadow-[0_4px_14px_0_rgba(230,81,0,0.39)] hover:shadow-[0_6px_20px_rgba(230,81,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 transform flex items-center gap-2 group border border-[#FF9800]/30"
                >
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300 text-[#FFE0B2]" />
                  Book Now
                </Link>
              </div>

              {/* Mobile menu button and mobile Book Now */}
              <div className="xl:hidden flex items-center gap-3">
                <Link
                  href="/capybara-experience#book"
                  className="bg-gradient-to-r from-[#E65100] to-[#F57C00] text-white px-5 py-2 text-sm rounded-full font-semibold shadow-md hover:shadow-lg transition-all border border-[#FF9800]/30"
                >
                  Book
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-[#FAF7F2] p-2 rounded-full hover:bg-white/10 focus:outline-none transition-colors border border-transparent hover:border-white/20"
                >
                  {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-[#1B5E20] to-[#2E7D32] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-xl font-bold text-white tracking-wide">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FAF7F2] p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {NAV_LINKS.filter(l => l.name !== "Galleries").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3.5 rounded-xl text-base font-medium text-white/90 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={pathname === '/kh' ? '/' : '/kh'}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-base font-medium text-white/90 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
            >
              <span>Language</span>
              <span className="flex items-center gap-2 bg-[#1B5E20] px-3 py-1.5 rounded-lg text-sm border border-white/10">
                {pathname === '/kh' ? "🇬🇧 English" : "🇰🇭 Khmer"}
              </span>
            </Link>

            {NAV_LINKS.filter(l => l.name === "Galleries").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3.5 rounded-xl text-base font-medium text-white/90 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-white/10 bg-black/20">
            <Link
              href="/capybara-experience#book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full justify-center items-center gap-2 bg-gradient-to-r from-[#E65100] to-[#F57C00] text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <Sparkles size={20} className="text-[#FFE0B2]" />
              Book Your Experience
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
