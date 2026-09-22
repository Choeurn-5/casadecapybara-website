import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import { getCapyGallery, FlatGalleryImage } from "@/lib/wordpress";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryStorySection from "@/components/gallery/GalleryStorySection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Photo & Video Gallery | Casa de Capybara Siem Reap",
  description:
    "Explore the visual archive of Casa de Capybara. High-resolution photos of capybara encounters with Molly & Alex, boutique eco-villas, pool slides, and organic café dining in Siem Reap.",
  alternates: {
    canonical: canonicalUrl("/gallery"),
  },
  openGraph: {
    title: "Photo & Video Gallery | Casa de Capybara Siem Reap",
    description:
      "Browse high-resolution photos of capybara encounters, boutique eco-villas, the water slide pool, and farm-to-table café at Casa de Capybara, Siem Reap.",
    url: canonicalUrl("/gallery"),
    type: "website",
    images: [
      {
        url: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H2a-Meet-Molly-Alex-—-Cambodias-Most-Beloved-Capybaras.jpg",
        width: 1200,
        height: 630,
        alt: "Molly and Alex, Cambodia's beloved capybaras at Casa de Capybara, Siem Reap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo & Video Gallery | Casa de Capybara",
    description: "High-resolution photos of capybara encounters, eco-villas, pool, and café dining at Casa de Capybara.",
    images: ["https://cms.casadecapybara.com/wp-content/uploads/2026/09/H2a-Meet-Molly-Alex-—-Cambodias-Most-Beloved-Capybaras.jpg"],
  },
};

// Verified fallback images in case CMS connection experiences temporary timeout
const fallbackGalleryImages: FlatGalleryImage[] = [
  {
    id: "fb-room-1",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc7012000rd6pjbs2FFF_W_1280_853_R5.webp",
    altText: "Luxury Master Suite Bedroom - Casa de Capybara",
    title: "Master Suite Sanctuary",
    category: "Room",
    caption: "The Lagoon Master Villa Interior",
  },
  {
    id: "fb-capy-1",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H2a-Meet-Molly-Alex-—-Cambodias-Most-Beloved-Capybaras.jpg",
    altText: "Meet Molly & Alex — Resident Capybaras",
    title: "Molly & Alex Morning Encounter",
    category: "Capybara",
    caption: "Molly & Alex Loving the Botanical Garden",
  },
  {
    id: "fb-room-2",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc5x12000rd6p4269E33_W_1280_853_R5.webp",
    altText: "Boutique Themed Villa with Pool Access",
    title: "Splash Pool Villa",
    category: "Room",
    caption: "Direct Tropical Pool Terrace",
  },
  {
    id: "fb-cafe-1",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/G4-Dive-In-—-Casa-de-Capybaras-Signature-Pool-Water-Slide.jpg",
    altText: "Signature Pool & Water Slide",
    title: "Tropical Swimming Pool & Slide",
    category: "Cafe",
    caption: "Signature Pool & Water Slide Oasis",
  },
  {
    id: "fb-capy-2",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/G1-Peekaboo-—-A-Shy-Moment-from-One-of-Our-Resident-Capybaras-1.jpg",
    altText: "A Shy Moment with Molly",
    title: "Gentle Capybara Peekaboo",
    category: "Capybara",
    caption: "Peekaboo — A Quiet Sanctuary Moment",
  },
  {
    id: "fb-room-3",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1mc3n12000rd6of6c0C2A_W_1280_853_R5.webp",
    altText: "Capybara Themed Children Bedroom",
    title: "Family Adventure Suite",
    category: "Room",
    caption: "Treasure Hunt Family Suite",
  },
  {
    id: "fb-capy-3",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/G1-Making-Memories-—-Teen-Capturing-the-Perfect-Capybara-Photo.jpg",
    altText: "Making Memories with Capybaras",
    title: "Guest Photography Encounter",
    category: "Capybara",
    caption: "Unforgettable Guest Encounters",
  },
  {
    id: "fb-cafe-2",
    sourceUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/H3-A-Warm-Welcome-Awaits-—-Lush-Garden-Entrance-at-Casa-de-Capybara.jpg",
    altText: "Lush Botanical Garden Entrance",
    title: "Sanctuary Garden Welcome",
    category: "Cafe",
    caption: "Lush Botanical Garden Entrance",
  },
];

export default async function GalleryPage() {
  const galleryData = await getCapyGallery();
  const images = galleryData.allImages.length > 0 ? galleryData.allImages : fallbackGalleryImages;

  // Compute unique categories
  const categoriesCount = new Set(images.map((img) => img.category)).size;

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A2E1C]">
      {/* 1. Cinematic Luxury Hero */}
      <GalleryHero
        totalPhotos={images.length}
        totalCategories={categoriesCount}
      />

      {/* 2. Interactive Category Filter & Masonry Grid */}
      <GalleryGrid initialImages={images} />

      {/* 3. Sanctuary Atmosphere & Dual Call to Action */}
      <GalleryStorySection />
    </main>
  );
}
