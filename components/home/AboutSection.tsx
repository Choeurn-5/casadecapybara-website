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
  eyebrow?: string;
  headline?: string;
  quote?: string;
  body?: string;
  calloutTitle?: string;
  calloutText?: string;
  statOpened?: string;
  statDistance?: string;
  statAvailability?: string;
}

export default function AboutSection({
  sovrinBadgeImg,
  tripadvisorBadgeImg,
  googleBadgeImg,
  eyebrow = "Est. January 2026 • Siem Reap, Cambodia",
  headline = "Where Every Visit Becomes a Memory",
  quote = "A serene tropical sanctuary just minutes from Angkor Wat, where heartfelt wildlife connections and mindful luxury coexist.",
  body = "<p>Opened in <strong>January 2026</strong>, Casa de Capybara was created as Cambodia’s premier ethical wildlife haven and boutique retreat. Nestled in a lush botanical setting near Siem Reap’s ancient wonders, our sanctuary offers a peaceful oasis dedicated to the love, care, and peaceful spirit of our resident capybaras.</p>",
  calloutTitle = "Day Visitors Warmly Welcomed Every Day",
  calloutText = "You do not need to be an overnight hotel guest to experience Casa de Capybara. Non-hotel guests are always welcome for artisan cafe dining, garden strolls, and pre-booked interactive capybara encounters.",
  statOpened = "Jan 2026",
  statDistance = "15 Mins",
  statAvailability = "Open Daily",
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
                <span>{eyebrow}</span>
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal direction="up" staggerIndex={1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-[1.18] mb-6">
                {headline.replace("Becomes a Memory", "")} <br />
                <span className="font-serif italic font-normal text-[#1B5E20]">
                  {headline.includes("Becomes a Memory") ? "Becomes a Memory" : ""}
                </span>
              </h2>
            </ScrollReveal>

            {/* Sub-quote */}
            <ScrollReveal direction="up" staggerIndex={2}>
              <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed mb-6 border-l-2 border-[#E65100] pl-4">
                {quote}
              </p>
            </ScrollReveal>

            {/* Body Copy */}
            <ScrollReveal direction="up" staggerIndex={3}>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-2xl">
                <div dangerouslySetInnerHTML={{ __html: body }} />
                <div className="p-4 rounded-xl bg-[#1B5E20]/5 border border-[#1B5E20]/15 text-[#1A2E1C]">
                  <p className="font-semibold text-[#1B5E20] flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0" />
                    {calloutTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700">
                    {calloutText}
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
                  <div className="text-base sm:text-lg font-bold text-[#1A2E1C]">{statOpened}</div>
                  <div className="text-[11px] text-gray-500">Newly Founded</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#1B5E20]/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#1A2E1C]">{statDistance}</div>
                  <div className="text-[11px] text-gray-500">To Angkor Wat</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#1B5E20]/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Heart className="w-3.5 h-3.5 text-[#E65100]" />
                    <span className="font-semibold">Access</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#1A2E1C]">{statAvailability}</div>
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
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#34E0A1]/15 border border-[#00AA6C]/30 flex flex-col items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform p-1">
                      {/* Official TripAdvisor Brand Owl */}
                      <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none">
                        {/* Red eye left */}
                        <circle cx="6.002" cy="13.216" r="1.3" fill="#EB1C24" />
                        <circle cx="6.002" cy="13.216" r="0.5" fill="#000000" />
                        {/* Green eye right */}
                        <circle cx="17.994" cy="13.216" r="1.3" fill="#00AA6C" />
                        <circle cx="17.994" cy="13.216" r="0.5" fill="#000000" />
                        {/* Official TripAdvisor Owl Silhouette */}
                        <path
                          fill="#000A12"
                          d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"
                        />
                      </svg>
                      <span className="text-[8px] font-black uppercase tracking-tight text-[#004f32]">TRIPADVISOR</span>
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
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform p-1">
                      {/* Official Google 4-Color G */}
                      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.99 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span className="text-[8px] font-black uppercase tracking-tight text-gray-700">GOOGLE</span>
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
