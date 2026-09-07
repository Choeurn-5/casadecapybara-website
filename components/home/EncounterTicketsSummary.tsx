import React from "react";
import Link from "next/link";
import { EncounterTicket, getEncounterTickets } from "@/lib/wordpress";

interface EncounterTicketsSummaryProps {
  tickets?: EncounterTicket[];
}

export default async function EncounterTicketsSummary({
  tickets,
}: EncounterTicketsSummaryProps) {
  const ticketList = tickets || (await getEncounterTickets());

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#F5EFE6]/60 text-[#1A2E1C] overflow-hidden border-t border-[#1B5E20]/10">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-32 w-80 h-80 rounded-full bg-[#1B5E20]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-32 w-96 h-96 rounded-full bg-[#E65100]/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E65100]/10 border border-[#E65100]/20 text-[#E65100] text-xs font-bold uppercase tracking-wider mb-4">
            <span>🐾</span>
            <span>Ethical Wildlife Encounters & Passes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-tight">
            Meet Our Resident{" "}
            <span className="bg-gradient-to-r from-[#E65100] via-[#FF9800] to-[#1B5E20] bg-clip-text text-transparent">
              Capybaras
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            All encounters are calm, unhurried, and small-group guided to ensure animal welfare and maximum bonding time. 100% of proceeds fund organic nutrition and veterinary care.
          </p>
        </div>

        {/* Pricing & Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {ticketList.map((ticket) => {
            const isFeatured = ticket.isFeatured;

            return (
              <div
                key={ticket.id}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
                  isFeatured
                    ? "bg-white border-2 border-[#E65100] shadow-2xl shadow-orange-950/15 lg:-translate-y-2.5 z-10"
                    : "bg-white/80 backdrop-blur-xs border border-[#1B5E20]/15 shadow-md hover:shadow-xl hover:-translate-y-1"
                } p-6 sm:p-7`}
              >
                {/* Featured / Popular Ribbon */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#E65100] to-[#FF9800] text-white text-xs font-black uppercase tracking-wider shadow-md">
                    ★ Most Popular Choice ★
                  </div>
                )}

                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {ticket.badge && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          isFeatured
                            ? "bg-[#E65100]/10 text-[#E65100]"
                            : "bg-[#1B5E20]/10 text-[#1B5E20]"
                        }`}
                      >
                        {ticket.badge}
                      </span>
                    )}
                    <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {ticket.duration}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#1A2E1C] leading-snug">
                    {ticket.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed min-h-[34px]">
                    {ticket.subtitle}
                  </p>

                  {/* Price Block */}
                  <div className="mt-5 pb-5 border-b border-gray-100 flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-extrabold tracking-tight ${
                          isFeatured ? "text-[#E65100]" : "text-[#1B5E20]"
                        }`}
                      >
                        {ticket.price}
                      </span>
                      {ticket.period && (
                        <span className="text-xs text-gray-500 font-medium">
                          {ticket.period.startsWith("per") ? ticket.period : `/ ${ticket.period}`}
                        </span>
                      )}
                    </div>

                    {ticket.localRateNote && (
                      <p className="mt-1.5 text-[11px] text-[#1B5E20] font-medium italic">
                        * {ticket.localRateNote}
                      </p>
                    )}
                  </div>

                  {/* Inclusions List */}
                  <div className="mt-5">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                      Package Inclusions:
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                      {ticket.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="shrink-0 w-4 h-4 rounded-full bg-[#1B5E20]/15 text-[#1B5E20] flex items-center justify-center text-[10px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4">
                  <Link
                    href={ticket.bookingUrl || "/capybara-experience"}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm ${
                      isFeatured
                        ? "bg-gradient-to-r from-[#E65100] to-[#F57C00] text-white hover:from-[#d84315] hover:to-[#e65100] hover:shadow-lg shadow-orange-900/20 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#1B5E20] text-white hover:bg-[#2E7D32] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    <span>Book Encounter</span>
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
            );
          })}
        </div>

        {/* Sanctuary Care & Booking Guarantee Notice */}
        <div className="mt-14 p-6 rounded-3xl bg-white/90 border border-[#1B5E20]/15 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#1B5E20]/10 text-[#1B5E20] flex items-center justify-center text-xl shrink-0">
              🌿
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A2E1C]">Small Group Cap</h4>
              <p className="text-xs text-gray-500">Max 8 visitors per session for calm animal comfort.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#E65100]/10 text-[#E65100] flex items-center justify-center text-xl shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A2E1C]">Flexible Rescheduling</h4>
              <p className="text-xs text-gray-500">Change dates anytime up to 24 hours in advance.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#F8BBD0]/60 text-[#1B5E20] flex items-center justify-center text-xl shrink-0">
              🐾
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A2E1C]">100% Ethical Pledge</h4>
              <p className="text-xs text-gray-500">Never forced. Animals choose when to bathe and interact.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
