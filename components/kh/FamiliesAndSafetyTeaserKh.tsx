"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Droplets,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Star,
  Users,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    title: "បុគ្គលិកជំនាញមើលថែ",
    tag: "ការណែនាំ១ទល់នឹង១",
    description:
      "បុគ្គលិកជំនាញរបស់យើងនឹងនៅកំដររាល់ការទាក់ទងជាមួយសត្វ ដើម្បីធានាបាននូវសុវត្ថិភាពខ្ពស់ និងបទពិសោធន៍ដ៏ល្អបំផុត។",
    icon: ShieldCheck,
    color: "from-emerald-500/15 to-emerald-600/5",
    iconColor: "text-emerald-700",
  },
  {
    title: "សត្វដ៏សែនស្លូត",
    tag: "ស្លូត ១០០% និងស្និទ្ធស្នាល",
    description:
      "កាពីបារ៉ារបស់យើងត្រូវបានចិញ្ចឹមបីបាច់ដោយក្តីស្រលាញ់តាំងពីតូច ធ្វើឱ្យពួកវាមានភាពស្លូតបូត និងស៊ាំនឹងការប្រាស្រ័យទាក់ទងជាមួយមនុស្ស។",
    icon: HeartHandshake,
    color: "from-amber-500/15 to-amber-600/5",
    iconColor: "text-amber-700",
  },
  {
    title: "កន្លែងក្មេងលេង",
    tag: "តំបន់សុវត្ថិភាពកុមារ",
    description:
      "សួនកម្សាន្តកុមារដែលមានរបងការពារផ្ទៃទន់ និងដំបូលម្លប់ ដែលត្រូវបានរចនាឡើងយ៉ាងពិសេសសម្រាប់កុមារ។",
    icon: Sparkles,
    color: "from-teal-500/15 to-teal-600/5",
    iconColor: "text-teal-700",
  },
  {
    title: "អនាម័យខ្ពស់",
    tag: "ស្តង់ដារអនាម័យមន្ទីរពេទ្យ",
    description:
      "កន្លែងលាងដៃអូតូ សាប៊ូសរីរាង្គ និងកន្លែងផ្លាស់ប្តូរស្បែកជើង ត្រូវបានដាក់ពង្រាយគ្រប់ទីកន្លែងក្នុងបរិវេណរបស់យើង។",
    icon: Droplets,
    color: "from-blue-500/15 to-blue-600/5",
    iconColor: "text-blue-700",
  },
];

const sliderImages = [
  {
    src: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/18631daa.webp",
    alt: "Air-Conditioned Indoor Capybara Lounge and Cafe",
    title: "បន្ទប់ម៉ាស៊ីនត្រជាក់ដ៏ត្រជាក់ស្រួល",
    subtitle: "ផាសុកភាពអាកាសធាតុសម្រាប់ឪពុកម្តាយ និងកុមារ",
    tag: "ជម្រកក្នុងផ្ទះ",
  },
  {
    src: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/b9c936f1.webp",
    alt: "Gentle Capybara Snuggle and Petting Session",
    title: "ការស្ទាបអង្អែលប្រកបដោយក្តីស្រលាញ់",
    subtitle: "វគ្គទាក់ទងផ្ទាល់ប្រកបដោយសុវត្ថិភាព",
    tag: "ជួបកាពីបារ៉ា",
  },
  {
    src: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/G4-Dive-In-—-Casa-de-Capybaras-Signature-Pool-Water-Slide.jpg",
    alt: "Casa de Capybara Resort Pool with Water Slide",
    title: "អាងហែលទឹក និងរំអិល",
    subtitle: "ទីកន្លែងលេងទឹកដ៏សប្បាយរីករាយសម្រាប់គ្រួសារ",
    tag: "លេងទឹកគ្រួសារ",
  },
  {
    src: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H3-A-Warm-Welcome-Awaits-—-Lush-Garden-Entrance-at-Casa-de-Capybara.jpg",
    alt: "Lush Tropical Garden Entrance and Botanical Walkways",
    title: "សួនច្បារធម្មជាតិ",
    subtitle: "ផ្លូវដើរស្រួល ស្រមោលឈើត្រជាក់ និងសុវត្ថិភាពសម្រាប់ការរុញរទេះកូនក្មេង",
    tag: "សួនច្បារខៀវស្រងាត់",
  },
  {
    src: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H2c-Welcome-to-Casa-de-Capybara-—-Cambodias-First-Capybara-Cafe-Boutique-Hotel-in-Siem-Reap.jpg",
    alt: "Casa de Capybara Sanctuary Resort Grounds",
    title: "ទីធ្លាធម្មជាតិដ៏ស្ងប់ស្ងាត់",
    subtitle: "សណ្ឋាគារប៊ូទិក និងជម្រកសត្វកាពីបារ៉ាដំបូងគេនៅកម្ពុជា",
    tag: "រីសតធម្មជាតិ",
  },
];

