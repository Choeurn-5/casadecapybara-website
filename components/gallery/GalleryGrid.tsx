"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, Tag, Eye } from "lucide-react";
import { FlatGalleryImage } from "@/lib/wordpress";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryGridProps {
  initialImages: FlatGalleryImage[];
}

export default function GalleryGrid({ initialImages }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories and their counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialImages.length };
    initialImages.forEach((img) => {
      const cat = img.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const uniqueCats = Array.from(
      new Set(initialImages.map((img) => img.category || "General"))
    );

    return [
      { key: "All", label: "All Collections", count: counts.All },
      ...uniqueCats.map((cat) => ({
        key: cat,
        label:
          cat === "Room"
            ? "Suites & Eco-Villas"
            : cat === "Capybara"
            ? "Capybara Encounters"
            : cat === "Cafe"
            ? "Café & Sanctuary Grounds"
            : cat,
        count: counts[cat] || 0,
      })),
    ];
  }, [initialImages]);

  // Filtered images list
  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return initialImages;
    return initialImages.filter((img) => img.category === selectedCategory);
  }, [initialImages, selectedCategory]);

  return (
    <section id="gallery-collection" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Category Filter Tabs */}
      <div className="flex flex-col items-center mb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <p className="text-[#E65100] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#E65100]/40" />
            Curated Visual Collection
            <span className="w-8 h-px bg-[#E65100]/40" />
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1B5E20] font-serif">
            Select an <span className="italic font-normal">Atmosphere</span>
          </h2>
        </div>

        {/* Filter Pill Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-black/[0.04] rounded-full border border-black/5 shadow-inner">
          {categoriesWithCounts.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                    isSelected
                      ? "bg-white/20 text-[#FFD54F]"
                      : "bg-black/5 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[320px]"
      >
        <AnimatePresence>
          {filteredImages.map((img, index) => {
            // Editorial layout sizing: make 1st and every 7th item span 2 columns on desktop for variety
            const isFeatured = index === 0 || index % 7 === 0;

            return (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-neutral-100 border border-black/5 ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 sm:row-span-1" : ""
                }`}
              >
                {/* Photo Image */}
                <Image
                  src={img.sourceUrl}
                  alt={img.altText || img.caption}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                      : "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                />

                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Top Badge: Category & Inspect button */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-medium tracking-wider uppercase">
                    <Tag className="w-3 h-3 text-[#FFB74D]" />
                    {img.category}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-base sm:text-lg font-medium tracking-wide drop-shadow-sm">
                      {img.caption || img.title}
                    </h3>
                    <p className="text-[#FFB74D] text-xs font-light mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <Sparkles className="w-3 h-3" />
                      <span>Click to view in high definition</span>
                    </p>
                  </div>
                </div>

                {/* Subtle border highlight on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#FFB74D]/50 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
}
