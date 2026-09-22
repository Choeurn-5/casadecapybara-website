import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/lib/wordpress";
import { SITE_URL, canonicalUrl } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import GlobalFooter from "@/components/layout/GlobalFooter";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import JsonLd, { globalBusinessSchema } from "@/components/seo/JsonLd";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Preferred canonical host — all relative canonical paths resolve against this.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Casa de Capybara | Boutique Eco-Resort, Capybara Sanctuary & Café – Siem Reap",
    template: "%s | Casa de Capybara",
  },
  description:
    "Cambodia's first and only boutique eco-resort, destination organic café, and ethical live capybara sanctuary in Siem Reap near Angkor Wat.",
  keywords: [
    "capybara Siem Reap",
    "boutique hotel near Angkor Wat",
    "family hotel Siem Reap",
    "things to do in Siem Reap",
    "best cafe Siem Reap",
    "Casa de Capybara",
    "Siem Reap eco-resort",
    "capybara encounter Cambodia",
    "kids hotel Siem Reap",
  ],
  alternates: {
    // Homepage self-referencing canonical — absolute URL prevents fallback issues.
    canonical: canonicalUrl("/"),
    languages: {
      "en": canonicalUrl("/"),
      "km": canonicalUrl("/kh"),
      "x-default": canonicalUrl("/"),
    },
  },
  openGraph: {
    title: "Casa de Capybara | Boutique Eco-Resort & Capybara Sanctuary – Siem Reap",
    description:
      "Cambodia's premier boutique eco-resort, destination café, and live capybara encounter in Siem Reap near Angkor Wat.",
    url: canonicalUrl("/"),
    siteName: "Casa de Capybara",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 800,
        height: 800,
        alt: "Casa de Capybara – boutique eco-resort and capybara sanctuary in Siem Reap",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa de Capybara | Capybara Sanctuary & Eco-Resort – Siem Reap",
    description:
      "Cambodia's only capybara sanctuary, boutique eco-villas, and farm-to-table dining near Angkor Wat.",
    images: [`${SITE_URL}/logo.png`],
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
      suppressHydrationWarning
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
        {/* Inline script to prevent FOUC — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <ThemeProvider>
          <SmoothScrolling>
            <Navbar settings={settings} />
            <div className="flex-1 flex flex-col w-full">{children}</div>
            <GlobalFooter settings={settings} />
            <FloatingContactBar settings={settings} />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
