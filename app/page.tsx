import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import EncounterTicketsSummary from "@/components/home/EncounterTicketsSummary";
import RoomCarousel from "@/components/home/RoomTeaser";
import CafeTeaser from "@/components/home/CafeTeaser";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import LocationTransitSection from "@/components/home/LocationTransitSection";
import FamiliesAndSafetyTeaser from "@/components/home/FamiliesAndSafetyTeaser";
import FinalConversionBanner from "@/components/home/FinalConversionBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getFeaturedRooms, getGlobalSettings, getHomePageContent } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Casa de Capybara | Luxury Wildlife Sanctuary & Eco-Resort",
  description:
    "Experience Cambodia's premier capybara sanctuary, boutique eco-villas, tranquil botanical gardens, and farm-to-table dining at Casa de Capybara.",
};

export default async function Home() {
  const [rooms, globalSettings, homeContent] = await Promise.all([
    getFeaturedRooms(),
    getGlobalSettings(),
    getHomePageContent(),
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">
      {/* Section 1: Hero Banner (Visual Awe & Headline) */}
      <Hero
        youtubeId={globalSettings.heroVideoId || "Kx3kZwcTJ3I"}
        headline={homeContent?.heroHeadline}
        subheadline={homeContent?.heroSubheadline}
        primaryCtaText={homeContent?.primaryCtaText}
        primaryCtaLink="/capybara-experience"
        secondaryCtaText={homeContent?.secondaryCtaText}
        secondaryCtaLink="/stay"
      />

      {/* Section 2: About / Editorial Welcome & Press Proof (Orientation & Credibility) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <AboutSection 
          eyebrow={homeContent?.aboutEyebrow}
          headline={homeContent?.aboutHeadline}
          quote={homeContent?.aboutQuote}
          body={homeContent?.aboutBody}
          calloutTitle={homeContent?.aboutCalloutTitle}
          calloutText={homeContent?.aboutCalloutText}
          statOpened={homeContent?.statOpened}
          statDistance={homeContent?.statDistance}
          statAvailability={homeContent?.statAvailability}
        />
      </ScrollReveal>

      {/* Section 3: Encounter Tickets (The Viral Draw & Core Attraction) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <EncounterTicketsSummary />
      </ScrollReveal>

      {/* Section 4: Families & Safety (Reassurance & Care Immediately After Animal Encounters) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <FamiliesAndSafetyTeaser />
      </ScrollReveal>

      {/* Section 5: The Stay / Boutique Villas (Accommodations) */}
      <RoomCarousel rooms={rooms} />

      {/* Section 6: The Destination Cafe (Farm-to-Table Dining & Lifestyle) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <CafeTeaser />
      </ScrollReveal>

      {/* Section 7: Guest Reviews & Social Proof (TripAdvisor, Booking.com, Google) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <TestimonialSlider />
      </ScrollReveal>

      {/* Section 8: Location & Transit Grid (Right Next to Angkor Wat & Directions) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <LocationTransitSection />
      </ScrollReveal>

      {/* Section 9: Final Conversion Banner (Direct Booking & Concierge Channels) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <FinalConversionBanner
          bookingUrl={globalSettings.bookingEngineUrl}
          telegramUrl={globalSettings.telegramUrl}
        />
      </ScrollReveal>
    </main>
  );
}

