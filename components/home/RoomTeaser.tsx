"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FullCapyRoom } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Users, Maximize, BedDouble, ChevronLeft, ChevronRight } from "lucide-react";

const BOOKING_URL = "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara";

export default function RoomCarousel({ rooms }: { rooms: FullCapyRoom[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Determine active dot
    const cardWidth = el.querySelector("[data-room-card]")?.clientWidth || 360;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, rooms.length - 1));
  }, [rooms.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-room-card]")?.clientWidth || 360;
    const amount = cardWidth + 24;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#0A110C] text-[#FAF7F2] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E65100]/30 to-transparent" />
      <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] bg-[#1B5E20]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[400px] h-[400px] bg-[#E65100]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <ScrollReveal direction="up" staggerIndex={0}>
              <p className="text-[#E65100] text-sm font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-px bg-[#E65100]/50" />
                Sanctuary Stays
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] font-serif">
                Sleep in <span className="italic text-[#F8BBD0]">Capybara Magic</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={2}>
              <p className="mt-6 text-lg text-gray-400 font-light leading-relaxed max-w-lg">
                Each room is a treasure hunt for children and a luxury retreat for parents. Capybara-themed everything — from bathroom tiles to slippers.
              </p>
            </ScrollReveal>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex items-center gap-3 mt-8 lg:mt-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {rooms.map((room) => (
            <div
              key={room.id}
              data-room-card
              className="flex-none w-[85vw] sm:w-[380px] lg:w-[400px] snap-start group"
            >
              <div className="relative h-full flex flex-col bg-[#131A15] border border-white/8 rounded-2xl overflow-hidden hover:border-[#E65100]/30 transition-all duration-500">
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.thumbnailUrl}
                    alt={room.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131A15] via-transparent to-transparent" />

                  {/* Capybara Encounter Badge */}
                  <div className="absolute top-4 left-4 bg-[#1B5E20]/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="text-sm">🐾</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Free Encounter Included</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6 pt-2">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#F8BBD0] transition-colors duration-300">
                    {room.title}
                  </h3>

                  <p className="text-sm text-gray-400 font-light line-clamp-2 mb-5 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.occupancy && (
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                        <Users className="w-3.5 h-3.5 text-[#E65100]" />
                        <span>{room.occupancy}</span>
                      </div>
                    )}
                    {room.sizeSqm && (
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                        <Maximize className="w-3.5 h-3.5 text-[#E65100]" />
                        <span>{room.sizeSqm}</span>
                      </div>
                    )}
                    {room.bedType && (
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                        <BedDouble className="w-3.5 h-3.5 text-[#E65100]" />
                        <span>{room.bedType}</span>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex gap-3">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center py-3 bg-[#E65100] text-white text-sm font-bold rounded-xl hover:bg-[#d84315] transition-all duration-300 shadow-lg shadow-[#E65100]/20"
                    >
                      Book Now
                    </a>
                    <Link
                      href={`/stay/${room.slug}`}
                      className="flex-1 flex items-center justify-center py-3 border border-white/20 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      Room Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {rooms.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const card = el.querySelector("[data-room-card]");
                if (!card) return;
                el.scrollTo({ left: i * (card.clientWidth + 24), behavior: "smooth" });
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-[#E65100]" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to room ${i + 1}`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/stay"
              className="group relative inline-flex items-center justify-center gap-4 py-4 px-10 border border-[#E65100]/50 text-[#E65100] text-sm uppercase tracking-widest hover:text-white transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#E65100] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10">View All Rooms</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
