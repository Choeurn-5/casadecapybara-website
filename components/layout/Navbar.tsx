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
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-transform duration-300 ease-out ${isScrolled ? '-translate-y-7 sm:-translate-y-8' : 'translate-y-0'}`}>
        {/* Sleek Micro Topbar */}
        <div className="h-7 sm:h-8 bg-[#0B2510] text-[#FAF7F2]/75 text-[11px] sm:text-xs font-medium tracking-wider flex items-center w-full border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin size={12} className="text-[#FF9800]" />
                <span className="hidden xs:inline">Ring Road,</span> Siem Reap
              </span>
              <span className="flex items-center gap-1.5">
                <Sun size={12} className="text-[#FF9800]" />
                28°C / 82°F
              </span>
            </div>
            <div className="flex items-center">
              <Link 
                href={pathname === '/kh' ? '/' : '/kh'} 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-white/10 text-[11px] font-semibold"
              >
                {pathname === '/kh' ? (
                  <><span className="text-xs">🇬🇧</span> English</>
                ) : (
                  <><span className="text-xs">🇰🇭</span> ភាសាខ្មែរ</>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar - Slim & Luxurious */}
        <nav
          className={`w-full text-[#FAF7F2] transition-all duration-300 ease-out ${
            isScrolled
              ? "bg-[#0E2A13]/90 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.2)] border-b border-[#2E7D32]/30 py-0"
              : "bg-gradient-to-b from-black/75 via-black/35 to-transparent backdrop-blur-[1px] py-0.5 border-b border-white/5"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center mr-4 lg:mr-6">
                <Link href="/" className="flex items-center gap-2.5 group">
                  {settings.logoUrl && (
                    <img
                      src={settings.logoUrl}
                      alt={settings.siteTitle || "Casa de Capybara"}
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <span className="font-serif text-sm font-bold tracking-wider text-white uppercase hidden 2xl:inline-block drop-shadow-sm group-hover:text-[#F8BBD0] transition-colors">
                    Casa de Capybara
                  </span>
                </Link>
              </div>

              {/* Desktop Menu - Refined Luxury Typography & Spacing */}
              <div className="hidden xl:flex items-center space-x-1 flex-1 justify-center">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-3 py-1.5 text-xs 2xl:text-[13px] font-medium tracking-wider uppercase transition-all duration-200 rounded-full group ${
                        isActive
                          ? "text-white font-semibold bg-white/10 shadow-xs"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      {/* Classy Underline Indicator */}
                      <span
                        className={`absolute bottom-0.5 left-2.5 right-2.5 h-[2px] bg-[#E65100] rounded-full transition-transform duration-300 origin-center ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Right Side Action: Compact Luxury Book Button */}
              <div className="hidden xl:flex items-center ml-4">
                <Link
                  href="/capybara-experience#book"
                  className="bg-gradient-to-r from-[#E65100] via-[#F57C00] to-[#E65100] bg-[length:200%_auto] hover:bg-right text-white text-xs uppercase tracking-wider font-bold px-5 py-2 rounded-full shadow-[0_2px_12px_rgba(230,81,0,0.35)] hover:shadow-[0_4px_18px_rgba(230,81,0,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-[#FFA726]/30 flex items-center gap-1.5 group"
                >
                  <Sparkles size={14} className="group-hover:rotate-12 transition-transform duration-300 text-[#FFE0B2]" />
                  <span>Book Now</span>
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="xl:hidden flex items-center gap-2.5">
                <Link
                  href="/capybara-experience#book"
                  className="bg-gradient-to-r from-[#E65100] to-[#F57C00] text-white px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full font-bold shadow-md hover:shadow-lg transition-all border border-[#FF9800]/30 active:scale-95"
                >
                  Book
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-[#FAF7F2] p-2 rounded-full hover:bg-white/10 focus:outline-none transition-colors border border-transparent hover:border-white/20 active:scale-95"
                  aria-label="Toggle navigation menu"
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-[#0F2D13] to-[#1B5E20] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <span className="text-base font-bold uppercase tracking-wider text-white">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FAF7F2] p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-white/15 text-white font-bold" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/10 my-2">
              <Link
                href={pathname === '/kh' ? '/' : '/kh'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <span>Language</span>
                <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                  {pathname === '/kh' ? "🇬🇧 English" : "🇰🇭 ភាសាខ្មែរ"}
                </span>
              </Link>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-white/10 bg-black/20">
            <Link
              href="/capybara-experience#book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full justify-center items-center gap-2 bg-gradient-to-r from-[#E65100] to-[#F57C00] text-white px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <Sparkles size={16} className="text-[#FFE0B2]" />
              <span>Book Your Experience</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
