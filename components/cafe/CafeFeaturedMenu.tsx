"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CafeMenuItem as WPCafeMenuItem } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
}

const DISH_ENRICHMENT: Record<
  string,
  { badge: string; description: string; scaleClass: string; tag: string }
> = {
  "mediterranean skewers": {
    badge: "Chef's Signature",
    description: "Tender flame-grilled skewers with garden herbs, crisp local greens & balsamic reduction.",
    scaleClass: "scale-[0.98] sm:scale-[1.05] group-hover:scale-[1.04] sm:group-hover:scale-[1.12]",
    tag: "Wood-Smoked",
  },
  "garden pizza": {
    badge: "Stone-Baked",
    description: "Artisan crispy crust with sun-ripened organic vegetables, fresh basil & melted mozzarella.",
    scaleClass: "scale-[1.12] sm:scale-[1.22] group-hover:scale-[1.18] sm:group-hover:scale-[1.28]",
    tag: "Wood-Fired Oven",
  },
  "cinnamon coffee": {
    badge: "Specialty Brew",
    description: "Rich espresso infused with wild Ceylon cinnamon, velvety steamed coconut milk & raw honey.",
    scaleClass: "scale-[1.08] sm:scale-[1.18] group-hover:scale-[1.14] sm:group-hover:scale-[1.24]",
    tag: "Artisan Roasted",
  },
  "beetroot latte": {
    badge: "Superfood Elixir",
    description: "Cold-pressed organic beetroot, gentle ginger spice & silky warm barista oat milk.",
    scaleClass: "scale-[1.08] sm:scale-[1.18] group-hover:scale-[1.14] sm:group-hover:scale-[1.24]",
    tag: "Plant-Based",
  },
};

function getDishDetails(title: string) {
  const lower = title.toLowerCase();
  for (const [key, val] of Object.entries(DISH_ENRICHMENT)) {
    if (lower.includes(key) || key.includes(lower)) {
      return val;
    }
  }
  if (lower.includes("pizza")) {
    return {
      badge: "Stone-Baked",
      description: "Artisan crispy crust with garden vegetables, aromatic herbs & rich melted cheese.",
      scaleClass: "scale-[1.12] sm:scale-[1.22] group-hover:scale-[1.18] sm:group-hover:scale-[1.28]",
      tag: "Wood-Fired Oven",
    };
  }
  if (lower.includes("skewer") || lower.includes("grill") || lower.includes("bbq")) {
    return {
      badge: "Chef's Signature",
      description: "Flame-grilled to perfection with aromatic herbs and seasonal local greens.",
      scaleClass: "scale-[0.98] sm:scale-[1.05] group-hover:scale-[1.04] sm:group-hover:scale-[1.12]",
      tag: "Wood-Smoked",
    };
  }
  if (lower.includes("coffee") || lower.includes("latte") || lower.includes("espresso") || lower.includes("tea")) {
    return {
      badge: "Specialty Brew",
      description: "Handcrafted beverage infused with natural botanical notes and velvety steamed foam.",
      scaleClass: "scale-[1.08] sm:scale-[1.18] group-hover:scale-[1.14] sm:group-hover:scale-[1.24]",
      tag: "Artisan Roasted",
    };
  }
  if (lower.includes("cake") || lower.includes("pastry") || lower.includes("tart") || lower.includes("dessert")) {
    return {
      badge: "Daily Patisserie",
      description: "Freshly baked in-house with European butter and tropical fruit glazes.",
      scaleClass: "scale-[1.05] sm:scale-[1.14] group-hover:scale-[1.10] sm:group-hover:scale-[1.20]",
      tag: "Freshly Baked",
    };
  }
  return {
    badge: "Sanctuary Recipe",
    description: "Crafted fresh daily with 100% organic ingredients sourced from local Siem Reap growers.",
    scaleClass: "scale-[1.02] sm:scale-[1.10] group-hover:scale-[1.08] sm:group-hover:scale-[1.16]",
    tag: "100% Organic",
  };
}

// Helper to strip HTML tags from WP content
function stripHtml(html: string) {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>?/gm, "");
  }
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function enrichMenuItem(wpItem: WPCafeMenuItem): MenuItem {
  const titleLower = wpItem.title.toLowerCase();

  let category = "All Day & Mains";
  if (
    titleLower.includes("breakfast") ||
    titleLower.includes("pancake") ||
    titleLower.includes("croissant") ||
    titleLower.includes("benedict") ||
    titleLower.includes("toast")
  ) {
    category = "Breakfast (7am–11am)";
  } else if (
    titleLower.includes("amok") ||
    titleLower.includes("khmer") ||
    titleLower.includes("noodle") ||
    titleLower.includes("rice") ||
    titleLower.includes("curry")
  ) {
    category = "Khmer & Asian Specialties";
  } else if (
    titleLower.includes("cake") ||
    titleLower.includes("tart") ||
    titleLower.includes("sweet") ||
    titleLower.includes("dessert") ||
    titleLower.includes("cookie")
  ) {
    category = "Pastries & Sweets";
  } else if (
    titleLower.includes("latte") ||
    titleLower.includes("matcha") ||
    titleLower.includes("coffee") ||
    titleLower.includes("drink") ||
    titleLower.includes("tea") ||
    titleLower.includes("juice") ||
    titleLower.includes("smoothie")
  ) {
    category = "Signature Drinks & Coffee";
  }

  const dietary: ("vegetarian" | "vegan" | "gluten-free")[] = [];
  if (titleLower.includes("vegan")) dietary.push("vegan");
  if (titleLower.includes("vegetarian") || titleLower.includes("salad") || titleLower.includes("veg"))
    dietary.push("vegetarian");
  if (titleLower.includes("gluten-free") || titleLower.includes("gf")) dietary.push("gluten-free");

  return {
    id: wpItem.id,
    title: wpItem.title,
    description: stripHtml(wpItem.content),
    category,
    imageUrl: wpItem.thumbnailUrl,
    dietary,
  };
}

