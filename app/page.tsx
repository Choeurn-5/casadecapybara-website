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
import { getFeaturedRooms, getGlobalSettings } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Casa de Capybara | Luxury Wildlife Sanctuary & Eco-Resort",
  description:
    "Experience Cambodia's premier capybara sanctuary, boutique eco-villas, tranquil botanical gardens, and farm-to-table dining at Casa de Capybara.",
};

export default async function Home() {
  const [rooms, globalSettings] = await Promise.all([
    getFeaturedRooms(),
    getGlobalSettings(),
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">
      {/* Section 1: Hero Banner */}
      <Hero
        youtubeId="Kx3kZwcTJ3I"
        headline="Where Nature's Gentle Soul Meets Luxury Sanctuary"
        subheadline="Immerse yourself in tranquil eco-villas, organic garden dining, and unforgettable, heartwarming moments with our resident capybaras."
        primaryCtaText="Book an Encounter"
        primaryCtaLink="/capybara-experience"
        secondaryCtaText="Explore Our Stays"
        secondaryCtaLink="/stay"
      />

      {/* Section 2: About / Editorial Welcome & Proof (Directly after Hero) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <AboutSection />
      </ScrollReveal>

      {/* Section 3: Encounter Tickets (The Viral Draw) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <EncounterTicketsSummary />
      </ScrollReveal>

      {/* Section 4: The Stay / Rooms (Carousel) */}
      <RoomCarousel rooms={rooms} />

      {/* Section 5: The Destination Cafe (The Experience) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <CafeTeaser />
      </ScrollReveal>

      {/* Section 6: Guest Reviews (Social Proof) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <TestimonialSlider />
      </ScrollReveal>

      {/* Section 7: Location & Transit Grid (Right Next to Angkor Wat) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <LocationTransitSection />
      </ScrollReveal>

      {/* Section 8: Families & Safety Sanctuary Magic */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <FamiliesAndSafetyTeaser />
      </ScrollReveal>

      {/* Section 9: Final Conversion Banner */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <FinalConversionBanner
          bookingUrl={globalSettings.bookingEngineUrl}
          telegramUrl={globalSettings.telegramUrl}
        />
      </ScrollReveal>
    </main>
  );
}

