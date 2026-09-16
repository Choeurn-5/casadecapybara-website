import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedMenuItems } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
  return {
    badge: "Sanctuary Recipe",
    description: "Crafted fresh daily with 100% organic ingredients sourced from local Siem Reap growers.",
    scaleClass: "scale-[1.02] sm:scale-[1.10] group-hover:scale-[1.08] sm:group-hover:scale-[1.16]",
    tag: "100% Organic",
  };
}

export default async function CafeTeaser() {
  const allMenuItems = await getFeaturedMenuItems();
  const menuItems = allMenuItems.slice(0, 3);

  return (
    <section className="relative w-full py-24 sm:py-36 bg-[#070D08] text-[#FAF7F2] overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E65100]/40 to-transparent" />
      <div className="absolute top-1/4 -right-64 w-[550px] h-[550px] bg-[#1B5E20]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-[450px] h-[450px] bg-[#E65100]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-16 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="w-full lg:w-5/12 flex flex-col items-start">
            <ScrollReveal direction="up" staggerIndex={0}>
              <p className="text-[#E65100] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                <span className="w-12 h-px bg-[#E65100]/60" />
                The Sanctuary Café
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerIndex={1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] mb-8 font-serif">
                Taste the Tropics, <br />
                <span className="italic bg-gradient-to-r from-[#F8BBD0] via-[#FFB300] to-[#E65100] bg-clip-text text-transparent">Nourish the Soul.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerIndex={2}>
              <p className="text-lg sm:text-xl text-gray-300/90 mb-10 leading-relaxed font-light">
                Unwind in our breathtaking open-air dining space. Serving 100% organic, farm-to-table cuisine inspired by local flavors. Watch the capybaras graze peacefully while you sip on a handcrafted rainforest latte.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerIndex={3}>
              <Link
                href="/cafe"
                className="group relative inline-flex items-center justify-center gap-4 py-4 px-10 rounded-full border border-[#E65100] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold shadow-[0_4px_20px_rgba(230,81,0,0.25)] hover:shadow-[0_6px_30px_rgba(230,81,0,0.45)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#E65100] to-[#FF9800] group-hover:scale-105 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Discover the Menu</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column: Menu Showcase (Luxury Floating Gastronomy Cards) */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-start">
              {menuItems.map((item, index) => {
                const meta = getDishDetails(item.title);
                return (
                  <ScrollReveal key={item.id} direction="up" staggerIndex={index} delay={0.15 * index}>
                    <Link
                      href="/cafe"
                      className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 group cursor-pointer transition-all duration-500 bg-gradient-to-b from-[#132317]/90 via-[#0E1C12]/90 to-[#071109]/95 border border-white/10 hover:border-[#FF9800]/50 shadow-xl hover:shadow-[0_20px_50px_rgba(230,81,0,0.25)] hover:-translate-y-2 backdrop-blur-md overflow-visible ${
                        index === 1 ? "sm:translate-y-6" : index === 2 ? "sm:translate-y-12" : ""
                      }`}
                    >
                      {/* Top Info Bar: Badge (No Price) */}
                      <div className="flex items-center justify-between gap-2 mb-2 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#E65100]/20 text-[#FF9800] border border-[#E65100]/30 shadow-xs">
                          {meta.badge}
                        </span>
                      </div>

                      {/* Hero Image Presentation Stage with Ambient Glow & Floating Lift */}
                      <div className="relative w-full aspect-square my-3 flex items-center justify-center overflow-visible">
                        {/* Radiant Ambient Halo */}
                        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FF9800]/25 via-[#E65100]/10 to-transparent blur-2xl pointer-events-none group-hover:from-[#FF9800]/45 group-hover:via-[#E65100]/20 transition-all duration-700" />

                        {/* Grounding Shadow */}
                        <div className="absolute bottom-1 w-3/4 h-5 rounded-[50%] bg-black/50 blur-md group-hover:scale-110 group-hover:opacity-75 transition-all duration-500" />

                        {/* Bold Scaled Dish Image */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            unoptimized
                            className={`object-contain transition-all duration-700 ease-out drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] group-hover:-translate-y-2 ${meta.scaleClass}`}
                          />
                        </div>
                      </div>

                      {/* Typography and Description */}
                      <div className="text-left mt-2 z-10">
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1.5 group-hover:text-[#FFB74D] transition-colors duration-300 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-300/85 font-light leading-relaxed line-clamp-2 mb-3">
                          {item.content || meta.description}
                        </p>
                        
                        {/* Micro Footnote */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                          <span className="text-[#81C784] font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] inline-block" />
                            {meta.tag}
                          </span>
                          <span className="text-xs text-[#FF9800] group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
