import React from "react";
import { Star, ExternalLink, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getGuestReviews } from "@/lib/wordpress";

const verifiedReviews = [
  {
    source: "TripAdvisor",
    sourceColor: "bg-[#E8F7F0] text-[#00AA6C] border-[#00AA6C]/30",
    badgeBg: "#00AA6C",
    rating: 5,
    tag: "Family Favorite",
    quote:
      "Everything is capybara themed from the staff shirts to the tiles and the neon lights. You will meet Molly and Alex — 2 friendly capybaras you can pet and feed. Very fun cafe and welcoming staff. Highly recommended especially to families.",
    reviewer: "Verified Family Traveler",
    platformDetail: "TripAdvisor Review",
    avatarBg: "bg-[#00AA6C]/10 text-[#00AA6C]",
    iconType: "tripadvisor",
  },
  {
    source: "Booking.com",
    sourceColor: "bg-[#EBF3FF] text-[#003580] border-[#003580]/30",
    badgeBg: "#003580",
    rating: 5,
    tag: "Resort & Stay",
    quote:
      "The room was a literal kids' wonderland — colourful, bright and so themed. The hotel has an epic kids' playground, a pool with slide, and the spa and steam were parents' heaven. So much love and effort went into this hotel.",
    reviewer: "Verified Resort Guest",
    platformDetail: "Booking.com Verified Stay",
    avatarBg: "bg-[#003580]/10 text-[#003580]",
    iconType: "booking",
  },
  {
    source: "Google",
    sourceColor: "bg-[#EFF4FE] text-[#1A73E8] border-[#4285F4]/30",
    badgeBg: "#4285F4",
    rating: 5,
    tag: "Sanctuary Magic",
    quote:
      "Such a magical experience. There is something truly special about spending time with Molly and Alex. Capybara energy heals, refreshes and brings a happiness that is hard to find anywhere else.",
    reviewer: "Verified Visitor",
    platformDetail: "Google Verified Review",
    avatarBg: "bg-[#EA4335]/10 text-[#EA4335]",
    iconType: "google",
  },
];

export default async function TestimonialSlider() {
  // Gracefully fetch WordPress reviews to ensure API stability
  let apiReviews: any[] = [];
  try {
    const data = await getGuestReviews();
    if (Array.isArray(data)) {
      apiReviews = data;
    }
  } catch (err) {
    console.error("Error loading guest reviews from API:", err);
  }

  const googleReviewsUrl = "https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA";
  const tripAdvisorUrl =
    "https://www.tripadvisor.com/UserReviewEdit-g297390-d34246657-Casa_de_Capybara-Siem_Reap_Siem_Reap_Province.html";

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FAF7F2] text-[#1A2E1C] overflow-hidden border-b border-[#1B5E20]/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1B5E20]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#E65100]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <ScrollReveal direction="up" staggerIndex={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-[#1B5E20] text-xs font-bold tracking-widest uppercase mb-4">
              <MessageSquareQuote className="w-4 h-4 text-[#1B5E20]" />
              <span>Verified Experiences • 4.9 Average Rating</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] leading-[1.15] mb-4">
              What Our Guests Are Saying
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" staggerIndex={2}>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Authentic stories and heartfelt reflections from families, couples, and animal lovers who have experienced the warmth of Casa de Capybara.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Verified Guest Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
          {verifiedReviews.map((review, idx) => (
            <ScrollReveal key={idx} direction="up" staggerIndex={idx} delay={0.1}>
              <div className="group relative h-full p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#1B5E20]/10 hover:border-[#1B5E20]/30 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                
                {/* Top: Platform Badge & Rating */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    {/* Platform Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${review.sourceColor}`}
                    >
                      {review.iconType === "tripadvisor" && (
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-9.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm4 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
                        </svg>
                      )}
                      {review.iconType === "booking" && (
                        <span className="w-4 h-4 rounded-xs bg-[#003580] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                          B.
                        </span>
                      )}
                      {review.iconType === "google" && (
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                        </svg>
                      )}
                      <span>{review.source}</span>
                    </div>

                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      {review.tag}
                    </span>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB300] text-[#FFB300]" />
                    ))}
                    <span className="text-xs font-bold text-gray-800 ml-1.5">5.0</span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed italic mb-8 relative">
                    "{review.quote}"
                  </p>
                </div>

                {/* Bottom: Reviewer Info & Verified Tick */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${review.avatarBg} flex items-center justify-center font-extrabold text-sm shrink-0`}
                    >
                      {review.reviewer.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1A2E1C]">
                        {review.reviewer}
                      </h4>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{review.platformDetail}</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Action Buttons: Read Reviews on Google & TripAdvisor */}
        <ScrollReveal direction="up" staggerIndex={3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            
            {/* Google Reviews Button */}
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#4285F4]/50 text-[#1A2E1C] text-sm font-semibold tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <svg className="w-4 h-4 fill-[#4285F4] shrink-0" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span>Read All Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4285F4] transition-colors" />
            </a>

            {/* TripAdvisor Reviews Button */}
            <a
              href={tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#E8F7F0]/40 border border-gray-200 hover:border-[#00AA6C]/50 text-[#1A2E1C] text-sm font-semibold tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <svg className="w-4 h-4 fill-[#00AA6C] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-9.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm4 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
              </svg>
              <span>Read Reviews on TripAdvisor</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00AA6C] transition-colors" />
            </a>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
