"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  PartyPopper, 
  ShieldCheck, 
  Check, 
  Star, 
  ArrowRight,
  Cake,
  Flame,
  Waves,
  Crown,
  Eye,
  Gift
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { GlobalSettings, defaultGlobalSettings, ACFBirthdayPackage } from "@/lib/wordpress";

interface BirthdayPackageSectionProps {
  globalSettings?: GlobalSettings;
  content?: ACFBirthdayPackage | null;
}

export default function BirthdayPackageSection({ 
  globalSettings = defaultGlobalSettings,
  content,
}: BirthdayPackageSectionProps) {
  const [activeMedia, setActiveMedia] = useState<"party" | "cake">("party");

  const telegramBaseUrl = globalSettings.telegramUrl || "https://t.me/capybaracambodia";
  const whatsappNumber = globalSettings.whatsappNumber || "+855968149795";
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "") || "855968149795";

  // Dynamic content with rich fallbacks from WordPress Page 521
  const eyebrowBadge = content?.eyebrowBadge || "Unforgettable Celebrations • Only in Cambodia";
  const title = content?.title || "Celebrate Your Birthday with";
  const titleHighlight = content?.titleHighlight || "Molly & Alex";
  const description = content?.description || "Create once-in-a-lifetime childhood memories in Siem Reap. Private capybara cuddles, resort swimming pool with a giant water slide, 200+ costumes in an air-conditioned playroom, custom artisan cakes, and zero cleanup stress for parents.";

  const partyImageSrc =
    content?.featuredImageUrl ||
    (typeof content?.showcaseImage === "object" ? content?.showcaseImage?.node?.sourceUrl : content?.showcaseImage) ||
    content?.showcaseImageUrl ||
    "/images/celebration/capybara-birthday-party.jpg";

  const cakeImageSrc = "/images/celebration/capybara-birthday-cake.jpg";

  const imageAlt =
    content?.featuredImageAlt ||
    title ||
    "Birthday Party at Casa de Capybara";

  const badgeTop1 = content?.badgeTop1 || "#1 Unique Party Venue";
  const badgeTop2 = content?.badgeTop2 || "100% Supervised & Safe";
  const cardSubtitle = content?.cardSubtitle || "Private Sanctuary Cabana • Resort Pool & Slide • Costume Playroom";
  const reviewQuote = content?.reviewQuote || "“The best birthday party our daughter ever had. Molly and Alex were so gentle, and the rangers made every kid feel like VIP!”";
  const reviewAuthor = content?.reviewAuthor || "Sophie & David, Siem Reap";

  const formulaEyebrow = content?.formulaEyebrow || "Everything Included For Your Big Day";
  const formulaTitle = content?.formulaTitle || "The Magic Birthday Formula";
  const formulaDescription = content?.formulaDescription || "Leave the stress at home. From custom decorations to capybara feedings, poolside games, and warm farm-to-table treats, our dedicated host coordinates every minute so parents can relax and celebrate together.";

  const feat1Title = content?.feature1Title || "Private VIP Capybara Session";
  const feat1Desc = content?.feature1Desc || "Personal feeding & gentle petting with Molly & Alex";
  const feat2Title = content?.feature2Title || "Water Slide & Pool Access";
  const feat2Desc = content?.feature2Desc || "Unlimited splash time in our safe resort swimming pool";
  const feat3Title = content?.feature3Title || "Air-Conditioned Playroom";
  const feat3Desc = content?.feature3Desc || "200+ themed costumes, toys, and shaded adventure playground";
  const feat4Title = content?.feature4Title || "Custom Artisan Cake & Treats";
  const feat4Desc = content?.feature4Desc || "Freshly baked capybara-themed cake by Casa Café";

  const whatsappText = content?.whatsappCtaText || "Enquire Availability on WhatsApp";
  const telegramText = content?.telegramCtaText || "Telegram";
  const customPartyMsg = encodeURIComponent(
    content?.inquiryMessage ||
    "Hi Casa de Capybara! I'd like to check availability and details for booking a Capybara Birthday Party package."
  );

  return (
    <section 
      id="birthday-package" 
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F7] via-[#FFFBF5] to-[#FAF7F2] dark:from-[#0B140D] dark:via-[#111C12] dark:to-[#0B140D] text-[#1A2E1C] dark:text-[#E8E6E1] overflow-hidden border-t border-[#FDA4AF]/25 transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#F43F5E]/12 via-[#F59E0B]/12 to-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F43F5E]/10 dark:bg-[#F43F5E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Celebration Particles (Decorative & Non-intrusive) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Floating Confetti dots & sparkles */}
        <div className="absolute top-16 left-[10%] w-3 h-3 rounded-full bg-rose-400/30 animate-celebration-drift" style={{ animationDelay: "0s" }} />
        <div className="absolute top-36 right-[12%] w-2.5 h-2.5 rounded-sm bg-amber-400/40 animate-celebration-drift" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-[5%] w-3 h-3 rounded-full bg-emerald-400/25 animate-celebration-drift" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-20 left-[18%] w-2 h-2 rounded-full bg-sky-400/30 animate-celebration-drift" style={{ animationDelay: "2.2s" }} />
        <div className="absolute bottom-28 right-[8%] w-3.5 h-3.5 rounded-sm bg-pink-400/30 animate-celebration-drift" style={{ animationDelay: "4s" }} />

        {/* Twinkling stars */}
        <div className="absolute top-24 left-[28%] text-amber-400/40 animate-sparkle" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute top-48 right-[22%] text-rose-400/40 animate-sparkle" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-40 right-[35%] text-emerald-400/30 animate-sparkle" style={{ animationDelay: "3.5s" }}>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal direction="up" staggerIndex={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 via-amber-100 to-rose-100 dark:from-rose-950/60 dark:via-amber-950/40 dark:to-rose-950/60 border border-rose-300/60 dark:border-rose-700/50 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-sm">
              <PartyPopper className="w-4 h-4 text-rose-500 animate-bounce" />
              <span>{eyebrowBadge}</span>
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-flame" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] dark:text-white leading-[1.18] mb-6">
              {title}{" "}
              <span className="relative inline-block bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#F59E0B] bg-clip-text text-transparent underline decoration-rose-300/40 decoration-wavy underline-offset-8">
                {titleHighlight}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={2}>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
              {description}
            </p>
          </ScrollReveal>
        </div>

        {/* Hero Showcase Card */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden bg-white/95 dark:bg-[#1A2E1C]/85 border border-rose-200/80 dark:border-emerald-800/40 shadow-2xl backdrop-blur-md">
            
            {/* View Mode Toggle Pill Bar */}
            <div className="p-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-emerald-50/40 dark:from-[#142316] dark:via-[#162618] dark:to-[#132115] border-b border-rose-100 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/80 dark:bg-black/40 border border-rose-200/50 dark:border-emerald-800/30 shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveMedia("party")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                    activeMedia === "party"
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-300"
                  }`}
                >
                  <PartyPopper className="w-3.5 h-3.5" />
                  <span>The Party Experience</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMedia("cake")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                    activeMedia === "cake"
                      ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-300"
                  }`}
                >
                  <Cake className="w-3.5 h-3.5" />
                  <span>Artisan Capybara Cake</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-300">
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-flame" />
                <span>Custom Artisan Cake Included in Package</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side with animated floating widgets */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] w-full overflow-hidden group">
                
                {/* Active Image (Party or Cake) */}
                <Image
                  src={activeMedia === "cake" ? cakeImageSrc : partyImageSrc}
                  alt={activeMedia === "cake" ? "Custom handcrafted capybara birthday cake by Casa Café" : imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Visual Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/70 pointer-events-none" />

                {/* Floating highlight badges (Top Left) */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md text-[#1A2E1C] dark:text-white text-xs font-bold shadow-md border border-amber-300/40">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {badgeTop1}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {badgeTop2}
                  </span>
                </div>

                {/* Floating Interactive Mini Cake Sticker / Switcher (Visible when in party mode) */}
                {activeMedia === "party" ? (
                  <button
                    type="button"
                    onClick={() => setActiveMedia("cake")}
                    className="absolute top-4 right-4 z-20 group/cake flex items-center gap-2.5 p-2 pr-3.5 rounded-2xl bg-white/95 dark:bg-[#1A2E1C]/90 backdrop-blur-md border border-amber-300/70 dark:border-amber-500/40 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-float-bob text-left"
                    title="Click to view the custom artisan capybara cake"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-amber-400 shrink-0">
                      <Image
                        src={cakeImageSrc}
                        alt="Artisan Capybara Cake preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-amber-500/90 flex items-center justify-center">
                        <Flame className="w-2.5 h-2.5 text-white animate-flame" />
                      </div>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-300">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Artisan Cake</span>
                      </div>
                      <p className="text-xs font-bold text-gray-800 dark:text-white group-hover/cake:text-amber-600 transition-colors">
                        View Custom Cake ➔
                      </p>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveMedia("party")}
                    className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-black/80 backdrop-blur-md border border-rose-300/60 shadow-lg text-xs font-bold text-rose-600 dark:text-rose-300 hover:scale-105 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Back to Party View</span>
                  </button>
                )}

                {/* Bottom Card Content: Tagline & Review */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/90 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      {activeMedia === "cake" ? "Artisan Bakery Included" : "VIP Resort Cabana"}
                    </span>
                    <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold line-clamp-1">
                      {cardSubtitle}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-white/95 leading-snug">
                    {activeMedia === "cake" 
                      ? "“The capybara fondant cake was stunning! Coconut & passionfruit flavors, with fresh baked cookies and capy cupcakes for all the kids.”"
                      : `“${reviewQuote}”`}
                  </p>
                  <span className="text-xs text-white/80 font-light mt-1 block">
                    — {reviewAuthor}
                  </span>
                </div>
              </div>

              {/* Side feature spotlight (Right Column) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-rose-50/40 to-amber-50/25 dark:from-[#1A2E1C] dark:via-[#162618] dark:to-[#121F14]">
                <div>
                  <div className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <Sparkles className="w-4 h-4 animate-sparkle" />
                    <span>{formulaEyebrow}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1C] dark:text-white tracking-tight mb-3">
                    {formulaTitle}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {formulaDescription}
                  </p>

                  {/* 4 Feature Inclusions */}
                  <div className="space-y-3 mb-8">
                    
                    {/* Item 1: Petting */}
                    <div className="group/item flex items-start gap-3 p-2.5 rounded-2xl transition-colors hover:bg-rose-50/60 dark:hover:bg-rose-950/20">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/50 dark:to-rose-800/40 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-110 transition-transform">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="text-sm leading-snug">
                        <strong className="text-gray-900 dark:text-white block font-bold mb-0.5">{feat1Title}</strong>
                        <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{feat1Desc}</span>
                      </div>
                    </div>

                    {/* Item 2: Pool & Slide */}
                    <div className="group/item flex items-start gap-3 p-2.5 rounded-2xl transition-colors hover:bg-sky-50/60 dark:hover:bg-sky-950/20">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/50 dark:to-sky-800/40 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-110 transition-transform">
                        <Waves className="w-4 h-4" />
                      </div>
                      <div className="text-sm leading-snug">
                        <strong className="text-gray-900 dark:text-white block font-bold mb-0.5">{feat2Title}</strong>
                        <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{feat2Desc}</span>
                      </div>
                    </div>

                    {/* Item 3: Costumes & Playroom */}
                    <div className="group/item flex items-start gap-3 p-2.5 rounded-2xl transition-colors hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-110 transition-transform">
                        <Crown className="w-4 h-4" />
                      </div>
                      <div className="text-sm leading-snug">
                        <strong className="text-gray-900 dark:text-white block font-bold mb-0.5">{feat3Title}</strong>
                        <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{feat3Desc}</span>
                      </div>
                    </div>

                    {/* Item 4: Cake & Treats (With clickable mini sticker) */}
                    <div 
                      onClick={() => setActiveMedia("cake")}
                      className={`group/item flex items-start gap-3 p-2.5 rounded-2xl transition-all cursor-pointer border ${
                        activeMedia === "cake"
                          ? "bg-amber-50/90 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/50 shadow-sm"
                          : "hover:bg-amber-50/60 dark:hover:bg-amber-950/20 border-transparent"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 via-pink-100 to-rose-200 dark:from-amber-900/50 dark:to-rose-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-110 transition-transform">
                        <Cake className="w-4 h-4" />
                      </div>
                      <div className="text-sm leading-snug flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <strong className="text-gray-900 dark:text-white block font-bold mb-0.5">{feat4Title}</strong>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-300 px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50">
                            See Cake ➔
                          </span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{feat4Desc}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Booking Call to Action Buttons */}
                <div className="pt-4 border-t border-rose-100 dark:border-emerald-800/30">
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${customPartyMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200"
                    >
                      <span>{whatsappText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={`${telegramBaseUrl}?text=${customPartyMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#2AABEE] text-white hover:bg-[#2298d5] active:scale-95 transition-all duration-200"
                    >
                      <span>{telegramText}</span>
                    </a>
                  </div>

                  <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    ✨ Dedicated Party Host • Private Sanctuary Cabana • Zero Cleanup Stress
                  </p>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
