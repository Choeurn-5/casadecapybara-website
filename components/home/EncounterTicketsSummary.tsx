import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getEncounterTicketsApiData, getGlobalSettings } from "@/lib/wordpress";

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

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F5EFE6]/60 text-[#1A2E1C] overflow-hidden border-t border-[#1B5E20]/10">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-32 w-80 h-80 rounded-full bg-[#1B5E20]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-32 w-96 h-96 rounded-full bg-[#E65100]/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E65100]/10 border border-[#E65100]/20 text-[#E65100] text-xs font-bold uppercase tracking-wider mb-4">
            <span>🐾</span>
            <span>Ethical Wildlife Encounters</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-tight mb-6">
            Meet Our Resident{" "}
            <span className="bg-gradient-to-r from-[#E65100] via-[#FF9800] to-[#1B5E20] bg-clip-text text-transparent">
              Capybaras
            </span>
          </h2>
        </div>

        {/* Pricing & Packages Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Individual Package */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-white/80 backdrop-blur-xs border border-[#1B5E20]/15 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
             {/* Thumbnail */}
             <div className="relative w-full h-48 sm:h-56">
                <Image 
                  src={individualImgSrc} 
                  alt={individualImgAlt} 
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
             
                <a
                   href={`${telegramBaseUrl}?text=Hello!%20I%20would%20like%20to%20book%20the%20Individual%20Capybara%20Package.%20Please%20let%20me%20know%20what%20dates%20and%20times%20are%20available.`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-base font-bold bg-[#E65100] text-white hover:bg-[#d84315] hover:shadow-lg shadow-orange-900/20 active:scale-[0.98] transition-all duration-300 min-h-[56px]"
                 >
                   <span>Book via Telegram</span>
                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </a>
             </div>
          </div>

          {/* Family Package */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-white border-2 border-[#E65100] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 md:-translate-y-2 overflow-hidden group">
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
             
                <a
                   href={`${telegramBaseUrl}?text=Hello!%20I%20would%20like%20to%20book%20the%20Family%20Capybara%20Package.%20Please%20let%20me%20know%20what%20dates%20and%20times%20are%20available.`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-base font-bold bg-[#E65100] text-white hover:bg-[#d84315] hover:shadow-lg shadow-orange-900/20 active:scale-[0.98] transition-all duration-300 min-h-[56px] animate-[pulse_2s_ease-in-out_infinite]"
                 >
                   <span>Book via Telegram</span>
                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </a>
             </div>
          </div>

        </div>
        
        {/* Sanctuary Care & Booking Guarantee Notice */}
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

      </div>
    </section>
  );
}
