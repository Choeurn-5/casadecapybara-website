"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CafeMenuItem as WPCafeMenuItem } from "@/lib/wordpress";

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string | number;
  category: string;
  imageUrl?: string;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
}

const CATEGORIES = [
  "All",
  "Breakfast (7am–11am)",
  "All Day & Mains",
  "Khmer & Asian Specialties",
  "Pastries & Sweets",
  "Signature Drinks & Coffee"
];

// Helper to strip HTML tags from WP content
function stripHtml(html: string) {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>?/gm, '');
  }
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// Deterministic helper to assign realistic mock data based on title
// since our WP API currently only returns title and content.
function enrichMenuItem(wpItem: WPCafeMenuItem): MenuItem {
  const titleLower = wpItem.title.toLowerCase();
  
  let category = "All Day & Mains";
  if (titleLower.includes("breakfast") || titleLower.includes("pancake") || titleLower.includes("croissant") || titleLower.includes("benedict") || titleLower.includes("toast")) {
    category = "Breakfast (7am–11am)";
  } else if (titleLower.includes("amok") || titleLower.includes("khmer") || titleLower.includes("noodle") || titleLower.includes("rice") || titleLower.includes("curry")) {
    category = "Khmer & Asian Specialties";
  } else if (titleLower.includes("cake") || titleLower.includes("tart") || titleLower.includes("sweet") || titleLower.includes("dessert") || titleLower.includes("cookie")) {
    category = "Pastries & Sweets";
  } else if (titleLower.includes("latte") || titleLower.includes("matcha") || titleLower.includes("coffee") || titleLower.includes("drink") || titleLower.includes("tea") || titleLower.includes("juice") || titleLower.includes("smoothie")) {
    category = "Signature Drinks & Coffee";
  }

  const dietary: ("vegetarian" | "vegan" | "gluten-free")[] = [];
  if (titleLower.includes("vegan")) dietary.push("vegan");
  if (titleLower.includes("vegetarian") || titleLower.includes("salad") || titleLower.includes("veg")) dietary.push("vegetarian");
  if (titleLower.includes("gluten-free") || titleLower.includes("gf")) dietary.push("gluten-free");

  // Hash title for a consistent price mock between $4.50 and $18.00
  const hash = titleLower.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const mockPrice = 4.5 + (Math.abs(hash) % 14);

  return {
    id: wpItem.id,
    title: wpItem.title,
    description: stripHtml(wpItem.content),
    price: mockPrice.toFixed(2),
    category,
    imageUrl: wpItem.thumbnailUrl,
    dietary
  };
}

export default function CafeMenu({ wpItems }: { wpItems: WPCafeMenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDietary, setActiveDietary] = useState<string | null>(null);

  const menuItems = useMemo(() => wpItems.map(enrichMenuItem), [wpItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchDietary = !activeDietary || (item.dietary && item.dietary.includes(activeDietary as any));
      return matchCategory && matchDietary;
    });
  }, [menuItems, activeCategory, activeDietary]);

  return (
    <div className="w-full max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4">Our Culinary Experience</h2>
        <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full mb-8"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Everything is prepared fresh daily in-house, from our signature sauces and burger buns to our delicate pastries and homemade gnocchi.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center gap-6 mb-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/20 scale-105" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1B5E20]/30 hover:bg-[#E8F5E9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Toggles */}
        <div className="flex flex-wrap justify-center gap-3">
          <span className="text-sm text-gray-500 font-medium py-1.5">Filter by dietary:</span>
          {[
            { id: "vegetarian", label: "🌱 Vegetarian" },
            { id: "vegan", label: "🌿 Vegan" },
            { id: "gluten-free", label: "🌾 Gluten-Free" }
          ].map(diet => (
            <button
              key={diet.id}
              onClick={() => setActiveDietary(activeDietary === diet.id ? null : diet.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                activeDietary === diet.id
                  ? "bg-[#E65100] text-white"
                  : "bg-[#F8BBD0]/30 text-[#1B5E20] hover:bg-[#F8BBD0]/60"
              }`}
            >
              {diet.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E8F5E9] transition-shadow duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2]">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-contain p-6 drop-shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2E7D32]/30">
                    <span className="text-4xl">🍽️</span>
                  </div>
                )}
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-[#E65100] font-bold text-sm">
                  ${item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-xl font-bold text-[#1B5E20] group-hover:text-[#2E7D32] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
                
                {/* Dietary Badges */}
                {item.dietary && item.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.dietary.includes("vegetarian") && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-green-100 text-green-800">🌱 Veg</span>}
                    {item.dietary.includes("vegan") && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">🌿 Vegan</span>}
                    {item.dietary.includes("gluten-free") && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">🌾 GF</span>}
                  </div>
                )}

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {item.description || "Freshly prepared with local ingredients by our expert chefs."}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No menu items found matching these filters.</p>
          <button 
            onClick={() => { setActiveCategory("All"); setActiveDietary(null); }}
            className="mt-4 text-[#E65100] font-bold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Sub-bar */}
      <div className="mt-16 bg-[#B3E5FC]/20 border border-[#B3E5FC]/50 rounded-2xl p-6 text-center max-w-3xl mx-auto">
        <p className="text-[#1A1A1A] font-medium">
          Have special dietary needs? Our kitchen prepares custom orders upon request. <br className="hidden sm:block"/>
          <span className="text-[#E65100] font-bold">Please inform our staff when ordering.</span>
        </p>
      </div>
    </div>
  );
}
