import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/wordpress";
import BlogExplorer from "@/components/blog/BlogExplorer";

export const metadata: Metadata = {
  title: "Siem Reap Travel Blog & Guides | Casa de Capybara",
  description: "Discover hidden gems, family guides, cafe culture, and animal experiences in Siem Reap, Cambodia. Stories by local travel writer Manet Sisamouth.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogExplorer initialPosts={posts} />;
}
