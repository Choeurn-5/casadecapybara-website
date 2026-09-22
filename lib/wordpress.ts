import { cache } from "react";
import { unstable_cache } from "next/cache";

const WORDPRESS_API_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    "https://cms.casadecapybara.com/graphql";

export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA";

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
    bookingEngineUrl?: string;
    googleMapsUrl?: string;
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
    contactPhone: "+855 968 149 795",
    address: "Sangkat Svay Dangkum, Siem Reap, Kingdom of Cambodia",
    operatingHours: "Daily: 8:00 AM - 6:30 PM (Encounter sessions by booking)",
    whatsappNumber: "+855968149795",
    whatsappUrl: "https://wa.me/855968149795",
    telegramUsername: "capybaracambodia",
    telegramUrl: "https://t.me/capybaracambodia",
    facebookUrl: "https://facebook.com/casadecapybara",
    instagramUrl: "https://instagram.com/casadecapybara",
    tiktokUrl: "https://tiktok.com/@casadecapybara",
    heroVideoId: "Kx3kZwcTJ3I",
    bookingEngineUrl: "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara",
    googleMapsUrl: GOOGLE_MAPS_URL,
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

        let logoUrl = defaultGlobalSettings.logoUrl;
        try {
            const restUrl = WORDPRESS_API_URL.replace("/graphql", "/wp-json/");
            const restRes = await fetch(restUrl, { next: { revalidate: 60 } });
            if (restRes.ok) {
                const restData = await restRes.json();
                if (restData.site_icon_url) {
                    logoUrl = restData.site_icon_url;
                }
            }
        } catch (e) {
            console.warn("Failed to fetch site_icon_url from WP REST API:", e);
        }

        return {
            ...defaultGlobalSettings,
            siteTitle: data.generalSettings.title || defaultGlobalSettings.siteTitle,
            siteDescription:
                data.generalSettings.description || defaultGlobalSettings.siteDescription,
            logoUrl: logoUrl,
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
 * Fetches encounter ticket packages from WordPress (Page ID 65) with fallback
 */
export async function getEncounterTickets(): Promise<EncounterTicket[]> {
    try {
        const data = await getEncounterTicketsApiData();
        if (data) {
            return [
                {
                    id: "ticket-individual",
                    name: "Individual Sanctuary Ticket",
                    subtitle: data.individualPaxNote || "Capybara Experience Only",
                    price: data.individualPrice ? `$${data.individualPrice}` : "$10",
                    period: "per person",
                    duration: "45-60 min",
                    badge: "Most Popular",
                    isFeatured: false,
                    inclusions: data.individualInclusions && data.individualInclusions.length > 0
                        ? data.individualInclusions.map((i: any) => i.inclusionText)
                        : defaultEncounterTickets[0].inclusions,
                    bookingUrl: "/capybara-experience#pricing",
                },
                {
                    id: "ticket-family",
                    name: "Family Sanctuary Package",
                    subtitle: data.familyPaxNote || "Valid for up to 4 Pax",
                    price: data.familyPrice ? `$${data.familyPrice}` : "$30",
                    period: "per family",
                    duration: "60-75 min",
                    badge: "Best Value",
                    isFeatured: true,
                    inclusions: data.familyInclusions && data.familyInclusions.length > 0
                        ? data.familyInclusions.map((i: any) => i.inclusionText)
                        : defaultEncounterTickets[1].inclusions,
                    bookingUrl: "/capybara-experience#pricing",
                },
            ];
        }
        return defaultEncounterTickets;
    } catch {
        return defaultEncounterTickets;
    }
}


export interface FullCapyRoom {
  id: string;
  slug: string;
  title: string;
  sizeSqm: string;
  occupancy: string;
  bedType: string;
  floor: string;
  balcony: string;
  specialFeature: string;
  priceFrom: string;
  keyFeatures: string[];
  inngeniusUrl: string;
  thumbnailUrl: string;
  description: string;
  photoGallery?: string[];
}

const fallbackFullRooms: FullCapyRoom[] = [
  {
    id: "r1",
    slug: "splash-pool-access",
    title: "Splash Pool Access",
    sizeSqm: "35 sqm",
    occupancy: "2 Adults + 1 Child",
    bedType: "King Bed",
    floor: "Ground Floor",
    balcony: "Private Terrace",
    specialFeature: "Direct pool access",
    priceFrom: "$50",
    keyFeatures: ["Direct pool access", "King bed", "Capybara themed decor"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1596436889106-be35e843f6a6?q=80&w=800&auto=format&fit=crop",
    description: "Step straight from your private terrace into our signature lagoon pool. This fun, capybara-themed room is perfect for couples or small families looking for instant water access.",
    photoGallery: []
  },
  {
    id: "r2",
    slug: "dreamland",
    title: "Dreamland",
    sizeSqm: "40 sqm",
    occupancy: "2 Adults + 2 Children",
    bedType: "Bunk Beds",
    floor: "1st Floor",
    balcony: "Private Balcony",
    specialFeature: "Neon lighting & play area",
    priceFrom: "$65",
    keyFeatures: ["Bunk beds", "Neon lighting", "Play area"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    description: "Designed entirely around children's imagination. Featuring custom bunk beds, vibrant neon signs, and a dedicated play corner to keep the little ones entertained.",
    photoGallery: []
  },
  {
    id: "r3",
    slug: "capy-deluxe",
    title: "Capy Deluxe",
    sizeSqm: "33 sqm",
    occupancy: "2 Adults",
    bedType: "King Bed",
    floor: "2nd Floor",
    balcony: "Private Balcony",
    specialFeature: "Garden view",
    priceFrom: "$50",
    keyFeatures: ["King bed", "Balcony", "Garden view"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719478250-c89404bb8a0e?q=80&w=800&auto=format&fit=crop",
    description: "Our signature deluxe room offering comfort and tranquility. Enjoy a private balcony overlooking the lush botanical gardens where our capybaras roam.",
    photoGallery: []
  },
  {
    id: "r4",
    slug: "turtle-oasis",
    title: "Turtle Oasis",
    sizeSqm: "38 sqm",
    occupancy: "2 Adults + 1 Child",
    bedType: "Queen Bed",
    floor: "Ground Floor",
    balcony: "Private Patio",
    specialFeature: "Rain shower",
    priceFrom: "$60",
    keyFeatures: ["Ground floor", "Private patio", "Rain shower"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
    description: "A serene, ground-floor retreat featuring a private enclosed patio. The spacious bathroom boasts a rain shower and signature capybara amenities.",
    photoGallery: []
  },
  {
    id: "r5",
    slug: "la-familia",
    title: "La Familia",
    sizeSqm: "65 sqm",
    occupancy: "4 Adults + 2 Children",
    bedType: "2 King Beds",
    floor: "1st Floor",
    balcony: "Large Balcony",
    specialFeature: "2 bedrooms & living area",
    priceFrom: "$110",
    keyFeatures: ["2 Bedrooms", "Living area", "2 Bathrooms"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    description: "The ultimate family suite. Two interconnecting bedrooms, a shared living space, and dual bathrooms ensure everyone has plenty of space to relax.",
    photoGallery: []
  },
  {
    id: "r6",
    slug: "snuggle-nest",
    title: "Snuggle Nest",
    sizeSqm: "28 sqm",
    occupancy: "2 Adults",
    bedType: "Queen Bed",
    floor: "2nd Floor",
    balcony: "Juliet Balcony",
    specialFeature: "Cozy atmosphere",
    priceFrom: "$50",
    keyFeatures: ["Queen bed", "Cozy atmosphere", "Smart TV"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
    description: "Intimate and cozy, perfect for couples. Features dimmable lighting, a large Smart TV for movie nights, and incredibly soft, premium bedding.",
    photoGallery: []
  },
  {
    id: "r7",
    slug: "capy-cove",
    title: "Capy Cove",
    sizeSqm: "45 sqm",
    occupancy: "3 Adults + 1 Child",
    bedType: "King + Single",
    floor: "Corner Room",
    balcony: "Wrap-around Balcony",
    specialFeature: "Extra windows & lounge sofa",
    priceFrom: "$75",
    keyFeatures: ["Corner room", "Extra windows", "Lounge sofa"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1598928506311-c55dd5802c27?q=80&w=800&auto=format&fit=crop",
    description: "A bright, airy corner room offering expansive views of the resort. Includes a comfortable lounge sofa and extra space for relaxing after a day exploring Angkor Wat.",
    photoGallery: []
  },
  {
    id: "r8",
    slug: "three-amigos",
    title: "Three Amigos",
    sizeSqm: "42 sqm",
    occupancy: "3 Adults",
    bedType: "3 Single Beds",
    floor: "2nd Floor",
    balcony: "Private Balcony",
    specialFeature: "Work desk & social layout",
    priceFrom: "$70",
    keyFeatures: ["3 Single beds", "Balcony", "Work desk"],
    inngeniusUrl: "/book",
    thumbnailUrl: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=800&auto=format&fit=crop",
    description: "Ideal for friends traveling together. Three comfortable single beds, a dedicated workspace, and a private balcony for evening drinks.",
    photoGallery: []
  }
];

export async function getAllCapyRooms(): Promise<FullCapyRoom[]> {
  const query = `
    query GetAllCapyRooms {
      capyRooms(first: 20) {
        nodes {
          id
          slug
          title
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
          roomDetails {
            capacity
            roomSize
            bedType
            floor
            balcony
            pricePerNight
            roomIncludes
            specialFeature
            photoGallery {
              nodes {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<any>(query);
    if (!data?.capyRooms?.nodes || data.capyRooms.nodes.length === 0) {
      return fallbackFullRooms;
    }

    return data.capyRooms.nodes.map((node: any, index: number) => {
      const fallback = fallbackFullRooms[index % fallbackFullRooms.length];
      const cleanContent = node.content ? node.content.replace(/<[^>]+>/g, "").trim() : "";
      
      // Parse key features from string list (e.g. "- wifi\n- wc")
      let features = fallback.keyFeatures;
      if (node.roomDetails?.roomIncludes) {
        features = node.roomDetails.roomIncludes
          .split('\n')
          .map((s: string) => s.replace(/^-/, '').trim())
          .filter((s: string) => s.length > 0);
      }
      
      // Parse gallery
      const gallery = node.roomDetails?.photoGallery?.nodes?.map((n: any) => n.sourceUrl) || [];

      return {
        id: node.id,
        slug: node.slug || fallback.slug,
        title: node.title || fallback.title,
        description: cleanContent || fallback.description,
        sizeSqm: (() => {
          const raw = node.roomDetails?.roomSize?.trim();
          if (!raw) return fallback.sizeSqm;
          if (/m²|sqm|sq\.m|m2/i.test(raw)) return raw;
          return `${raw} m²`;
        })(),
        occupancy: (() => {
          const raw = node.roomDetails?.capacity?.trim();
          if (!raw) return fallback.occupancy;
          if (/guests?|adults?|people|persons?/i.test(raw)) return raw;
          return `${raw} Guests`;
        })(),
        bedType: node.roomDetails?.bedType || fallback.bedType || '',
        floor: (() => {
          const raw = node.roomDetails?.floor?.trim();
          if (!raw) return fallback.floor || '';
          if (/floor|level|ground/i.test(raw)) return raw;
          if (/^\d+$/.test(raw)) {
            const num = parseInt(raw, 10);
            const suffix = num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th';
            return `${num}${suffix} Floor`;
          }
          return `Floor ${raw}`;
        })(),
        balcony: (() => {
          const raw = node.roomDetails?.balcony?.trim();
          if (!raw) return fallback.balcony || '';
          if (raw.toLowerCase() === 'private') return 'Private Balcony / Terrace';
          return raw;
        })(),
        specialFeature: node.roomDetails?.specialFeature || fallback.specialFeature || '',
        priceFrom: node.roomDetails?.pricePerNight ? `$${node.roomDetails.pricePerNight.trim()}` : fallback.priceFrom,
        keyFeatures: features.length > 0 ? features : fallback.keyFeatures,
        inngeniusUrl: fallback.inngeniusUrl,
        thumbnailUrl: node.featuredImage?.node?.sourceUrl || fallback.thumbnailUrl,
        photoGallery: gallery
      };
    });
  } catch (error) {
    console.error("Error fetching capy rooms:", error);
    return fallbackFullRooms;
  }
}

export async function getCapyRoomBySlug(slug: string): Promise<FullCapyRoom | null> {
  const allRooms = await getAllCapyRooms();
  return allRooms.find(room => room.slug === slug) || null;
}


export interface CafeMenuItem {
    id: string;
    title: string;
    content: string;
    thumbnailUrl: string;
}

export const fallbackCafeMenuItems: CafeMenuItem[] = [
  {
    id: "fallback-1",
    title: "Mediterranean Skewers",
    content: "Tender flame-grilled skewers with garden herbs, crisp local greens & balsamic reduction.",
    thumbnailUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/b3bf66b3.webp"
  },
  {
    id: "fallback-2",
    title: "Garden Pizza",
    content: "Artisan crispy crust with sun-ripened organic vegetables, fresh basil & melted mozzarella.",
    thumbnailUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/b801a610.webp"
  },
  {
    id: "fallback-3",
    title: "Cinnamon Coffee",
    content: "Rich espresso infused with wild Ceylon cinnamon, velvety steamed coconut milk & raw honey.",
    thumbnailUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/5f1b1b11.webp"
  },
  {
    id: "fallback-4",
    title: "Beetroot Latte",
    content: "Cold-pressed organic beetroot, gentle ginger spice & silky warm barista oat milk.",
    thumbnailUrl: "https://cms.casadecapybara.com/wp-content/uploads/2026/09/1ad7865c.webp"
  }
];

export async function getFeaturedMenuItems(): Promise<CafeMenuItem[]> {
  const query = `
    query {
      cafeMenuItems(first: 100) {
        nodes {
          id
          title
          content
          featuredImage { node { sourceUrl } }
        }
      }
    }
  `;
  try {
    const data = (await fetchGraphQL(query)) as any;
    const nodes = data?.cafeMenuItems?.nodes || [];
    if (nodes.length > 0) {
      return nodes.map((node: any) => ({
        id: node.id,
        title: node.title,
        content: node.content || "",
        thumbnailUrl: node.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1555507036-ab1e4006a8a0?q=80&w=800&auto=format&fit=crop"
      }));
    }
    return fallbackCafeMenuItems;
  } catch (err) {
    console.error("Error fetching cafe menu items:", err);
    return fallbackCafeMenuItems;
  }
}

export async function getFeaturedRooms(): Promise<FullCapyRoom[]> {
  const allRooms = await getAllCapyRooms();
  return allRooms.slice(0, 3);
}

export interface GuestReview {
  id: string;
  reviewerName: string;
  reviewerTitle: string;
  rating: number;
  reviewContent: string;
}

export async function getGuestReviews(): Promise<GuestReview[]> {
  return [
    { id: "1", reviewerName: "Sarah J.", reviewerTitle: "Guest", rating: 5, reviewContent: "Absolutely magical! Meeting the capybaras was the highlight of our trip to Cambodia." },
    { id: "2", reviewerName: "Michael & Emma", reviewerTitle: "Guest", rating: 5, reviewContent: "We stayed in the La Familia suite and it was perfect. Clean, modern, and just steps away from the animal enclosures." },
    { id: "3", reviewerName: "David L.", reviewerTitle: "Guest", rating: 5, reviewContent: "The cafe food is top-notch. I highly recommend the Capybara Croissant. Will definitely be coming back!" }
  ];
}

export async function getEncounterTicketsApiData(): Promise<any> {
  const query = `
    query {
      page(id: "65", idType: DATABASE_ID) {
        encounterTickets {
          familyImage { node { sourceUrl altText } }
          familyInclusions { inclusionText }
          familyPaxNote
          familyPrice
          individualImage { node { sourceUrl altText } }
          individualInclusions { inclusionText }
          individualPaxNote
          individualPrice
        }
      }
    }
  `;
  try {
    const data = (await fetchGraphQL(query)) as any;
    return data?.page?.encounterTickets || null;
  } catch (err) {
    console.error("Error fetching encounter tickets:", err);
    return null;
  }
}

export interface CafeCategory {
  title: string;
  items: CafeMenuItem[];
}

export async function getAllCafeMenuItems(): Promise<CafeMenuItem[]> {
  return await getFeaturedMenuItems();
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    }
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  tags?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  author?: {
    node?: {
      name: string;
    }
  };
  blogPostSettings?: {
    postLanguage?: string;
  };
}

async function fetchBlogPostsUncached(): Promise<BlogPost[]> {
  const query = `
    query GetBlogArchive {
      posts(first: 30, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
            }
          }
          blogPostSettings {
            postLanguage
          }
        }
      }
    }
  `;
  try {
    const data = (await fetchGraphQL<{ posts?: { nodes?: BlogPost[] } }>(query, {}, 300)) as { posts?: { nodes?: BlogPost[] } } | null;
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export const getBlogPosts = unstable_cache(
  fetchBlogPostsUncached,
  ["wordpress-blog-posts"],
  { revalidate: 300, tags: ["wordpress-posts"] }
);

async function fetchPostBySlugUncached(slug: string): Promise<BlogPost | null> {
  const query = `
    query GetSinglePost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
            node {
              sourceUrl
              altText
            }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
        blogPostSettings {
          postLanguage
        }
      }
    }
  `;
  try {
    const data = (await fetchGraphQL<{ post?: BlogPost }>(query, { slug }, 300)) as { post?: BlogPost } | null;
    return data?.post || null;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
}

const getCachedPostBySlug = unstable_cache(
  async (slug: string) => fetchPostBySlugUncached(slug),
  ["wordpress-single-post"],
  { revalidate: 300, tags: ["wordpress-posts"] }
);

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null;
  return getCachedPostBySlug(slug);
});

export interface CapyGalleryImageNode {
  id: string;
  databaseId?: number;
  sourceUrl: string;
  altText?: string;
  title?: string;
}

export interface CapyGalleryItem {
  capyGalleryCaption?: string;
  capyGalleryCategory?: string[];
  capyGalleryImage?: {
    nodes?: CapyGalleryImageNode[];
  };
}

export interface FlatGalleryImage {
  id: string;
  sourceUrl: string;
  altText: string;
  title: string;
  category: string;
  caption: string;
}

export interface CapyGalleryData {
  title: string;
  slug: string;
  content?: string;
  featuredImageUrl?: string;
  items: CapyGalleryItem[];
  allImages: FlatGalleryImage[];
}

export async function getCapyGallery(): Promise<CapyGalleryData> {
  const query = `
    query GetCapyGalleryPage {
      page(id: "76", idType: DATABASE_ID) {
        id
        databaseId
        title
        slug
        uri
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        capyGallery {
          capyGalleryItems {
            capyGalleryCaption
            capyGalleryCategory
            capyGalleryImage {
              nodes {
                id
                databaseId
                sourceUrl
                altText
                title
              }
            }
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
        title: string;
        slug: string;
        content?: string;
        featuredImage?: {
          node?: {
            sourceUrl?: string;
            altText?: string;
          };
        };
        capyGallery?: {
          capyGalleryItems?: CapyGalleryItem[];
        };
      };
    }>(query, {}, 60);

    const page = data?.page;
    const items = page?.capyGallery?.capyGalleryItems || [];

    const allImages: FlatGalleryImage[] = [];

    items.forEach((item, itemIdx) => {
      const category = item.capyGalleryCategory?.[0] || "General";
      const caption = item.capyGalleryCaption || category;
      const nodes = item.capyGalleryImage?.nodes || [];

      nodes.forEach((img, imgIdx) => {
        if (img.sourceUrl) {
          allImages.push({
            id: img.id || `img-${itemIdx}-${imgIdx}`,
            sourceUrl: img.sourceUrl,
            altText: img.altText || img.title || `${category} - Casa de Capybara`,
            title: img.title || caption,
            category,
            caption,
          });
        }
      });
    });

    return {
      title: page?.title || "Gallery",
      slug: page?.slug || "gallery",
      content: page?.content || undefined,
      featuredImageUrl: page?.featuredImage?.node?.sourceUrl || undefined,
      items,
      allImages,
    };
  } catch (error) {
    console.error("Error fetching Capy Gallery:", error);
    return {
      title: "Gallery",
      slug: "gallery",
      items: [],
      allImages: [],
    };
  }
}

// ==========================================
// ACF DYNAMIC CONTENT FETCHERS
// ==========================================

export interface ACFHomePage {
  heroHeadline?: string;
  heroSubheadline?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  aboutEyebrow?: string;
  aboutHeadline?: string;
  aboutQuote?: string;
  aboutBody?: string;
  aboutCalloutTitle?: string;
  aboutCalloutText?: string;
  statOpened?: string;
  statDistance?: string;
  statAvailability?: string;
}

export interface ACFCafePage {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  searchPlaceholder?: string;
}

export interface ACFStayPage {
  heroHeadline?: string;
  heroSubheadline?: string;
}

export interface ACFExperiencePage {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  packagesTitle?: string;
  packagesDesc?: string;
}

export interface ACFPlanPage {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
}

export interface ACFContactPage {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  formTitle?: string;
}

export async function getHomePageContent(pageId: string = "498"): Promise<ACFHomePage | null> {
  const query = `
    query GetHomePageContent {
      page(id: "${pageId}", idType: DATABASE_ID) {
        homePageContent {
          heroHeadline
          heroSubheadline
          primaryCtaText
          secondaryCtaText
          aboutEyebrow
          aboutHeadline
          aboutQuote
          aboutBody
          aboutCalloutTitle
          aboutCalloutText
          statOpened
          statDistance
          statAvailability
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<{ page?: { homePageContent?: ACFHomePage } }>(query, {}, 60);
    return data?.page?.homePageContent || null;
  } catch {
    return null;
  }
}

export async function getCafePageContent(pageId: string = "500"): Promise<ACFCafePage | null> {
  const query = `
    query GetCafePageContent {
      page(id: "${pageId}", idType: DATABASE_ID) {
        cafePageContent {
          heroEyebrow
          heroHeadline
          heroSubheadline
          searchPlaceholder
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<{ page?: { cafePageContent?: ACFCafePage } }>(query, {}, 60);
    return data?.page?.cafePageContent || null;
  } catch {
    return null;
  }
}

export async function getStayPageContent(pageId: string = "502"): Promise<ACFStayPage | null> {
  const query = `
    query GetStayPageContent {
      page(id: "${pageId}", idType: DATABASE_ID) {
        stayPageContent {
          heroHeadline
          heroSubheadline
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<{ page?: { stayPageContent?: ACFStayPage } }>(query, {}, 60);
    return data?.page?.stayPageContent || null;
  } catch {
    return null;
  }
}

export async function getExperiencePageContent(pageId: string = "504"): Promise<ACFExperiencePage | null> {
  const query = `
    query GetExperiencePageContent {
      page(id: "${pageId}", idType: DATABASE_ID) {
        experiencePageContent {
          heroHeadline
          heroSubheadline
          packagesTitle
          packagesDesc
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<{ page?: { experiencePageContent?: ACFExperiencePage } }>(query, {}, 60);
    return data?.page?.experiencePageContent || null;
  } catch {
    return null;
  }
}

export async function getPlanPageContent(pageId: string = "506"): Promise<ACFPlanPage | null> {
  const query = `
    query GetPlanPageContent {
      page(id: "${pageId}", idType: DATABASE_ID) {
        planPageContent {
          heroHeadline
          heroSubheadline
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<{ page?: { planPageContent?: ACFPlanPage } }>(query, {}, 60);
    return data?.page?.planPageContent || null;
  } catch {
    return null;
  }
}

export async function getContactPageContent(pageId: string = "508"): Promise<ACFContactPage | null> {
  const query = `
    query GetContactPageContent {
      page(id: "${pageId}", idType: DATABASE_ID) {
        contactPageContent {
          heroHeadline
          heroSubheadline
          formTitle
        }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<{ page?: { contactPageContent?: ACFContactPage } }>(query, {}, 60);
    return data?.page?.contactPageContent || null;
  } catch {
    return null;
  }
}

