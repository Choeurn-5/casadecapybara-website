import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Casa de Capybara",
  description: "Browse photos and videos of our animals, accommodations, and lush grounds.",
};

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Gallery</h1>
      <p className="text-lg text-gray-600">
        A visual tour of the Casa de Capybara sanctuary, resident capybaras, and scenic landscape.
      </p>
    </main>
  );
}
