import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getEncounterTicketsApiData, getGlobalSettings } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default async function EncounterTicketsSummary() {
  const data = await getEncounterTicketsApiData();

  if (!data) {
    return null;
  }

  // Use API images or fallbacks
  const individualImgSrc = data.individualImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584347783935-430b805dff32?q=80&w=800&auto=format&fit=crop";
  const individualImgAlt = data.individualImage?.node?.altText || "Solo Capybara Experience";

  const familyImgSrc = data.familyImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1628155930542-3c7a64e2c848?q=80&w=800&auto=format&fit=crop";
  const familyImgAlt = data.familyImage?.node?.altText || "Family Capybara Experience";
  const globalSettings = await getGlobalSettings();
  const telegramBaseUrl = globalSettings.telegramUrl || "https://t.me/capybaracambodia";
  const whatsappNumber = globalSettings.whatsappNumber || "+855968149795";
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "") || "855968149795";

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F5EFE6]/60 text-[#1A2E1C] overflow-hidden border-t border-[#1B5E20]/10">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-32 w-80 h-80 rounded-full bg-[#1B5E20]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-32 w-96 h-96 rounded-full bg-[#E65100]/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal direction="up" staggerIndex={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E65100]/10 border border-[#E65100]/20 text-[#E65100] text-xs font-bold uppercase tracking-wider mb-4">
              <span>🐾</span>
              <span>Ethical Wildlife Encounters</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-tight mb-6">
              Meet Our Resident{" "}
              <span className="bg-gradient-to-r from-[#E65100] via-[#FF9800] to-[#1B5E20] bg-clip-text text-transparent">
                Capybaras
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Pricing & Packages Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Individual Package */}
          <ScrollReveal direction="up" staggerIndex={0} delay={0.1}>
            <div className="relative flex flex-col justify-between rounded-3xl bg-white/80 backdrop-blur-xs border border-[#1B5E20]/15 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full">
               {/* Thumbnail */}
               <div className="relative w-full h-48 sm:h-56">
                  <Image 
                    src={individualImgSrc} 
                    alt={individualImgAlt} 
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white leading-snug">Individual Package</h3>
               </div>

               <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="inline-block px-3 py-1 bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold rounded-full mb-4 w-fit">
                     Capybara Experience Only
                  </div>
                  
                  {data.individualPaxNote && (
                    <div className="mb-4 text-sm font-medium text-[#1B5E20]">
                      {data.individualPaxNote}
                    </div>
                  )}

                  <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1B5E20]">${data.individualPrice}</span>
                      <span className="text-sm text-gray-500 font-medium">/ person</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                     {data.individualInclusions?.map((inclusion: any, idx: number) => (
                       <li key={idx} className="flex items-start gap-3">
                         <span className="w-5 h-5 rounded-full bg-[#1B5E20]/10 flex items-center justify-center text-[#1B5E20] shrink-0 mt-0.5">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                         </span>
                         <span className="text-sm text-gray-700">{inclusion.inclusionText}</span>
                       </li>
                     ))}
                  </ul>
               
                  {/* Dual Booking Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-auto pt-2">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi, I'd like to book the $${data.individualPrice || 10} Individual Sanctuary Ticket.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-md active:scale-95 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`${telegramBaseUrl}?text=${encodeURIComponent(`Hi, I'd like to book the $${data.individualPrice || 10} Individual Sanctuary Ticket.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-[#2AABEE] text-white hover:bg-[#2298d5] hover:shadow-md active:scale-95 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
            </div>
          </ScrollReveal>

          {/* Family Package */}
          <ScrollReveal direction="up" staggerIndex={1} delay={0.1}>
            <div className="relative flex flex-col justify-between rounded-3xl bg-white border-2 border-[#E65100] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full">
               <div className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E65100] to-[#FF9800] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                  ★ Best Value ★
               </div>

               {/* Thumbnail */}
               <div className="relative w-full h-48 sm:h-56">
                  <Image 
                    src={familyImgSrc} 
                    alt={familyImgAlt} 
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white leading-snug">Family Package</h3>
               </div>

               <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="inline-block px-3 py-1 bg-[#E65100]/10 text-[#E65100] text-xs font-bold rounded-full mb-3 w-fit">
                     Capybara Experience Only
                  </div>
                  
                  {data.familyPaxNote && (
                    <div className="mb-4 inline-flex items-start bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg">
                       <span className="text-[10px] font-bold uppercase tracking-wide leading-tight">
                         {data.familyPaxNote}
                       </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#E65100]">${data.familyPrice}</span>
                      <span className="text-sm text-gray-500 font-medium">/ family</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                     {data.familyInclusions?.map((inclusion: any, idx: number) => (
                       <li key={idx} className="flex items-start gap-3">
                         <span className="w-5 h-5 rounded-full bg-[#E65100]/10 flex items-center justify-center text-[#E65100] shrink-0 mt-0.5">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                         </span>
                         <span className="text-sm text-gray-700">{inclusion.inclusionText}</span>
                       </li>
                     ))}
                  </ul>
               
                  {/* Dual Booking Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-auto pt-2">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi, I'd like to book the $${data.familyPrice || 30} Family Sanctuary Package.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-md active:scale-95 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`${telegramBaseUrl}?text=${encodeURIComponent(`Hi, I'd like to book the $${data.familyPrice || 30} Family Sanctuary Package.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-[#2AABEE] text-white hover:bg-[#2298d5] hover:shadow-md active:scale-95 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
            </div>
          </ScrollReveal>

        </div>
        
        {/* Sanctuary Care & Booking Guarantee Notice */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-white/90 border border-[#1B5E20]/15 shadow-sm flex flex-col sm:flex-row sm:grid sm:grid-cols-3 gap-6 text-left hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#1B5E20]/10 text-[#1B5E20] flex items-center justify-center text-xl shrink-0">
                🌿
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1C]">Small Group Cap</h4>
                <p className="text-xs text-gray-500 mt-0.5">Max 8 visitors per session.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E65100]/10 text-[#E65100] flex items-center justify-center text-xl shrink-0">
                🛡️
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1C]">Flexible Change</h4>
                <p className="text-xs text-gray-500 mt-0.5">Reschedule 24h in advance.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F8BBD0]/60 text-[#1B5E20] flex items-center justify-center text-xl shrink-0">
                🐾
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1C]">100% Ethical</h4>
                <p className="text-xs text-gray-500 mt-0.5">Animals choose to interact.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
