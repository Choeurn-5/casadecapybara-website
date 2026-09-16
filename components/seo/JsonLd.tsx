import React from "react";

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const globalBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Hotel", "Resort", "TouristAttraction"],
      "@id": "https://casadecapybara.com/#hotel",
      "name": "Casa de Capybara",
      "alternateName": "Casa de Capybara Siem Reap",
      "description":
        "Cambodia's first and only boutique hotel, destination café, and live capybara encounter attraction in Siem Reap near Angkor Wat.",
      "url": "https://casadecapybara.com",
      "telephone": "+855968149795",
      "priceRange": "$10 - $150",
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
      "@id": "https://casadecapybara.com/#cafe",
      "name": "Capybara Cafe Siem Reap",
      "servesCuisine": ["Khmer", "Western", "Asian", "Vegetarian", "Vegan"],
      "telephone": "+855968149795",
      "url": "https://casadecapybara.com/cafe",
    },
  ],
};
