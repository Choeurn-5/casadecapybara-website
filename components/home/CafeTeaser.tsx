import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedMenuItems } from "@/lib/wordpress";

export default async function CafeTeaser() {
  const allMenuItems = await getFeaturedMenuItems();
  const menuItems = allMenuItems.slice(0, 3);

  return (
    <section className="relative w-full py-24 sm:py-36 bg-[#0A110C] text-[#FAF7F2] overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E65100]/30 to-transparent" />
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-[#1B5E20]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-[400px] h-[400px] bg-[#E65100]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="w-full lg:w-5/12 flex flex-col items-start">
            <p className="text-[#E65100] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-[#E65100]/50" />
              The Sanctuary Café
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] mb-8 font-serif">
              Taste the Tropics, <br />
              <span className="italic text-[#F8BBD0]">Nourish the Soul.</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed font-light">
              Unwind in our breathtaking open-air dining space. Serving 100% organic, farm-to-table cuisine inspired by local flavors. Watch the capybaras graze peacefully while you sip on a handcrafted rainforest latte.
            </p>

            <Link
              href="/cafe"
              className="group relative inline-flex items-center justify-center gap-4 py-4 px-10 border border-[#E65100]/50 text-[#E65100] text-sm uppercase tracking-widest hover:text-white transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#E65100] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10">Discover the Menu</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right Column: Menu Items (Staggered Lookbook Layout) */}
          <div className="w-full lg:w-7/12 relative">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center sm:items-stretch">
              {menuItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`relative w-full max-w-[280px] sm:w-1/3 group cursor-pointer ${
                    index === 1 ? 'sm:mt-16' : index === 2 ? 'sm:mt-32 hidden sm:block' : ''
                  }`}
                >
                  {/* Image Container with aspect ratio and glass hover effect */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] mb-6 rounded-2xl">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-contain p-6 drop-shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out"
                    />
                    
                    {/* Decorative Corner Lines */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-black/10 group-hover:border-[#E65100]/60 transition-colors duration-500" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-black/10 group-hover:border-[#E65100]/60 transition-colors duration-500" />
                  </div>

                  {/* Typography below image */}
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-medium text-white mb-2 font-serif group-hover:text-[#E65100] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Third item fallback for mobile (so it doesn't get totally hidden) */}
            {menuItems[2] && (
              <div className="sm:hidden w-full max-w-[280px] mx-auto mt-6 group cursor-pointer">
                 <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] mb-6 rounded-2xl">
                    <Image
                      src={menuItems[2].thumbnailUrl}
                      alt={menuItems[2].title}
                      fill
                      unoptimized
                      className="object-contain p-6 drop-shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-medium text-white mb-2 font-serif group-hover:text-[#E65100] transition-colors duration-300">
                      {menuItems[2].title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light line-clamp-2">
                      {menuItems[2].content}
                    </p>
                  </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
