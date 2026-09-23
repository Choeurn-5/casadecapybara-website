import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Cake, 
  Sparkles, 
  PartyPopper, 
  ShieldCheck, 
  Droplets, 
  Check, 
  Star, 
  Users, 
  Gift, 
  HeartHandshake, 
  Camera, 
  Clock,
  ArrowRight
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { GlobalSettings, defaultGlobalSettings } from "@/lib/wordpress";

interface BirthdayPackageSectionProps {
  globalSettings?: GlobalSettings;
}

export default function BirthdayPackageSection({ globalSettings = defaultGlobalSettings }: BirthdayPackageSectionProps) {
  const telegramBaseUrl = globalSettings.telegramUrl || "https://t.me/capybaracambodia";
  const whatsappNumber = globalSettings.whatsappNumber || "+855968149795";
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "") || "855968149795";

  const miniPackageMsg = encodeURIComponent(
    "Hi Casa de Capybara! I'd like to check availability and details for the Little Capy Birthday Bash ($149)."
  );
  const fiestaPackageMsg = encodeURIComponent(
    "Hi Casa de Capybara! I'd like to check availability and details for the Ultimate Capybara Birthday Fiesta ($280)."
  );
  const customPartyMsg = encodeURIComponent(
    "Hi Casa de Capybara! I'd like to customize a Birthday Party celebration package for an upcoming event."
  );

  return (
    <section 
      id="birthday-package" 
      className="relative w-full py-20 sm:py-28 bg-gradient-to-b from-[#FFF5F7] via-[#FFFBF5] to-[#FAF7F2] dark:from-[#0F1710] dark:via-[#131F14] dark:to-[#0F1710] text-[#1A2E1C] dark:text-[#E8E6E1] overflow-hidden border-t border-[#FDA4AF]/25 transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#F43F5E]/10 via-[#F59E0B]/10 to-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F43F5E]/10 dark:bg-[#F43F5E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="up" staggerIndex={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-950/50 dark:to-amber-950/40 border border-rose-300/60 dark:border-rose-700/40 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-xs">
              <PartyPopper className="w-4 h-4 text-rose-500" />
              <span>Unforgettable Celebrations • Only in Cambodia</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] dark:text-white leading-[1.15] mb-6">
              Celebrate Your Birthday with{" "}
              <span className="bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#F59E0B] bg-clip-text text-transparent">
                Molly & Alex
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={2}>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
              Create once-in-a-lifetime childhood memories in Siem Reap. Private capybara cuddles, 
              resort swimming pool with a giant water slide, 200+ costumes in an air-conditioned playroom, 
              custom artisan cakes, and <span className="font-semibold text-rose-600 dark:text-rose-400">zero cleanup stress for parents</span>.
            </p>
          </ScrollReveal>
        </div>

        {/* Hero Showcase Card */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-[#1A2E1C]/80 border border-rose-200/70 dark:border-emerald-800/40 shadow-xl mb-16 lg:mb-20 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side with floating badges */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] w-full overflow-hidden group">
                <Image
                  src="/images/celebration/capybara-birthday-party.jpg"
                  alt="Joyful children celebrating birthday party with friendly capybaras at Casa de Capybara"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/60" />

                {/* Floating highlight badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md text-[#1A2E1C] dark:text-white text-xs font-bold shadow-md">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    #1 Unique Party Venue
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Supervised & Safe
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                    Private Sanctuary Cabana • Resort Pool & Slide • Costume Playroom
                  </p>
                  <p className="text-sm sm:text-base font-medium text-white/95">
                    &ldquo;The best birthday party our daughter ever had. Molly and Alex were so gentle, and the rangers made every kid feel like VIP!&rdquo;
                  </p>
                  <span className="text-xs text-white/80 font-light mt-1 block">— Sophie & David, Siem Reap</span>
                </div>
              </div>

              {/* Side feature spotlight */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 dark:from-[#1A2E1C] dark:via-[#162618] dark:to-[#121F14]">
                <div>
                  <div className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" />
                    Everything Included For Your Big Day
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E1C] dark:text-white tracking-tight mb-4">
                    The Magic Birthday Formula
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Leave the stress at home. From custom decorations to capybara feedings, poolside games, 
                    and warm farm-to-table treats, our dedicated host coordinates every minute so parents can 
                    relax and celebrate together.
                  </p>

                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        <strong>Private VIP Capybara Session:</strong> Personal feeding & gentle petting with Molly & Alex
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        <strong>Water Slide & Pool Access:</strong> Unlimited splash time in our safe resort swimming pool
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        <strong>Air-Conditioned Playroom:</strong> 200+ themed costumes, toys, and shaded adventure playground
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        <strong>Custom Artisan Cake & Treats:</strong> Freshly baked capybara-themed cake by Casa Café
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-100 dark:border-emerald-800/30 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${customPartyMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    <span>Enquire Availability on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`${telegramBaseUrl}?text=${customPartyMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#2AABEE] text-white hover:bg-[#2298d5] active:scale-95 transition-all duration-200"
                  >
                    <span>Telegram</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing & Package Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* TIER 1: Little Capy Bash */}
          <ScrollReveal direction="up" staggerIndex={0} delay={0.1}>
            <div className="relative flex flex-col justify-between h-full rounded-3xl bg-white/90 dark:bg-[#1A2E1C]/90 border border-[#1B5E20]/20 dark:border-emerald-800/50 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold">
                    <Users className="w-3.5 h-3.5" />
                    Intimate Groups (Up to 6 Kids)
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">1.5 - 2 Hours</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1A2E1C] dark:text-white mb-2">
                  Little Capy Splash Bash
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Perfect for close friends and family looking for an intimate, magical animal encounter combined with pool fun.
                </p>

                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-4xl sm:text-5xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">$149</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ package total</span>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Included in this package:</p>
                  
                  {[
                    "Private 30-min guided encounter with Molly & Alex",
                    "Fresh botanical greens & watermelon feeding basket",
                    "Full-day pool & water slide access for all kids & parents",
                    "Access to air-conditioned playroom (200+ costumes)",
                    "Dedicated sanctuary ranger & staff photo assistance",
                    "Special capybara souvenir keepsake for the birthday child",
                    "Complimentary table reservation in the shaded garden"
                  ].map((inc, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-300 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-200">{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Booking buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${miniPackageMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-95 transition-all duration-200"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`${telegramBaseUrl}?text=${miniPackageMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#2AABEE] text-white hover:bg-[#2298d5] active:scale-95 transition-all duration-200"
                  >
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 2: Ultimate Capybara Fiesta (Flagship / Best Value) */}
          <ScrollReveal direction="up" staggerIndex={1} delay={0.1}>
            <div className="relative flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-[#1A2E1C] border-2 border-rose-400 dark:border-rose-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
              {/* Highlight Ribbon */}
              <div className="absolute top-0 right-0 z-20">
                <div className="px-4 py-1.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider rounded-bl-2xl shadow-md">
                  ★ Most Popular VIP Experience ★
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-950 dark:to-amber-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Full VIP Party (Up to 15 Guests)
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mr-12 sm:mr-0">3 Hours Reserved</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1A2E1C] dark:text-white mb-2">
                  The Ultimate Capybara Fiesta
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  The all-inclusive dream birthday. Exclusive decorated cabana, artisan cake, catering platters, party host, and VIP animal cuddles.
                </p>

                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent tracking-tight">$280</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ all-inclusive</span>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Everything in Little Capy, plus:</p>
                  
                  {[
                    "Private Decorated Bamboo Cabana (Balloons, banner & florals)",
                    "Custom Handcrafted Capybara Birthday Cake & cupcake tower",
                    "VIP Capybara encounter with special edible fruit 'cake' for Molly & Alex",
                    "Fresh fruit smoothie & snack platters from Casa Café",
                    "Dedicated Party Host to direct party games, music, and schedule",
                    "Capybara plush gift for birthday child & goody favor bags for guests",
                    "High-resolution digital celebration photo album by staff"
                  ].map((inc, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Booking buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${fiestaPackageMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-md active:scale-95 transition-all duration-200"
                  >
                    <span>Book on WhatsApp</span>
                  </a>
                  <a
                    href={`${telegramBaseUrl}?text=${fiestaPackageMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#2AABEE] text-white hover:bg-[#2298d5] hover:shadow-md active:scale-95 transition-all duration-200"
                  >
                    <span>Book on Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Cake Showcase & Parents Peace-of-Mind Banner */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-3xl bg-white/80 dark:bg-[#1A2E1C]/80 border border-gray-200/70 dark:border-emerald-800/40 p-6 sm:p-8 lg:p-10 shadow-sm backdrop-blur-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left: Cake visual */}
              <div className="lg:col-span-4 relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md group">
                <Image
                  src="/images/celebration/capybara-birthday-cake.jpg"
                  alt="Custom handcrafted capybara themed birthday cake with edible fondant capybaras and tropical cupcakes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold">
                  🎂 Artisan Capybara Cake by Casa Café Kitchen
                </div>
              </div>

              {/* Right: Why parents choose us */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <HeartHandshake className="w-4 h-4" />
                  Stress-Free Hosting
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-[#1A2E1C] dark:text-white mb-3">
                  Why Parents Love Celebrating at Casa de Capybara
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Planning a child’s birthday party can be exhausting. Our team takes care of every single detail: 
                  from the welcome drinks, party setup, food presentation, and supervised pool lifeguarding, 
                  to party entertainment and full cleanup.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30">
                    <p className="text-sm font-bold text-rose-700 dark:text-rose-300">🎈 Zero Cleanup</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Arrive, celebrate, and leave the mess to us.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">☀️ Rain or Shine</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Poolside sun + air-conditioned indoor playroom.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30">
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">🥗 Farm-Fresh Food</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Organic kids menus, smoothies, and artisan bites.
                    </p>
                  </div>
                </div>

                {/* Additional custom request note */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Need a custom party theme, dietary accommodations, or private villa overnight package?
                  </p>
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${customPartyMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 underline underline-offset-4 shrink-0"
                  >
                    <span>Request Custom Party Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
