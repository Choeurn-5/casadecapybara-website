import { MetadataRoute } from "next";
import { getBlogPosts, getAllCapyRooms } from "@/lib/wordpress";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap — Casa de Capybara
 *
 * All URLs use the preferred www host.
 * Static routes use fixed lastModified dates (not new Date() to avoid
 * unnecessary cache-busting on every request).
 * Dynamic blog and room routes use their actual publish/update dates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/stay`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/capybara-experience`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cafe`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/families`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/plan-your-visit`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Khmer-language homepage — the only translated route.
    {
      url: `${SITE_URL}/kh`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic WordPress Blog Posts — use real post date for lastModified.
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    if (posts && posts.length > 0) {
      blogRoutes = posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        // Use the real publication date, not new Date(), to avoid fake freshness signals.
        lastModified: post.date ? new Date(post.date) : new Date("2026-09-01"),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("Error generating blog sitemap entries:", err);
  }

  // Dynamic Room pages.
  let roomRoutes: MetadataRoute.Sitemap = [];
  try {
    const rooms = await getAllCapyRooms();
    if (rooms && rooms.length > 0) {
      roomRoutes = rooms.map((room) => ({
        url: `${SITE_URL}/stay/${room.slug}`,
        lastModified: new Date("2026-09-01"),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error("Error generating room sitemap entries:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...roomRoutes];
}
