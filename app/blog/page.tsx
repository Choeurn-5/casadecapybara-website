import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & News | Casa de Capybara",
  description: "Read updates, animal stories, travel tips, and news from Casa de Capybara.",
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Blog & News</h1>
      <p className="text-lg text-gray-600">
        Latest stories, sanctuary news, care updates, and guest guides.
      </p>
    </main>
  );
}
