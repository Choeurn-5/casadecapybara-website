"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FullCapyRoom } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Users, Maximize, BedDouble, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const BOOKING_URL = "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara";

export default function RoomTeaserKh({ rooms }: { rooms: FullCapyRoom[] }) {
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
    <section className="relative w-full py-20 sm:py-28 bg-gradient-to-b from-[#F0F9FF]/70 via-[#FAF7F2] to-[#E0F2FE]/40 text-[#1A2E1C] overflow-hidden font-battambang">
      {/* Ambient decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0284C7]/20 to-transparent" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-[#F43F5E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <ScrollReveal direction="up" staggerIndex={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] border border-[#38BDF8]/40 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>សណ្ឋាគារប៊ូទិក</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.3]">
                ដំណើរកម្សាន្តនៃក្តីស្រមៃ <br/>
                <span className="text-[#0284C7]">របស់អ្នក</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={2}>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                គ្រប់បន្ទប់ទាំងអស់ត្រូវបានរៀបចំឡើងយ៉ាងសម្រិតសម្រាំងសម្រាប់ក្រុមគ្រួសារ និងអ្នកធ្វើដំណើរ ដែលចង់ស្វែងរកភាពស្ងប់ស្ងាត់។ ការស្នាក់នៅរបស់អ្នកគឺរួមបញ្ចូលនូវការលេងជាមួយសត្វកាពីបារ៉ាដោយសេរី។
              </p>
            </ScrollReveal>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex items-center gap-3 mt-8 lg:mt-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-[#0284C7]/30 bg-white shadow-sm flex items-center justify-center text-[#0284C7] hover:bg-[#0284C7] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-[#0284C7]/30 bg-white shadow-sm flex items-center justify-center text-[#0284C7] hover:bg-[#0284C7] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {rooms.map((room) => {
            const cleanSize = room.sizeSqm?.replace(/\s*sqm\s*sqm/gi, ' ម៉ែត្រការ៉េ').replace(/m²\s*sqm/gi, ' ម៉ែត្រការ៉េ').replace(/sqm/gi, ' ម៉ែត្រការ៉េ').replace(/m²/gi, ' ម៉ែត្រការ៉េ');

            return (
              <div
                key={room.id}
                data-room-card
                className="flex-none w-[85vw] sm:w-[380px] lg:w-[400px] snap-start group"
              >
                <div className="relative h-full flex flex-col bg-white border border-[#E8F5E9] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={room.thumbnailUrl}
                      alt={room.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                    {/* Capybara Encounter Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#1B5E20] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-[#1B5E20]/15">
                      <span className="text-xs">🐾</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">ជួបកាពីបារ៉ាឥតគិតថ្លៃ</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6 pt-5">
                    <h3 className="text-2xl font-bold text-[#1B5E20] mb-2 tracking-tight group-hover:text-[#E65100] transition-colors duration-300">
                      {room.title}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-5 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.occupancy && (
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#F0EBE1] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1A2E1C]">
                          <Users className="w-3.5 h-3.5 text-[#E65100]" />
                          <span>{room.occupancy.replace(/Adults/g, "មនុស្សធំ").replace(/Children/g, "កុមារ").replace(/Max/g, "អតិបរមា").replace(/Guests/g, "នាក់").replace(/Guest/g, "នាក់")}</span>
                        </div>
                      )}
                      {cleanSize && (
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#F0EBE1] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1A2E1C]">
                          <Maximize className="w-3.5 h-3.5 text-[#E65100]" />
                          <span>{cleanSize}</span>
                        </div>
                      )}
                      {room.bedType && (
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#F0EBE1] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1A2E1C]">
                          <BedDouble className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>{room.bedType.replace(/King/g, "គ្រែធំ").replace(/Twin/g, "គ្រែពីរ").replace(/Queen/g, "គ្រែកណ្តាល").replace(/Beds/g, "គ្រែ").replace(/Bed/g, "គ្រែ")}</span>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto flex gap-3">
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-3 bg-[#468CD0] text-white text-sm font-bold rounded-xl hover:bg-[#3B7ABB] transition-all duration-300 shadow-md shadow-[#468CD0]/20 hover:-translate-y-0.5"
                      >
                        កក់ឥឡូវនេះ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4">
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
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-[#0284C7]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
