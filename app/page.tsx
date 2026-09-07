import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import RoomsOverview from "@/components/home/RoomsOverview";
import EncounterTicketsSummary from "@/components/home/EncounterTicketsSummary";

export const metadata: Metadata = {
  title: "Casa de Capybara | Luxury Wildlife Sanctuary & Eco-Resort",
  description:
    "Experience Cambodia's premier capybara sanctuary, boutique eco-villas, tranquil botanical gardens, and farm-to-table dining at Casa de Capybara.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">
      {/* Hero Section */}
      <Hero
        youtubeId="Kx3kZwcTJ3I"
        headline="Where Nature's Gentle Soul Meets Luxury Sanctuary"
        subheadline="Immerse yourself in tranquil eco-villas, organic garden dining, and unforgettable, heartwarming moments with our resident capybaras."
        primaryCtaText="Book an Encounter"
        primaryCtaLink="/capybara-experience"
        secondaryCtaText="Explore Our Stays"
        secondaryCtaLink="/stay"
      />

      {/* Rooms & Accommodations Overview */}
      <RoomsOverview />

      {/* Encounter Tickets & Passes Summary */}
      <EncounterTicketsSummary />
    </main>
  );
}
