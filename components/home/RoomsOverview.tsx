import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CapyRoom, getCapyRooms } from "@/lib/wordpress";

interface RoomsOverviewProps {
  rooms?: CapyRoom[];
}

export default async function RoomsOverview({ rooms }: RoomsOverviewProps) {
  const roomList = rooms || (await getCapyRooms());

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FAF7F2] text-[#1A2E1C] overflow-hidden">
      {/* Subtle decorative background gradient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F8BBD0]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#1B5E20]/10 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-[#1B5E20] text-xs font-bold uppercase tracking-wider mb-4">
            <span>🌿</span>
            <span>Eco-Sanctuary Accommodations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-tight">
            Stay Surrounded by{" "}
            <span className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#E65100] bg-clip-text text-transparent">
              Gentle Nature
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Wake up to tropical birdsong, serene garden lagoons, and peaceful morning strolls with gentle capybaras outside your private balcony.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {roomList.map((room) => (
            <article
              key={room.id || room.slug}
              className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-[#1B5E20]/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                <Image
                  src={room.thumbnailUrl}
                  alt={room.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient vignette on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badge */}
                {room.badge && (
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[#1B5E20] text-[11px] font-bold shadow-xs">
                    {room.badge}
                  </div>
                )}

                {/* Capacity Badge */}
                {room.capacity && (
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-[#F8BBD0]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>{room.capacity}</span>
                  </div>
                )}

                {/* Price Overlay at bottom of photo */}
                <div className="absolute bottom-3 left-3.5 text-white flex items-baseline gap-1 drop-shadow-md">
                  <span className="text-2xl font-black text-[#FFB300]">
                    {room.price}
                  </span>
                  <span className="text-xs text-gray-200 font-medium">
                    / night
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A2E1C] group-hover:text-[#1B5E20] transition-colors leading-snug line-clamp-1">
                    {room.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {room.shortDescription}
                  </p>

                  {/* Highlights List */}
                  {room.features && room.features.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#1B5E20] text-[11px] font-medium border border-[#1B5E20]/10"
                        >
                          ✦ {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    href={`/stay/${room.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#1B5E20] bg-[#1B5E20]/8 hover:bg-[#1B5E20] hover:text-white transition-all duration-200 group-hover:bg-[#1B5E20] group-hover:text-white"
                  >
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/stay"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-semibold text-sm sm:text-base shadow-lg shadow-green-950/15 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Explore All Accommodations & Packages</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
