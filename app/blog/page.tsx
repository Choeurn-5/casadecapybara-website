import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/wordpress";
import BlogExplorer from "@/components/blog/BlogExplorer";

export const metadata: Metadata = {
  title: "Siem Reap Travel Blog & Guides | Casa de Capybara",
  description: "Discover hidden gems, family guides, cafe culture, and animal experiences in Siem Reap, Cambodia. Stories by local travel writer Manet Sisamouth.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="bg-[#FAF7F2] min-h-screen pt-24 pb-12">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-8">
        <span className="text-[#E65100] font-bold text-sm tracking-widest uppercase mb-4 block">
          STORIES, GUIDES & HIDDEN GEMS
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B5E20] mb-6">
          The Siem Reap Journal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Curated travel stories, family adventures, and local secrets from ancient temples to friendly capybaras.
        </p>
      </div>

      {/* Interactive Explorer */}
      <BlogExplorer initialPosts={posts} />
    </main>
  );
}
