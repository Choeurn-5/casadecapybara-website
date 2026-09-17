"use client";

import React from "react";
import {
  Calendar,
  MessageCircle,
  Send,
  Sparkles,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FinalConversionBannerProps {
  bookingUrl?: string;
  whatsappNumber?: string;
  telegramUrl?: string;
}

export default function FinalConversionBanner({
  bookingUrl = "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara",
  whatsappNumber = "+855968149795",
  telegramUrl = "https://t.me/capybaracambodia",
}: FinalConversionBannerProps) {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappLink = `https://wa.me/${cleanPhone}`;

  return (
    <section className="relative w-full py-20 sm:py-28 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0B1528] text-white overflow-hidden">
      {/* Background Luxury Lighting & Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#0284C7]/30 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F43F5E]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} 
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        
        {/* Operating Hours Pill */}
        <ScrollReveal direction="up" staggerIndex={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#38BDF8] text-xs font-bold tracking-widest uppercase mb-6 shadow-md">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Open Daily • 7:00 AM – 9:00 PM</span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <ScrollReveal direction="up" staggerIndex={1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Ready for an Unforgettable <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F472B6] via-[#FB7185] to-[#38BDF8] bg-clip-text text-transparent font-serif italic">
              Siem Reap Adventure?
            </span>
          </h2>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal direction="up" staggerIndex={2}>
          <p className="text-base sm:text-xl text-sky-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Molly & Alex cannot wait to meet you. Whether you drop in for an afternoon encounter or stay in our boutique eco-villas, unforgettable moments await.
          </p>
        </ScrollReveal>

        {/* 3 Action Buttons */}
        <ScrollReveal direction="up" staggerIndex={3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12">
            
            {/* 1. Inngenius Booking Button (Blue Lead) */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369a1] hover:to-[#0284c7] text-white text-base font-extrabold tracking-wide shadow-2xl shadow-sky-950/40 hover:shadow-sky-900/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <Calendar className="w-5 h-5 text-white" />
              <span>Book Your Room (From $50)</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </a>

            {/* 2. WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 backdrop-blur-md text-sm sm:text-base font-bold tracking-wide shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp: +855 968 149 795</span>
            </a>

            {/* 3. Telegram Button */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-white border border-[#229ED9]/40 backdrop-blur-md text-sm sm:text-base font-bold tracking-wide shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5 text-[#229ED9]" />
              <span>Telegram: Chat with Concierge</span>
            </a>

          </div>
        </ScrollReveal>

        {/* Reassurance Guarantees */}
        <ScrollReveal direction="up" staggerIndex={4}>
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-emerald-200/90 font-medium">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FFCA28]" />
              <span>Direct Booking Best Rate Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FFCA28]" />
              <span>Free High-Speed Wi-Fi & Garden Pool Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FFCA28]" />
              <span>Day Visitors & Hotel Guests Welcomed Daily</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
