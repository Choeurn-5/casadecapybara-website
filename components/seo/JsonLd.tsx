import React from "react";
import { SITE_URL } from "@/lib/seo";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Global business schema — rendered in the root layout on every page.
 * Uses the preferred www canonical host for all @id and url fields.
 */
export const globalBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // WebSite enables Google Sitelinks Search Box if eligible.
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": "Casa de Capybara",
      "url": SITE_URL,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": ["Hotel", "Resort", "TouristAttraction"],
      "@id": `${SITE_URL}/#hotel`,
      "name": "Casa de Capybara",
      "alternateName": "Casa de Capybara Siem Reap",
      "description":
        "Cambodia's first and only boutique eco-resort, destination café, and live capybara encounter attraction in Siem Reap near Angkor Wat.",
      "url": SITE_URL,
      "telephone": "+855968149795",
      "priceRange": "$10 – $150",
      "currenciesAccepted": "USD, KHR",
      "paymentAccepted": "Cash, Credit Card, ABA Pay, KHQR",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Street 598, Ring Road off NH6",
        "addressLocality": "Siem Reap",
        "postalCode": "171002",
        "addressCountry": "KH",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.3671,
        "longitude": 103.8448,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "07:00",
          "closes": "21:00",
        },
      ],
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Live Capybara Encounter",
          "value": true,
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Swimming Pool with Water Slide",
          "value": true,
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Free High-Speed WiFi",
          "value": true,
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Free Secure Parking",
          "value": true,
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Full Modern Gym",
          "value": true,
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Steam Room and Sauna",
          "value": true,
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Indoor Playroom with 200+ Costumes",
          "value": true,
        },
      ],
      "sameAs": [
        "https://t.me/capybaracambodia",
        "https://www.instagram.com/casadecapybaracambodia",
        "https://www.tiktok.com/@casadecapybara",
        "https://www.facebook.com/casadecapybaracambodia",
      ],
    },
    {
      "@type": "Restaurant",
      "@id": `${SITE_URL}/#cafe`,
      "name": "Capybara Cafe Siem Reap",
      "servesCuisine": ["Khmer", "Western", "Asian", "Vegetarian", "Vegan"],
      "telephone": "+855968149795",
      "url": `${SITE_URL}/cafe`,
    },
  ],
};

/**
 * Generates a BreadcrumbList JSON-LD object for nested pages.
 * @param items - Array of { name, url } for each crumb in order from root.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
