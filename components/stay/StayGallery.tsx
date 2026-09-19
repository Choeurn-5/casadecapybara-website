"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  BedDouble, 
  Users, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Shuffle
} from "lucide-react";
import type { FullCapyRoom } from "@/lib/wordpress";

interface StayGalleryProps {
  rooms?: FullCapyRoom[];
}

interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  roomTitle: string;
  roomSlug: string;
  priceFrom?: string;
  occupancy?: string;
  bedType?: string;
}

// Fallback room imagery in case live API has partial galleries
const FALLBACK_ROOM_IMAGES: Record<string, string[]> = {
  "splash-pool-access": [
    "/gallery/stay/splash-pool-access-room.jpg",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc0812000rcy11xdB47A_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc6w12000rcy10q7AD04_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc6p12000rcy0xhlA56A_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc0p12000rcy12hvE869_W_1280_853_R5.webp",
  ],
  "turtle-oasis": [
    "/gallery/stay/turtle-oasis.jpg",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3b12000rd6p299116F_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc0m12000rd6od4jA8A3_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc2l12000rd6pjbv3AB6_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3s12000rd6ozy8944F_W_1280_853_R5.webp",
  ],
  "capy-deluxe": [
    "/gallery/stay/capy-deluxe-room.jpg",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc2m12000rcy8dmwBD43_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc5p12000rd6om0w7B9F_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3n12000rd6of6c0C2A_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc4x12000rd6p55zA0E4_W_1280_853_R5.webp",
  ],
  "capy-cove": [
    "/gallery/stay/capy-cove-room.jpg",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc5p12000rd6om0w7B9F_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3n12000rd6of6c0C2A_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc4x12000rd6p55zA0E4_W_1280_853_R5.webp",
  ],
  "snuggle-nest": [
    "/gallery/stay/snuggle-nest.jpg",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc6812000rd6pjcn15C0_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc6x12000rd6p433E36F_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3v12000rd6p04p8F84_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc1k12000rd6oty8ABF0_W_1280_853_R5.webp",
  ],
  "tree-amigos": [
    "/gallery/stay/capybara-theming.jpg",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3r12000rd6psqn29A9_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3w12000rd6pakwA480_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc1612000qrg97guCDF3_W_1280_853_R5.webp",
    "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc2412000rd6pnr6CB2F_W_1280_853_R5.webp",
  ],
  "dreamland": [
    "/gallery/stay/dreamland-suite.jpg",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  ],
  "la-familia": [
    "/gallery/stay/la-familia-room.jpg",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
  ],
};

const DEFAULT_ROOMS_DATA = [
  { slug: "splash-pool-access", title: "Splash Pool Access", occupancy: "2 Adults + 1 Child", bedType: "King Bed", priceFrom: "$50" },
  { slug: "turtle-oasis", title: "Turtle Oasis", occupancy: "2 Adults + 1 Child", bedType: "Queen Bed", priceFrom: "$60" },
  { slug: "capy-deluxe", title: "Capy Deluxe", occupancy: "2 Adults", bedType: "King Bed", priceFrom: "$50" },
  { slug: "capy-cove", title: "Capy Cove", occupancy: "3 Adults + 1 Child", bedType: "King + Single", priceFrom: "$75" },
  { slug: "snuggle-nest", title: "Snuggle Nest", occupancy: "2 Adults", bedType: "Queen Bed", priceFrom: "$50" },
  { slug: "tree-amigos", title: "Tree Amigos", occupancy: "3 Adults", bedType: "3 Single Beds", priceFrom: "$70" },
  { slug: "dreamland", title: "Dreamland", occupancy: "2 Adults + 2 Children", bedType: "Bunk Beds", priceFrom: "$65" },
  { slug: "la-familia", title: "La Familia", occupancy: "4 Adults + 2 Children", bedType: "2 King Beds", priceFrom: "$110" },
];

const PAGE_SIZE = 8;

