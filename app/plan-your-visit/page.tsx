import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Visit | Casa de Capybara",
  description: "Operating hours, directions, ticket information, and tips for your trip to Casa de Capybara.",
};

export default function PlanYourVisitPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Plan Your Visit</h1>
      <p className="text-lg text-gray-600">
        Everything you need to know before visiting: location, hours, tickets, transportation, and what to bring.
      </p>
    </main>
  );
}