export default function CafeFeaturedMenu({ wpItems }: { wpItems: WPCafeMenuItem[] }) {
  const menuItems = useMemo(() => wpItems.map(enrichMenuItem), [wpItems]);
  const featuredItems = menuItems.slice(0, 6);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4" id="menu">
      <ScrollReveal direction="down">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#E65100] text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-8 sm:w-10 h-px bg-[#E65100]/60" />
            Gastronomy Highlights
            <span className="w-8 sm:w-10 h-px bg-[#E65100]/60" />
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1B5E20] mb-4">A Taste of Our Sanctuary</h2>
          <div className="w-20 sm:w-24 h-1 bg-[#E65100] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg font-light leading-relaxed px-2">
            A small preview of our chef's daily creations. 100% organic farm-to-table dining inspired by tropical Cambodian flavors.
          </p>
        </div>
      </ScrollReveal>

      {/* Menu Grid: Luxury Dark Obsidian & Emerald Glass Cards (No Price, Mobile Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-14 sm:mb-16">
        {featuredItems.map((item, idx) => {
          const details = getDishDetails(item.title);
          return (
            <ScrollReveal key={item.id} delay={idx * 0.1} direction="up">
              <Link
                href="/cafe/menu"
                className="relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 group cursor-pointer transition-all duration-500 bg-gradient-to-b from-[#132317]/95 via-[#0E1C12]/95 to-[#071109]/95 border border-white/10 hover:border-[#FF9800]/50 shadow-xl hover:shadow-[0_20px_50px_rgba(230,81,0,0.25)] hover:-translate-y-1.5 sm:hover:-translate-y-2 backdrop-blur-md overflow-visible h-full"
              >
                {/* Top Info Bar: Category Badge + Dietary Pills */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 z-10">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#E65100]/20 text-[#FF9800] border border-[#E65100]/30 shadow-xs">
                    {details.badge}
                  </span>
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      {item.dietary.includes("vegan") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/70 text-[#81C784] border border-[#81C784]/30">
                          🌿 Vegan
                        </span>
                      )}
                      {item.dietary.includes("vegetarian") && !item.dietary.includes("vegan") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-950/70 text-[#81C784] border border-[#81C784]/30">
                          🌱 Veg
                        </span>
                      )}
                      {item.dietary.includes("gluten-free") && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/70 text-[#FFB74D] border border-[#FFB74D]/30">
                          🌾 GF
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Hero Image Presentation Stage with Ambient Glow & Floating Lift */}
                <div className="relative w-full aspect-square max-h-[260px] sm:max-h-none my-3 sm:my-4 flex items-center justify-center overflow-visible">
                  {/* Radiant Ambient Halo */}
                  <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FF9800]/25 via-[#E65100]/10 to-transparent blur-2xl pointer-events-none group-hover:from-[#FF9800]/45 group-hover:via-[#E65100]/20 transition-all duration-700" />

                  {/* Grounding Soft Shadow */}
                  <div className="absolute bottom-1 w-3/4 h-5 rounded-[50%] bg-black/50 blur-md group-hover:scale-110 group-hover:opacity-75 transition-all duration-500" />

                  {/* Bold Scaled Dish Image */}
                  {item.imageUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className={`object-contain transition-all duration-700 ease-out drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] group-hover:-translate-y-2 ${details.scaleClass}`}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#81C784]/30">
                      <span className="text-4xl sm:text-5xl">🍽️</span>
                    </div>
                  )}
                </div>

                {/* Typography and Description */}
                <div className="text-left mt-2 z-10">
                  <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mb-1.5 sm:mb-2 group-hover:text-[#FFB74D] transition-colors duration-300 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300/85 font-light leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                    {item.description || details.description}
                  </p>

                  {/* Micro Footnote: Farm/Culinary Tag & Link Arrow */}
                  <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <span className="text-[#81C784] font-medium flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#4CAF50] inline-block shadow-[0_0_8px_#4CAF50]" />
                      {details.tag}
                    </span>
                    <span className="text-[#FF9800] text-[11px] sm:text-xs font-semibold tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                      View Dish →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal>
        <div className="text-center">
          <Link
            href="/cafe/menu"
            className="group inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 bg-gradient-to-r from-[#E65100] to-[#FF9800] hover:from-[#c94600] hover:to-[#E65100] text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_10px_30px_rgba(230,81,0,0.4)] text-base sm:text-lg"
          >
            <span>Explore Full Interactive Menu</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
