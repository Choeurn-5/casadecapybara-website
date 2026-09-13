"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "/gallery/cafe/cafe-hero-1.jpg",
  "/gallery/cafe/cafe-hero-2.jpg",
  "/gallery/cafe/cafe-hero-3.jpg",
];

export default function CafeHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentIndex]}
            alt={`Capybara Cafe Atmosphere ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Rich Multi-Layer Gradient Overlays for Pastel Cafe Vibe */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#1B5E20]/40 to-black/60 z-10" />
      <div className="absolute inset-0 bg-[#F8BBD0]/10 mix-blend-color-dodge z-10" />
    </div>
  );
}
