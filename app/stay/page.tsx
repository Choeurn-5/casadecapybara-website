import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay | Casa de Capybara",
  description: "Explore our cozy accommodations and retreat options surrounded by nature and capybaras.",
};

export default function StayPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Stay with Us</h1>
      <p className="text-lg text-gray-600">
        Experience tranquil overnight stays in our uniquely designed villas and lodges.
      </p>
    </main>
  );
}
