const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://cms.casadecapybara.com/graphql";

export interface GlobalSettings {
  siteTitle: string;
  siteDescription: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  operatingHours: string;
  whatsappNumber: string;
  whatsappUrl: string;
  telegramUsername: string;
  telegramUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  heroVideoId?: string;
}

export interface CapyRoom {
  id: string;
  slug: string;
  title: string;
  price: string;
  shortDescription: string;
  thumbnailUrl: string;
  capacity?: string;
  badge?: string;
  features?: string[];
}

export interface EncounterTicket {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period?: string;
  duration: string;
  badge?: string;
  isFeatured?: boolean;
  inclusions: string[];
  bookingUrl: string;
  localRateNote?: string;
}

export const defaultGlobalSettings: GlobalSettings = {
  siteTitle: "Casa de Capybara",
  siteDescription:
    "Cambodia's premier luxury wildlife sanctuary, eco-villas, and organic café.",
  logoUrl: "/logo.png",
  contactEmail: "info@casadecapybara.com",
  contactPhone: "+855 (0) 92 123 456",
  address: "Sangkat Svay Dangkum, Siem Reap, Kingdom of Cambodia",
  operatingHours: "Daily: 8:00 AM - 6:30 PM (Encounter sessions by booking)",
  whatsappNumber: "+85592123456",
  whatsappUrl: "https://wa.me/85592123456",
  telegramUsername: "casadecapybara",
  telegramUrl: "https://t.me/casadecapybara",
  facebookUrl: "https://facebook.com/casadecapybara",
  instagramUrl: "https://instagram.com/casadecapybara",
  tiktokUrl: "https://tiktok.com/@casadecapybara",
  heroVideoId: "Kx3kZwcTJ3I",
};

export const defaultRooms: CapyRoom[] = [
  {
    id: "room-1",
    slug: "lagoon-master-villa",
    title: "The Lagoon Master Villa",
    price: "$180",
    shortDescription:
      "Expansive wooden eco-villa featuring direct lagoon access, outdoor stone rain shower, and a private morning capybara viewing deck.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    capacity: "2-4 Guests",
    badge: "Lagoon Front",
    features: ["King Bed", "Private Deck", "Breakfast Included", "Lagoon Access"],
  },
  {
    id: "room-2",
    slug: "bamboo-riverside-bungalow",
    title: "Bamboo Riverside Bungalow",
    price: "$135",
    shortDescription:
      "Tucked along the tranquil stream with handcrafted bamboo architecture, king canopy bed, and private botanical garden patio.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
    capacity: "2 Guests",
    badge: "Most Popular",
    features: ["Queen Canopy Bed", "River View", "Organic Minibar", "Garden Patio"],
  },
  {
    id: "room-3",
    slug: "sunken-garden-suite",
    title: "Sunken Garden Suite",
    price: "$110",
    shortDescription:
      "Surrounded by blooming tropical flora and close to the capybara sanctuary pool, featuring an open-concept lounge and spa tub.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    capacity: "2 Guests",
    badge: "Garden View",
    features: ["King Bed", "Spa Bath", "Private Lawn", "Afternoon Tea"],
  },
  {
    id: "room-4",
    slug: "family-sanctuary-chalet",
    title: "Family Sanctuary Chalet",
    price: "$220",
    shortDescription:
      "Two-bedroom open-air luxury lodge designed for families, featuring a private plunge pool and complimentary morning capybara tour.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
    capacity: "4-6 Guests",
    badge: "Family Suite",
    features: ["2 Bedrooms", "Private Plunge Pool", "VIP Encounter", "Kitchenette"],
  },
];

export const defaultEncounterTickets: EncounterTicket[] = [
  {
    id: "ticket-standard",
    name: "Standard Encounter Pass",
    subtitle: "Intimate guided capybara meeting & sanctuary botanical access",
    price: "$18",
    period: "per person ($12 for kids under 12)",
    duration: "60 Minutes Experience",
    badge: "General Admission",
    isFeatured: false,
    inclusions: [
      "Gentle petting & photo session with capybaras",
      "Full sanctuary garden & lagoon access",
      "1 Organic grass feeding cup included",
      "Sanctuary guide safety & educational briefing",
      "Complimentary herbal tea at our Garden Café",
    ],
    bookingUrl: "/capybara-experience#book-standard",
  },
  {
    id: "ticket-family",
    name: "Family & Friends Package",
    subtitle: "Complete sanctuary day with private gazebo and photo pack",
    price: "$55",
    period: "Package for up to 4 Guests (2 Adults + 2 Kids)",
    duration: "90 Minutes Session",
    badge: "Most Popular",
    isFeatured: true,
    inclusions: [
      "Priority encounter session for the whole family",
      "2 Large treat baskets (fresh organic grass & treats)",
      "Private shaded lagoon-side gazebo",
      "Digital photo pack + 1 instant souvenir Polaroid",
      "10% discount across Café & Dining menu",
    ],
    bookingUrl: "/capybara-experience#book-family",
  },
  {
    id: "ticket-vip",
    name: "VIP Sunset & Bathing Pass",
    subtitle: "Exclusive twilight encounter with capybara evening bath",
    price: "$85",
    period: "per pair (up to 2 Guests)",
    duration: "120 Minutes VIP Access",
    badge: "VIP Exclusive",
    isFeatured: false,
    inclusions: [
      "Private access to capybara lagoon & warm bath pool",
      "Hands-on capybara brushing & sensory bonding",
      "Personal naturalist & private photographer assistance",
      "Sunset welcome mocktail or artisan coffee per guest",
      "Casa de Capybara keepsake tote & plush gift",
    ],
    bookingUrl: "/capybara-experience#book-vip",
  },
  {
    id: "ticket-local",
    name: "Cambodian Resident Rate",
    subtitle: "Special community rate for Cambodian citizens & resident expats",
    price: "$8",
    period: "per guest (with valid Cambodian ID or Work Permit)",
    duration: "60 Minutes Experience",
    badge: "Local Special",
    isFeatured: false,
    inclusions: [
      "Full capybara encounter & sanctuary walking trail",
      "1 Complimentary feeding cup",
      "Bilingual Khmer & English ranger guide",
      "Kids under 5 enter free with paying adult",
      "Weekend community conservation workshop access",
    ],
    bookingUrl: "/capybara-experience#book-local",
    localRateNote: "Valid Cambodian National ID card or resident visa required upon entry.",
  },
];

