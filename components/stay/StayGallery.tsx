"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Rooms", "Facilities", "Vibe"];

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/gallery/stay/1.jpg",
    category: "Rooms",
    alt: "Luxury Capybara Suite",
  },
  {
    id: 2,
    src: "/gallery/stay/2.jpg",
    category: "Facilities",
    alt: "Tropical Pool Area",
  },
  {
    id: 3,
    src: "/gallery/stay/3.jpg",
    category: "Rooms",
    alt: "Cozy Bunk Beds",
  },
  {
    id: 4,
    src: "/gallery/stay/4.jpg",
    category: "Facilities",
    alt: "Organic Dining Area",
  },
  {
    id: 5,
    src: "/gallery/stay/5.jpg",
    category: "Vibe",
    alt: "Relaxing Balcony View",
  },
  {
    id: 6,
    src: "/gallery/stay/6.jpg",
    category: "Facilities",
    alt: "Lounge and Spa",
  },
  {
    id: 7,
    src: "/gallery/stay/7.jpg",
    category: "Rooms",
    alt: "Master Bedroom",
  },
  {
    id: 8,
    src: "/gallery/stay/8.jpg",
    category: "Vibe",
    alt: "Sunset over the resort",
  },
];

export default function StayGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section className="py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-[#1B5E20] mb-6 tracking-tight"
          >
            A Glimpse of Paradise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our themed rooms, tropical facilities, and the magical atmosphere that makes Casa de Capybara truly unforgettable.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/30 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
                key={item.id}
                className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow ${
                  // Make the first item larger for masonry feel on desktop
                  item.id === 1 || item.id === 4 ? "md:col-span-2 md:row-span-2 h-64 md:h-[400px]" : "h-64 md:h-[190px]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.alt}
                  </span>
                  <span className="text-[#F8BBD0] text-sm uppercase tracking-wider font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
