"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag } from "lucide-react";
import { FlatGalleryImage } from "@/lib/wordpress";

interface GalleryLightboxProps {
  images: FlatGalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none"
        onClick={onClose}
      >
        {/* Top Header Bar */}
        <div
          className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-b from-black/80 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image index & category */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#FFB74D] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Tag className="w-3 h-3 text-[#FFB74D]" />
              {currentImage.category}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && currentImage.sourceUrl) {
                  window.open(currentImage.sourceUrl, "_blank");
                }
              }}
              title="Open full resolution"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close viewer (Esc)"
              className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Stage: Image and Arrow Controls */}
        <div
          className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-2 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer shadow-2xl"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Main Active Image Display */}
          <div className="relative w-full h-full max-w-6xl max-h-[72vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentImage.sourceUrl}
                  alt={currentImage.altText || currentImage.caption}
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

        {/* Bottom Details & Thumbnail Scrubber */}
        <div
          className="relative z-10 px-4 sm:px-8 py-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Caption */}
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-base sm:text-lg font-medium text-white tracking-wide">
              {currentImage.caption || currentImage.title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Casa de Capybara Sanctuary &amp; Eco-Resort &bull; Siem Reap
            </p>
          </div>

          {/* Thumbnail strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-4xl mx-auto scrollbar-none">
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={img.id}
                  onClick={() => onNavigate(idx)}
                  className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-[#FFB74D] scale-110 opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img.sourceUrl}
                    alt={img.altText}
                    fill
                    sizes="60px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
