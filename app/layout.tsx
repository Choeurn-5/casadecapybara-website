import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/lib/wordpress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Casa de Capybara | Luxury Wildlife Sanctuary & Eco-Resort",
    template: "%s | Casa de Capybara",
  },
  description:
    "Experience Cambodia's premier capybara sanctuary, boutique eco-villas, tranquil botanical gardens, and farm-to-table dining at Casa de Capybara.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">
        <Navbar settings={settings} />
        <div className="flex-1 flex flex-col w-full">{children}</div>
        <Footer settings={settings} />
        <FloatingContactBar settings={settings} />
      </body>
    </html>
  );
}
