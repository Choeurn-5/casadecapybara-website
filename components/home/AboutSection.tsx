"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Calendar,
  Heart,
  ArrowRight,
  ExternalLink,
  Award,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface AboutSectionProps {
  /** Optional custom image URLs if the user wants to upload dedicated badge graphics */
  sovrinBadgeImg?: string;
  tripadvisorBadgeImg?: string;
  googleBadgeImg?: string;
}

export default function AboutSection({
  sovrinBadgeImg,
  tripadvisorBadgeImg,
  googleBadgeImg,
}: AboutSectionProps) {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FDFBF7] text-[#1A2E1C] overflow-hidden border-b border-[#1B5E20]/10">
      {/* Ambient background decoration */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1B5E20]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E65100]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Editorial Welcome & Story (7 Cols on large) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow badge */}
            <ScrollReveal direction="up" staggerIndex={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-[#1B5E20] text-xs font-bold tracking-widest uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span>Est. January 2026 • Siem Reap, Cambodia</span>
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal direction="up" staggerIndex={1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-[1.18] mb-6">
                Where Every Visit <br />
                <span className="font-serif italic font-normal text-[#1B5E20]">
                  Becomes a Memory
                </span>
              </h2>
            </ScrollReveal>

            {/* Sub-quote */}
            <ScrollReveal direction="up" staggerIndex={2}>
              <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed mb-6 border-l-2 border-[#E65100] pl-4">
                A serene tropical sanctuary just minutes from Angkor Wat, where heartfelt wildlife connections and mindful luxury coexist.
              </p>
            </ScrollReveal>

            {/* Body Copy */}
            <ScrollReveal direction="up" staggerIndex={3}>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-2xl">
                <p>
                  Opened in <strong>January 2026</strong>, Casa de Capybara was created as Cambodia’s premier ethical wildlife haven and boutique retreat. Nestled in a lush botanical setting near Siem Reap’s ancient wonders, our sanctuary offers a peaceful oasis dedicated to the love, care, and peaceful spirit of our resident capybaras.
                </p>
                <div className="p-4 rounded-xl bg-[#1B5E20]/5 border border-[#1B5E20]/15 text-[#1A2E1C]">
                  <p className="font-semibold text-[#1B5E20] flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0" />
                    Day Visitors Warmly Welcomed Every Day
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700">
                    You do not need to be an overnight hotel guest to experience Casa de Capybara. Non-hotel guests are always welcome for artisan cafe dining, garden strolls, and pre-booked interactive capybara encounters.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Metrics / Key Facts */}
            <ScrollReveal direction="up" staggerIndex={4}>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-xl mb-8 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-[#1B5E20]/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E65100]" />
                    <span className="font-semibold">Opened</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#1A2E1C]">Jan 2026</div>
                  <div className="text-[11px] text-gray-500">Newly Founded</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#1B5E20]/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#1A2E1C]">15 Mins</div>
                  <div className="text-[11px] text-gray-500">To Angkor Wat</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#1B5E20]/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Heart className="w-3.5 h-3.5 text-[#E65100]" />
                    <span className="font-semibold">Access</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#1A2E1C]">Open Daily</div>
                  <div className="text-[11px] text-gray-500">Day Passes Available</div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" staggerIndex={5}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/plan-your-visit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-sm font-semibold tracking-wide shadow-lg shadow-[#1B5E20]/20 hover:shadow-xl transition-all duration-200 group"
                >
                  <span>Plan Your Day Visit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/capybara-experience"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#1A2E1C] border border-gray-200 text-sm font-semibold transition-all duration-200 hover:border-[#1B5E20]/40"
                >
                  <span>Capybara Encounters</span>
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* RIGHT COLUMN: As Seen In & Social Proof Badges (5 Cols on large) */}
          <div className="lg:col-span-5 flex flex-col gap-5 w-full">
            <ScrollReveal direction="up" staggerIndex={0} delay={0.1}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#1B5E20] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E65100]" />
                  <span>As Seen In & Guest Acclaim</span>
                </p>
                <span className="text-[11px] font-medium text-gray-500">Verified Proof</span>
              </div>
            </ScrollReveal>

            {/* Badge 1: Sovrin Magazine Feature */}
            <ScrollReveal direction="up" staggerIndex={1} delay={0.15}>
              <div className="group relative p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#1B5E20]/15 shadow-sm hover:shadow-xl hover:border-[#1B5E20]/30 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {sovrinBadgeImg ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={sovrinBadgeImg}
                        alt="Sovrin Magazine Feature"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#FAF0D7] to-[#F3E5AB] border border-[#D4AF37]/30 flex flex-col items-center justify-center text-[#8C6D1F] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Award className="w-6 h-6 text-[#A27B2C]" />
                      <span className="text-[9px] font-extrabold uppercase tracking-tighter mt-0.5">PRESS</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] border border-[#1B5E20]/20">
                        Editorial Feature
                      </span>
                      <span className="text-xs text-gray-600 font-medium">Cambodia</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1A2E1C] mt-1 group-hover:text-[#1B5E20] transition-colors">
                      Featured in Sovrin Magazine
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                      Highlighted by Cambodia’s leading high-end lifestyle publication as the premier destination for ethical wildlife and boutique eco-luxury.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Badge 2: TripAdvisor Rating Badge */}
            <ScrollReveal direction="up" staggerIndex={2} delay={0.2}>
              <a
                href="https://www.tripadvisor.com/UserReviewEdit-g297390-d34246657-Casa_de_Capybara-Siem_Reap_Siem_Reap_Province.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#1B5E20]/15 shadow-sm hover:shadow-xl hover:border-[#00AA6C]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {tripadvisorBadgeImg ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={tripadvisorBadgeImg}
                        alt="TripAdvisor 4.9 Rating Badge"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#E8F7F0] border border-[#00AA6C]/30 flex flex-col items-center justify-center text-[#00AA6C] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {/* Tripadvisor Owl Icon */}
                      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-9.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm4 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
                      </svg>
                      <span className="text-[9px] font-extrabold uppercase tracking-tighter mt-0.5">TRIPADVISOR</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#00AA6C]" />
                        ))}
                        <span className="text-xs font-bold text-[#00AA6C] ml-1">4.9 / 5.0</span>
                      </div>
                      <span className="inline-flex items-center text-xs text-gray-600 group-hover:text-[#00AA6C] font-semibold transition-colors">
                        Review <ExternalLink className="w-3 h-3 ml-1" />
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1A2E1C] mt-1 group-hover:text-[#00AA6C] transition-colors">
                      TripAdvisor Excellence Rating
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                      Ranked among Siem Reap’s highest-rated specialty wildlife experiences and boutique hotel sanctuaries.
                    </p>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {/* Badge 3: Google Reviews */}
            <ScrollReveal direction="up" staggerIndex={3} delay={0.25}>
              <a
                href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#1B5E20]/15 shadow-sm hover:shadow-xl hover:border-[#4285F4]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {googleBadgeImg ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={googleBadgeImg}
                        alt="Google Reviews 4.9 Stars"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#EFF4FE] border border-[#4285F4]/30 flex flex-col items-center justify-center text-[#4285F4] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {/* Google G Icon */}
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                      </svg>
                      <span className="text-[9px] font-extrabold uppercase tracking-tighter mt-0.5">GOOGLE</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-amber-500 text-xs">★</span>
                        ))}
                        <span className="text-xs font-bold text-gray-800 ml-1">4.9 Stars</span>
                      </div>
                      <span className="inline-flex items-center text-xs text-gray-600 group-hover:text-[#4285F4] font-semibold transition-colors">
                        372+ Reviews <ExternalLink className="w-3 h-3 ml-1" />
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1A2E1C] mt-1 group-hover:text-[#4285F4] transition-colors">
                      Google Reviews (4.9 Stars)
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                      Over 372+ verified five-star reviews praising our gentle capybaras, attentive handlers, and delicious sanctuary cafe.
                    </p>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {/* Editorial Photo Frame under badges */}
            <ScrollReveal direction="up" staggerIndex={4} delay={0.3}>
              <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-md border border-[#1B5E20]/15 group">
                <Image
                  src="/gallery/experience/story.jpg"
                  alt="Casa de Capybara Sanctuary Grounds & Encounters"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs flex items-center justify-between">
                  <span className="font-medium drop-shadow-sm">Molly & Alex Sanctuary Habitat</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-semibold">
                    Siem Reap, Cambodia
                  </span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </section>
  );
}
