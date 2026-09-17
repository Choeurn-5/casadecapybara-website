"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  BookOpen,
  Coffee,
  Volume2,
  VolumeX,
  Sparkles,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FOOD_PAGES = 16;

const FOOD_PAGE_IMAGES = Array.from(
  { length: TOTAL_FOOD_PAGES },
  (_, i) => `/images/menu/book-pages/food-page-${i + 1}.png`
);

const DRINKS_PAGE_IMAGE = "/images/menu/book-pages/drinks-page-1.png";

// Page section markers for quick jumping
const PAGE_CHAPTERS = [
  { page: 1, title: "Cover", label: "Cover" },
  { page: 2, title: "Breakfast", label: "Breakfast (p.2)" },
  { page: 4, title: "Croissants", label: "Croissants (p.4)" },
  { page: 6, title: "Burgers", label: "Burgers & Sandwiches (p.6)" },
  { page: 8, title: "Salads", label: "Salads & Healthy (p.8)" },
  { page: 10, title: "Mains", label: "Steaks, Fish & Pasta (p.10)" },
  { page: 12, title: "Asian", label: "Fried Rice & Noodles (p.12)" },
  { page: 14, title: "Bites", label: "Appetizers & Bites (p.14)" },
  { page: 15, title: "Desserts", label: "Desserts & Sweets (p.15)" },
];

