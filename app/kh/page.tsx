import type { Metadata } from "next";
import HeroKh from "@/components/kh/HeroKh";
import AboutSectionKh from "@/components/kh/AboutSectionKh";
import EncounterTicketsSummaryKh from "@/components/kh/EncounterTicketsSummaryKh";
import RoomTeaserKh from "@/components/kh/RoomTeaserKh";
import CafeTeaserKh from "@/components/kh/CafeTeaserKh";
import TestimonialSliderKh from "@/components/kh/TestimonialSliderKh";
import LocationTransitSectionKh from "@/components/kh/LocationTransitSectionKh";
import FamiliesAndSafetyTeaserKh from "@/components/kh/FamiliesAndSafetyTeaserKh";
import FinalConversionBannerKh from "@/components/kh/FinalConversionBannerKh";
import LocalDealKh from "@/components/kh/LocalDealKh";
import ResortAmenitiesKh from "@/components/kh/ResortAmenitiesKh";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getFeaturedRooms, getGlobalSettings } from "@/lib/wordpress";

// Dynamic GraphQL Data Fetcher
async function getKhmerData() {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.casadecapybara.com/graphql';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      body: JSON.stringify({
        query: `
          query GetKhmerPage {
            page(id: "kh", idType: URI) {
              khmerPageSettings {
                khHeroTagline
                khHeroWelcome
                khHeroVideoUrl
                khSingleTicketPrice
                khFamilyTicketPrice
                khLocalDealActive
                khLocalDealSpend
                khLocalDealCashback
                khLocalDealText
                khRoomsIntro
                khCheckinTime
                khCheckoutTime
                khCafeHeadline
                khCafeDesc
                khCafeMenuKhmer
                khTelegramHandle
                khTelegramPhone
                khTelegramUrl
                khTelegramQr {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await res.json();
    return json?.data?.page?.khmerPageSettings || {};
  } catch (error) {
    console.error('Error fetching Khmer page settings:', error);
    return {};
  }
}

export const metadata: Metadata = {
  title: "Casa de Capybara សៀមរាប | សណ្ឋាគារគ្រួសារ ហាងកាហ្វេ និងសត្វកាពីបារ៉ាដំបូងបង្អស់នៅកម្ពុជា",
  description: "ជួបជាមួយសត្វកាពីបារ៉ាពិតៗ Molly & Alex, បន្ទប់ស្នាក់នៅបែបប៊ូទិក, អាងហែលទឹកមានរំអិល និងហាងកាហ្វេដ៏ស្រស់ស្អាតនៅជិតប្រាសាទអង្គរវត្ត។",
  openGraph: {
    title: "Casa de Capybara សៀមរាប | សណ្ឋាគារគ្រួសារ ហាងកាហ្វេ និងសត្វកាពីបារ៉ាដំបូងបង្អស់នៅកម្ពុជា",
    description: "ជួបជាមួយសត្វកាពីបារ៉ាពិតៗ Molly & Alex, បន្ទប់ស្នាក់នៅបែបប៊ូទិក, អាងហែលទឹកមានរំអិល និងហាងកាហ្វេដ៏ស្រស់ស្អាតនៅជិតប្រាសាទអង្គរវត្ត។",
    type: "website",
    locale: "km_KH",
  }
};

export default async function KhmerPage() {
  const [data, rooms, globalSettings] = await Promise.all([
    getKhmerData(),
    getFeaturedRooms(),
    getGlobalSettings(),
  ]);

  const localSpend = data.khLocalDealSpend || "២០,០០០៛";
  const localCashback = data.khLocalDealCashback || "២០,០០០៛";
  const getYoutubeId = (url: string) => {
    if (!url) return "3mTyoZkffn8";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "3mTyoZkffn8";
  };
  const youtubeId = getYoutubeId(data.khHeroVideoUrl);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C] font-battambang" lang="km">
      {/* Section 1: Hero Banner */}
      <HeroKh
        youtubeId={youtubeId}
      />

      {/* Section 2: About / Editorial Welcome */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <AboutSectionKh />
      </ScrollReveal>

      {/* Section 3: Encounter Tickets */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <EncounterTicketsSummaryKh />
      </ScrollReveal>
      
      {/* Section 3.5: Local Deal KH only */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <LocalDealKh localSpend={localSpend} localCashback={localCashback} localDealText={data.khLocalDealText} telegramUrl={data.khTelegramUrl} />
      </ScrollReveal>

      {/* Section 4: Families & Safety */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <FamiliesAndSafetyTeaserKh />
      </ScrollReveal>

      {/* Section 4.5: Resort Amenities (Pool & Gym) */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <ResortAmenitiesKh />
      </ScrollReveal>

      {/* Section 5: The Stay / Boutique Villas */}
      <RoomTeaserKh rooms={rooms} />

      {/* Section 6: The Destination Cafe */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <CafeTeaserKh />
      </ScrollReveal>

      {/* Section 7: Guest Reviews & Social Proof */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <TestimonialSliderKh />
      </ScrollReveal>

      {/* Section 8: Location & Transit Grid */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <LocationTransitSectionKh />
      </ScrollReveal>

      {/* Section 9: Final Conversion Banner */}
      <ScrollReveal delay={0.1} staggerIndex={0}>
        <FinalConversionBannerKh
          bookingUrl={globalSettings.bookingEngineUrl}
          telegramUrl={globalSettings.telegramUrl}
        />
      </ScrollReveal>
    </main>
  );
}
