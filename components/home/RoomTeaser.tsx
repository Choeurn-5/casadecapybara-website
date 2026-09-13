import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedRooms } from "@/lib/wordpress";

export default async function RoomTeaser() {
  const rooms = await getFeaturedRooms();

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white text-[#1A2E1C]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1B5E20] mb-4">
            Sanctuary Stays
          </h2>
          <p className="text-lg text-gray-600">
            Wake up to the sounds of nature. Each of our eco-villas and suites is designed for profound relaxation and unforgettable wildlife connection.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={room.thumbnailUrl}
                  alt={room.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Free Capybara Encounter Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                  <span className="text-xl">🌿</span>
                  <span className="text-xs font-bold text-[#1B5E20] uppercase tracking-wide">
                    Includes Free Capybara Encounter
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#1B5E20] leading-tight pr-4">
                    {room.title}
                  </h3>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500 font-medium">From</span>
                    <span className="text-xl font-extrabold text-[#E65100]">
                      {room.priceFrom}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
                  {room.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    href={`/stay#${room.slug}`}
                    className="inline-flex items-center text-[#1B5E20] font-bold group-hover:text-[#E65100] transition-colors duration-300"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="text-center">
          <Link
            href="/stay"
            className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full text-base font-bold bg-[#E65100] text-white hover:bg-[#d84315] hover:shadow-lg shadow-orange-900/20 active:scale-[0.98] transition-all duration-300"
          >
            View All Rooms
          </Link>
        </div>

      </div>
    </section>
  );
}
