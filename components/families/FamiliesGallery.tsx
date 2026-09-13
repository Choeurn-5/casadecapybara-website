"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type GalleryCategory = "All Moments" | "Costumes & Playroom" | "Water Slide & Pool" | "Animal Joy" | "Gym & Fitness" | "Steam & Sauna" | "Safety Proof";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  span?: "col-span-1 row-span-1" | "col-span-1 row-span-2" | "col-span-2 row-span-1" | "col-span-2 row-span-2";
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Animal Joy
  { id: "f1", src: "/gallery/families/f1.jpg", alt: "Kids joyful interaction with Molly & Alex", category: "Animal Joy", span: "col-span-2 row-span-2" },
  { id: "f9", src: "/gallery/families/f9.jpg", alt: "Toddler gently meeting a capybara", category: "Animal Joy", span: "col-span-1 row-span-1" },
  { id: "c6", src: "/gallery/families/c6.jpg", alt: "Pure joy captured with the capybaras", category: "Animal Joy", span: "col-span-1 row-span-1" },
  
  // Costumes & Playroom
  { id: "f3", src: "/gallery/families/f3.jpg", alt: "Indoor children's playroom", category: "Costumes & Playroom", span: "col-span-2 row-span-1" },
  { id: "f4", src: "/gallery/families/f4.jpg", alt: "Child choosing from over 200 costumes", category: "Costumes & Playroom", span: "col-span-1 row-span-2" },
  { id: "f5", src: "/gallery/families/f5.jpg", alt: "Kids playing on the outdoor adventure playground", category: "Costumes & Playroom", span: "col-span-1 row-span-1" },
  { id: "f8", src: "/gallery/families/f8.jpg", alt: "Kids finding the treasure hunt toys on their bed", category: "Costumes & Playroom", span: "col-span-1 row-span-1" },
  
  // Water Slide & Pool
  { id: "f2", src: "/gallery/families/f2.jpg", alt: "Action shot sliding down the water slide", category: "Water Slide & Pool", span: "col-span-2 row-span-2" },
  { id: "g4", src: "/gallery/families/g4.jpg", alt: "Beautiful pool area with integrated slide", category: "Water Slide & Pool", span: "col-span-1 row-span-1" },
  
  // Gym & Fitness
  { id: "g5", src: "/gallery/families/g5.jpg", alt: "Full Modern Gym suite", category: "Gym & Fitness", span: "col-span-1 row-span-1" },

  // Steam & Sauna
  { id: "g6", src: "/gallery/families/g6.jpg", alt: "Atmospheric steam room and sauna", category: "Steam & Sauna", span: "col-span-1 row-span-1" },

  // Safety Proof
  { id: "f10", src: "/gallery/families/f10.jpg", alt: "Ceiling smoke alarm showing strict fire safety", category: "Safety Proof", span: "col-span-1 row-span-1" },
  { id: "f11", src: "/gallery/families/f11.jpg", alt: "A-Grade European hygiene kitchen standards", category: "Safety Proof", span: "col-span-1 row-span-1" },
  { id: "f12", src: "/gallery/families/f12.jpg", alt: "Comprehensive 24/7 CCTV camera coverage", category: "Safety Proof", span: "col-span-1 row-span-1" },
];

const CATEGORIES: GalleryCategory[] = [
  "All Moments",
  "Costumes & Playroom",
  "Water Slide & Pool",
  "Animal Joy",
  "Gym & Fitness",
  "Steam & Sauna",
  "Safety Proof"
];

export default function FamiliesGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All Moments");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "All Moments" || item.category === activeCategory
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ScrollReveal>
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/20 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1B5E20]/30 hover:bg-[#E8F5E9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Gallery Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer bg-[#E8F5E9] ${
                activeCategory === "All Moments" ? item.span || "col-span-1 row-span-1" : "col-span-1 row-span-1 h-[250px]"
              }`}
              onClick={() => setLightboxImage(item)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-[#1B5E20] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm truncate max-w-full">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-lg drop-shadow-md">{lightboxImage.alt}</p>
                <p className="text-[#F8BBD0] text-sm font-bold tracking-wider uppercase mt-1 drop-shadow-md">{lightboxImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
