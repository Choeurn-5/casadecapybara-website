"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroKhProps {
  youtubeId?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function HeroKh({
  youtubeId = "3mTyoZkffn8",
  headline = "ទីកន្លែងដែលធម្មជាតិ និងភាពប្រណីតជួបគ្នា",
  subheadline = "ផ្តល់ជូនលោកអ្នកនូវបទពិសោធន៍ស្នាក់នៅដ៏ស្ងប់ស្ងាត់ អាហារសរីរាង្គដ៏ឈ្ងុយឆ្ងាញ់ និងអនុស្សាវរីយ៍ដែលមិនអាចបំភ្លេចបានជាមួយសត្វកាពីបារ៉ារបស់យើង។",
  primaryCtaText = "កក់សំបុត្រឥឡូវនេះ",
  primaryCtaLink = "#capybara-experience",
  secondaryCtaText = "មើលបន្ទប់ស្នាក់នៅ",
  secondaryCtaLink = "#stay",
}: HeroKhProps) {
  const [playVideo, setPlayVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // YouTube embed URL with loop, mute, autoplay, and hidden controls
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${
    isMuted ? "1" : "0"
  }&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;

  // Animation variants for cinematic staggered entrance
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };

  return (
    <section ref={ref} className="relative w-full min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-[#0F1710] text-white">
      {/* Background Video Layer */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none origin-top"
        style={{ y: backgroundY }}
      >
        {/* Optimized Next.js LCP Image Component */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? "opacity-30" : "opacity-90"} bg-[#1B5E20]`}>
          <Image
            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt="Casa de Capybara Sanctuary"
            fill
            priority={true}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* YouTube Responsive Video Container - Lazy Loaded */}
        {playVideo && (
          <div className="video-background-wrapper scale-110 sm:scale-105 pointer-events-auto">
            <iframe
              className="w-full h-full object-cover border-0"
              src={youtubeEmbedUrl}
              title="Casa de Capybara Sanctuary Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              onLoad={() => setIsVideoLoaded(true)}
            />
          </div>
        )}

        {/* Rich Multi-Layer Gradient Overlays */}
        {/* 1. Deep Vignette and Dark Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70 pointer-events-none" />

        {/* 2. Brand Color Washes: Forest Green + Twilight Warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/40 via-transparent to-[#E65100]/30 mix-blend-color-dodge pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0F1710]/40 to-[#0F1710]/90 pointer-events-none" />
      </motion.div>

      {/* Top Spacer / Navigation buffer */}
      <div className="w-full pt-20 sm:pt-24" />

      {/* Hero Content Center */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center py-12 my-auto flex flex-col items-center"
      >
        {/* Eyebrow / Sanctuary Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#F8BBD0]/30 text-[#F8BBD0] text-xs sm:text-sm font-medium tracking-wider uppercase mb-6 shadow-lg shadow-black/20 hover:border-[#F8BBD0]/60 transition-all duration-300 cursor-default font-battambang">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E65100] animate-pulse" />
          <span>រីសតគ្រួសារ និងសត្វកាពីបារ៉ាដំបូងបង្អស់នៅកម្ពុជា</span>
          <span className="text-[#F8BBD0]/60">✦</span>
          <span className="text-white/90">Casa de Capybara</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.3] mb-6 text-white drop-shadow-md font-battambang">
          {headline.split("និងភាពប្រណីត")[0]}
          <span className="bg-gradient-to-r from-[#F8BBD0] via-[#FFB300] to-[#E65100] bg-clip-text text-transparent drop-shadow-none px-2 relative inline-block">
            និងភាពប្រណីត
            {/* Cute sparkle decoration */}
            <span className="absolute -top-4 -right-6 text-[#FFB300] text-xl opacity-80 animate-bounce delay-100">✨</span>
          </span>
          {headline.split("និងភាពប្រណីត")[1] || ""}
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="max-w-2xl sm:max-w-3xl text-base sm:text-lg md:text-xl text-gray-200/90 font-light leading-relaxed mb-10 drop-shadow font-battambang">
          {subheadline}
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none font-battambang">
          {/* Primary CTA - Book an Encounter (Pink Lead) */}
          <Link
            href={primaryCtaLink}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full overflow-hidden shadow-xl shadow-[#468CD0]/25 hover:shadow-2xl hover:shadow-[#468CD0]/40 hover:-translate-y-1 active:translate-y-0 bg-[#468CD0] hover:bg-[#3B7ABB]"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl group-hover:scale-125 transition-transform duration-300 origin-bottom-right">🐾</span>
              {primaryCtaText}
            </span>
          </Link>

          {/* Secondary CTA - Explore Stays (Blue Lead) */}
          <Link
            href={secondaryCtaLink}
            className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full backdrop-blur-md bg-white/10 hover:bg-[#0284C7]/20 border border-white/30 hover:border-[#38BDF8]/80 hover:text-[#38BDF8] hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-black/20"
          >
            <span className="flex items-center gap-2">
              <span>{secondaryCtaText}</span>
              <span className="text-xl group-hover:-rotate-12 transition-transform duration-300">🛖</span>
            </span>
          </Link>
        </motion.div>

        {/* Quick Highlights / Trust Pills (Pink & Blue Primary Leads) */}
        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left font-battambang">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-[#FB7185]/20">
            <div className="p-2 rounded-lg bg-[#F43F5E]/20 text-[#FB7185]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">ការថែទាំ</p>
              <p className="text-sm font-semibold text-white">ប្រកបដោយក្រមសីលធម៌</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-[#38BDF8]/20">
            <div className="p-2 rounded-lg bg-[#0284C7]/25 text-[#38BDF8]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">កន្លែងស្នាក់នៅ</p>
              <p className="text-sm font-semibold text-white">បន្ទប់ជាប់អាងហែលទឹក</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">ហាងកាហ្វេ</p>
              <p className="text-sm font-semibold text-white">អាហារសរីរាង្គ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/5">
            <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">បទពិសោធន៍ថ្មី</p>
              <p className="text-sm font-semibold text-white">ជាមួយកាពីបារ៉ា</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Bottom Bar: Video Toggle & Scroll Down Cue */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between font-battambang">
        {/* Video toggle button */}
        <button
          onClick={() => setPlayVideo(!playVideo)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs text-gray-200 transition-colors z-50"
          aria-label={playVideo ? "បញ្ឈប់វីដេអូ" : "ចាក់វីដេអូ"}
        >
          {playVideo ? (
            <>
              <svg className="w-4 h-4 text-[#FFB300]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#FFB300]">បញ្ឈប់វីដេអូ</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>ចាក់វីដេអូ</span>
            </>
          )}
        </button>

        {/* Scroll Cue */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="flex flex-col items-center gap-1.5 text-xs text-gray-400"
        >
          <span className="tracking-widest uppercase text-[10px]">ស្វែងយល់បន្ថែម</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#E65100] animate-bounce" />
          </div>
        </motion.div>

        {/* Location pill */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300">
          <svg className="w-4 h-4 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>ក្រុងសៀមរាប, កម្ពុជា</span>
        </div>
      </div>
    </section>
  );
}
