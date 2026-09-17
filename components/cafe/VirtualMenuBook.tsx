"use client";

import { useState } from "react";
import { BookOpen, Download, ExternalLink, Sparkles, Coffee, Utensils, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VirtualMenuBook() {
  const [activeMenu, setActiveMenu] = useState<"food" | "drinks">("food");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const foodPdfUrl = "/images/menu/FOOD%20MANU.pdf";
  const drinksPdfUrl = "/images/menu/Drinks%20Menu%20(4).pdf";

  const currentPdf = activeMenu === "food" ? foodPdfUrl : drinksPdfUrl;
  const currentTitle = activeMenu === "food" ? "Food & Main Menu (16 Pages)" : "Signature Drinks & Refreshments";

  return (
    <div className="w-full my-8">
      {/* Menu Type Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveMenu("food")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeMenu === "food"
                ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Food Menu (Canva Replica)</span>
          </button>

          <button
            onClick={() => setActiveMenu("drinks")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeMenu === "drinks"
                ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-lg shadow-[#0284C7]/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Drinks Menu Poster</span>
          </button>
        </div>

        {/* Action Buttons: Fullscreen & Download */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md"
            title="Open in Fullscreen Reader"
          >
            <Maximize2 className="w-4 h-4 text-[#38BDF8]" />
            <span>Fullscreen View</span>
          </button>

          <a
            href={currentPdf}
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-950/30"
          >
            <Download className="w-4 h-4" />
            <span>Download Original PDF</span>
          </a>
        </div>
      </div>

      {/* Virtual Book Container */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] border border-white/15 shadow-2xl p-2 sm:p-4">
        {/* Top Header bar with book badge */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-white font-serif font-bold text-base sm:text-lg tracking-wide">
              {currentTitle}
            </span>
          </div>
          <div className="text-xs text-gray-400 hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Real Print Replica</span>
          </div>
        </div>

        {/* Embedded Interactive PDF Viewer */}
        <div className="relative w-full h-[620px] sm:h-[750px] lg:h-[820px] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
          <object
            data={`${currentPdf}#toolbar=1&navpanes=1&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full rounded-2xl"
          >
            {/* Fallback if browser doesn't natively render inline PDF */}
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#0F172A] text-white">
              <BookOpen className="w-16 h-16 text-[#F43F5E] mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Virtual Café Menu</h3>
              <p className="text-gray-300 max-w-md mb-6 text-sm">
                Your browser supports viewing the official PDF menu directly. Tap below to open or download the full print layout.
              </p>
              <div className="flex gap-4">
                <a
                  href={currentPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Menu PDF</span>
                </a>
                <a
                  href={currentPdf}
                  download
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </object>
        </div>

        {/* Bottom Helper Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 mt-2 text-xs text-gray-400">
          <p>
            💡 <strong className="text-gray-300">Tip:</strong> Scroll inside the viewer to turn pages, or use pinch-to-zoom on mobile.
          </p>
          <a
            href={currentPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38BDF8] hover:text-[#7DD3FC] font-semibold flex items-center gap-1 hover:underline"
          >
            <span>Open PDF in separate tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Fullscreen Modal View */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#F43F5E]" />
                <h3 className="text-xl font-bold text-white">{currentTitle}</h3>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Fullscreen"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow w-full h-full rounded-2xl overflow-hidden bg-black/60 border border-white/10">
              <object
                data={`${currentPdf}#toolbar=1&navpanes=1`}
                type="application/pdf"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
