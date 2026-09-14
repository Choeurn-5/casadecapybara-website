import React from "react";
import { getGuestReviews } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";

// A fallback array if the API doesn't return anything or if there's an error.
const fallbackReviews = [
  {
    rating: 5,
    reviewContent: "Casa de Capybara is absolutely magical! We spent hours in the cafe watching them swim.",
    reviewerName: "Sarah M.",
    reviewerTitle: "Local Guide",
  },
  {
    rating: 5,
    reviewContent: "The themed rooms are incredible. Our kids couldn't believe they got to feed a capybara right outside our bungalow!",
    reviewerName: "The Johnson Family",
    reviewerTitle: "Guests from Australia",
  },
  {
    rating: 5,
    reviewContent: "Best coffee in Siem Reap, hands down. The relaxed atmosphere makes it the perfect place to unwind after visiting the temples.",
    reviewerName: "David K.",
    reviewerTitle: "Digital Nomad",
  }
];

export default async function TestimonialSlider() {
  const reviewsData = await getGuestReviews();
  const reviews = reviewsData && reviewsData.length > 0 ? reviewsData : fallbackReviews;

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <ScrollReveal direction="up" staggerIndex={0}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A2E1C] mb-4">
              Hear From Our Guests
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" staggerIndex={1}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why families, couples, and animal lovers from around the world choose Casa de Capybara for their Siem Reap getaway.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid/Scroll Container */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {reviews.map((review, idx) => {
            // Alternate between subtle Pink and Blue backgrounds
            const bgClass = idx % 2 === 0 ? "bg-[#F8BBD0]/20" : "bg-[#B3E5FC]/20";

            return (
              <div
                key={idx}
                className={`flex-none w-[85vw] sm:w-[300px] md:w-auto snap-center rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-between ${bgClass}`}
              >
                <div>
                  {/* Gold Quotation Mark Icon */}
                  <div className="text-[#E65100] mb-4">
                    <svg
                      className="w-10 h-10 opacity-40"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>

                  <p className="text-[#1A2E1C] text-base leading-relaxed italic mb-8 relative z-10">
                    "{review.reviewContent?.trim()}"
                  </p>
                </div>

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < (review.rating || 5) ? 'text-[#E65100]' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Placeholder Avatar if no image provided */}
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B5E20] font-bold shadow-sm">
                      {review.reviewerName?.charAt(0) || "G"}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A2E1C] text-sm">{review.reviewerName}</h4>
                      {review.reviewerTitle && (
                        <p className="text-xs text-gray-500">{review.reviewerTitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
