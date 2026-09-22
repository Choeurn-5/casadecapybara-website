/**
 * SEO Utilities — Casa de Capybara
 *
 * Single source of truth for the preferred canonical host.
 * Every page must call canonicalUrl(path) instead of hard-coding the host.
 *
 * Rules:
 *  - Preferred host is always https://www.casadecapybara.com
 *  - No trailing slash except for the homepage ("/")
 *  - No query strings in canonical URLs
 */

export const SITE_URL = "https://www.casadecapybara.com";

/**
 * Returns the full, absolute canonical URL for a given path.
 *
 * @param path - The route path, e.g. "/stay" or "/blog/my-post-slug"
 * @returns The canonical URL string, e.g. "https://www.casadecapybara.com/stay"
 *
 * @example
 * canonicalUrl("/")                    // "https://www.casadecapybara.com/"
 * canonicalUrl("/stay")                // "https://www.casadecapybara.com/stay"
 * canonicalUrl("/blog/my-article")     // "https://www.casadecapybara.com/blog/my-article"
 * canonicalUrl("/stay/lagoon-villa")   // "https://www.casadecapybara.com/stay/lagoon-villa"
 */
export function canonicalUrl(path: string): string {
  // Ensure path starts with /
  const normalised = path.startsWith("/") ? path : `/${path}`;

  // Remove trailing slash except for homepage
  const clean =
    normalised === "/" ? normalised : normalised.replace(/\/$/, "");

  return `${SITE_URL}${clean}`;
}
