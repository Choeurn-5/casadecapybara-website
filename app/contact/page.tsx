import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Casa de Capybara",
  description: "Get in touch with the Casa de Capybara team for inquiries, reservations, or events.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600">
        Have questions or want to make a special booking? Reach out to our team.
      </p>
    </main>
  );
}