/**
 * Generic GraphQL fetcher with Next.js caching support and safe error handling
 */
export async function fetchGraphQL<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number = 60
): Promise<T | null> {
  try {
    const res = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });

    if (!res.ok) {
      console.warn(`WordPress GraphQL error: HTTP ${res.status} ${res.statusText}`);
      return null;
    }

    const json = (await res.json()) as { data?: T; errors?: unknown[] };
    if (json.errors) {
      console.warn("WordPress GraphQL query errors:", json.errors);
    }
    return json.data ?? null;
  } catch (error) {
    console.warn("Failed to fetch from WordPress GraphQL:", error);
    return null;
  }
}

/**
 * Fetches global site options, contact info, and branding settings from WordPress
 */
export async function getGlobalSettings(): Promise<GlobalSettings> {
  const query = `
    query GetGlobalSettings {
      generalSettings {
        title
        description
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{
      generalSettings?: {
        title?: string;
        description?: string;
      };
    }>(query);

    if (!data || !data.generalSettings) {
      return defaultGlobalSettings;
    }

    return {
      ...defaultGlobalSettings,
      siteTitle: data.generalSettings.title || defaultGlobalSettings.siteTitle,
      siteDescription:
        data.generalSettings.description || defaultGlobalSettings.siteDescription,
    };
  } catch {
    return defaultGlobalSettings;
  }
}

/**
 * Generic WordPress Page fetcher by Database ID or URI
 */
export async function getPage(
  id: string,
  idType: "DATABASE_ID" | "URI" | "SLUG" = "DATABASE_ID"
) {
  const query = `
    query GetPage($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        databaseId
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{
      page?: {
        id: string;
        databaseId: number;
        slug: string;
        title: string;
        content: string;
        featuredImage?: {
          node?: {
            sourceUrl?: string;
          };
        };
      };
    }>(query, { id, idType });

    return data?.page ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetches featured rooms / accommodations from WordPress via capyRooms post type
 */
export async function getCapyRooms(): Promise<CapyRoom[]> {
  const query = `
    query GetCapyRooms {
      capyRooms(first: 10) {
        nodes {
          id
          databaseId
          slug
          title
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{
      capyRooms?: {
        nodes?: Array<{
          id: string;
          databaseId: number;
          slug: string;
          title: string;
          content?: string;
          featuredImage?: {
            node?: {
              sourceUrl?: string;
            };
          };
        }>;
      };
    }>(query);

    if (!data?.capyRooms?.nodes || data.capyRooms.nodes.length === 0) {
      console.warn("No capyRooms found from WordPress GraphQL, using fallback.");
      return defaultRooms;
    }

    return data.capyRooms.nodes.map((node, index) => {
      const fallback = defaultRooms[index % defaultRooms.length];
      const cleanContent = node.content
        ? node.content.replace(/<[^>]+>/g, "").trim()
        : "";

      return {
        id: node.id,
        slug: node.slug,
        title: node.title,
        price: fallback.price,
        shortDescription: cleanContent || fallback.shortDescription,
        thumbnailUrl:
          node.featuredImage?.node?.sourceUrl || fallback.thumbnailUrl,
        capacity: fallback.capacity,
        badge: fallback.badge,
        features: fallback.features,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch capyRooms from WordPress GraphQL:", error);
    return defaultRooms;
  }
}

/**
 * Fetches encounter ticket packages from WordPress (Page ID 65 or custom schema) with fallback
 */
export async function getEncounterTickets(): Promise<EncounterTicket[]> {
  try {
    // Attempt to fetch page 65 to see if tickets metadata or content is provided
    const pageData = await getPage("65", "DATABASE_ID");
    if (pageData && pageData.content) {
      // If structured data is in page content or custom fields, it can be parsed here
      return defaultEncounterTickets;
    }
    return defaultEncounterTickets;
  } catch {
    return defaultEncounterTickets;
  }
}
