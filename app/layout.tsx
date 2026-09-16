import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/lib/wordpress";
import Navbar from "@/components/layout/Navbar";
import GlobalFooter from "@/components/layout/GlobalFooter";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import JsonLd, { globalBusinessSchema } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casadecapybara.com"),
  title: {
    default: "Casa de Capybara | Luxury Wildlife Sanctuary, Boutique Hotel & Cafe Siem Reap",
    template: "%s | Casa de Capybara",
  },
  description:
    "Cambodia's first and only boutique hotel, destination organic café, and ethical live capybara sanctuary in Siem Reap near Angkor Wat.",
  keywords: [
    "capybara Siem Reap",
    "boutique hotel near Angkor Wat",
    "family hotel Siem Reap",
    "things to do in Siem Reap",
    "best cafe Siem Reap",
    "Casa de Capybara",
    "Siem Reap resort",
    "capybara encounter Cambodia",
    "kids hotel Siem Reap",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "km-KH": "/kh",
    },
  },
  openGraph: {
    title: "Casa de Capybara | Luxury Wildlife Sanctuary & Eco-Resort Siem Reap",
    description:
      "Cambodia's premier boutique hotel, destination café, and live capybara encounter in Siem Reap near Angkor Wat.",
    url: "https://casadecapybara.com",
    siteName: "Casa de Capybara",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Casa de Capybara Siem Reap",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa de Capybara | Luxury Wildlife Sanctuary & Eco-Resort",
    description:
      "Cambodia's premier capybara sanctuary, boutique eco-villas, and farm-to-table dining near Angkor Wat.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getGlobalSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap" rel="stylesheet" />
        <JsonLd data={globalBusinessSchema} />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">
        <SmoothScrolling>
          <Navbar settings={settings} />
          <div className="flex-1 flex flex-col w-full">{children}</div>
          <GlobalFooter settings={settings} />
          <FloatingContactBar settings={settings} />
        </SmoothScrolling>
      </body>
    </html>
  );
}
