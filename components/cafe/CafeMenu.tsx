"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Utensils, Search, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CafeMenuItem as WPCafeMenuItem } from "@/lib/wordpress";
import { COMPLETE_PHYSICAL_MENU, PHYSICAL_MENU_CATEGORIES, MenuItemCatalog } from "@/data/menuCatalog";
import VirtualMenuBook from "./VirtualMenuBook";

export interface MenuItem {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  imageUrl?: string;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
  badge?: string;
}

const ITEMS_PER_PAGE = 9;

export default function CafeMenu({ wpItems }: { wpItems?: WPCafeMenuItem[] }) {
  const [viewMode, setViewMode] = useState<"booklet" | "interactive">("booklet");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDietary, setActiveDietary] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const menuGridRef = useRef<HTMLDivElement>(null);

  // Merge physical catalog with any extra WordPress items
  const menuItems = useMemo<MenuItem[]>(() => {
    const baseItems: MenuItem[] = COMPLETE_PHYSICAL_MENU.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl,
      dietary: item.dietary,
      badge: item.badge,
    }));

    if (!wpItems || wpItems.length === 0) return baseItems;

    // Append any custom WP items not in catalog
    const baseTitles = new Set(baseItems.map((i) => i.title.toLowerCase()));
    const additional = wpItems
      .filter((wp) => !baseTitles.has(wp.title.toLowerCase()))
      .map((wp) => ({
        id: wp.id,
        title: wp.title,
        price: "$6.00",
        description: wp.content.replace(/<[^>]*>?/gm, "") || "Freshly made daily in our sanctuary kitchen.",
        category: "Capybara Favourites (Burgers & Sandwiches)",
        imageUrl: wp.thumbnailUrl || "/gallery/cafe/atmosphere-1.jpg",
        badge: "Specialty",
      }));

    return [...baseItems, ...additional];
  }, [wpItems]);

  // Categories list
  const categories = PHYSICAL_MENU_CATEGORIES;

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchDietary = !activeDietary || (item.dietary && item.dietary.includes(activeDietary as any));
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDietary && matchSearch;
    });
  }, [menuItems, activeCategory, activeDietary, searchQuery]);

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
          Experience our physical café menu online. Browse the authentic Canva booklet replica or explore our complete interactive menu with prices, dietary tags, and direct ordering.
        </p>

        {/* Master View Mode Switcher: Virtual Booklet vs Interactive Menu */}
        <div className="inline-flex p-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-lg mt-8 shadow-xl">
          <button
            onClick={() => setViewMode("booklet")}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              viewMode === "booklet"
                ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30 scale-105"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Virtual Menu Booklet</span>
          </button>

          <button
            onClick={() => setViewMode("interactive")}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              viewMode === "interactive"
                ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-lg shadow-[#0284C7]/30 scale-105"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>✨ Interactive Menu & Prices</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: VIRTUAL MENU BOOKLET (REAL PRINT REPLICA) */}
      {viewMode === "booklet" ? (
        <div className="w-full">
          <VirtualMenuBook />
        </div>
      ) : (
        /* VIEW MODE 2: INTERACTIVE DIGITAL MENU */
        <div>
          {/* Search & Filter Controls */}
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
                placeholder="Search food, drinks, ingredients (e.g. burger, matcha, gnocchi)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#F43F5E] focus:ring-1 focus:ring-[#F43F5E] transition-all"
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

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-5xl px-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 touch-manipulation active:scale-95 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-lg shadow-[#F43F5E]/30 scale-105"
                      : "bg-[#1E293B]/70 text-gray-300 hover:text-white hover:bg-[#334155]/80 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

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
                      ? "bg-[#0284C7] text-white border-[#38BDF8]/50 shadow-md shadow-[#0284C7]/25"
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

          {/* Menu Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="relative flex flex-col justify-between rounded-3xl p-6 group transition-all duration-300 bg-gradient-to-b from-[#1E293B]/80 via-[#0F172A]/90 to-[#020617]/95 border border-white/10 hover:border-[#F43F5E]/50 shadow-xl hover:shadow-2xl hover:shadow-[#F43F5E]/20 hover:-translate-y-1.5 backdrop-blur-md"
                  >
                    <div>
                      {/* Top Bar: Category/Badge + Price */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#F43F5E]/15 text-[#FDA4AF] border border-[#F43F5E]/30">
                          {item.badge || item.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-base font-extrabold text-white bg-white/10 border border-white/20 shadow-sm">
                          {item.price}
                        </span>
                      </div>

                      {/* Image Thumbnail */}
                      <div className="relative w-full h-44 my-3 rounded-2xl overflow-hidden bg-black/30 border border-white/5">
                        <Image
                          src={item.imageUrl || "/gallery/cafe/atmosphere-1.jpg"}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      {/* Title & Dietary */}
                      <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#FDA4AF] transition-colors">
                        {item.title}
                      </h3>

                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {item.dietary.includes("vegan") && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                              🌿 Vegan
                            </span>
                          )}
                          {item.dietary.includes("vegetarian") && !item.dietary.includes("vegan") && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-950/80 text-green-300 border border-green-500/30">
                              🌱 Vegetarian
                            </span>
                          )}
                          {item.dietary.includes("gluten-free") && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30">
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
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">Freshly prepared</span>
                      <a
                        href={orderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-bold transition-all duration-200"
                        title="Order this dish on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Order Now</span>
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
              <p className="text-lg text-gray-300 mb-2">No menu items found.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveDietary(null);
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white font-bold rounded-full text-sm"
              >
                Reset Filters
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
                      ? "bg-gradient-to-r from-[#F43F5E] to-[#EC4899] text-white shadow-md shadow-[#F43F5E]/30"
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
