import type { Metadata } from "next";
import { canonicalUrl, SITE_URL } from "@/lib/seo";
import { getBlogPosts } from "@/lib/wordpress";
import BlogExplorer from "@/components/blog/BlogExplorer";

export const metadata: Metadata = {
  title: "Siem Reap Travel Blog & Guides | Casa de Capybara",
  description:
    "Discover hidden gems, family guides, café culture, and animal experiences in Siem Reap, Cambodia. Stories by local travel writer Manet Sisamouth.",
  alternates: {
    canonical: canonicalUrl("/blog"),
  },
  openGraph: {
    title: "Siem Reap Travel Blog & Guides | Casa de Capybara",
    description:
      "Family guides, travel tips, café culture, and unique experiences in Siem Reap by local writer Manet Sisamouth.",
    url: canonicalUrl("/blog"),
    type: "website",
    images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 800, alt: "Casa de Capybara blog – Siem Reap travel guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siem Reap Travel Blog | Casa de Capybara",
    description: "Family guides, café culture, and unique experiences in Cambodia by Manet Sisamouth.",
    images: [`${SITE_URL}/logo.png`],
  },
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogExplorer initialPosts={posts} />;
}
