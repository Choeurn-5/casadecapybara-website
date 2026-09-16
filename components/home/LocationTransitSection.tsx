"use client";

import React from "react";
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Car,
  Footprints,
  Clock,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const destinations = [
  {
    name: "Angkor Wat",
    time: "15 mins",
    mode: "Tuk Tuk",
    icon: "🛺",
    modeIcon: Car,
    description: "The world's largest religious monument & UNESCO World Heritage wonder.",
    highlight: "Scenic heritage avenue drive",
  },
  {
    name: "Angkor Eye Ferris Wheel",
    time: "5 mins",
    mode: "On Foot",
    icon: "🚶",
    modeIcon: Footprints,
    description: "Cambodia's iconic 85m observation wheel with panoramic Siem Reap views.",
    highlight: "Easy garden sidewalk stroll",
  },
  {
    name: "Robam Theater",
    time: "5 mins",
    mode: "On Foot",
    icon: "🚶",
    modeIcon: Footprints,
    description: "Authentic classical Khmer dance performances and cultural heritage shows.",
    highlight: "Just around the corner",
  },
  {
    name: "Pub Street & Night Market",
    time: "10 mins",
    mode: "Tuk Tuk",
    icon: "🛺",
    modeIcon: Car,
    description: "Lively riverside promenade, artisan craft stalls, and vibrant night dining.",
    highlight: "Quick tuk tuk connection",
  },
];

export default function LocationTransitSection() {
  const googleMapsUrl = "https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA";
  const wazeUrl = "https://waze.com/ul?q=Casa+de+Capybara";

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FAF7F2] text-[#1A2E1C] overflow-hidden border-b border-[#1B5E20]/10">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B5E20]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E65100]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-16">
          <div className="max-w-2xl">
            <ScrollReveal direction="up" staggerIndex={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-[#1B5E20] text-xs font-bold tracking-widest uppercase mb-4">
                <Compass className="w-4 h-4 text-[#1B5E20]" />
                <span>Prime Siem Reap Location</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerIndex={1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-[1.15] mb-4">
                Right Next to{" "}
                <span className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#E65100] bg-clip-text text-transparent">
                  Angkor Wat
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" staggerIndex={2}>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Done exploring the ancient temples? We are just minutes away on Ring Road, just off Highway 6. Stop by to unwind with our gentle capybaras, enjoy cold artisan coffee, and recharge.
              </p>
            </ScrollReveal>
          </div>

          {/* Action Navigation Buttons */}
          <ScrollReveal direction="up" staggerIndex={3}>
            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-sm font-semibold tracking-wide shadow-md shadow-[#1B5E20]/20 hover:shadow-lg transition-all duration-200 group"
              >
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-[#1A2E1C] text-sm font-semibold tracking-wide shadow-xs hover:border-[#1B5E20]/40 transition-all duration-200 group"
              >
                <Navigation className="w-4 h-4 text-[#E65100]" />
                <span>Open in Waze</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Distance Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {destinations.map((dest, index) => {
            const ModeIcon = dest.modeIcon;
            return (
              <ScrollReveal key={index} direction="up" staggerIndex={index} delay={0.1}>
                <div className="group relative h-full p-6 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#1B5E20]/10 hover:border-[#1B5E20]/30 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  {/* Top: Transit Time & Mode Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                        {dest.icon}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] border border-[#1B5E20]/15">
                        <Clock className="w-3 h-3 text-[#1B5E20]" />
                        {dest.time}
                      </span>
                    </div>

                    {/* Destination Name */}
                    <h3 className="text-lg font-bold text-[#1A2E1C] mb-1.5 group-hover:text-[#1B5E20] transition-colors">
                      {dest.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {dest.description}
                    </p>
                  </div>

                  {/* Bottom: Transit Detail */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 text-gray-700 font-medium">
                      <ModeIcon className="w-3.5 h-3.5 text-[#E65100]" />
                      {dest.mode}
                    </span>
                    <span className="text-[11px] text-gray-600">{dest.highlight}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Embedded Interactive Map Card */}
        <ScrollReveal direction="up" staggerIndex={4} delay={0.2}>
          <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-[#1B5E20]/15 bg-[#131A15] group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15541.748729583482!2d103.8587!3d13.3644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31101700445d4725%3A0x6b8bc2385dc62e8!2sCasa%20de%20Capybara!5e0!3m2!1sen!2skh!4v1709210000000!5m2!1sen!2skh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Casa de Capybara Map Location"
              className="absolute inset-0 w-full h-full filter contrast-[1.02]"
            />

            {/* Floating Info Pill overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#1B5E20]/20 shadow-lg text-xs font-semibold text-[#1A2E1C]">
                <Sparkles className="w-4 h-4 text-[#E65100]" />
                <span>Ring Road (Off Highway 6), Siem Reap, Cambodia</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
