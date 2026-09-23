import React from "react";
import Image from "next/image";
import { 
  Sparkles, 
  PartyPopper, 
  ShieldCheck, 
  Check, 
  Star, 
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

  const customPartyMsg = encodeURIComponent(
    "Hi Casa de Capybara! I'd like to check availability and details for booking a Capybara Birthday Party package."
  );

  return (
    <section 
      id="birthday-package" 
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F7] via-[#FFFBF5] to-[#FAF7F2] dark:from-[#0F1710] dark:via-[#131F14] dark:to-[#0F1710] text-[#1A2E1C] dark:text-[#E8E6E1] overflow-hidden border-t border-[#FDA4AF]/25 transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#F43F5E]/10 via-[#F59E0B]/10 to-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F43F5E]/10 dark:bg-[#F43F5E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
          <div className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-[#1A2E1C]/80 border border-rose-200/70 dark:border-emerald-800/40 shadow-xl backdrop-blur-sm">
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

      </div>
    </section>
  );
}
