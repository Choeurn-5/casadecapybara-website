"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Utensils, ArrowRight, MessageCircle } from "lucide-react";
import { CafeMenuItem as WPCafeMenuItem } from "@/lib/wordpress";
import { COMPLETE_PHYSICAL_MENU } from "@/data/menuCatalog";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CafeFeaturedMenu({ wpItems }: { wpItems?: WPCafeMenuItem[] }) {
  // Use curated popular items from physical menu
  const featuredItems = useMemo(() => {
    return COMPLETE_PHYSICAL_MENU.filter((item) => item.popular).slice(0, 6);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4" id="menu">
      <ScrollReveal direction="down">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#F43F5E] text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-8 sm:w-10 h-px bg-[#F43F5E]/60" />
            Gastronomy Highlights
            <span className="w-8 sm:w-10 h-px bg-[#0284C7]/60" />
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            A Taste of Our Sanctuary
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#F43F5E] to-[#0284C7] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg font-light leading-relaxed px-2">
            Every dish is made from scratch with European kitchen hygiene standards, filtered water, and organic Cambodian farm produce.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid of Popular Dishes with Prices & WhatsApp Quick Order */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {featuredItems.map((item, idx) => {
          return (
            <ScrollReveal key={item.id} delay={idx * 0.1} direction="up">
              <div className="relative flex flex-col justify-between rounded-3xl p-6 group transition-all duration-300 bg-white border border-gray-100 hover:border-[#F43F5E]/40 shadow-xl hover:shadow-2xl hover:shadow-rose-950/10 hover:-translate-y-1.5 h-full">
                <div>
                  {/* Top Bar: Badge & Price */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-rose-50 text-rose-600 border border-rose-200">
                      {item.badge || item.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-base font-extrabold text-gray-900 bg-gray-100 border border-gray-200">
                      {item.price}
                    </span>
                  </div>

                  {/* Modern PNG Showcase Stage */}
                  <div className="relative w-full h-52 my-3 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100/60 to-gray-200/50 border border-gray-200/60 shadow-inner flex items-center justify-center p-3">
                    <div className="absolute w-36 h-36 rounded-full bg-rose-200/40 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute bottom-2 w-3/5 h-3.5 bg-black/25 rounded-[50%] blur-sm pointer-events-none" />
                    <div className="relative w-full h-full flex items-center justify-center z-10">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105 p-1"
                      />
                    </div>
                  </div>

                  {/* Title & Dietary */}
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#BE123C] transition-colors">
                    {item.title}
                  </h3>

                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {item.dietary.includes("vegan") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          🌿 Vegan
                        </span>
                      )}
                      {item.dietary.includes("vegetarian") && !item.dietary.includes("vegan") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-50 text-green-700 border border-green-200">
                          🌱 Vegetarian
                        </span>
                      )}
                      {item.dietary.includes("gluten-free") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                          🌾 Gluten-Free
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom link to view full menu or order */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href="/cafe/menu"
                    className="text-xs font-bold text-[#0284C7] hover:text-[#0369a1] flex items-center gap-1 group-hover:underline"
                  >
                    <span>View in Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/855968149795?text=${encodeURIComponent(
                      `Hi Casa de Capybara, I'd like to order: ${item.title} (${item.price})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Dual CTA: Virtual Booklet + Interactive Menu */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/cafe/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#EC4899] hover:from-[#E11D48] hover:to-[#DB2777] text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-rose-900/20 text-base"
          >
            <BookOpen className="w-5 h-5" />
            <span>📖 Flip Virtual Menu Booklet</span>
          </Link>

          <Link
            href="/cafe/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-sky-900/20 text-base"
          >
            <Utensils className="w-5 h-5" />
            <span>✨ Full Menu & All Prices</span>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
