import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Families & Safety | Casa de Capybara",
  description: "Learn about our visitor guidelines, child-friendly activities, and safety measures.",
};

export default function FamiliesSafetyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Families & Safety</h1>
      <p className="text-lg text-gray-600">
        Guidelines, tips, and safety protocols to ensure a fun, secure, and respectful experience for all ages.
      </p>
    </main>
  );
}
