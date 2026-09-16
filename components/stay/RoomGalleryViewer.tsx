"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface RoomGalleryViewerProps {
  roomTitle: string;
  images: string[];
}

export default function RoomGalleryViewer({
  roomTitle,
  images,
}: RoomGalleryViewerProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + images.length) % images.length);
  }, [activeIdx, images.length]);

  const handleNext = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % images.length);
  }, [activeIdx, images.length]);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = orig;
    };
  }, [activeIdx, handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl border border-[#E8F5E9] shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B5E20]">
            Photo Gallery
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tap any photo to view in high definition
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-gray-600">
          <Camera className="w-3.5 h-3.5 text-[#E65100]" />
          <span>{images.length} Photos</span>
        </span>
      </div>

      {/* Grid: 2 columns on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {images.map((imgUrl, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className="group relative aspect-4/3 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer bg-neutral-100 border border-black/5 text-left active:scale-[0.98]"
          >
            <Image
              src={imgUrl}
              alt={`${roomTitle} photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay on hover/tap */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
              <span className="text-white text-xs font-medium drop-shadow-sm">
                Photo {i + 1}
              </span>
              <Maximize2 className="w-4 h-4 text-white drop-shadow-sm" />
            </div>
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none"
            onClick={() => setActiveIdx(null)}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-4 sm:px-8 py-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FFB74D] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  {String(activeIdx + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-300 truncate max-w-[200px] sm:max-w-md">
                  {roomTitle}
                </span>
              </div>

              <button
                onClick={() => setActiveIdx(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-gray-300 hover:text-white transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage */}
            <div
              className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xl"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next"
                className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xl"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={images[activeIdx]}
                      alt={`${roomTitle} photo ${activeIdx + 1}`}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-contain drop-shadow-2xl"
                      priority
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Scrubber */}
            <div
              className="px-4 py-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-center gap-2 overflow-x-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                    idx === activeIdx
                      ? "ring-2 ring-[#FFB74D] scale-105 opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
