"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    title: "Trained Handlers",
    description: "Expert sanctuary rangers guide every interaction to ensure a completely safe and educational experience.",
    icon: "🛡️",
  },
  {
    title: "Gentle Animals",
    description: "Our capybaras are hand-raised, incredibly docile, and accustomed to human interaction.",
    icon: "🐾",
  },
  {
    title: "Dedicated Playground",
    description: "A secure, fenced-in botanical garden play area designed specifically for young children.",
    icon: "🎪",
  },
  {
    title: "Hygiene Stations",
    description: "Accessible hand-washing and sanitization stations located immediately outside the enclosures.",
    icon: "✨",
  },
];

const sliderImages = [
  "https://cms.casadecapybara.com/wp-content/uploads/2026/09/18631daa.webp",
  "https://cms.casadecapybara.com/wp-content/uploads/2026/09/b9c936f1.webp",
  "https://cms.casadecapybara.com/wp-content/uploads/2026/09/G4-Dive-In-—-Casa-de-Capybaras-Signature-Pool-Water-Slide.jpg",
  "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H3-A-Warm-Welcome-Awaits-—-Lush-Garden-Entrance-at-Casa-de-Capybara.jpg",
  "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H2c-Welcome-to-Casa-de-Capybara-—-Cambodias-First-Capybara-Cafe-Boutique-Hotel-in-Siem-Reap.jpg"
];

export default function FamiliesAndSafetyTeaser() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF7F2] text-[#1A2E1C] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Facility Image Slider */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-[#131A15]">
              {sliderImages.map((src, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Image
                    src={src}
                    alt={`Casa de Capybara Facility Image ${index + 1}`}
                    fill
                    unoptimized
                    className={`object-cover transition-transform duration-[6000ms] ease-out ${index === currentIndex ? 'scale-105' : 'scale-100'}`}
                  />
                </div>
              ))}
              
              {/* Slider Dots Indicator */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-[#E65100]' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Decorative background shape */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#1B5E20]/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#F8BBD0]/30 rounded-full blur-2xl pointer-events-none -z-10" />
          </div>

          {/* Right: Copy and 2x2 Grid */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <ScrollReveal direction="up" staggerIndex={0}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1B5E20] leading-tight mb-6">
                Safe, Family-Friendly <br /> Sanctuary Magic
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={1}>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                We prioritize safety and hygiene above all else. Bring your entire family for a worry-free day of connection and joy, knowing that our facilities are meticulously maintained.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <ScrollReveal key={index} direction="up" staggerIndex={index} delay={0.15}>
                  <div className="flex flex-col">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 mb-4 hover:-translate-y-1 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#1A2E1C] mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
