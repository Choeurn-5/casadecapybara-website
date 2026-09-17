"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Utensils, Search, Sparkles, MessageCircle, ArrowRight, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CafeMenuItem as WPCafeMenuItem } from "@/lib/wordpress";
import { COMPLETE_PHYSICAL_MENU, MENU_SECTIONS, MENU_CATEGORIES, MenuItemCatalog } from "@/data/menuCatalog";
import VirtualMenuBook from "./VirtualMenuBook";

export interface MenuItem {
  id: string;
  order: number;
  menuSection: string;
  category: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
  badge?: string;
}

const ITEMS_PER_PAGE = 12;

export default function CafeMenu({ wpItems }: { wpItems?: WPCafeMenuItem[] }) {
  const [viewMode, setViewMode] = useState<"interactive" | "booklet">("interactive");
  const [activeSection, setActiveSection] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDietary, setActiveDietary] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const menuGridRef = useRef<HTMLDivElement>(null);

  // Merge physical catalog with any extra WordPress items
  const menuItems = useMemo<MenuItem[]>(() => {
    const baseItems: MenuItem[] = COMPLETE_PHYSICAL_MENU.map((item) => ({
      id: item.id,
      order: item.order,
      menuSection: item.menuSection,
      category: item.category,
      title: item.title,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      dietary: item.dietary,
      badge: item.badge,
    }));

    if (!wpItems || wpItems.length === 0) return baseItems;

    // Append any custom WP items not in catalog
    const baseTitles = new Set(baseItems.map((i) => i.title.toLowerCase()));
    const additional: MenuItem[] = wpItems
      .filter((wp) => !baseTitles.has(wp.title.toLowerCase()))
      .map((wp, idx) => ({
        id: wp.id,
        order: 100 + idx,
        menuSection: "Restaurant Menu",
        category: "Western & Italian Mains",
        title: wp.title,
        price: "$6.00",
        description: wp.content.replace(/<[^>]*>?/gm, "") || "Freshly made daily in our sanctuary kitchen.",
        imageUrl: wp.thumbnailUrl || "/images/menu/items/Food%20for%20Website/Restaurant%20menu/20.%20The%20Capybara%20Burger.png",
        badge: "Specialty",
      }));

    return [...baseItems, ...additional];
  }, [wpItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchSection = activeSection === "All" || item.menuSection === activeSection;
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchDietary = !activeDietary || (item.dietary && item.dietary.includes(activeDietary as any));
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSection && matchCategory && matchDietary && matchSearch;
    });
  }, [menuItems, activeSection, activeCategory, activeDietary, searchQuery]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages || 1));

  const paginatedItems = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, validCurrentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (menuGridRef.current) {
      const yOffset = -120;
      const element = menuGridRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setActiveCategory("All");
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleDietaryChange = (dietId: string) => {
    setActiveDietary((prev) => (prev === dietId ? null : dietId));
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8" id="menu">
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-[#F43F5E] text-[11px] sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
          <span className="w-8 sm:w-10 h-px bg-[#F43F5E]/60" />
          The Sanctuary Café Gastronomy
          <span className="w-8 sm:w-10 h-px bg-[#0284C7]/60" />
        </p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white mb-4 sm:mb-6 tracking-tight leading-[1.15]">
          Taste the Tropics, <br className="hidden xs:inline" />
          <span className="italic bg-gradient-to-r from-[#F472B6] via-[#FB7185] to-[#38BDF8] bg-clip-text text-transparent">
            Nourish the Soul.
          </span>
        </h1>
        <p className="text-gray-300/85 max-w-2xl mx-auto text-sm sm:text-lg font-light leading-relaxed px-2">
          Explore all our dishes and drinks in exact menu order with real photos, authentic prices, and instant WhatsApp ordering.
        </p>

        {/* Master View Mode Switcher: Interactive Digital Menu vs Virtual PDF Booklet */}
        <div className="inline-flex p-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-lg mt-8 shadow-xl">
          <button
            onClick={() => setViewMode("interactive")}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              viewMode === "interactive"
                ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-lg shadow-[#0284C7]/30 scale-105"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>✨ Real Dishes & Prices ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setViewMode("booklet")}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              viewMode === "booklet"
                ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30 scale-105"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Flip Physical PDF Booklet</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: VIRTUAL MENU BOOKLET */}
      {viewMode === "booklet" ? (
        <div className="w-full">
          <VirtualMenuBook />
        </div>
      ) : (
        /* VIEW MODE 2: INTERACTIVE DIGITAL MENU */
        <div>
          {/* Search & Master Sections (Breakfast, Restaurant, Hot Drinks, Iced Drinks) */}
          <div className="flex flex-col items-center gap-5 sm:gap-6 mb-12">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by dish name or ingredient (e.g. burger, matcha, steak)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white bg-white/10 px-2 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Menu Section Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl px-1">
              {[
                { id: "All", label: `All Items (${menuItems.length})` },
                { id: "Breakfast Menu", label: "🌅 Breakfast Menu (14)" },
                { id: "Restaurant Menu", label: "🍽️ Restaurant Menu (45)" },
                { id: "Hot Drinks", label: "☕ Hot Drinks (6)" },
                { id: "Iced Drinks", label: "🧋 Iced Drinks (6)" },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(sec.id)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 touch-manipulation active:scale-95 ${
                    activeSection === sec.id
                      ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30 scale-105"
                      : "bg-[#1E293B]/70 text-gray-300 hover:text-white hover:bg-[#334155]/80 border border-white/10"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Category Tags (Secondary granular filter) */}
            {activeSection === "All" && (
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-5xl px-1">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-[#0284C7] text-white border border-[#38BDF8]"
                        : "bg-white/5 text-gray-400 hover:text-gray-200 border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Dietary Toggles */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 px-2">
              <span className="text-xs text-gray-400 font-medium py-1">Dietary:</span>
              {[
                { id: "vegetarian", label: "🌱 Vegetarian" },
                { id: "vegan", label: "🌿 Vegan" },
                { id: "gluten-free", label: "🌾 Gluten-Free" },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => handleDietaryChange(diet.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border touch-manipulation active:scale-95 ${
                    activeDietary === diet.id
                      ? "bg-[#10B981] text-white border-emerald-400/50 shadow-md shadow-emerald-900/30"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll anchor */}
          <div ref={menuGridRef} className="scroll-mt-32" />

          {/* Modern Menu Grid: Premium Luxury Cards for PNG Cutouts */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            <AnimatePresence>
              {paginatedItems.map((item) => {
                const orderText = encodeURIComponent(
                  `Hi Casa de Capybara, I would like to order: ${item.title} (${item.price}).`
                );
                const orderUrl = `https://wa.me/855968149795?text=${orderText}`;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex flex-col justify-between rounded-3xl p-6 group transition-all duration-500 bg-gradient-to-b from-[#1E293B]/70 via-[#0F172A]/90 to-[#050B14]/95 border border-white/12 hover:border-[#F43F5E]/60 shadow-xl hover:shadow-[0_20px_50px_rgba(244,63,94,0.2)] hover:-translate-y-2 backdrop-blur-xl overflow-hidden"
                  >
                    {/* Background Dynamic Ambient Flares */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#F43F5E]/15 via-[#0284C7]/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#0284C7]/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                      {/* Top Bar: Badge + Price Pill */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 text-rose-300 border border-rose-400/30 backdrop-blur-md shadow-xs">
                          {item.badge || item.category}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-base font-black text-white bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] border border-[#38BDF8]/40 shadow-lg shadow-[#0284C7]/30">
                          {item.price}
                        </span>
                      </div>

                      {/* MODERN PNG IMAGE STAGE: Showcase Podium with Radial Halo & Soft Pedestal Shadow */}
                      <div className="relative w-full h-56 my-3 rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-black/40 border border-white/10 shadow-inner flex items-center justify-center p-4">
                        {/* Radial Spotlight Aura behind the PNG */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-44 h-44 rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FDA4AF]/25 via-[#38BDF8]/15 to-transparent blur-xl group-hover:scale-125 group-hover:opacity-100 transition-all duration-700" />
                        </div>

                        {/* Pedestal Grounding Shadow underneath the Dish */}
                        <div className="absolute bottom-3 w-3/5 h-4 bg-black/60 rounded-[50%] blur-md group-hover:scale-110 group-hover:opacity-75 transition-all duration-500 pointer-events-none" />

                        {/* Transparent PNG Dish with 3D Depth Float */}
                        <div className="relative w-full h-full flex items-center justify-center z-10">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 ease-out p-1.5"
                          />
                        </div>

                        {/* Subtle Glass Rim Light */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                      </div>

                      {/* Title & Dietary Badges */}
                      <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#FDA4AF] transition-colors">
                        {item.title}
                      </h3>

                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {item.dietary.includes("vegan") && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-xs">
                              🌿 Vegan
                            </span>
                          )}
                          {item.dietary.includes("vegetarian") && !item.dietary.includes("vegan") && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-green-950/80 text-green-300 border border-green-500/30 shadow-xs">
                              🌱 Vegetarian
                            </span>
                          )}
                          {item.dietary.includes("gluten-free") && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30 shadow-xs">
                              🌾 Gluten-Free
                            </span>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-300/85 font-light leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action: WhatsApp Quick Order */}
                    <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-medium">
                        {item.menuSection} #{item.order}
                      </span>
                      <a
                        href={orderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c35e] hover:to-[#0f7569] text-white text-xs font-bold transition-all duration-300 shadow-md shadow-emerald-950/40 hover:scale-105"
                        title="Order this dish on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Order via WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-300 mb-2">No menu items match your search or filter.</p>
              <button
                onClick={() => {
                  setActiveSection("All");
                  setActiveCategory("All");
                  setActiveDietary(null);
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white font-bold rounded-full text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(validCurrentPage - 1)}
                disabled={validCurrentPage === 1}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    validCurrentPage === num
                      ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#0284C7]/30"
                      : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(validCurrentPage + 1)}
                disabled={validCurrentPage === totalPages}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
