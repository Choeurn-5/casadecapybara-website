"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Camera, MapPin, Compass, ArrowDown } from "lucide-react";

interface GalleryHeroProps {
  totalPhotos: number;
  totalCategories: number;
}

export default function GalleryHero({
  totalPhotos,
  totalCategories,
}: GalleryHeroProps) {
  const scrollToGallery = () => {
    const el = document.getElementById("gallery-collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[75vh] md:min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#0A140C] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[500px] bg-[#2E7D32]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#E65100]/15 rounded-full blur-[120px]" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Top Luxury Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB74D] text-xs md:text-sm font-medium tracking-wider uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFB74D]" />
          <span>The Visual Archive & Collection</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB74D]" />
          <span className="text-gray-300 font-normal">Siem Reap, Cambodia</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 font-serif leading-[1.12]"
        >
          Moments of <span className="italic font-normal text-[#FFB74D]">Tranquility</span>,
          <br className="hidden sm:block" /> Captured in Nature.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl font-light leading-relaxed mb-10"
        >
          Immerse yourself in Cambodia&apos;s most peaceful haven. Explore the sanctuary grounds, 
          intimate encounters with resident capybaras Molly &amp; Alex, luxury eco-villas, 
          and our organic poolside dining.
        </motion.p>

        {/* Quick Highlights / Metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl mb-10"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {totalPhotos > 0 ? totalPhotos : "22+"}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Camera className="w-3 h-3 text-[#FFB74D]" />
              <span>Curated Photos</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#81C784] mb-1">
              {totalCategories > 0 ? totalCategories : "3"}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Compass className="w-3 h-3 text-[#81C784]" />
              <span>Collections</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#FFB74D] mb-1">
              100%
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FFB74D]" />
              <span>Ethical Haven</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Angkor
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#FFB74D]" />
              <span>Siem Reap</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={scrollToGallery}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[#E65100] text-white border border-white/20 hover:border-[#E65100] transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-[#E65100]/30 hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Explore The Visual Stories</span>
          <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 text-[#FFB74D] group-hover:text-white" />
        </motion.button>
      </div>

      {/* Subtle bottom gradient fade into body */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none" />
    </section>
  );
}
