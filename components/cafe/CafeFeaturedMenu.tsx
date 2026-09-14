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
  price: string | number;
  category: string;
  imageUrl?: string;
  dietary?: ("vegetarian" | "vegan" | "gluten-free")[];
}

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

export default function CafeFeaturedMenu({ wpItems }: { wpItems: WPCafeMenuItem[] }) {
  const menuItems = useMemo(() => wpItems.map(enrichMenuItem), [wpItems]);
  
  // Only show the first 6 items for the teaser
  const featuredItems = menuItems.slice(0, 6);

  return (
    <div className="w-full max-w-7xl mx-auto" id="menu">
      <ScrollReveal direction="down">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4">A Taste of Our Menu</h2>
          <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A small preview of what awaits you. Everything is prepared fresh daily in-house, from signature sauces to delicate pastries.
          </p>
        </div>
      </ScrollReveal>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {featuredItems.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 0.1} direction="up">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E8F5E9] transition-shadow duration-300 group flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] shrink-0">
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
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="text-center">
          <Link href="/cafe/menu" className="inline-flex items-center justify-center px-10 py-4 bg-[#E65100] hover:bg-[#c94600] text-white font-bold rounded-full transition-transform hover:-translate-y-1 shadow-xl text-lg">
            View Full Interactive Menu
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
