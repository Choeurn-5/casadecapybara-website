import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Café & Dining | Casa de Capybara",
  description: "Enjoy fresh, locally sourced food, artisanal coffees, and relaxing dining experiences.",
};

export default function CafeDiningPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Café & Dining</h1>
      <p className="text-lg text-gray-600">
        Taste our delicious farm-to-table menus and specialty drinks with views of our gardens.
      </p>
    </main>
  );
}
