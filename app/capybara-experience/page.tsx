import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capybara Experience | Casa de Capybara",
  description: "Meet, interact, and bond with our friendly capybaras in a peaceful natural environment.",
};

export default function CapybaraExperiencePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Capybara Experience</h1>
      <p className="text-lg text-gray-600">
        Discover hands-on encounters, guided interactions, and educational sessions with our resident capybaras.
      </p>
    </main>
  );
}