export default function VirtualMenuBook() {
  const [activeMenu, setActiveMenu] = useState<"food" | "drinks">("food");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = back

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Web Audio synthesizer for delicate paper rustle sound
  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 900;
      filter.Q.value = 1.1;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  };

  const handleNext = () => {
    if (activeMenu === "drinks") return;
    if (currentPage < TOTAL_FOOD_PAGES) {
      setDirection(1);
      playPageTurnSound();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeMenu === "drinks") return;
    if (currentPage > 1) {
      setDirection(-1);
      playPageTurnSound();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const jumpToPage = (pageNum: number) => {
    if (pageNum === currentPage) return;
    setDirection(pageNum > currentPage ? 1 : -1);
    playPageTurnSound();
    setCurrentPage(pageNum);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next page
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev page
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, activeMenu]);

  const pdfDownloadUrl =
    activeMenu === "food"
      ? "/images/menu/FOOD%20MANU.pdf"
      : "/images/menu/Drinks%20Menu%20(4).pdf";

  return (
    <div className="w-full my-4 select-none">
      {/* Top Header: Menu Selector & Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 px-1">
        {/* Switch between Food Book and Drinks Poster */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-full sm:w-auto justify-center">
          <button
            onClick={() => {
              setActiveMenu("food");
              playPageTurnSound();
            }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              activeMenu === "food"
                ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30 scale-[1.02]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Food Menu (16 Pages)</span>
          </button>

          <button
            onClick={() => {
              setActiveMenu("drinks");
              playPageTurnSound();
            }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              activeMenu === "drinks"
                ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-lg shadow-[#0284C7]/30 scale-[1.02]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>🧋 Drinks Poster</span>
          </button>
        </div>

        {/* Action Controls: Sound, Zoom, Fullscreen, Download */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
            title={soundEnabled ? "Mute flip sound" : "Enable flip sound"}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F43F5E]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
            aria-label="Zoom Toggle"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4 text-[#38BDF8]" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all hover:scale-105"
            title="Open Fullscreen Reader"
          >
            <Maximize2 className="w-4 h-4 text-[#38BDF8]" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>

          <a
            href={pdfDownloadUrl}
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SINGLE PAGE VIRTUAL PRESENTATION STAGE */}
      {/* ========================================================================= */}
      <div
        className={`relative w-full rounded-3xl transition-all duration-300 bg-gradient-to-b from-[#182234] via-[#0D1424] to-[#040812] border border-white/12 shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-2 sm:p-5 lg:p-7 flex flex-col items-center justify-center overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none p-3 sm:p-6 bg-black/95 backdrop-blur-2xl" : ""
        }`}
      >
        {/* Fullscreen Close Button */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all shadow-lg"
            aria-label="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Ambient Warm Under-Book Table Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F43F5E]/10 via-[#0284C7]/10 to-transparent blur-3xl pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* 1. DRINKS MENU POSTER */}
        {/* ------------------------------------------------------------- */}
        {activeMenu === "drinks" ? (
          <div className="relative w-full max-w-xl py-2 flex flex-col items-center z-10">
            <div className="relative w-full rounded-2xl overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-[#2B1B17] via-[#1F1411] to-[#120B09] border-2 border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="relative w-full aspect-[1/1.414] rounded-xl overflow-hidden shadow-inner bg-black">
                <Image
                  src={DRINKS_PAGE_IMAGE}
                  alt="Drinks Menu Poster"
                  fill
                  unoptimized
                  className={`object-contain transition-transform duration-300 ${
                    isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  priority
                />
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm mt-3 flex items-center gap-1.5 text-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Signature Drinks & Refreshments • Tap to zoom in</span>
            </p>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* 2. PURE SINGLE PAGE FOOD MENU (ONE BY ONE) */
          /* ------------------------------------------------------------- */
          <div
            className="relative w-full max-w-xl lg:max-w-2xl flex flex-col items-center z-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Single Page Frame with Luxury Leather & Subtle Border Bevel */}
            <div className="relative w-full rounded-2xl p-1.5 sm:p-2.5 bg-gradient-to-b from-[#24131B] via-[#1E192B] to-[#101A29] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
              {/* Stepped Paper Stack Illusion under the page */}
              <div className="relative w-full rounded-xl p-0.5 sm:p-1 bg-[#1A1A1A] shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
                {/* Single Page Display Stage */}
                <div className="relative w-full aspect-[1/1.414] rounded-lg overflow-hidden bg-[#FAF8F5] shadow-2xl flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`page-${currentPage}`}
                      initial={{
                        opacity: 0,
                        x: direction > 0 ? 35 : -35,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: direction > 0 ? -35 : 35,
                        scale: 0.98,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={FOOD_PAGE_IMAGES[currentPage - 1]}
                        alt={`Food Menu Page ${currentPage}`}
                        fill
                        unoptimized
                        className={`object-contain transition-transform duration-300 ${
                          isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                        }`}
                        onClick={() => setIsZoomed(!isZoomed)}
                        priority
                      />

                      {/* Subtle Paper Texture & Top Right Corner Gloss */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-black/10 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Left Touch / Click Arrow (Turn Left) */}
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none shadow-xl hover:scale-110 active:scale-95"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Right Touch / Click Arrow (Turn Right) */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === TOTAL_FOOD_PAGES}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none shadow-xl hover:scale-110 active:scale-95"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar: Indicator & Prev/Next Buttons */}
            <div className="w-full mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
              {/* Page Indicator Pill */}
              <div className="flex items-center gap-2">
                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold shadow-sm">
                  {currentPage === 1 ? "Page 1 of 16 (Cover)" : `Page ${currentPage} of 16`}
                </span>
                <span className="text-[11px] text-gray-400 hidden sm:inline">
                  (Swipe on mobile or use ◀ ▶ arrow keys)
                </span>
              </div>

              {/* Prev / Next Turn Page Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentPage === TOTAL_FOOD_PAGES}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F43F5E] to-[#EC4899] hover:from-[#E11D48] hover:to-[#DB2777] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-rose-950/40 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick-Jump Section Chapter Ribbons */}
            <div className="w-full mt-4 pt-3.5 border-t border-white/10">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mb-2 text-center">
                Jump to Section:
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {PAGE_CHAPTERS.map((ch) => {
                  const isActive = currentPage === ch.page;

                  return (
                    <button
                      key={ch.page}
                      onClick={() => jumpToPage(ch.page)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-95 ${
                        isActive
                          ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#0284C7]/30 border border-[#38BDF8]"
                          : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5"
                      }`}
                    >
                      {ch.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