// Seeded deterministic shuffle to ensure SSR & client match without hydration warnings,
// then client mount randomizes further
function seededShuffle<T>(array: T[], seed: number = 20260916): T[] {
  const arr = [...array];
  let m = arr.length, t, i;
  let s = seed;
  while (m) {
    s = (s * 9301 + 49297) % 233280;
    i = Math.floor((s / 233280) * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

export default function StayGallery({ rooms }: StayGalleryProps) {
  const [activeSlug, setActiveSlug] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [randomSeed, setRandomSeed] = useState<number>(20260916);

  // Set fresh random order on client mount
  useEffect(() => {
    setRandomSeed(Math.floor(Math.random() * 1000000) + 1);
  }, []);

  const handleReshuffle = () => {
    setRandomSeed((prev) => prev + Math.floor(Math.random() * 9999) + 1);
    setCurrentPage(1);
  };

  // Tab change handler (resets pagination to page 1)
  const handleTabChange = (slug: string) => {
    setActiveSlug(slug);
    setCurrentPage(1);
  };

  // Parse all room items and their respective photo sets
  const roomData = useMemo(() => {
    if (rooms && rooms.length > 0) {
      return rooms.map((r) => {
        // Collect images from photoGallery and thumbnailUrl
        const imgs: string[] = [];
        if (r.thumbnailUrl) imgs.push(r.thumbnailUrl);
        if (r.photoGallery && r.photoGallery.length > 0) {
          r.photoGallery.forEach((url) => {
            if (url && !imgs.includes(url)) imgs.push(url);
          });
        }
        // If still fewer than 2 images, append matching fallbacks
        const fallbackSet = FALLBACK_ROOM_IMAGES[r.slug] || [];
        fallbackSet.forEach((url) => {
          if (!imgs.includes(url)) imgs.push(url);
        });

        return {
          slug: r.slug,
          title: r.title,
          occupancy: r.occupancy,
          bedType: r.bedType,
          balcony: r.balcony,
          priceFrom: r.priceFrom,
          description: r.description,
          images: imgs,
        };
      });
    }

    // Default room structure if rooms prop wasn't supplied
    return DEFAULT_ROOMS_DATA.map((d) => ({
      slug: d.slug,
      title: d.title,
      occupancy: d.occupancy,
      bedType: d.bedType,
      balcony: "Private Balcony",
      priceFrom: d.priceFrom,
      description: "Experience genuine luxury and whimsical capybara-themed comfort.",
      images: FALLBACK_ROOM_IMAGES[d.slug] || ["/gallery/stay/capybara-theming.jpg"],
    }));
  }, [rooms]);

  // Build the complete flattened image list with metadata, randomized across room types
  const allImages: GalleryImageItem[] = useMemo(() => {
    const list: GalleryImageItem[] = [];
    const maxImgs = Math.max(...roomData.map((r) => r.images.length), 0);
    // Round-robin insertion to distribute rooms evenly before shuffling
    for (let i = 0; i < maxImgs; i++) {
      roomData.forEach((room) => {
        if (room.images[i]) {
          list.push({
            id: `${room.slug}-${i}`,
            src: room.images[i],
            alt: `${room.title} - Photo ${i + 1}`,
            roomTitle: room.title,
            roomSlug: room.slug,
            priceFrom: room.priceFrom,
            occupancy: room.occupancy,
            bedType: room.bedType,
          });
        }
      });
    }
    return seededShuffle(list, randomSeed);
  }, [roomData, randomSeed]);

  // Filtered images based on current tab (full list for that tab)
  const filteredImages = useMemo(() => {
    if (activeSlug === "all") {
      return allImages;
    }
    return allImages.filter((item) => item.roomSlug === activeSlug);
  }, [allImages, activeSlug]);

  // Total pages calculation (active only for "all" tab)
  const totalPages = useMemo(() => {
    return Math.ceil(filteredImages.length / PAGE_SIZE);
  }, [filteredImages]);

  // Displayed images: Paginated (8 per page) if "all" tab, otherwise full room photo list
  const displayedImages = useMemo(() => {
    if (activeSlug === "all") {
      const start = (currentPage - 1) * PAGE_SIZE;
      return filteredImages.slice(start, start + PAGE_SIZE);
    }
    return filteredImages;
  }, [filteredImages, activeSlug, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const el = document.getElementById("stay-gallery");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Current active room object (if a specific room tab is selected)
  const currentRoom = useMemo(() => {
    return roomData.find((r) => r.slug === activeSlug);
  }, [roomData, activeSlug]);

  // Lightbox navigation callbacks
  const handlePrev = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + displayedImages.length) % displayedImages.length);
  }, [lightboxIdx, displayedImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % displayedImages.length);
  }, [lightboxIdx, displayedImages.length]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = origOverflow;
    };
  }, [lightboxIdx, handlePrev, handleNext]);

  return (
    <section id="stay-gallery" className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[#E65100] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#E65100]/50" />
            Visual Tour
            <span className="w-8 h-px bg-[#E65100]/50" />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B5E20] mb-4 tracking-tight">
            Explore Our Rooms by Category
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select any room type below to view authentic high-resolution photographs of each sanctuary, bed configurations, and private amenities.
          </p>
        </div>

        {/* Category Tabs: Room Types */}
        <div className="relative mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-gray-200 justify-start md:justify-center">
            {/* "All Rooms" Tab */}
            <button
              onClick={() => handleTabChange("all")}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeSlug === "all"
                  ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25 scale-[1.03]"
                  : "bg-[#FAF7F2] text-gray-700 hover:bg-[#F0EBE1] border border-[#E8F5E9]"
              }`}
            >
              <span>All Rooms</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  activeSlug === "all"
                    ? "bg-white/20 text-white"
                    : "bg-gray-200/80 text-gray-600"
                }`}
              >
                {allImages.length}
              </span>
            </button>

            {/* Individual Room Tabs */}
            {roomData.map((room) => {
              const isActive = activeSlug === room.slug;
              return (
                <button
                  key={room.slug}
                  onClick={() => handleTabChange(room.slug)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25 scale-[1.03]"
                      : "bg-[#FAF7F2] text-gray-700 hover:bg-[#F0EBE1] border border-[#E8F5E9]"
                  }`}
                >
                  <span>{room.title}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    {room.images.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Room Highlights Bar (Appears when an individual room is picked) */}
        <AnimatePresence mode="wait">
          {currentRoom && (
            <motion.div
              key={currentRoom.slug}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#F4F9F4] via-[#FAF7F2] to-[#FFF8E1] border border-[#E8F5E9] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#E65100]/15 flex items-center justify-center text-[#E65100]">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <h3 className="font-bold text-lg text-[#1B5E20]">
                    {currentRoom.title}
                  </h3>
                  {currentRoom.priceFrom && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#FFB74D]/20 text-[#D84315] rounded-full">
                      From {currentRoom.priceFrom}/night
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  {currentRoom.occupancy && (
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#2E7D32]" />
                      {currentRoom.occupancy}
                    </span>
                  )}
                  {currentRoom.bedType && (
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#2E7D32]" />
                      {currentRoom.bedType}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <Camera className="w-3.5 h-3.5 text-[#E65100]" />
                    {currentRoom.images.length} High-Definition Photos
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link
                  href={`/stay/${currentRoom.slug}`}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold transition-all shadow-sm hover:shadow"
                >
                  <span>View Full Room Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#468CD0] hover:bg-[#3B7ABB] text-white text-xs font-bold transition-all shadow-sm hover:shadow"
                >
                  <span>Book Now</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          <AnimatePresence>
            {displayedImages.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => setLightboxIdx(index)}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer bg-neutral-100 border border-black/5 active:scale-[0.98]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle room tag in top left */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-medium text-white shadow-sm border border-white/10">
                    {item.roomTitle}
                  </span>
                </div>

                {/* Hover overlay with zoom icon and room name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-xs sm:text-sm drop-shadow-sm">
                        {item.roomTitle}
                      </p>
                      <p className="text-[#FFB74D] text-[10px] sm:text-xs">
                        Tap to view in HD
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4 drop-shadow-sm" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Bar (Displayed ONLY for "All Rooms" tab when multiple pages exist) */}
        {activeSlug === "all" && totalPages > 1 && (
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            {/* Range info & Shuffle button */}
            <div className="flex items-center gap-3 order-2 sm:order-1">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Showing{" "}
                <span className="font-bold text-[#1B5E20]">
                  {(currentPage - 1) * PAGE_SIZE + 1}
                </span>
                –
                <span className="font-bold text-[#1B5E20]">
                  {Math.min(currentPage * PAGE_SIZE, filteredImages.length)}
                </span>{" "}
                of <span className="font-bold text-[#1B5E20]">{filteredImages.length}</span> photos
              </p>
              <button
                onClick={handleReshuffle}
                title="Randomize / Shuffle photos"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F0EBE1] text-[#1B5E20] border border-[#E8F5E9] text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#E65100]" />
                <span className="hidden sm:inline">Shuffle</span>
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="px-3 py-2 rounded-xl border border-[#E8F5E9] bg-white text-gray-700 hover:bg-[#FAF7F2] hover:border-[#1B5E20]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Go to page ${pageNum}`}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25 scale-105"
                        : "bg-[#FAF7F2] text-gray-700 hover:bg-[#F0EBE1] border border-[#E8F5E9]"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="px-3 py-2 rounded-xl border border-[#E8F5E9] bg-white text-gray-700 hover:bg-[#FAF7F2] hover:border-[#1B5E20]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Empty state safeguard */}
        {displayedImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">No photos found for this category.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && displayedImages[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-4 sm:px-8 py-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#FFB74D] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  {String(lightboxIdx + 1).padStart(2, "0")} /{" "}
                  {String(displayedImages.length).padStart(2, "0")}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                    {displayedImages[lightboxIdx].roomTitle}
                  </span>
                  {displayedImages[lightboxIdx].priceFrom && (
                    <span className="text-[10px] text-gray-400">
                      From {displayedImages[lightboxIdx].priceFrom}/night
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/stay/${displayedImages[lightboxIdx].roomSlug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
                  onClick={() => setLightboxIdx(null)}
                >
                  <span>Room Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setLightboxIdx(null)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-gray-300 hover:text-white transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stage */}
            <div
              className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xl"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next"
                className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xl"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIdx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={displayedImages[lightboxIdx].src}
                      alt={displayedImages[lightboxIdx].alt}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-contain drop-shadow-2xl"
                      priority
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Scrubber */}
            <div
              className="px-4 py-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-center gap-2 overflow-x-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {displayedImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setLightboxIdx(idx)}
                  className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                    idx === lightboxIdx
                      ? "ring-2 ring-[#FFB74D] scale-105 opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
