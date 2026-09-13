import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CafeMenu from "@/components/cafe/CafeMenu";
import { getAllCafeMenuItems } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Full Menu | Capybara Cafe Siem Reap",
  description: "Browse the full menu at Capybara Cafe, featuring homemade meals, signature drinks, and fresh pastries.",
};

export default async function FullMenuPage() {
  const menuItems = await getAllCafeMenuItems();

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFDFB] text-[#1A1A1A] pt-24 pb-16">
      
      {/* Header */}
      <section className="px-4 pt-12 pb-4 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="down">
          <Link href="/cafe" className="inline-flex items-center gap-2 text-[#1B5E20] hover:text-[#E65100] font-medium transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" /> Back to Cafe
          </Link>
        </ScrollReveal>
      </section>

      {/* Full Interactive Menu */}
      <section className="px-4 bg-[#FBFDFB]">
        <CafeMenu wpItems={menuItems} />
      </section>

    </main>
  );
}
