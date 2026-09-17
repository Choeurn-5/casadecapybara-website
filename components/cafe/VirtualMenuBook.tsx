"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  BookOpen,
  Coffee,
  Utensils,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
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
  { page: 1, title: "Cover", label: "Cover & Intro" },
  { page: 2, title: "Breakfast", label: "Morning & Pancakes" },
  { page: 4, title: "Croissants", label: "Croissant Corner" },
  { page: 6, title: "Burgers", label: "Capybara Burgers" },
  { page: 8, title: "Salads", label: "Salads & Healthy" },
  { page: 10, title: "Mains", label: "Steak, Fish & Italian" },
  { page: 12, title: "Asian", label: "Fried Rice & Noodles" },
  { page: 14, title: "Bites", label: "Wings & Snacks" },
  { page: 15, title: "Desserts", label: "Mousse & Sweets" },
];

export default function VirtualMenuBook() {
  const [activeMenu, setActiveMenu] = useState<"food" | "drinks">("food");
  // In dual-page mode, currentSpread is the left page number (1, 2, 4, 6, 8, 10, 12, 14, 16)
  const [currentSpread, setCurrentSpread] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSinglePageMode, setIsSinglePageMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = back

  // Web Audio synthesizer for realistic paper turn rustle
  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Synthesize gentle paper friction noise
      const bufferSize = ctx.sampleRate * 0.15; // 150ms duration
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 850;
      filter.Q.value = 1.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio context policy fallback
    }
  };

  const handleNext = () => {
    if (activeMenu === "drinks") return;
    if (isSinglePageMode) {
      if (currentSpread < TOTAL_FOOD_PAGES) {
        setDirection(1);
        playPageTurnSound();
        setCurrentSpread((prev) => prev + 1);
      }
    } else {
      if (currentSpread === 1) {
        setDirection(1);
        playPageTurnSound();
        setCurrentSpread(2);
      } else if (currentSpread + 2 <= TOTAL_FOOD_PAGES) {
        setDirection(1);
        playPageTurnSound();
        setCurrentSpread((prev) => prev + 2);
      }
    }
  };

  const handlePrev = () => {
    if (activeMenu === "drinks") return;
    if (isSinglePageMode) {
      if (currentSpread > 1) {
        setDirection(-1);
        playPageTurnSound();
        setCurrentSpread((prev) => prev - 1);
      }
    } else {
      if (currentSpread === 2) {
        setDirection(-1);
        playPageTurnSound();
        setCurrentSpread(1);
      } else if (currentSpread > 2) {
        setDirection(-1);
        playPageTurnSound();
        setCurrentSpread((prev) => prev - 2);
      }
    }
  };

  const jumpToPage = (pageNum: number) => {
    setDirection(pageNum > currentSpread ? 1 : -1);
    playPageTurnSound();
    if (isSinglePageMode) {
      setCurrentSpread(pageNum);
    } else {
      if (pageNum === 1) setCurrentSpread(1);
      else setCurrentSpread(pageNum % 2 === 0 ? pageNum : pageNum - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSpread, isSinglePageMode, activeMenu]);

  // Determine pages for dual spread
  const leftPageNum = currentSpread === 1 ? null : currentSpread;
  const rightPageNum = currentSpread === 1 ? 1 : Math.min(currentSpread + 1, TOTAL_FOOD_PAGES);

  const pdfDownloadUrl =
    activeMenu === "food"
      ? "/images/menu/FOOD%20MANU.pdf"
      : "/images/menu/Drinks%20Menu%20(4).pdf";

  return (
    <div className="w-full my-6 select-none">
      {/* Top Bar: Mode Selector & Tool Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Book Type Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => {
              setActiveMenu("food");
              setCurrentSpread(1);
              playPageTurnSound();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              activeMenu === "food"
                ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30 scale-105"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Food Menu Book (16 Pages)</span>
          </button>

          <button
            onClick={() => {
              setActiveMenu("drinks");
              playPageTurnSound();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              activeMenu === "drinks"
                ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-lg shadow-[#0284C7]/30 scale-105"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>🧋 Drinks Menu Poster</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
            title={soundEnabled ? "Mute page turn sound" : "Enable page turn sound"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F43F5E]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Single / Dual Page Spread Toggle (desktop only) */}
          {activeMenu === "food" && (
            <button
              onClick={() => {
                setIsSinglePageMode(!isSinglePageMode);
                playPageTurnSound();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all"
            >
              <span>{isSinglePageMode ? "📖 Dual Page View" : "📄 Single Page View"}</span>
            </button>
          )}

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4 text-[#38BDF8]" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all hover:scale-105"
            title="Open Fullscreen Reader"
          >
            <Maximize2 className="w-4 h-4 text-[#38BDF8]" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>

          {/* Download Original PDF */}
          <a
            href={pdfDownloadUrl}
            download
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D VIRTUAL BOOK SHOWCASE ENVIRONMENT */}
      {/* ========================================================================= */}
      <div
        className={`relative w-full rounded-3xl transition-all duration-500 bg-gradient-to-b from-[#182234] via-[#0D1424] to-[#040812] border border-white/12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-3 sm:p-6 lg:p-8 flex flex-col items-center justify-center overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none p-4 sm:p-8 bg-black/95 backdrop-blur-2xl" : ""
        }`}
      >
        {/* Fullscreen Close Button */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all"
            aria-label="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Ambient Warm Under-Book Table Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F43F5E]/10 via-[#0284C7]/10 to-transparent blur-3xl pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* DRINKS POSTER VIEW */}
        {/* ------------------------------------------------------------- */}
        {activeMenu === "drinks" ? (
          <div className="relative w-full max-w-2xl py-4 flex flex-col items-center z-10">
            {/* Wooden / Luxury Gold Poster Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-[#2B1B17] via-[#1F1411] to-[#120B09] border-2 border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="relative w-full aspect-[1/1.414] rounded-xl overflow-hidden shadow-inner bg-black">
                <Image
                  src={DRINKS_PAGE_IMAGE}
                  alt="Drinks Menu Poster"
                  fill
                  unoptimized
                  className={`object-contain transition-transform duration-300 ${isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm mt-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Signature Drinks & Refreshments Poster • Click image to zoom</span>
            </p>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* 3D FOOD MENU FLIPBOOK (OPEN SPREAD) */
          /* ------------------------------------------------------------- */
          <div className="relative w-full max-w-5xl flex flex-col items-center z-10">
            {/* Book Spine Leather Cover Trim Outer Layer */}
            <div className="relative w-full rounded-2xl p-1.5 sm:p-3 bg-gradient-to-r from-[#24131B] via-[#1E192B] to-[#101A29] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
              {/* Stepped Page Edges (Gives illusion of real stacked paper thickness) */}
              <div className="relative w-full rounded-xl p-1 bg-[#1A1A1A] shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                {/* Book Pages Spread Container */}
                <div
                  className={`relative w-full flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF8F5] transition-all duration-300 ${
                    currentSpread === 1 || isSinglePageMode
                      ? "max-w-xl mx-auto aspect-[1/1.414]"
                      : "aspect-[2/1.414]"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {/* COVER PAGE (PAGE 1) OR SINGLE PAGE VIEW */}
                    {currentSpread === 1 || isSinglePageMode ? (
                      <motion.div
                        key={`single-${currentSpread}`}
                        initial={{ opacity: 0, rotateY: direction > 0 ? 15 : -15 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: direction > 0 ? -15 : 15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full h-full flex items-center justify-center shadow-2xl"
                      >
                        <Image
                          src={FOOD_PAGE_IMAGES[currentSpread - 1]}
                          alt={`Food Menu Page ${currentSpread}`}
                          fill
                          unoptimized
                          className={`object-contain transition-transform duration-300 ${
                            isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                          }`}
                          onClick={() => setIsZoomed(!isZoomed)}
                          priority
                        />

                        {/* Page turn gloss & corner curl hint */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-black/10 via-transparent to-transparent pointer-events-none" />
                      </motion.div>
                    ) : (
                      /* DUAL PAGE SPREAD (LEFT & RIGHT PAGES OPEN) */
                      <motion.div
                        key={`spread-${currentSpread}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="relative w-full h-full grid grid-cols-2 shadow-2xl"
                      >
                        {/* LEFT PAGE */}
                        <div className="relative w-full h-full border-r border-black/10 overflow-hidden bg-[#FAF8F5]">
                          {leftPageNum ? (
                            <Image
                              src={FOOD_PAGE_IMAGES[leftPageNum - 1]}
                              alt={`Food Menu Page ${leftPageNum}`}
                              fill
                              unoptimized
                              className={`object-contain transition-transform duration-300 ${
                                isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                              }`}
                              onClick={() => setIsZoomed(!isZoomed)}
                              priority
                            />
                          ) : null}

                          {/* Left page subtle shading towards outer edge */}
                          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
                        </div>

                        {/* RIGHT PAGE */}
                        <div className="relative w-full h-full overflow-hidden bg-[#FAF8F5]">
                          {rightPageNum ? (
                            <Image
                              src={FOOD_PAGE_IMAGES[rightPageNum - 1]}
                              alt={`Food Menu Page ${rightPageNum}`}
                              fill
                              unoptimized
                              className={`object-contain transition-transform duration-300 ${
                                isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                              }`}
                              onClick={() => setIsZoomed(!isZoomed)}
                              priority
                            />
                          ) : null}

                          {/* Right page subtle shading towards outer edge */}
                          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                        </div>

                        {/* 3D CENTRAL BOOK SPINE / GUTTER SHADOW CREASE */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-black/25 via-black/40 to-black/25 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-black/50 pointer-events-none" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Left Interactive Page Flip Trigger Ribbon */}
                  <button
                    onClick={handlePrev}
                    disabled={currentSpread === 1}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none shadow-xl hover:scale-110 active:scale-95"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Right Interactive Page Flip Trigger Ribbon */}
                  <button
                    onClick={handleNext}
                    disabled={
                      isSinglePageMode
                        ? currentSpread >= TOTAL_FOOD_PAGES
                        : currentSpread + 1 >= TOTAL_FOOD_PAGES
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none shadow-xl hover:scale-110 active:scale-95"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Book Controls & Page Indicator */}
            <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              {/* Current Page Text Indicator */}
              <div className="text-white text-sm font-semibold flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
                  {currentSpread === 1
                    ? "Page 1 of 16 (Front Cover)"
                    : isSinglePageMode
                    ? `Page ${currentSpread} of 16`
                    : `Pages ${leftPageNum} – ${rightPageNum} of 16`}
                </span>
                <span className="text-xs text-gray-400 hidden md:inline">
                  (Use Arrow keys ◀ ▶ or click arrows to turn pages)
                </span>
              </div>

              {/* Prev / Next Turn Page Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentSpread === 1}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Turn Left</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={
                    isSinglePageMode
                      ? currentSpread >= TOTAL_FOOD_PAGES
                      : currentSpread + 1 >= TOTAL_FOOD_PAGES
                  }
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F43F5E] to-[#EC4899] hover:from-[#E11D48] hover:to-[#DB2777] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-rose-950/40 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                  <span>Turn Right</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick-Jump Section Chapter Ribbons */}
            <div className="w-full mt-5 pt-4 border-t border-white/10">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mb-2.5 text-center">
                Jump to Chapter in Book:
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {PAGE_CHAPTERS.map((ch) => {
                  const isActive =
                    ch.page === 1
                      ? currentSpread === 1
                      : currentSpread === ch.page || currentSpread + 1 === ch.page;

                  return (
                    <button
                      key={ch.page}
                      onClick={() => jumpToPage(ch.page)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30 border border-[#38BDF8]"
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
