import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CafeMenu from "@/components/cafe/CafeMenu";
import { getAllCafeMenuItems, getCafePageContent } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Full Menu | Capybara Cafe Siem Reap",
  description: "Browse the full menu at Capybara Cafe, featuring homemade meals, signature drinks, and fresh pastries.",
};

export default async function FullMenuPage() {
  const [menuItems, cafeContent] = await Promise.all([
    getAllCafeMenuItems(),
    getCafePageContent(),
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-[#090D16] text-[#FAF7F2] pt-32 sm:pt-40 pb-24 relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F43F5E]/40 to-transparent" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#0284C7]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-64 w-[500px] h-[500px] bg-[#F43F5E]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-64 w-[450px] h-[450px] bg-[#0284C7]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Navigation */}
      <section className="px-6 pb-2 max-w-7xl mx-auto w-full relative z-10">
        <ScrollReveal direction="down">
          <Link
            href="/cafe"
            className="group inline-flex items-center gap-2.5 text-[#FDA4AF] hover:text-white font-semibold transition-all duration-300 text-xs tracking-widest uppercase py-2.5 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F43F5E]/50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#F43F5E]" />
            <span>Back to Sanctuary Café</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* Full Interactive Menu */}
      <section className="px-4 sm:px-6 relative z-10">
        <CafeMenu wpItems={menuItems} searchPlaceholder={cafeContent?.searchPlaceholder} />
      </section>
    </main>
  );
}
