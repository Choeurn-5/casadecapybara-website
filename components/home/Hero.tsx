"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HeroProps {
  youtubeId?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  youtubeId = "Kx3kZwcTJ3I",
  headline = "Where Nature's Gentle Soul Meets Luxury Sanctuary",
  subheadline = "Immerse yourself in tranquil eco-villas, organic garden dining, and unforgettable, heartwarming moments with our resident capybaras.",
  primaryCtaText = "Book an Encounter",
  primaryCtaLink = "/capybara-experience",
  secondaryCtaText = "Explore Our Stays",
  secondaryCtaLink = "/stay",
}: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // YouTube embed URL with loop, mute, autoplay, and hidden controls
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${
    isMuted ? "1" : "0"
  }&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-[#0F1710] text-white">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Fallback & Loading Poster Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-30" : "opacity-90"
          }`}
          style={{
            backgroundImage: `url('https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg')`,
            backgroundColor: "#1B5E20",
          }}
        />

        {/* YouTube Responsive Video Container */}
        <div className="video-background-wrapper scale-110 sm:scale-105">
          <iframe
            className="w-full h-full object-cover border-0"
            src={youtubeEmbedUrl}
            title="Casa de Capybara Sanctuary Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>

        {/* Rich Multi-Layer Gradient Overlays */}
        {/* 1. Deep Vignette and Dark Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />

        {/* 2. Brand Color Washes: Forest Green + Twilight Warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/50 via-transparent to-[#E65100]/30 mix-blend-color-dodge" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0F1710]/40 to-[#0F1710]/90" />
      </div>

      {/* Top Spacer / Navigation buffer */}
      <div className="w-full pt-20 sm:pt-24" />

      {/* Hero Content Center */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center py-12 my-auto flex flex-col items-center">
        {/* Eyebrow / Sanctuary Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#F8BBD0]/30 text-[#F8BBD0] text-xs sm:text-sm font-medium tracking-wider uppercase mb-6 shadow-lg shadow-black/20 hover:border-[#F8BBD0]/60 transition-all duration-300">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E65100] animate-pulse" />
          <span>Cambodia&apos;s Premier Wildlife Eco-Resort</span>
          <span className="text-[#F8BBD0]/60">✦</span>
          <span className="text-white/90">Casa de Capybara</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-white drop-shadow-md">
          {headline.split("Gentle Soul")[0]}
          <span className="bg-gradient-to-r from-[#F8BBD0] via-[#FFB300] to-[#E65100] bg-clip-text text-transparent drop-shadow-none">
            Gentle Soul
          </span>
          {headline.split("Gentle Soul")[1] || ""}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl sm:max-w-3xl text-base sm:text-lg md:text-xl text-gray-200/90 font-light leading-relaxed mb-10 drop-shadow">
          {subheadline}
        </p>

        {/* Call to Actions (CTAs) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none">
          {/* Primary CTA - Book an Encounter */}
          <Link
            href={primaryCtaLink}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full overflow-hidden shadow-xl shadow-[#E65100]/25 hover:shadow-2xl hover:shadow-[#E65100]/40 hover:-translate-y-0.5 active:translate-y-0 bg-gradient-to-r from-[#E65100] to-[#F57C00] hover:from-[#d84315] hover:to-[#e65100]"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {primaryCtaText}
            </span>
          </Link>

          {/* Secondary CTA - Explore Stays */}
          <Link
            href={secondaryCtaLink}
            className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/20"
          >
            <span className="flex items-center gap-2">
              <span>{secondaryCtaText}</span>
              <svg
                className="w-4 h-4 text-[#F8BBD0] group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Quick Highlights / Trust Pills */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/5">
            <div className="p-2 rounded-lg bg-[#1B5E20]/60 text-[#F8BBD0]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">Sanctuary Care</p>
              <p className="text-sm font-semibold text-white">Ethical Wildlife</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/5">
            <div className="p-2 rounded-lg bg-[#2E7D32]/60 text-emerald-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">Eco Accommodations</p>
              <p className="text-sm font-semibold text-white">Lagoon Villas</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/5">
            <div className="p-2 rounded-lg bg-[#E65100]/60 text-amber-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">Farm & Flavors</p>
              <p className="text-sm font-semibold text-white">Organic Dining</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/5">
            <div className="p-2 rounded-lg bg-[#1B5E20]/60 text-[#F8BBD0]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-300">Guided Tours</p>
              <p className="text-sm font-semibold text-white">Capybara Friends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Audio Toggle & Scroll Down Cue */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between">
        {/* Sound toggle button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs text-gray-200 transition-colors"
          aria-label={isMuted ? "Unmute background sound" : "Mute background sound"}
        >
          {isMuted ? (
            <>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span>Sound Muted</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-[#FFB300]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span className="text-[#FFB300]">Sound Playing</span>
            </>
          )}
        </button>

        {/* Scroll Cue */}
        <div className="flex flex-col items-center gap-1.5 text-xs text-gray-400">
          <span className="tracking-widest uppercase text-[10px]">Explore</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#E65100] animate-bounce" />
          </div>
        </div>

        {/* Location pill */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300">
          <svg className="w-4 h-4 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Siem Reap / Cambodia</span>
        </div>
      </div>
    </section>
  );
}