export default function FamiliesAndSafetyTeaserKh() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF7F2] text-[#1A2E1C] overflow-hidden border-b border-[#1B5E20]/10 font-battambang">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#1B5E20]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E65100]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <ScrollReveal direction="up" staggerIndex={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-[#1B5E20] text-xs font-bold tracking-widest uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
              <span>សុវត្ថិភាពចម្បង • សម្រាប់គ្រប់វ័យ</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-[1.3] mb-5">
              ការកម្សាន្តដ៏សប្បាយ និងសុវត្ថិភាព{" "}
              <span className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#E65100] bg-clip-text text-transparent">
                សម្រាប់គ្រួសារ
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={2}>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
              យើងផ្តល់អាទិភាពខ្ពស់បំផុតលើការថែទាំសត្វដោយក្តីស្រលាញ់ អនាម័យ និងផាសុកភាពរបស់ភ្ញៀវគ្រប់រូប។ អញ្ជើញក្រុមគ្រួសារលោកអ្នកមកទទួលយកអនុស្សាវរីយ៍ដ៏កក់ក្តៅ ដោយឥតបារម្ភពីរឿងសុវត្ថិភាព។
            </p>
          </ScrollReveal>
        </div>

        {/* Main Content Layout: Interactive Slider + 2x2 Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Image Showcase (5 Cols on large) */}
          <div className="lg:col-span-6 w-full">
            <ScrollReveal direction="up" staggerIndex={0} delay={0.1}>
              <div
                className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-[#1B5E20]/15 border border-[#1B5E20]/15 bg-[#131A15]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Visual Ratio Frame */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                  {sliderImages.map((image, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          unoptimized
                          priority={index === 0}
                          className={`object-cover transition-transform duration-[7000ms] ease-out ${
                            isActive ? "scale-105" : "scale-100"
                          }`}
                        />

                        {/* Cinematic gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                        {/* Top floating badges */}
                        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-md">
                            <Star className="w-3.5 h-3.5 fill-[#FFB300] text-[#FFB300]" />
                            <span>ផ្កាយ ៥ ពីក្រុមគ្រួសារ</span>
                          </div>

                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B5E20]/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{image.tag}</span>
                          </div>
                        </div>

                        {/* Bottom caption overlay */}
                        <div className="absolute bottom-16 left-5 right-5 z-20 text-white">
                          <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 drop-shadow-md">
                            {image.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-200 line-clamp-1 drop-shadow">
                            {image.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Slider Controls Bottom Bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                    {/* Dots / Progress */}
                    <div className="flex items-center gap-1.5">
                      {sliderImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          aria-label={`Go to slide ${index + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex
                              ? "w-8 bg-[#E65100]"
                              : "w-2 bg-white/50 hover:bg-white/90"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Counter & Arrows */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(sliderImages.length).padStart(2, "0")}
                      </span>

                      <button
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 active:scale-95"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Next slide"
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 active:scale-95"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Trust Strip */}
                <div className="px-5 py-3.5 bg-[#0D1C10] border-t border-white/10 flex items-center justify-between gap-3 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#E65100] shrink-0" />
                    <span>សុវត្ថិភាពសម្រាប់កុមារ និងមនុស្សចាស់</span>
                  </div>
                  <span className="hidden sm:inline-block font-semibold text-emerald-400">ស្លូត ១០០%</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 2x2 Feature Grid & Call to Action (6 Cols on large) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <ScrollReveal key={index} direction="up" staggerIndex={index} delay={0.15}>
                    <div className="group relative h-full p-5 sm:p-6 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xs border border-[#1B5E20]/10 hover:border-[#1B5E20]/30 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                      {/* Card Header: Icon + Micro-tag */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center ${feature.iconColor} group-hover:scale-110 group-hover:bg-[#1B5E20] group-hover:text-white transition-all duration-300 shadow-xs`}
                          >
                            <IconComponent className="w-6 h-6 transition-colors duration-300" />
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF7F2] text-gray-600 border border-gray-200">
                            {feature.tag}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-base sm:text-lg font-bold text-[#1A2E1C] mb-2 group-hover:text-[#1B5E20] transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Micro checkmark line */}
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1B5E20]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>ស្តង់ដារសុវត្ថិភាព</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Bottom Actions & Trust Guarantees */}
            <ScrollReveal direction="up" staggerIndex={3} delay={0.2}>
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1B5E20]/8 via-[#1B5E20]/5 to-[#E65100]/5 border border-[#1B5E20]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#1A2E1C] mb-1">
                    កំពុងរៀបចំផែនការមកលេងមែនទេ?
                  </h4>
                  <p className="text-xs text-gray-600">
                    ស្វែងយល់បន្ថែមអំពីអាងហែលទឹក និងកន្លែងលេងកម្សាន្តសម្រាប់កុមារ។
                  </p>
                </div>

                <Link
                  href="#capybara-experience"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[#1B5E20]/20 hover:shadow-lg transition-all duration-200 group shrink-0"
                >
                  <span>ស្វែងយល់បន្ថែម</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

